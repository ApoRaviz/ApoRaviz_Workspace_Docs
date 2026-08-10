# NestJS Middleware และ Request Pipeline

## ภาพจำ

ให้คิดว่า HTTP request เป็นคนที่กำลังเดินผ่านทางเข้าหลายจุดก่อนถึงห้องทำงานหลัก:

```text
request
-> Middleware
-> Router
-> Controller
-> response
```

Middleware คือจุดตรวจหรือจุดทำงานระหว่างทาง สามารถอ่านข้อมูลของ request, ทำงานบางอย่าง แล้วตัดสินใจว่าจะ:

- เรียก `next()` เพื่อส่ง request ไปยังขั้นถัดไป
- ไม่เรียก `next()` และตอบ response เอง เพื่อหยุด flow ตรงนั้น หรือเรียกว่า short-circuit

งานที่พบบ่อย ได้แก่ request logging, correlation ID, การวัดเวลา และการตรวจเงื่อนไขเบื้องต้น ส่วน validation, authorization หรือ error formatting อาจมี Pipe, Guard และ Exception Filter ที่เหมาะกับหน้าที่นั้นมากกว่า

## Request Pipeline คืออะไร

Request pipeline คือลำดับส่วนประกอบที่ request ไหลผ่าน ตั้งแต่ server รับ request จน response จบ แต่ละส่วนมีหน้าที่และตำแหน่งต่างกัน

ภาพแบบย่อของ NestJS บน Express:

```text
HTTP request
-> Middleware เริ่มทำงาน
-> next()
-> Router เลือก route
-> Guard / Interceptor / Pipe ตาม configuration
-> Controller
-> response ถูกส่งกลับ
-> เหตุการณ์ finish เกิดเมื่อ response ส่งเสร็จ
```

หาก Router หา route ไม่พบ Nest จะสร้าง `NotFoundException` แล้วส่งเข้าสู่ exception handling แทน Controller:

```text
HTTP request
-> Middleware
-> next()
-> Router หา route ไม่พบ
-> NotFoundException
-> Exception Filter ที่ตรงเงื่อนไข
-> 404 response
-> finish
```

Pipeline จริงอาจมีส่วนประกอบมากกว่านี้และลำดับละเอียดขึ้นอยู่กับ scope/configuration ภาพนี้ใช้เพื่อเห็นตำแหน่งหลักของ Middleware, Controller และ Exception Filter ก่อน

## Contract ของ Nest Middleware

ตัวอย่าง Middleware แบบ class:

```ts
import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    // ทำงานก่อนส่ง request ต่อ
    next();
  }
}
```

ส่วนสำคัญ:

- `@Injectable()` ทำให้ class เข้าร่วมระบบ dependency injection ของ Nest ได้
- `implements NestMiddleware` ให้ TypeScript ตรวจว่า class มี method ตาม contract ของ Nest middleware
- `use(...)` คือ method ที่ Nest เรียกเมื่อ request ผ่าน Middleware นี้
- `Request` คือข้อมูล request ฝั่ง Express
- `Response` คือ response object ที่จะส่งกลับ
- `NextFunction` คือชนิดของ function `next`
- `next()` ส่ง control ไปยังขั้นถัดไปใน pipeline

`implements` ตรวจรูปทรงของ class ตอน compile แต่ไม่ได้เป็นคำสั่งเรียก `use()` ตอน runtime Nest เป็นผู้สร้าง Middleware และเรียก `use()` หลังมีการลงทะเบียนกับ Module แล้ว

## `next()` และ Short-circuit

กรณีส่งต่อ:

```ts
use(request: Request, response: Response, next: NextFunction): void {
  next();
}
```

เมื่อ `next()` ถูกเรียก Router หรือ Middleware ตัวถัดไปจึงทำงานต่อ

กรณีหยุด flow:

```ts
use(request: Request, response: Response, next: NextFunction): void {
  if (request.headers['x-maintenance-mode'] === 'true') {
    response.status(503).json({ message: 'Service unavailable' });
    return;
  }

  next();
}
```

เส้นทางที่ตอบ `503` ไม่เรียก `next()` จึงไม่ไปถึง Controller การหยุด pipeline แบบนี้เรียกว่า short-circuit

อย่าลืมให้ทุกเส้นทางเลือกอย่างใดอย่างหนึ่งอย่างชัดเจน:

```text
ส่ง response ให้จบ
หรือ
เรียก next()
```

ถ้าไม่ทำทั้งสองอย่าง request อาจค้างเพราะไม่มีส่วนใดรับช่วงต่อหรือจบ response

## Before/After Flow ไม่ได้แปลว่าทุกอย่างรอแบบเดียวกัน

JavaScript เริ่มประมวลผลคำสั่งใน `use()` จากบนลงล่าง แต่ callback ที่ลงทะเบียนไว้จะยังไม่ทำงานจนกว่า event ของมันเกิดขึ้น

```ts
const startedAt = Date.now();

response.on('finish', () => {
  const durationMs = Date.now() - startedAt;
  // ทำงานหลัง response ส่งเสร็จ
});

next();
```

ลำดับจริงคือ:

```text
1. เก็บเวลาเริ่ม
2. ลงทะเบียน callback สำหรับ event finish
3. เรียก next() ส่ง request ต่อ
4. Controller หรือ error flow สร้าง response
5. response ส่งเสร็จ แล้ว Express เรียก callback ที่ลงทะเบียนไว้
```

บรรทัด `response.on(...)` ทำทันทีในความหมายว่า “ลงทะเบียนผู้ฟัง event” แต่ตัว callback ข้างในยังไม่ทำงานทันที

## Callback และ Closure

Callback คือ function ที่ส่งให้โค้ดอีกส่วนเก็บไว้และเรียกภายหลังเมื่อถึงเหตุการณ์ที่กำหนด

```ts
response.on('finish', () => {
  const durationMs = Date.now() - startedAt;
});
```

ในตัวอย่างนี้ Express เป็นผู้เรียก arrow function เมื่อ response จบ ส่วน `startedAt` ถูกสร้างก่อน `next()` แต่ callback ยังเข้าถึงค่านี้ได้ภายหลัง ความสามารถที่ function จำ environment รอบตัวได้เรียกว่า closure

เพราะ `startedAt` อยู่ภายใน `use()` จึงเกิดค่าใหม่แยกกันทุก request:

```text
request A -> startedAt A -> finish callback A
request B -> startedAt B -> finish callback B
```

แม้ Middleware instance อาจถูกใช้ซ้ำ แต่ local variable ภายใน `use()` ไม่ได้กลายเป็น state ร่วมระหว่าง request

## Safe Request Logging

ตัวอย่าง log ที่ตั้งใจเก็บเฉพาะข้อมูลพื้นฐาน:

```ts
@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();

    response.on('finish', () => {
      const durationMs = Date.now() - startedAt;

      this.logger.log(
        `${request.method} ${request.path} ${response.statusCode} ${durationMs}ms`,
      );
    });

    next();
  }
}
```

ข้อมูลในตัวอย่าง:

- `request.method` เช่น `GET` หรือ `POST`
- `request.path` คือ path โดยไม่รวม query string ใน Express
- `response.statusCode` คือ status สุดท้าย จึงอ่านใน `finish` callback
- `durationMs` คือเวลาตั้งแต่ Middleware เริ่มจน response จบ

ไม่ควร log ข้อมูลเหล่านี้โดยอัตโนมัติ:

- request/response body ทั้งก้อน
- `Authorization` header หรือ access token
- cookie และ session identifier
- password, secret, personal data
- query string ที่อาจมีข้อมูลสำคัญ

คำว่า safe logging ไม่ได้แปลว่า log ใดปลอดภัยเสมอ ต้องพิจารณาข้อมูล, สิทธิ์เข้าถึง log, retention และ environment ด้วย

## ลงทะเบียนกับ Module

การเขียน class อย่างเดียวยังไม่ทำให้ Middleware ถูกเรียก ต้องผูกเข้ากับ Module:

```ts
import {
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
```

แยกหน้าที่ได้ดังนี้:

- `implements NestModule` ให้ TypeScript ตรวจว่า Module มี contract ที่ต้องการ
- `configure(...)` คือ lifecycle hook ที่ Nest ตรวจและเรียกตอนประกอบ Module
- `consumer` คือ object ที่ Nest ส่งมาให้ใช้กำหนด Middleware
- `apply(RequestLoggingMiddleware)` เลือก Middleware ที่จะผูก
- `forRoutes('*')` เลือกขอบเขต route ทั้งหมดภายใต้ Module นี้

ลำดับสำคัญ:

```text
เริ่ม application
-> Nest สร้าง AppModule
-> Nest เรียก configure(consumer)
-> Middleware ถูกลงทะเบียน

มี request เข้ามาภายหลัง
-> Nest/Express เรียก middleware.use(...)
```

`configure()` ของ `NestModule` ไม่ใช่ function เดียวกับ helper ชื่อคล้ายกันที่ project อาจสร้างเอง เช่น `configureApp(app)` ชื่อที่คล้ายกันไม่ได้ทำให้ Nest ผูกความสัมพันธ์ให้เอง ต้องอ่านว่าใครเป็นผู้เรียกและ parameter เป็นชนิดใด

## Middleware เทียบกับ Exception Filter

| ประเด็น | Middleware | Exception Filter |
|---|---|---|
| ตำแหน่งหลัก | ช่วงต้นของ request pipeline | error/exception flow |
| ทำงานเมื่อใด | เมื่อ request ผ่านขอบเขตที่ลงทะเบียน | เมื่อเกิด exception ที่ Filter จับได้ |
| ส่ง flow ต่อ | เรียก `next()` | ไม่ใช้ `next()` เพื่อส่งเข้า Controller |
| หยุด flow | ตอบ response เองและไม่เรียก `next()` | สร้าง error response จาก exception |
| ตัวอย่างงาน | logging, timing, correlation ID | กำหนดรูปแบบ 404/400/500 ที่ควบคุมได้ |

ทั้งสองทำงานร่วมกันได้:

```text
GET /missing
-> Middleware เก็บเวลาและลงทะเบียน finish callback
-> next()
-> Router หา route ไม่พบ
-> NotFoundException
-> Exception Filter สร้าง 404 response
-> response finish
-> Middleware log status 404 และเวลาที่ใช้
```

Middleware ไม่ได้แทน Exception Filter และ Exception Filter ไม่ได้ทำหน้าที่เดิน request ต่อด้วย `next()`

## E2E Test เทียบกับ Runtime Probe

Backend E2E test ช่วยพิสูจน์ HTTP behavior ที่มี assertion เช่น status และ response body แต่ต้องระวังว่าการเห็น test ผ่านไม่ได้พิสูจน์ทุก side effect โดยอัตโนมัติ

ใน Nest test application ที่สร้างผ่าน Testing Module, logger อาจใช้ `TestingLogger` ซึ่งซ่อน output ระดับ `log()` ดังนั้นกรณี request logging อาจเกิดสถานการณ์นี้:

```text
E2E request ผ่าน Middleware จริง
callback เรียก logger.log() จริง
แต่ console ของ test ไม่แสดง application log
```

จึงต้องแยกหลักฐาน:

- E2E assertion พิสูจน์เฉพาะ behavior ที่ assert ไว้
- runtime probe ผ่าน process/server จริงช่วยยืนยันว่ามี log ปรากฏใน runtime configuration
- negative control ช่วยพิสูจน์ว่า test หรือ probe จับสิ่งที่ตั้งใจได้จริง เช่น เปลี่ยนค่าที่คาดหวังหรือแทน logger ด้วย test double แล้วตรวจว่า test fail ตามคาด

ห้ามสรุปว่า request logging ทำงานเพียงเพราะ E2E test ได้ `200`/`404` เพราะ route และ response อาจผ่านแม้ไม่มี log ถ้าต้องการให้ automated test พิสูจน์ logging ต้องมี assertion ต่อ logger/test double หรือผลข้างเคียงที่ออกแบบไว้โดยตรง

Runtime probe ก็มีขอบเขตเช่นกัน การยิง request แล้วเห็น log หนึ่งครั้งยังไม่รับประกัน performance, concurrency, log transport หรือ production deployment ทั้งหมด

## Validation ตามผลกระทบ

เมื่อเพิ่มหรือเปลี่ยน Middleware ที่ครอบทุก route ควรตรวจอย่างน้อย:

```text
lint ไฟล์ Middleware และ Module ที่ลงทะเบียน
-> build
-> Backend E2E ของ success path และ error/not-found path
-> runtime probe ถ้าต้องพิสูจน์ output หรือ bootstrap จริง
```

ถ้าต้องพิสูจน์ logging แบบอัตโนมัติ ให้เพิ่ม assertion เฉพาะต่อ logger/test double ไม่ใช้ route test ที่ตรวจเฉพาะ HTTP response เป็นตัวแทน

## จุดที่มักงง

- `response.on('finish', callback)` ลงทะเบียน callback ทันที แต่ callback ทำงานหลัง response จบ
- `next()` ไม่ได้รอ callback `finish`; มันส่ง request ไปขั้นถัดไป
- status code สุดท้ายควรอ่านเมื่อ response จบ ไม่รีบสรุปก่อน Controller หรือ error flow ทำงาน
- local variable ใน `use()` เกิดใหม่ต่อ request แม้ Middleware instance ถูกใช้ซ้ำ
- class ที่มี `use()` แต่ไม่ได้ลงทะเบียนกับ Module จะไม่ทำงาน
- `forRoutes('*')` กำหนดขอบเขต route ไม่ใช่คำสั่งเรียก Middleware ณ ตอน bootstrap
- E2E PASS พิสูจน์เฉพาะ assertion ที่เขียนไว้ ไม่ได้พิสูจน์ console log โดยอัตโนมัติ

## อ่านต่อ

- [Module](module.md)
- [Exception Filter](exception-filter.md)
- [Backend E2E Test ด้วย Jest และ Supertest](backend-e2e-test.md)
- [Dependency Injection](dependency-injection.md)

## เช็กตัวเอง

- ทำไมต้องลงทะเบียน `finish` callback ก่อนเรียก `next()`?
- ถ้า Middleware ไม่เรียก `next()` และไม่ส่ง response จะเกิดอะไรขึ้น?
- `startedAt` ของสอง request ถูกแชร์กันหรือไม่ เพราะอะไร?
- Middleware กับ Exception Filter อยู่คนละส่วนของ flow อย่างไร?
- ทำไม E2E ที่ผ่านและได้ status ถูกต้องยังไม่พอพิสูจน์ว่า `logger.log()` ถูกเรียก?

## จำสั้น ๆ

```text
Middleware = จุดทำงานระหว่างทางของ request
next() = ส่ง control ไปขั้นถัดไป
short-circuit = ตอบเองและไม่ส่งต่อ
finish callback = ทำงานเมื่อ response ส่งเสร็จ
Exception Filter = จัดการ exception ที่ตรงเงื่อนไข
E2E PASS = พิสูจน์เฉพาะสิ่งที่มี assertion
```
