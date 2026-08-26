# Data Binding, UI State และ Component Test

บทนี้อธิบายการนำข้อมูลจาก HTTP Service มาเก็บใน Component แล้วแสดงบนหน้าจอ พร้อมทดสอบสิ่งที่ผู้ใช้เห็นทั้งเส้นทางสำเร็จและล้มเหลว

## ทำไม Service อย่างเดียวไม่พอ

Service รู้วิธีขอข้อมูล แต่ไม่ควรเป็นผู้ควบคุมข้อความ ปุ่ม และสถานะบนหน้าจอโดยตรง

```text
HTTP Service
→ ส่ง Observable ให้ Component
→ Component เก็บ state และ response
→ Template อ่าน state
→ ผู้ใช้เห็นผล
```

แบ่งหน้าที่แบบนี้ทำให้:

- Service รับผิดชอบ API
- Component รับผิดชอบ flow ของหน้าจอ
- Template รับผิดชอบการแสดงผลและรับ event
- Test ตรวจพฤติกรรมแต่ละชั้นได้ชัดเจน

## แผนที่ผู้ทำงาน

| ผู้ทำงาน | หน้าที่ |
|---|---|
| HTTP Service | สร้าง request และคืน Observable |
| Component | เริ่ม request และเปลี่ยน UI state |
| Signal | เก็บค่าที่ Angular ติดตามได้ |
| Template | อ่าน Signal แล้วสร้าง DOM |
| Browser | ส่ง network request จริงและแสดง DOM |
| HttpTestingController | จับ request และส่ง response จำลองใน Unit Test |
| ComponentFixture | ควบคุม Component และรอบ render ใน Test |

## แยก UI State ออกจาก Response

สถานะของหน้าจอกับข้อมูลที่ API ส่งกลับมาเป็นคนละเรื่อง:

```ts
type ViewState = 'idle' | 'loading' | 'success' | 'error';

protected readonly viewState = signal<ViewState>('idle');
protected readonly response = signal<StatusResponse | null>(null);
```

```text
viewState = ตอนนี้หน้าจออยู่ขั้นตอนไหน
response  = API ส่งข้อมูลอะไรกลับมา
```

`null` หมายถึงยังไม่มี response การล้าง response ก่อนเริ่ม request รอบใหม่ช่วยไม่ให้หน้าจอแสดงข้อมูลเก่าระหว่างรอ

## เริ่ม request และรับผลสองทาง

```ts
protected reload(): void {
  this.viewState.set('loading');
  this.response.set(null);

  this.statusApi.getStatus().subscribe({
    next: (response) => {
      this.response.set(response);
      this.viewState.set('success');
    },
    error: () => {
      this.viewState.set('error');
    },
  });
}
```

ลำดับสำเร็จ:

```text
reload()
→ loading
→ subscribe() เริ่ม HTTP request
→ next(response)
→ เก็บ response
→ success
```

ลำดับล้มเหลว:

```text
reload()
→ loading
→ HTTP/network error
→ error callback
→ error
```

Response มี body ไม่ได้แปลว่าสำเร็จเสมอ เช่น HTTP 500 อาจมี JSON body แต่ `HttpClient` ยังส่ง flow เข้า error callback เพราะ status เป็น error

## Data Binding สามทิศทางที่ต้องแยกให้ออก

### Interpolation

```html
<p>Status: {{ response()?.status }}</p>
```

นำค่าจาก Component ไปแสดงเป็นข้อความ `?.` ป้องกันการอ่าน `.status` ขณะที่ response ยังเป็น `null`

### Event binding

```html
<button type="button" (click)="reload()">Reload</button>
```

เหตุการณ์จาก Template วิ่งกลับไปเรียก method ของ Component

### Property binding

```html
<button [disabled]="viewState() === 'loading'">Reload</button>
```

Component ส่ง boolean ไปกำหนด DOM property `disabled` เพื่อกันการกดซ้ำระหว่างรอ

```text
(click)     = Template → Component
[disabled]  = Component → DOM property
{{ value }} = Component → ข้อความ
```

## เลือก HTML ด้วย `@switch`

เมื่อ UI มีหลายสถานะที่แยกจากกันชัด `@switch` ช่วยให้แต่ละ branch อ่านง่าย:

```html
<div aria-live="polite">
  @switch (viewState()) {
    @case ('idle') {
      <p>Not checked yet.</p>
    }
    @case ('loading') {
      <p>Checking...</p>
    }
    @case ('success') {
      <p>Status: {{ response()?.status }}</p>
    }
    @case ('error') {
      <p>Unable to connect.</p>
    }
  }
</div>
```

`@switch` เปรียบเทียบค่ากับแต่ละ `@case` แบบ strict equality (`===`) และไม่มี fallthrough

ข้อควรจำ: ถ้า `@switch` อ่าน Signal ด้วย function call โดยตรง เช่น `@switch (viewState())` Angular ยังไม่สามารถใช้ exhaustive type checking แบบ `@default never` ได้โดยตรง ถ้าต้องการการตรวจแบบนั้น ให้เก็บค่า Signal ในตัวแปร Template ก่อนตามคู่มือ Angular

## Render กับ DOM ไม่ใช่ state ตัวเดียวกัน

ใน browser Angular จัดรอบ update ให้ตาม event และงาน asynchronous แต่ใน Component Test เรามักสั่งจังหวะ render เอง:

```text
action
→ state เปลี่ยน
→ fixture.detectChanges()
→ Angular ประเมิน binding และ @switch
→ DOM ถูก update
→ expect() อ่าน DOM ปัจจุบัน
```

ตัวอย่าง:

```ts
button.click();
fixture.detectChanges();

expect(button.disabled).toBe(true);
expect(compiled.textContent).toContain('Checking...');
```

หลังส่ง response จำลอง ต้อง render อีกครั้ง:

```ts
request.flush({ status: 'ok' });
fixture.detectChanges();

expect(compiled.textContent).toContain('Status: ok');
```

ตัวแปรที่อ้างถึง root DOM เดิมยังอ่านเนื้อหาล่าสุดได้ เพราะ Angular update DOM object ชุดนั้น ไม่จำเป็นต้องเรียก `fixture.nativeElement` ใหม่ทุกครั้ง

## Component Test ของ success และ error

ตั้ง Testing Backend ตามลำดับ:

```ts
providers: [provideHttpClient(), provideHttpClientTesting()]
```

เส้นทางสำเร็จ:

```ts
const request = httpTestingController.expectOne('/api/status');
request.flush({ status: 'ok' });
fixture.detectChanges();

expect(compiled.textContent).toContain('Status: ok');
```

เส้นทาง error:

```ts
const request = httpTestingController.expectOne('/api/status');

request.flush(
  { message: 'Internal server error' },
  { status: 500, statusText: 'Internal Server Error' },
);
fixture.detectChanges();

expect(compiled.textContent).toContain('Unable to connect.');
```

`flush(body, options)` ส่งทั้ง body และ HTTP metadata จำลอง Status 500 ทำให้ Observable เข้า error callback แม้ body จะมีข้อมูล

## Testing Backend เทียบกับ Browser Runtime

| หลักฐาน | พิสูจน์ได้ | ยังไม่พิสูจน์ |
|---|---|---|
| Component Unit Test | click, state, request shape, success/error DOM | server เปิดจริง, network, CORS |
| Angular Build | TypeScript/Template/Tailwind/SSR compile | endpoint ใช้งานได้จริง |
| Browser runtime success | frontend → network → backend → response → UI | production deployment |
| Browser runtime เมื่อ backend ปิด | network error เข้า error UI จริง | HTTP error body จาก server |

Testing Backend ไม่ใช้ port และไม่ติดต่อ backend จริง:

```text
provideHttpClientTesting()
→ request ถูกจับใน test process
→ expectOne() ตรวจ request
→ flush() ส่ง response จำลอง
```

## UI/UX ขั้นพื้นฐานที่ใช้กับสถานะ

### Visual hierarchy

ใช้ขนาด น้ำหนัก สี และ spacing บอกลำดับความสำคัญ:

```text
label ขนาดเล็ก
→ heading ใหญ่
→ description สีรอง
→ primary action
→ status feedback
```

### Card เป็นรูปแบบ UI ไม่ใช่ HTML tag

`<section>` อาจทำหน้าที่เป็น Card เมื่อมีพื้นหลัง ขอบ มุมโค้ง เงา และ padding:

```text
background + border + radius + shadow + padding = card surface
```

Semantic HTML ยังบอกหน้าที่ของเนื้อหา ส่วน Tailwind utility classes กำหนดหน้าตา

### Interactive states

Tailwind ใช้ variant prefix เพื่อกำหนด style ตามสถานะ:

```html
<button
  class="bg-cyan-400 hover:bg-cyan-300 focus-visible:outline-2 disabled:cursor-not-allowed"
>
  Reload
</button>
```

```text
hover:          = เมื่อ pointer ชี้
focus-visible:  = เมื่อ keyboard focus ควรถูกแสดง
disabled:       = เมื่อ element ถูกปิดการใช้งาน
```

### Accessibility ของ feedback

- ใช้ `aria-live="polite"` เพื่อให้ assistive technology รับรู้ข้อความสถานะที่เปลี่ยน
- อย่าใช้สีเป็นหลักฐานเพียงอย่างเดียว ต้องมีข้อความ เช่น `Checking`, `Status: ok`, `Unable to connect`
- ปุ่มควรมี focus indicator สำหรับผู้ใช้ keyboard
- สีข้อความกับพื้นหลังต้องมี contrast เพียงพอ

## สิ่งที่มักเข้าใจผิด

### Test ผ่านจึงแปลว่า browser ใช้งานได้จริง

ไม่จริง ถ้า Test ใช้ `provideHttpClientTesting()` request ไม่ออก network ต้องมี browser runtime check แยก

### Signal เปลี่ยนแล้ว DOM ใน Test ต้องเปลี่ยนทันที

ไม่ควรตั้งสมมติฐานแบบนั้น ให้ควบคุมจังหวะด้วย `fixture.detectChanges()` ก่อนอ่าน DOM

### มี response body จึงต้องเข้า `next`

ไม่จริง HTTP error status เช่น 500 ทำให้ `HttpClient` เข้า error flow ได้แม้มี body

### Card ต้องใช้ component หรือ tag ชื่อ Card

ไม่จำเป็น Card เป็น visual pattern จะสร้างด้วย semantic element ที่เหมาะสมแล้วตกแต่งให้เป็น card surface ก็ได้

## จำสั้น ๆ

```text
Service            = ขอข้อมูล
Component          = คุม UI state
Signal             = เก็บค่าที่ Angular track
Template binding   = เชื่อม state กับ DOM และ event
detectChanges()    = render state ล่าสุดใน Component Test
Testing Backend    = ไม่ออก network
Browser runtime    = พิสูจน์เส้นทางจริง
```

## อ่านต่อ

- [Data Binding](../concepts/data-binding.md)
- [Change Detection](../concepts/change-detection.md)
- [Reactive State และ Signals](reactive-signals.md)
- [HttpClient และ HTTP Unit Test](http-client-and-http-testing.md)
- [Tailwind CSS v4 ใน Angular](tailwind-css-v4.md)

## แหล่งอ้างอิง

- [Angular — Binding dynamic text, properties and attributes](https://angular.dev/guide/templates/binding)
- [Angular — Control flow](https://angular.dev/guide/templates/control-flow)
- [Angular — Basics of testing components](https://angular.dev/guide/testing/components-basics)
- [Angular — Testing HTTP requests](https://angular.dev/guide/http/testing)
- [Tailwind CSS — Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)
