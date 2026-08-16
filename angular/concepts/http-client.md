# HttpClient

`HttpClient` คือเครื่องมือของ Angular สำหรับเตรียมและส่ง HTTP request ไปหา API

## ภาพจำ

```text
Component
-> ขอข้อมูลผ่าน Service
-> Service ใช้ HttpClient เตรียม request
-> มีคน subscribe จึงเริ่มส่ง request
-> API ส่ง response กลับ
-> Observable ส่งข้อมูลให้คนที่รออยู่
```

ควรแยกการเรียก API ไว้ใน Service เพื่อไม่ให้ Component ต้องรู้ทั้ง URL, HTTP method และรายละเอียดการเชื่อมต่อพร้อมกัน

## เปิดใช้ HttpClient

ใน standalone Angular application ให้ลงทะเบียน `HttpClient` ใน application providers:

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

`provider` คือรายการที่บอก Angular DI ว่ามีสิ่งใดพร้อมให้ class อื่นขอใช้

จากนั้น Service ขอ `HttpClient` ผ่าน `inject()`:

```ts
@Service()
export class StatusApi {
  private readonly http = inject(HttpClient);

  getStatus(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>('/api/status');
  }
}
```

## `<StatusResponse>` ทำอะไร

```ts
this.http.get<StatusResponse>('/api/status');
```

`<StatusResponse>` คือ Generic ที่บอก TypeScript ว่า code คาดว่า response body จะมีรูปแบบใด ช่วยตรวจ type ตอนเขียนและ compile code แต่ไม่ได้ตรวจ JSON จริงตอน runtime

```text
Generic             = ป้ายบอกว่าข้อมูลควรมีรูปแบบใด
runtime validation  = เปิดข้อมูลจริงมาตรวจว่าตรงกับป้ายหรือไม่
```

ถ้า API ส่งรูปแบบผิด `HttpClient` จะไม่แปลงหรือปฏิเสธข้อมูลให้อัตโนมัติเพียงเพราะใส่ Generic

## จุดที่มักงง

- เรียก `get()` แล้วได้ `Observable` กลับมา ไม่ได้ response body ทันที
- HTTP request ของ `HttpClient` เริ่มทำงานเมื่อมีคน `subscribe()`
- subscribe ซ้ำหลายครั้งทำให้เกิด request แยกกันหลายครั้ง
- `provideHttpClient()` ลงทะเบียนเครื่องมือ HTTP แต่ไม่ได้เปิด backend server
- Unit Test สามารถเปลี่ยนปลายทางจาก network จริงเป็น testing backend ได้

## อ่านต่อ

- [Observable](observable.md)
- [`inject()`](inject.md)
- [TypeScript Generic](typescript-generics.md)
- [HttpClient และ HTTP Unit Test](../teach/http-client-and-http-testing.md)

## จำสั้น ๆ

```text
HttpClient  = เครื่องมือสร้าง HTTP request
subscribe   = เริ่ม request และรอผล
Generic     = ช่วย TypeScript แต่ไม่ตรวจ JSON ตอน runtime
Service     = ขอบเขตที่เก็บ URL และ logic การเรียก API
```
