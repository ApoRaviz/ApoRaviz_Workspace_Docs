# NestJS Controller

## ภาพจำ

ลองนึกว่า backend เป็นอาคารสำนักงาน:

```text
HTTP request = ผู้มาติดต่อ
Controller   = เจ้าหน้าที่หน้าห้องที่ดูป้าย method + path
Service      = แผนกที่ทำงานตามกฎของระบบ
HTTP response = คำตอบที่ส่งกลับผู้มาติดต่อ
```

Controller รับ request ที่ตรงกับ route ของตัวเอง แล้วส่งต่อให้ method ที่รับผิดชอบ

## ความหมายแบบคนธรรมดา

Controller คือ class ที่ประกาศว่า backend รองรับ HTTP request แบบใดบ้าง เช่น:

```text
GET /health
POST /users
```

NestJS จับคู่ route จาก **HTTP method และ path พร้อมกัน** ไม่ได้ดู path อย่างเดียว

## Technical Term

- **Controller** คือ class ที่รับ HTTP request และเลือก handler
- **route** คือคู่ของ HTTP method กับ path เช่น `GET /health`
- **handler** คือ method ใน Controller ที่ทำงานเมื่อ route ตรงกัน
- **decorator** คือ syntax ที่ขึ้นต้นด้วย `@` ซึ่งให้ metadata แก่ NestJS
- **serialization** คือการแปลงค่าที่ handler คืนมาเป็นรูปแบบ response เช่น JSON

## ตัวอย่างเล็กที่สุด

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
```

แปลทีละส่วน:

```text
@Controller('health') = path ระดับ Controller คือ /health
@Get()                = รับ HTTP GET ที่ path ระดับนี้
getHealth()           = handler ที่ NestJS เรียก
{ status: 'ok' }      = object ที่ NestJS ส่งกลับเป็น JSON
```

route ที่ได้คือ:

```text
GET /health
```

## Controller Path กับ Handler Path รวมกันอย่างไร

ถ้า handler มี path เพิ่ม:

```ts
@Controller('health')
export class HealthController {
  @Get('ready')
  getReadiness(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
```

NestJS จะประกอบ path:

```text
Controller path /health
+ Handler path   /ready
= GET /health/ready
```

## Flow ตอน Request เข้ามา

```text
1. client ส่ง GET /health
2. HTTP server ส่ง request เข้า NestJS router
3. router หา route ที่ method และ path ตรงกัน
4. NestJS เรียก HealthController.getHealth()
5. handler คืน object { status: 'ok' }
6. NestJS serialize object เป็น JSON
7. client ได้ HTTP 200 + {"status":"ok"}
```

สำหรับ `@Get()` ที่ทำงานสำเร็จ NestJS ใช้ status `200 OK` เป็นค่าเริ่มต้น

## ต้องลงทะเบียน Controller ใน Module

การสร้าง class อย่างเดียวยังไม่ทำให้ NestJS โหลด route ต้องเพิ่ม Controller ใน Module เจ้าของ:

```ts
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
```

```text
TypeScript import                 = ไฟล์รู้จักชื่อ HealthController
controllers: [HealthController]  = NestJS โหลด Controller เข้า application graph
```

## ทำไม POST Path เดียวกันจึงอาจเป็น 404

ถ้ามีเฉพาะ:

```ts
@Get()
getHealth() {}
```

ผลคือ:

```text
GET  /health = มี handler -> ทำงาน
POST /health = ไม่มี handler -> 404 Not Found
```

method เป็นส่วนหนึ่งของ route จึงไม่สามารถใช้ `GET` กับ `POST` แทนกันได้

## Return Type บังคับอะไร

```ts
getHealth(): { status: 'ok' }
```

ส่วนหลัง `:` คือ TypeScript return type บอก compiler ว่า method นี้ต้องคืน object ที่มี:

```text
property status
ค่าต้องเป็น string literal 'ok'
```

นี่เป็นการตรวจตอนเขียนหรือ compile ไม่ใช่ runtime validation และไม่ได้เป็นตัวกำหนด HTTP status code

## Controller ควรบาง

Controller เหมาะกับงานขอบ HTTP เช่น:

- รับ request
- อ่าน parameter/body
- เรียก Service
- คืน response

เมื่อมี business logic ควรย้ายไป Service เพื่อให้ Controller ไม่รับหลายหน้าที่เกินไป:

```text
Controller = รับและส่งต่อ
Service    = ทำกฎของระบบ
```

ถ้า endpoint เล็กมาก เช่น health check ที่คืนค่าคงที่ อาจยังไม่ต้องมี Service จนกว่าจะมี logic จริง

## ลบ Route ตัวอย่างเมื่อไม่อยู่ใน Contract

Nest CLI scaffold อาจมี `AppController` ที่สร้าง `GET /` ตัวอย่างไว้ ถ้า API contract ไม่ได้ต้องการ route นี้และไม่มีผู้ใช้จริง ควรถอด Controller, Service และ test ตัวอย่างที่เกี่ยวข้องออก

การเก็บ endpoint ที่ไม่มีหน้าที่ทำให้คนอ่าน code เข้าใจผิดและเพิ่ม surface ที่ต้องดูแล

## จุดที่มักงง

- route คือ method + path ไม่ใช่ path อย่างเดียว
- `@Controller('health')` อย่างเดียวยังไม่มี handler ต้องมี `@Get()`, `@Post()` หรือ decorator ของ method อื่น
- สร้าง Controller แล้วต้องลงทะเบียนใน `controllers` ของ Module
- object ที่ return ถูกแปลงเป็น JSON แต่ return type ไม่ใช่ runtime validation
- `404` อาจหมายถึงไม่มีคู่ method + path ที่ตรง แม้ path ดูเหมือนมีอยู่
- Controller ไม่ควรเก็บ business logic ยาว ๆ เมื่อมี Service รับผิดชอบได้

## อ่านต่อ

- [Module](module.md)
- [NestJS Commands](../commands.md)
- [NestJS Controllers — Official Documentation](https://docs.nestjs.com/controllers)

## เช็กตัวเอง

- `@Controller('health')` กับ `@Get('ready')` รวมเป็น route ใด?
- เพราะเหตุใด `GET /health` อาจสำเร็จ แต่ `POST /health` ตอบ 404?
- TypeScript return type ต่างจาก HTTP status code อย่างไร?
- เหตุใด Controller ต้องอยู่ใน `controllers` ของ Module?

## จำสั้น ๆ

```text
Controller = ประตูรับ HTTP request
route      = method + path
handler    = method ที่ทำงานเมื่อ route ตรง
Module     = ลงทะเบียน Controller ให้ NestJS โหลด
```
