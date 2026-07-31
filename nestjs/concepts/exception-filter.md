# NestJS Exception Filter

## ภาพจำ

ลองนึกว่า backend เป็นอาคารที่มีจุดรับเรื่องผิดปกติก่อนส่งคำตอบออกไป:

```text
request ปกติ  -> Controller/Service ทำงาน -> response ปกติ
เกิด exception -> งานปกติหยุด -> จุดรับเรื่องผิดปกติ -> error response
```

Exception Filter คือจุดที่กำหนดว่า exception ซึ่งตรงกับเงื่อนไขของ Filter จะถูกแปลงเป็น HTTP response รูปแบบใด

## ความหมายแบบคนธรรมดา

**exception** คือเหตุผิดปกติที่ทำให้ flow ปกติทำต่อไม่ได้ เช่น route ไม่มีอยู่ ข้อมูลไม่ถูกต้อง หรือระบบภายในล้มเหลว

**filter** ในชื่อนี้ไม่ได้แปลว่าช่องค้นหา แต่หมายถึงตัวคัดว่า exception ชนิดใดควรถูกจัดการด้วยกฎชุดนี้

Controller ไม่จำเป็นต้องเขียน `try/catch` ซ้ำทุก endpoint เพราะ exception สามารถไหลออกจาก Controller ไปยัง exception layer ของ Nest ได้

## Technical Term

- **exception** คือ object ที่ถูก `throw` และทำให้ normal flow หยุด
- **Exception Filter** คือ class ที่กำหนดวิธีจัดการ exception ที่จับได้
- **`@Catch(...)`** คือ decorator ที่ระบุชนิด exception ที่ Filter รับผิดชอบ
- **`ArgumentsHost`** คือทางเข้าถึง execution context เช่น HTTP request และ response
- **global filter** คือ Filter ที่ผูกใช้กับ application ทั้งหมด
- **error contract** คือรูปแบบ error response ที่ client คาดหวังได้อย่างสม่ำเสมอ

## Nest จัดการ Error โดย Default

ถ้าไม่มี custom Filter:

```text
HttpException ที่ Nest รู้จัก
-> ใช้ HTTP status และข้อความที่เหมาะสม

Error ทั่วไปที่ Nest ไม่รู้จัก
-> ตอบ 500 Internal Server Error แบบกลาง
-> ไม่ส่ง message หรือ stack trace ภายในให้ client
```

ตัวอย่าง route ที่ไม่มีอยู่:

```json
{
  "message": "Cannot GET /missing",
  "error": "Not Found",
  "statusCode": 404
}
```

ตัวอย่าง `new Error('database failed')`:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

Nest อาจ log รายละเอียดและ stack trace ทางฝั่ง server แต่ client ไม่ควรได้รับข้อมูลเหล่านั้น

## ทำไม Stack Trace ไม่ควรออกไป Frontend

Stack trace อาจเปิดเผย:

- path และชื่อไฟล์ใน server
- หมายเลขบรรทัดของ source code
- package หรือ framework ภายใน
- โครงสร้าง application
- ข้อความจาก database หรือระบบภายนอก

ข้อมูลเหล่านี้ช่วย debug ฝั่ง server แต่เพิ่มข้อมูลให้ผู้โจมตีถ้าส่งออกไปยัง client

หลักสำคัญ:

```text
server log = รายละเอียดสำหรับผู้ดูแลระบบ
client response = ข้อมูลเท่าที่ client ต้องใช้
```

อย่า serialize `exception.stack` หรือข้อความของ unknown error ออกไปตรง ๆ

## ตัวอย่าง Filter สำหรับ `HttpException`

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

หน้าที่ทีละส่วน:

```text
@Catch(HttpException)
= รับเฉพาะ HttpException และ class ลูก

implements ExceptionFilter
= ให้ TypeScript ตรวจว่า class มีโครงสร้างตามสัญญาของ Filter

host.switchToHttp()
= เลือก HTTP context จาก execution context

getResponse() / getRequest()
= รับ reference ของ response และ request

exception.getStatus()
= อ่าน HTTP status จาก HttpException

response.status(...).json(...)
= ส่ง HTTP status และ JSON ตาม error contract ที่กำหนด
```

`import type` ใช้ได้กับ `Request` และ `Response` เพราะใช้เป็น TypeScript type เท่านั้น แต่ `HttpException` ต้องเป็น runtime import เพราะถูกส่งให้ `@Catch(HttpException)` เป็นค่าจริงขณะโปรแกรมทำงาน

## ลงทะเบียนแบบ Global

การสร้างไฟล์ Filter อย่างเดียวยังไม่ทำให้ Nest เรียกใช้ ต้องลงทะเบียนกับ application:

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new HttpExceptionFilter());
await app.listen(3000);
```

ลำดับนี้มีความหมาย:

```text
สร้าง application
-> ผูก Filter กับ application
-> เริ่มรับ request
```

`new HttpExceptionFilter()` สร้าง instance ด้วยตนเอง วิธีนี้เหมาะกับ Filter ที่ยังไม่มี constructor dependency

การลงทะเบียน global filter ผ่าน DI provider มีอยู่ แต่ควรเรียนเมื่อเข้าใจ custom provider token และมี dependency ที่ต้องฉีดเข้ามาจริง

## Global ไม่ได้แปลว่าจับทุก Exception

สองเรื่องนี้แยกกัน:

```text
useGlobalFilters(...)   = Filter ใช้ได้ทั่ว application
@Catch(HttpException)  = Filter จับเฉพาะตระกูล HttpException
```

ดังนั้น `new Error(...)` ยังไม่เข้า Filter ตัวอย่างนี้ Nest default handler จะจัดการเป็น generic 500

ถ้าต้องการ catch-all สามารถใช้ `@Catch()` ได้ แต่ Filter ต้องแยก known `HttpException` ออกจาก unknown error อย่างปลอดภัย และห้ามส่งข้อความหรือ stack ของ unknown error ออกไปตรง ๆ

## Normal Flow ไม่เข้า Filter

ถ้า Controller หรือ Service คืนค่าปกติ:

```text
Controller/Service return ค่า
-> Nest สร้าง response ปกติ
-> ไม่เรียก catch() ของ Filter
```

Filter ทำงานเฉพาะเมื่อมี exception ที่ตรงกับ `@Catch(...)`

## `main.ts` กับ E2E Test อาจใช้ Bootstrap คนละทาง

E2E test ที่สร้าง application ด้วย:

```ts
moduleFixture.createNestApplication();
```

ไม่ได้รัน `main.ts` โดยอัตโนมัติ ดังนั้น global configuration ที่เขียนเฉพาะใน `main.ts` เช่น `useGlobalFilters(...)` อาจไม่อยู่ใน test application

ตอนเขียน E2E ต้องทำให้ test bootstrap ใช้ global configuration ชุดเดียวกับ runtime หรือผูก Filter ผ่าน application graph ด้วยวิธีที่เหมาะสม ไม่ควรเห็น test เขียวแล้วสรุปทันทีว่า `main.ts` ถูกทดสอบแล้ว

แนวทางหนึ่งสำหรับ configuration ที่ลงทะเบียนแบบ imperative คือแยก `configureApp(app)` เป็น function กลาง แล้วเรียกหลังสร้าง application ทั้งใน runtime และ E2E ก่อน `listen()` หรือ `init()` วิธีนี้ลด configuration drift แต่ยังไม่ได้ทำให้ E2E รัน `main.ts` หรือพิสูจน์ fixed production port

อ่านต่อ: [Backend E2E Test ด้วย Jest และ Supertest](backend-e2e-test.md)

## จุดที่มักงง

- `filter` ใน `nest generate filter` คือชนิด artifact ไม่ใช่การค้นหา
- สร้าง class สำเร็จไม่ได้แปลว่า Filter ถูกลงทะเบียนแล้ว
- global คือขอบเขตการผูกใช้ ไม่ใช่การจับ exception ทุกชนิด
- `ArgumentsHost` ให้ context แต่ไม่ได้แปลง exception
- `implements ExceptionFilter` ตรวจโครงสร้างตอน compile ส่วน `@Catch(...)` มีผลต่อ Nest ตอน runtime
- normal response ไม่วิ่งเข้า `catch()`
- `HttpException` กับ `Error` ทั่วไปมีขอบเขตการจัดการต่างกัน
- build ผ่านไม่ได้รับประกันว่า HTTP behavior ตรงตาม contract ต้องตรวจ runtime หรือ test ด้วย

## อ่านต่อ

- [Controller](controller.md)
- [Dependency Injection](dependency-injection.md)
- [TypeScript Generic](../../angular/concepts/typescript-generics.md)
- [NestJS Exception Filters — Official Documentation](https://docs.nestjs.com/exception-filters)

## เช็กตัวเอง

- Exception ต่างจาก error response อย่างไร?
- เพราะเหตุใด Controller จึงไม่จำเป็นต้องมี `try/catch` ทุก method?
- `useGlobalFilters(...)` กับ `@Catch(HttpException)` ควบคุมคนละเรื่องอย่างไร?
- เพราะเหตุใด `new Error(...)` จึงไม่เข้า Filter ตัวอย่าง?
- การส่ง `exception.stack` ไปยัง frontend เสี่ยงอย่างไร?
- เพราะเหตุใด E2E ที่สร้าง app จาก `AppModule` อาจไม่เห็น configuration ใน `main.ts`?

## จำสั้น ๆ

```text
exception          = เหตุผิดปกติที่หยุด normal flow
@Catch(...)        = เลือก exception ที่ Filter รับผิดชอบ
ArgumentsHost      = ทางเข้า request/response context
useGlobalFilters() = ผูก Filter ทั่ว application
global scope       != catch ทุกชนิด
stack trace        = เก็บฝั่ง server ไม่ส่งให้ client
```
