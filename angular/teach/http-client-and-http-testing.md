# HttpClient และ HTTP Unit Test

บทนี้อธิบายการเรียก API ผ่าน Angular Service และการทดสอบ request โดยไม่ยิง network จริง

## เรียนเรื่องนี้เพื่อแก้อาการงงอะไร

หลังเห็น test แบบนี้ มักเกิดคำถามว่า:

- ใครสร้าง request
- ใครดัก request
- `expectOne()` กับ `flush()` ทำอะไรคนละอย่างอย่างไร
- response เข้ามาอยู่ใน callback ได้อย่างไร
- ทำไม NestJS ไม่ต้องเปิดแต่ test ยังผ่าน
- Generic ป้องกัน response ผิดรูปแบบได้หรือไม่

เราจะเริ่มจากผู้ทำงานและหน้าที่ก่อน แล้วค่อยใช้ศัพท์ technical ที่ตรงกับ code

## ขอบเขตของจริงและของจำลอง

```text
ของจริงใน Unit Test
- Service และ method ของ Service
- HttpClient และ request ที่ code เตรียม
- URL และ HTTP method ใน Service
- Observable และ callback

ของจำลองใน Unit Test
- ปลายทางที่รับ request
- response ที่ส่งกลับ
```

Flow ปกติ:

```text
HttpClient
-> network จริง
-> API server จริง
```

Flow ตอน Unit Test:

```text
HttpClient
-> testing backend ใน process ของ test
-> test เป็นคนส่ง response ด้วย flush()
```

`process` คือโปรแกรมที่กำลังรัน test อยู่ testing backend ไม่เปิด port และไม่ใช่ server อีกตัวหนึ่ง

## ผู้ทำงานและหน้าที่

| ผู้ทำงาน | หน้าที่แบบคนธรรมดา | ชื่อ technical |
|---|---|---|
| API Service | เก็บ URL และวิธีเรียก API | Angular Service |
| `HttpClient` | เตรียม HTTP request | HTTP client |
| `Observable` | เก็บงานและส่ง response ให้คนที่รอ | RxJS Observable |
| `subscribe()` | เริ่ม request และฝาก function รอรับผล | subscription |
| testing backend | ดัก request ไม่ให้ออก network | `HttpClientTestingBackend` |
| `HttpTestingController` | ให้ test ค้นหาและควบคุม request | testing controller |
| `expectOne()` | ยืนยันว่ามี request ตรงเงื่อนไขหนึ่งตัว | request expectation |
| `flush()` | ส่ง response จำลองกลับเข้า request | mock response |
| `expect()` | ตรวจว่าค่าจริงตรงกับค่าที่คาด | assertion |

ศัพท์ technical ใช้เพื่ออ่าน code, documentation และ error message ได้ แต่ทุกคำต้องชี้กลับมาที่หน้าที่และบรรทัด code ที่เห็นจริง

## Service จริง

```ts
import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import type { Observable } from 'rxjs';

export interface StatusResponse {
  status: 'ok';
}

@Service()
export class StatusApi {
  private readonly statusUrl = '/api/status';
  private readonly httpClient = inject(HttpClient);

  getStatus(): Observable<StatusResponse> {
    return this.httpClient.get<StatusResponse>(this.statusUrl);
  }
}
```

แยกทีละส่วน:

```text
@Service()                         = ให้ class เข้าร่วม Angular DI
inject(HttpClient)                 = ขอ HttpClient จาก Angular
get<StatusResponse>(statusUrl)     = เตรียม GET request และบอก type ที่คาด
Observable<StatusResponse>         = งานที่จะส่ง StatusResponse กลับมาเมื่อมี response
```

Angular 22 ใช้ `@Service()` เพื่อทำให้ class เป็น Service และลงทะเบียนระดับ root ให้อัตโนมัติโดยค่าเริ่มต้น

## เปิดใช้ HttpClient ใน Application

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

`provideHttpClient()` ลงทะเบียน dependency ที่จำเป็นให้ Angular สามารถแจก `HttpClient` ผ่าน DI ได้

```text
TypeScript import      = ทำให้ไฟล์รู้จักชื่อ provideHttpClient
providers registration = ทำให้ Angular DI มี HttpClient ให้แจกตอน runtime
```

## Test Setup

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });

  service = TestBed.inject(StatusApi);
  httpTestingController = TestBed.inject(HttpTestingController);
});
```

หน้าที่ตามลำดับ:

```text
TestBed                       = ห้อง Angular ขนาดเล็กสำหรับ test
provideHttpClient()           = เตรียม HttpClient ปกติ
provideHttpClientTesting()    = เปลี่ยนปลายทางเป็น testing backend
TestBed.inject(StatusApi)     = ขอ Service จริงจาก Angular DI
inject(HttpTestingController) = ขอเครื่องมือควบคุม testing backend
```

ต้องวาง `provideHttpClientTesting()` หลัง `provideHttpClient()` เพราะ provider ตัวหลังเปลี่ยนบางส่วนของ HttpClient configuration ให้ใช้ testing backend

## เมื่อ Service ใช้ Environment

Service สามารถแยก base URL ออกจาก endpoint path:

```ts
import { environment } from '../../environments/environment';

private readonly statusUrl = `${environment.apiBaseUrl}/status`;
```

Test ควรสร้าง expected URL จาก config ที่ target นั้นกำลังใช้:

```ts
const expectedStatusUrl = `${environment.apiBaseUrl}/status`;
const request = httpTestingController.expectOne(expectedStatusUrl);
```

ใน Angular 22 `@angular/build:unit-test` ใช้ `build:development` เป็นค่าเริ่มต้นเมื่อ target `test` ไม่ได้กำหนด `buildTarget` เอง ดังนั้น `fileReplacements` ของ development มีผลกับทั้ง Service และ spec ที่ import Environment

สิ่งที่ต้องระวังใน negative control:

```text
Environment ให้ port 3000
Service hardcode port 3000
-> พฤติกรรมยังเท่ากัน Test จึงผ่าน

Service hardcode port 4300
-> พฤติกรรมต่าง expectOne() จึง fail
```

Test ตรวจพฤติกรรมที่มองเห็น เช่น URL จริงของ request ไม่ได้ตรวจเจตนาหรือรูปแบบ source code ถ้า negative control ไม่เปลี่ยนพฤติกรรม มันก็ไม่ควรทำให้ test fail

## Test ครบหนึ่ง Flow

```ts
it('requests the status endpoint', () => {
  expect.assertions(2);
  let actualResponse: StatusResponse | undefined;

  service.getStatus().subscribe((response) => {
    actualResponse = response;
  });

  const request = httpTestingController.expectOne('/api/status');

  expect(request.request.method).toBe('GET');
  request.flush({ status: 'ok' });
  expect(actualResponse).toEqual({ status: 'ok' });
});
```

## ตาม request และ response ทีละจุด

### 1. เรียก Service และ subscribe

```ts
service.getStatus().subscribe((response) => {
  actualResponse = response;
});
```

```text
getStatus()
-> HttpClient สร้าง Observable สำหรับ GET /api/status
-> subscribe() เริ่ม request
-> testing backend ดัก request ไว้
-> callback ถูกฝากไว้รอ response
```

ก่อน `flush()`:

```text
request มีแล้ว
response ยังไม่มี
actualResponse ยังเป็น undefined
```

### 2. หา request

```ts
const request = httpTestingController.expectOne('/api/status');
```

`expectOne()` ไม่ได้สร้าง request และไม่ได้สร้าง response แต่ค้นหา request ที่ Service ทำไว้แล้ว

```text
ไม่พบ                    = test fail
พบมากกว่าหนึ่งตัว        = test fail
พบตรงเงื่อนไขหนึ่งตัว    = คืน TestRequest ให้ตรวจต่อ
```

### 3. ตรวจหน้าซอง

```ts
expect(request.request.method).toBe('GET');
```

บรรทัดนี้เป็น `assertion` หรือคำสั่งตรวจผลว่า HTTP method ที่ Service สร้างเป็น `GET`

### 4. ส่ง response จำลอง

```ts
request.flush({ status: 'ok' });
```

```text
test เรียก flush()
-> testing backend ส่ง response จำลอง
-> Observable ได้ response
-> Observable เรียก callback ใน subscribe()
-> actualResponse = { status: 'ok' }
-> callback จบ
-> flush() จบ
```

`flush()` ไม่เรียก API server และข้อมูลที่ส่งไม่ได้มาจาก network

### 5. ตรวจข้อมูลที่ได้รับ

```ts
expect(actualResponse).toEqual({ status: 'ok' });
```

คำสั่งตรวจผลอยู่ในส่วนหลักของ `it(...)` โดยตรง ถ้าค่าผิด Vitest จึงแสดง test ตัวนี้เป็น `FAIL` พร้อมบรรทัดที่ผิด

## ทำไมไม่วาง expect() ไว้ใน subscribe()

รูปแบบนี้ดูเหมือนใช้ได้เมื่อค่าถูก:

```ts
service.getStatus().subscribe((response) => {
  expect(response).toEqual({ status: 'ok' });
});
```

แต่ถ้าคำสั่งตรวจผลข้างใน callback ล้มเหลว RxJS อาจรายงานข้อผิดพลาดแยกจาก test case ทำให้ผลด้านบนยังดูเหมือน test ผ่าน แต่มี `Unhandled Error` ด้านล่าง

รูปแบบที่ใช้ในบทนี้จึงแยกหน้าที่:

```text
callback ใน subscribe() = รับและเก็บข้อมูล
expect() ใน it(...)     = ให้ Vitest ตรวจข้อมูลโดยตรง
```

อีกแนวทางหนึ่งคือแปลง Observable เป็น Promise ด้วย `firstValueFrom()` แล้ว `await` ผลลัพธ์ เหมาะเรียนต่อหลังเข้าใจ Observable flow นี้แล้ว

## `expect.assertions(2)` ทำอะไร

```ts
expect.assertions(2);
```

บอก Vitest ว่า test case นี้ควรเรียก `expect()` สองครั้ง:

```text
ครั้งที่ 1 = ตรวจ HTTP method
ครั้งที่ 2 = ตรวจ response body
```

ถ้ามีเส้นทางใดทำให้คำสั่งตรวจไม่ครบ Vitest จะรายงานว่า assertion count ไม่ตรง

## Generic ไม่ใช่ตัวตรวจข้อมูล runtime

```ts
this.httpClient.get<StatusResponse>('/api/status');
```

`<StatusResponse>` ช่วย TypeScript ตอนเขียนและ compile code แต่ไม่ได้เปิด JSON จริงมาตรวจ

ดังนั้น test สามารถทำ negative control:

```ts
request.flush({ status: 'down' });
```

ค่าที่ callback ได้จริงคือ `{ status: 'down' }` และคำสั่งตรวจที่คาด `{ status: 'ok' }` ต้อง fail การตรวจข้อมูลจริงตอน runtime ต้องใช้ validation เพิ่มอีกชั้นหนึ่ง

## `verify()` ตรวจอะไร

```ts
afterEach(() => {
  httpTestingController.verify();
});
```

`verify()` ตรวจว่า testing backend ไม่มี request เหลือโดยที่ test ยังไม่ได้จับคู่มาตรวจ

มันไม่ได้ตรวจแทนว่า:

- method เป็น `GET`
- response body ถูกต้อง
- callback ได้รับข้อมูลแล้ว

แต่ละเรื่องต้องมีคำสั่งตรวจของตัวเอง

## Test นี้พิสูจน์อะไร

- Service สร้าง request เมื่อมีคน subscribe
- URL และ HTTP method ตรงตามที่ test คาด
- response จำลองไหลผ่าน Observable ไปถึง callback
- Service รับข้อมูลในรูปแบบที่ test ส่งกลับได้

## Test นี้ไม่พิสูจน์อะไร

- API server เปิดและมี endpoint จริง
- network เชื่อมต่อได้
- browser อนุญาต [CORS](../../backend/concepts/cors.md)
- database ทำงาน
- frontend และ backend เชื่อมกันแบบ end-to-end

## Negative Control

อย่าดูแค่ว่า test ผ่าน ต้องพิสูจน์ด้วยว่ามันล้มเหลวเมื่อ behavior ผิด:

```text
Green: flush({ status: 'ok' })
-> test ผ่าน

Red: flush({ status: 'down' })
-> named test case ต้อง FAIL
-> Expected ok / Received down
-> ไม่ควรเหลือเพียง Unhandled Error ขณะที่ test ยังแสดงผ่าน

Restore: คืนเป็น ok
-> test ผ่านอีกครั้ง
```

ถ้าต้องการพิสูจน์ว่า Service ผูกกับ Environment ให้เปลี่ยน URL ชั่วคราวเป็นค่าที่ต่างจาก Environment จริง เช่นเปลี่ยน port แล้วคาดว่า `expectOne()` ต้องหา request ไม่พบ จากนั้นคืน source เดิมและ rerun ให้ผ่าน ห้ามปล่อยโค้ดทดลองค้างไว้

## ศัพท์ที่เจอในบทนี้

```text
HttpClient       = เครื่องมือเตรียม HTTP request
Observable       = งานที่ส่งค่าให้คนที่ subscribe
callback         = function ที่ฝากให้อีกฝ่ายเรียกภายหลัง
testing backend  = ปลายทางจำลองที่ดัก request ใน test
TestRequest      = request ที่ test หยิบมาตรวจและตอบกลับได้
flush            = ส่ง response จำลอง
assertion        = คำสั่งตรวจผล เช่น expect()
negative control = จงใจทำ behavior ให้ผิดเพื่อพิสูจน์ว่า test จับได้
```

## เช็กตัวเอง

1. ก่อน `flush()` ทำไม response variable ยังเป็น `undefined`
2. ใครสร้าง request และใครดัก request
3. `expectOne()` กับ `flush()` ต่างกันอย่างไร
4. ทำไม Generic ไม่ตรวจ JSON ตอน runtime
5. Unit Test นี้ต่างจากการเปิด browser ยิง API จริงอย่างไร

## อ่านต่อ

- [HttpClient](../concepts/http-client.md)
- [Observable](../concepts/observable.md)
- [`inject()`](../concepts/inject.md)
- [TypeScript Generic](../concepts/typescript-generics.md)
- [Unit Test และ Regression Safety](unit-test-regression.md)
- [Environment Files](../concepts/environment-files.md)

## จำสั้น ๆ

```text
Service + HttpClient = เตรียมรายละเอียด request ตาม code จริง
testing backend      = ดัก request ไม่ให้ออก network
expectOne()          = หา request
flush()              = ส่ง response จำลอง
subscribe callback   = รับ response
expect()             = ตรวจผลใน test โดยตรง
```
