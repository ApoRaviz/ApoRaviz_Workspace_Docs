# NestJS Service

## ภาพจำ

ลองนึกถึงร้านอาหาร:

```text
Controller = พนักงานรับออเดอร์
Service    = คนในครัวที่ทำงานตามสูตรและกติกาของร้าน
Repository = คนที่ไปหยิบหรือเก็บวัตถุดิบในคลังข้อมูล
```

พนักงานรับออเดอร์ไม่ควรทิ้งหน้าร้านไปทำอาหาร ตรวจคลัง และคิดราคาทั้งหมดเอง เช่นเดียวกับ Controller ที่ไม่ควรเก็บ business logic ยาว ๆ ไว้ใน route handler

## ความหมายแบบคนธรรมดา

Service คือ class ที่รวมงานหรือกฎของระบบซึ่งไม่ควรผูกติดกับการรับ HTTP request โดยตรง

ตัวอย่างงานที่เหมาะกับ Service:

- ตรวจเงื่อนไขทางธุรกิจ
- คำนวณหรือประกอบผลลัพธ์
- เรียก Repository หรือระบบภายนอก
- รวมหลายขั้นตอนให้ Controller เรียกด้วย method เดียว
- เปิดให้ Controller หรือ Provider อื่นนำ logic เดิมกลับมาใช้

## Technical Term

- **Service** คือ Provider ที่รวม application/business logic ของเรื่องหนึ่ง
- **business logic** คือกฎว่าระบบต้องตัดสินใจหรือทำงานอย่างไร
- **Provider** คือสิ่งที่ลงทะเบียนกับ Nest Dependency Injection container
- **Dependency Injection (DI)** คือการที่ class ขอ dependency แล้ว Nest สร้างและส่ง instance มาให้
- **thin Controller** คือ Controller ที่เน้นงานขอบ HTTP แล้วส่งงานหลักให้ Service

## ตัวอย่างเล็กที่สุด

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
```

```text
@Injectable()       = ให้ Nest จัดการ class นี้ผ่าน DI ได้
HealthService      = Service ของ feature
getHealth()        = method ที่ผู้ใช้ Service เรียก
return {...}       = logic ที่ย้ายออกจาก Controller
```

`@Injectable()` ไม่ได้ทำให้ Service ถูกโหลดเข้า application โดยลำพัง ยังต้องลงทะเบียนกับ Module

## ลงทะเบียน Service ใน Module

```ts
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
```

ภาพจำ:

```text
providers: [HealthService]
= ลงทะเบียนของไว้ในคลัง DI ของ Module
```

ถ้า Service ใช้ภายใน Module เดียว ไม่จำเป็นต้องใส่ `exports` แต่ถ้า Module อื่นต้องใช้ จึงค่อยเปิดผ่าน `exports` ตามกติกา provider visibility

## Controller ขอ Service ผ่าน Constructor

```ts
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): { status: 'ok' } {
    return this.healthService.getHealth();
  }
}
```

มีสองขั้นที่ต้องแยกให้ออก:

```text
Module providers = ลงทะเบียนว่า Nest สร้าง HealthService ได้
constructor      = Controller ขอ instance ของ HealthService
```

constructor ไม่ได้เรียก `getHealth()` อัตโนมัติ Controller ยังต้องเรียก method ที่ต้องการเอง:

```ts
return this.healthService.getHealth();
```

## Flow หลังแยก Service

```text
1. client ส่ง GET /health
2. HealthController รับ request
3. Controller เรียก HealthService.getHealth()
4. Service ทำ logic และคืน { status: 'ok' }
5. Controller คืนผลให้ Nest
6. Nest ส่ง HTTP 200 + JSON กลับ client
```

ก่อนและหลังแยก Service ควรได้ API behavior เดิม:

```text
ก่อน refactor: Controller -> result
หลัง refactor: Controller -> Service -> result
ภายนอก:        GET /health -> 200 {"status":"ok"}
```

การเปลี่ยนโครงสร้างภายในโดยรักษา behavior ภายนอกไว้เรียกว่า **refactor**

## Service ต่างจาก Controller อย่างไร

```text
Controller = HTTP method, path, request, response
Service    = กฎและขั้นตอนการทำงานของระบบ
```

ตัวอย่าง register:

```text
Controller
-> รับ email/password จาก request
-> เรียก RegistrationService
-> ส่งผลกลับ

Service
-> normalize email
-> ตรวจ email ซ้ำผ่าน Repository
-> hash password
-> สร้าง user
```

การตรวจรูปแบบ input เบื้องต้นอาจเกิดในชั้น validation ก่อนเข้า business logic ส่วนการตรวจ business rule เช่น email ซ้ำใน database เป็นงานที่ Service ประสานกับ Repository

Service โดยทั่วไปไม่ควรรับ Express `Request`/`Response` โดยตรง เพราะจะผูก business logic เข้ากับรายละเอียดของ HTTP framework และนำกลับไปใช้หรือทดสอบแยกได้ยากขึ้น

## ทำไม Test ของ Controller อาจพังหลังเพิ่ม Service

Nest Testing Module เป็น Module แยกขนาดเล็ก ไม่ได้นำ provider จาก application Module เข้ามาให้อัตโนมัติ

ถ้า Controller ขอ Service:

```ts
constructor(private readonly healthService: HealthService) {}
```

แต่ test ลงทะเบียนแค่ Controller:

```ts
Test.createTestingModule({
  controllers: [HealthController],
});
```

ตอน `.compile()` Nest จะรายงานประมาณนี้:

```text
Nest can't resolve dependencies of the HealthController (?).
HealthService at index [0] is not available in RootTestModule.
```

`index [0]` หมายถึง constructor parameter ตัวแรก

วิธีขั้นต่ำเพื่อให้ Testing Module รู้จัก dependency:

```ts
Test.createTestingModule({
  controllers: [HealthController],
  providers: [HealthService],
});
```

บท Unit Test จะเรียนต่อว่าเมื่อใดควรใช้ Service จริง และเมื่อใดควรใช้ mock (ตัวแทนจำลอง) เพื่อแยก Controller ออกจาก Service

## Service กับ Repository ต่างกันอย่างไร

```text
Service    = ตัดสินใจตามกฎและเรียงลำดับงาน
Repository = อ่าน/เขียนข้อมูลกับแหล่งเก็บข้อมูล
```

ตัวอย่าง:

```text
UsersService
-> ถาม UsersRepository ว่า email มีแล้วหรือยัง
-> ถ้ามี ตัดสินใจไม่ให้สมัคร
-> ถ้ายังไม่มี สั่งสร้าง user
```

Service ไม่จำเป็นต้องเขียน query database ทั้งหมดเอง เมื่อถึงบท database integration จะค่อยแยก Repository/ORM provider ให้ชัดขึ้น

## จุดที่มักงง

- `@Injectable()` ทำให้ Nest จัดการ class ผ่าน DI ได้ แต่ยังต้องลงทะเบียนใน `providers`
- `providers` ไม่ได้เรียก method ของ Service อัตโนมัติ
- constructor injection คือการขอ instance ไม่ใช่การเรียก business method
- Service ไม่ใช่ที่รับ route จึงไม่อยู่ใน `controllers`
- Controller กับ Service อยู่ Module เดียวกัน ใช้กันได้โดยไม่ต้อง `exports`
- Testing Module แยกจาก application Module จึงต้องลงทะเบียน dependency ของ test เอง
- Service ไม่ใช่ Repository: Service ตัดสินใจ ส่วน Repository ติดต่อข้อมูล

## อ่านต่อ

- [Controller](controller.md)
- [Module](module.md)
- [NestJS Commands](../commands.md)
- [NestJS Providers — Official Documentation](https://docs.nestjs.com/providers)

## เช็กตัวเอง

- เพราะเหตุใด Service อยู่ใน `providers` แต่ Controller อยู่ใน `controllers`?
- `@Injectable()` กับ `providers: [Service]` ทำหน้าที่ต่างกันอย่างไร?
- constructor injection ทำอะไร และยังไม่ได้ทำอะไร?
- ถ้า Controller test ขอ Service แต่ Testing Module ไม่มี provider จะเกิดอะไรขึ้น?
- การตรวจ email ซ้ำใน database ควรอยู่ Controller หรือ Service เพราะอะไร?

## จำสั้น ๆ

```text
Controller  = รับ HTTP แล้วส่งงานต่อ
Service     = ทำกฎและขั้นตอนของระบบ
providers   = ลงทะเบียน Service กับ DI
constructor = ขอ instance มาใช้
refactor    = เปลี่ยนภายใน แต่ behavior ภายนอกเหมือนเดิม
```
