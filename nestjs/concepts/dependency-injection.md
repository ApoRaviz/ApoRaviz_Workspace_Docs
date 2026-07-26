# NestJS Dependency Injection

## ภาพจำ

ลองนึกว่าแต่ละ Module เป็นห้องทำงาน และ Nest เป็นผู้ดูแลคลังอุปกรณ์:

```text
providers  = รายการอุปกรณ์ที่ผู้ดูแลคลังต้องเตรียม
constructor = จุดที่ class แจ้งว่าต้องการอุปกรณ์อะไร
Nest DI container = ผู้สร้าง เก็บ และส่งอุปกรณ์ให้
```

Controller หรือ Service จึงไม่ต้องสร้าง dependency ด้วย `new` เอง

## ความหมายแบบคนธรรมดา

Dependency คือ object ที่ class หนึ่งต้องใช้เพื่อทำงาน ส่วน Dependency Injection (DI) คือการรับ object นั้นจากภายนอก แทนที่จะสร้างเองภายใน class

```ts
// สร้าง dependency เอง
export class UsersController {
  private readonly usersService = new UsersService();
}
```

เมื่อใช้ DI:

```ts
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
```

`UsersController` แค่ประกาศว่าต้องการ `UsersService` ส่วน Nest รับผิดชอบการสร้างและส่ง instance ให้

## Technical Term

- **dependency** คือ object ที่ class ต้องใช้
- **injection** คือการส่ง dependency จากภายนอกเข้าไปให้ class
- **DI container** คือระบบของ Nest ที่ลงทะเบียน สร้าง เก็บ และส่ง provider instance
- **provider** คือสิ่งที่ลงทะเบียนให้ DI container จัดการ
- **token** คือกุญแจที่ Nest ใช้ค้นหา provider
- **instance** คือ object ที่ถูกสร้างจาก class
- **reference** คือค่าที่ชี้ไปยัง instance
- **dependency graph** คือแผนผังว่า class ใดพึ่งพา class ใด

## Class, Instance และ Reference

```ts
const first = new UsersService();
const second = first;
const third = new UsersService();
```

```text
UsersService = class หรือแบบพิมพ์เขียว
first        = reference ไปยัง instance ตัวที่ 1
second       = reference ไปยัง instance ตัวเดียวกับ first
third        = reference ไปยัง instance ตัวที่ 2
```

มีสอง instance เพราะมี `new UsersService()` สองครั้ง

ใน constructor shorthand:

```ts
constructor(private readonly usersService: UsersService) {}
```

แยกความหมายได้ดังนี้:

```text
usersService       = parameter/property ที่รับ reference
UsersService       = type และ class token
ค่าที่ Nest ส่งมา = UsersService instance
```

รูปแบบย่อข้างต้นใกล้เคียงกับ:

```ts
private readonly usersService: UsersService;

constructor(usersService: UsersService) {
  this.usersService = usersService;
}
```

## Flow พื้นฐาน

Module ลงทะเบียน provider:

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

Controller ขอ dependency:

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
```

Nest ทำงานตามแนวคิดนี้:

```text
1. อ่าน providers ของ Module
2. ลงทะเบียน UsersService ใน DI container
3. อ่าน constructor ของ UsersController
4. พบว่า constructor ต้องการ UsersService
5. ค้นหาด้วย token UsersService
6. สร้างหรือเลือก UsersService instance
7. ส่ง reference เข้า constructor
```

ภายในระบบจึงใกล้เคียงกับ:

```ts
const usersService = new UsersService();
const usersController = new UsersController(usersService);
```

แต่ Nest เป็นผู้จัดการการสร้างและเชื่อม object เหล่านี้

## TypeScript `import` ไม่เท่ากับ Nest `providers`

```ts
import { UsersService } from './users.service';
```

TypeScript import ทำให้ไฟล์อ้างอิงชื่อ `UsersService` ได้

```ts
@Module({
  providers: [UsersService],
})
```

Nest providers ลงทะเบียน `UsersService` กับ DI container

```text
มี import แต่ไม่มี providers = TypeScript รู้จัก class แต่ Nest ไม่มี provider ให้ฉีด
มี providers แต่ไม่มี import  = ไฟล์อ้างชื่อ class ไม่ได้และ compile ไม่ผ่าน
```

## `@Injectable()` ทำอะไร

```ts
@Injectable()
export class UsersService {}
```

`@Injectable()` ทำเครื่องหมายว่า class นี้ให้ Nest จัดการผ่าน DI ได้ และช่วยให้ TypeScript สร้าง metadata ของ constructor dependency ที่ Nest ต้องอ่าน

การมี `@Injectable()` อย่างเดียวยังไม่พอ ต้องลงทะเบียน Service ใน `providers` ของ Module หรือได้รับผ่าน Module ที่ import เข้ามาด้วย

## Metadata และ `design:paramtypes`

เมื่อเปิด decorator metadata ใน `tsconfig.json`:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

TypeScript สามารถสร้างข้อมูลกำกับประมาณนี้:

```js
__metadata("design:paramtypes", [UsersService])
```

ความหมายคือ constructor รับ parameter ชนิด `UsersService` หนึ่งตัว Nest ใช้ข้อมูลนี้ค้นหา provider token

ถ้า method ไม่มี parameter:

```ts
getUsers() {}
```

metadata ของ method อาจเป็น:

```js
__metadata("design:paramtypes", [])
```

บรรทัดนี้เป็นเพียงข้อมูลว่า method ไม่มี parameter ไม่ใช่การเรียก method

ลำดับบรรทัด metadata ใน JavaScript ที่ compile แล้วไม่ใช่ลำดับการทำงานของ request ลำดับ runtime โดยทั่วไปคือ:

```text
โหลด class และติด metadata
-> Nest สร้าง dependency graph
-> Nest สร้าง Service
-> Nest เรียก constructor ของ Controller
-> application พร้อมรับ request
-> มี request แล้วจึงเรียก route method
```

## Constructor Index ใน Error

index เริ่มนับจาก `0`:

```ts
constructor(
  private readonly usersRepository: UsersRepository, // index [0]
  private readonly passwordService: PasswordService, // index [1]
) {}
```

ถ้าไม่มี `PasswordService` Nest จะชี้ไปที่ `index [1]`

ถ้ามี parameter เดียว:

```ts
constructor(private readonly passwordService: PasswordService) {}
```

ตัวนี้อยู่ที่ `index [0]`

## หนึ่ง Module มีหลาย Service ได้

```ts
@Injectable()
export class PasswordService {
  verify(password: string): boolean {
    return password.length >= 8;
  }
}
```

```ts
@Injectable()
export class UsersService {
  constructor(private readonly passwordService: PasswordService) {}

  register(password: string): string {
    return this.passwordService.verify(password)
      ? 'register'
      : 'reject';
  }
}
```

ลงทะเบียนทั้งสอง Service:

```ts
@Module({
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
```

dependency graph คือ:

```text
UsersService
└── PasswordService
```

ถ้า Controller เรียกเฉพาะ `UsersService` ไม่จำเป็นต้องฉีด `PasswordService` เข้า Controller ซ้ำ:

```text
UsersController
└── UsersService
    └── PasswordService
```

หลักจำง่ายคือ class ใดเรียกใช้ dependency โดยตรง class นั้นรับ dependency ผ่าน constructor

## Provider Scope เบื้องต้น

Provider ปกติของ Nest ใช้ default scope แบบ singleton ภายใน application context:

```text
UsersController ─┐
                 ├─> UsersService instance เดียวกัน
AdminController ─┘
```

Singleton หมายถึง Nest นำ instance เดิมกลับมาใช้ ไม่ได้หมายความว่า method parameter ของทุก request จะกลายเป็นค่าเดียวกัน

```ts
getProfile(userId: string) {
  // userId เป็นค่าของการเรียก method ครั้งนี้
}
```

แต่ mutable property ที่เก็บบน singleton Service อาจถูกใช้ร่วมกันระหว่างหลาย request จึงไม่ควรเก็บ request-specific state ไว้บน Service โดยไม่ตั้งใจ

Nest ยังมี request และ transient scope แต่ควรเรียนเมื่อมี use case จริง เพราะเปลี่ยน lifecycle และต้นทุนการสร้าง instance

## ใช้ Provider ข้าม Module

Provider มองเห็นภายใน Module เจ้าของโดย default ถ้า Module อื่นต้องใช้ ต้องเปิดและเชื่อมสองฝั่ง:

```ts
@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class SecurityModule {}
```

```ts
@Module({
  imports: [SecurityModule],
  providers: [UsersService],
})
export class UsersModule {}
```

```text
providers   = เจ้าของลงทะเบียนและดูแล instance
exports     = เจ้าของเปิด provider ให้ Module อื่น
imports     = Module ผู้ใช้เชื่อม Module เจ้าของ
constructor = class ผู้ใช้ประกาศว่าต้องการและรับ instance
```

## จุดที่มักงง

- `providers` ทำให้ Nest จัดการ instance ไม่ได้ทำให้ทุก class มี property ของ Service ขึ้นมาเอง
- constructor injection คือการรับ reference ไม่ใช่การเรียก business method
- TypeScript import ทำให้ไฟล์รู้จักชื่อ แต่ไม่ได้ลงทะเบียน provider
- Nest `imports` รับทั้ง Module ไม่ใช่นำ Service ไปใส่โดยตรง
- `exports` เปิด provider ไม่ได้ส่ง instance เข้า class ที่ไม่ได้ขอ
- ลำดับ metadata ใน compiled JavaScript ไม่ใช่ลำดับที่ route ทำงาน
- default singleton ใช้ instance ร่วมกัน แต่ method parameter/local variable ยังเป็นค่าของแต่ละการเรียก
- ถ้า constructor มี dependency หลายชั้น Nest จะสร้างตาม dependency graph

การสลับ implementation และการใช้ token ที่ไม่ใช่ class เป็น DI ขั้นต่อไป ควรเรียนเมื่อมี use case จริง

## อ่านต่อ

- [Module](module.md)
- [Controller](controller.md)
- [Service](service.md)
- [NestJS Providers — Official Documentation](https://docs.nestjs.com/providers)
- [NestJS Injection Scopes — Official Documentation](https://docs.nestjs.com/fundamentals/injection-scopes)

## เช็กตัวเอง

- ใครเป็นผู้เรียก `new Service()` เมื่อใช้ Nest DI?
- `providers` กับ constructor injection ทำหน้าที่ต่างกันอย่างไร?
- ทำไม TypeScript import อย่างเดียวจึงยังฉีด Service ไม่ได้?
- metadata `design:paramtypes` ช่วย Nest อย่างไร?
- ถ้า constructor dependency ตัวที่สองหาย error จะชี้ index ใด?
- ถ้า Service อยู่คนละ Module เจ้าของและผู้ใช้ต้องเพิ่มอะไรบ้าง?

## จำสั้น ๆ

```text
provider    = สิ่งที่ลงทะเบียนให้ Nest จัดการ
DI container = ผู้สร้าง เก็บ และส่ง instance
constructor = ประกาศว่าต้องการและรับ dependency
token       = กุญแจที่ Nest ใช้ค้นหา provider
instance    = object ที่สร้างจาก class
reference   = ค่าที่ชี้ไปยัง instance
exports     = เจ้าของเปิด provider
imports     = ผู้ใช้เชื่อม Module เจ้าของ
```
