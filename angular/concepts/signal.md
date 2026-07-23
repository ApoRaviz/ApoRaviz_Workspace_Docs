# Signal

## ภาพจำง่าย ๆ

`signal` เหมือนป้ายตัวเลขหน้าร้าน

ถ้าพนักงานเปลี่ยนเลขบนป้าย คนที่มองป้ายนั้นจะเห็นเลขใหม่ทันที โดยเราไม่ต้องเดินไปบอกทุกคนทีละคน

ใน Angular:

```text
signal = กล่องเก็บค่า
template = คนที่มองกล่องนั้นอยู่
set/update = เปลี่ยนค่าในกล่อง
Angular = คนที่ช่วยประกาศให้หน้าจอวาดใหม่
```

## Technical Term

`signal()` คือ reactive state ของ Angular

คำว่า reactive แปลแบบง่ายคือ "ค่าขยับแล้วส่วนที่ใช้ค่านั้นขยับตาม"

## Code สั้นที่สุด

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <button type="button" (click)="increase()">+1</button>
  `
})
export class CounterComponent {
  readonly count = signal(0);

  increase(): void {
    this.count.update((current) => current + 1);
  }
}
```

ตัวอย่างนี้อ่านเป็นภาพได้ว่า:

```text
ป้ายคิว       = template
เลขในเครื่อง = signal
ปุ่ม +1       = button click
พนักงาน       = method increase()
```

## อ่านโค้ดทีละส่วน

```ts
count = signal(0);
```

สร้างกล่องชื่อ `count` และใส่ค่าเริ่มต้นเป็น `0`

```html
{{ count() }}
```

อ่านค่าจาก signal ต้องเรียกเหมือน function เพราะ Angular ต้องรู้ว่า template นี้กำลังติดตามค่าไหนอยู่

```ts
this.count.update((current) => current + 1);
```

ขอค่าเดิมจากกล่อง แล้วคืนค่าใหม่กลับเข้าไป

### `(click)` ยังไม่เรียก Method ตอน Render

```html
<button type="button" (click)="increase()">+1</button>
```

บรรทัดนี้ผูก event ไว้ก่อน:

```text
ตอน render     = จำไว้ว่าปุ่มนี้ผูกกับ increase()
ตอน user click = ค่อยเรียก increase()
```

## Flow ของ Signal Counter

ตอน render ครั้งแรก:

```text
1. Angular สร้าง component
2. count เริ่มด้วยค่า 0
3. template อ่าน count()
4. browser แสดง Count: 0
```

ตอน user กดปุ่ม:

```text
1. browser ส่ง click event
2. Angular เรียก increase()
3. count.update() เปลี่ยน 0 เป็น 1
4. Angular วาดส่วนที่อ่าน count() ใหม่
5. browser แสดง Count: 1
```

## จุดที่มักงง

- `signal(0)` ยังไม่ได้แปลว่า UI จะเพิ่มเลขเอง
- `count()` คือการอ่านค่า ไม่ใช่การเพิ่มค่า
- `update()` คือจุดที่เปลี่ยนค่า
- event binding คือการผูกเหตุการณ์ไว้ก่อน ไม่ได้เรียก method ทันทีตอน render
- เมื่อ signal เปลี่ยน Angular จะรู้ว่าตรงไหนใน template ต้องวาดใหม่

## ไปต่อ

- [Computed Concept](computed.md)
- [Form Input Data Flow](form-input-data-flow.md)
- [Reactive State และ Signals](../teach/reactive-signals.md)
