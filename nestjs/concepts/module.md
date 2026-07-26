# NestJS Module

## ภาพจำ

ลองนึกว่า backend เป็นบริษัทที่แบ่งเป็นแผนก:

```text
AppModule          = สำนักงานใหญ่ที่ประกอบทุกแผนก
HealthModule       = แผนกตรวจสุขภาพระบบ
UsersModule        = แผนกผู้ใช้
TranslationsModule = แผนกแปลภาษา
```

แต่ละแผนกรวบรวมคนและหน้าที่ของ feature เดียวกันไว้ด้วยกัน สำนักงานใหญ่จึงไม่ต้องเก็บรายชื่อพนักงานทุกคนจากทุกแผนกไว้เอง

## ความหมายแบบคนธรรมดา

Module คือขอบเขตที่บอก Nest ว่า feature นี้มี Controller, Service/Provider และ Module ที่พึ่งพาอะไรบ้าง

Module ไม่ควรทำ business logic เอง หน้าที่หลักคือประกาศสมาชิกและความสัมพันธ์

## Technical Term

- **root module** คือ Module จุดเริ่มต้นที่ `NestFactory.create()` ใช้สร้าง application
- **feature module** คือ Module ที่จัดกลุ่ม code ของ feature หรือ domain เดียวกัน
- **metadata** คือข้อมูลกำกับใน `@Module()` ที่บอก Nest ว่าต้องประกอบอะไร
- **application graph** คือแผนที่ Module และ Provider ที่ Nest เดินตามเพื่อสร้าง application
- **provider** คือสิ่งที่ลงทะเบียนกับ Dependency Injection container เพื่อให้ Nest สร้างและฉีดให้ผู้ใช้

## ตัวอย่างเล็กที่สุด

```ts
import { Module } from '@nestjs/common';

@Module({})
export class HealthModule {}
```

Module เปล่ายังไม่มี route หรือ business behavior แต่สร้างขอบเขตของ feature ไว้แล้ว

เมื่อนำไปประกอบใน root module:

```ts
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
```

## สี่ช่องสำคัญของ `@Module()`

```ts
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class ExampleModule {}
```

```text
imports     = Module อื่นที่ Module นี้ต้องใช้
controllers = Controller ที่รับ HTTP request ในขอบเขตนี้
providers   = Service, custom Repository หรือ provider ที่ Nest DI จัดการ
exports     = Provider ที่เปิดให้ Module อื่นซึ่ง import Module นี้นำไปใช้
```

หนึ่ง Module มี Controller และ Provider ได้หลายตัว:

```ts
@Module({
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
```

แต่สมาชิกควรอยู่ใน feature/domain เดียวกัน ถ้าหน้าที่เริ่มแยกชัดควรแยก Module

## TypeScript `import` กับ Nest `imports`

```ts
import { HealthModule } from './health/health.module';
```

TypeScript import ทำให้ไฟล์ปัจจุบันอ้างอิงชื่อ `HealthModule` ได้

```ts
@Module({
  imports: [HealthModule],
})
```

Nest imports metadata เพิ่ม `HealthModule` เข้า application graph

ต้องมีทั้งสองส่วน:

```text
มี TypeScript import อย่างเดียว = code รู้จัก class แต่ Nest ยังไม่โหลด Module
มี imports metadata อย่างเดียว  = compile ไม่ผ่านเพราะชื่อ class ไม่ได้ถูกนำเข้ามา
```

## Provider และ Constructor Injection

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

`providers: [UsersService]` ลงทะเบียนว่า Nest รู้วิธีสร้าง `UsersService`

Class ที่ต้องการใช้ยังต้องประกาศ dependency:

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
```

```text
providers   = ลงทะเบียน dependency
constructor = ขอให้ Nest inject dependency
```

การลงทะเบียนไม่ได้ทำให้ Nest เรียก method ของ Service อัตโนมัติ และไม่ได้ส่ง Service ให้ทุก class ที่ไม่ขอใช้

## ใช้ Provider ข้าม Module

Provider มองเห็นภายใน Module เจ้าของโดย default ถ้า Module อื่นต้องการใช้ ต้องทำสองฝั่ง:

```ts
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

```ts
@Module({
  imports: [UsersModule],
  providers: [ReportsService],
})
export class ReportsModule {}
```

```text
UsersModule   exports UsersService
ReportsModule imports UsersModule
ReportsService จึง inject UsersService ได้
```

## TypeScript `export class` กับ Nest `exports`

```ts
export class UsersModule {}
```

TypeScript export เปิดให้ไฟล์อื่น import class `UsersModule` ได้ แต่ไม่ได้เปิด Provider ภายในให้ Module อื่นใช้

```ts
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
```

Nest exports metadata เปิด `UsersService` ให้ Module ที่ import `UsersModule` ใช้ผ่าน DI

## Repository อยู่ช่องใด

Custom repository ที่เราเขียนเป็น provider เองอยู่ใน `providers`:

```ts
@Injectable()
export class UsersRepository {}

@Module({
  providers: [UsersRepository],
})
export class UsersModule {}
```

Repository ที่ ORM integration สร้างให้อาจลงทะเบียนผ่าน configured Module ตัวอย่าง TypeORM:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
```

สิ่งที่อยู่ใน `imports` คือ configured `TypeOrmModule` ไม่ใช่การนำ `Repository<User>` ไปใส่ใน imports โดยตรง โดย Module นี้จะสร้าง repository provider ตาม Entity และ database connection ให้ภายใน scope

syntax ส่วนนี้ควรเรียนพร้อมบทเชื่อม database ไม่จำเป็นต้องจำในบท Module เบื้องต้น

## จุดที่มักงง

- Module ถูกโหลดแล้วไม่ได้แปลว่ามี endpoint ต้องมี Controller ที่ลงทะเบียน route ก่อน
- Controller ต้องอยู่ใน `controllers` ไม่ใช่ `providers`
- Service และ custom repository มักอยู่ใน `providers`
- `export class` ของ TypeScript ไม่ใช่ `exports` metadata ของ Nest
- Feature module ไม่ควร import root `AppModule` กลับเข้าไป
- `AppModule` ควรประกอบ feature modules ส่วน Controller/Service ของ feature ควรอยู่ใน Module เจ้าของ

## อ่านต่อ

- [Dependency Injection](dependency-injection.md)
- [NestJS Commands](../commands.md)
- [Nest CLI และโครงสร้างโปรเจกต์](../nest-cli-project-structure.md)
- [NestJS Modules — Official Documentation](https://docs.nestjs.com/modules)
- [NestJS Custom Providers — Official Documentation](https://docs.nestjs.com/fundamentals/custom-providers)

## เช็กตัวเอง

- `imports`, `controllers`, `providers`, `exports` ต่างกันอย่างไร?
- TypeScript import กับ Nest imports metadata ทำคนละหน้าที่อย่างไร?
- ถ้า ReportsModule ต้องใช้ UsersService ต้องเพิ่มอะไรใน UsersModule และ ReportsModule?
- เหตุใด `export class UsersModule` อย่างเดียวจึงยังไม่เปิด UsersService ให้ Module อื่น?

## จำสั้น ๆ

```text
Module      = ขอบเขตและแผนที่ของ feature
providers   = ลงทะเบียนสิ่งที่ Nest DI สร้าง
constructor = ขอใช้ dependency
exports     = เจ้าของเปิด Provider
imports     = ผู้ใช้นำ Module เจ้าของเข้ามา
```
