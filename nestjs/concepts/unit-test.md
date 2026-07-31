# NestJS Unit Test ด้วย Jest

## ภาพจำ

ลองนึกว่าระบบเป็นเครื่องจักรที่ประกอบจากหลายชิ้น:

```text
Unit Test
= หยิบชิ้นส่วนหนึ่งออกมาตรวจโดยตรง

E2E Test
= เปิดเครื่องทั้งระบบแล้วทดลองจากทางเข้าที่ผู้ใช้เรียกจริง
```

ถ้าต้องการทดสอบ Service:

```text
test
-> เรียก Service method โดยตรง
-> ตรวจผลที่ method คืน
```

ไม่จำเป็นต้องเปิด HTTP server หรือส่ง request ผ่าน Router และ Controller

## ความหมายแบบคนธรรมดา

Unit Test คือ code ที่เรียกหน่วยเล็กซึ่งเราสนใจ แล้วเปรียบเทียบผลจริงกับผลที่คาดไว้

คำว่า **unit** ไม่ได้หมายถึงหนึ่งไฟล์เสมอไป แต่หมายถึงขอบเขตเล็กที่ตั้งใจแยกมาตรวจ

ตัวอย่าง:

```text
การกระทำ       = เรียก getStatus()
ผลที่คาดหวัง   = { status: 'ready' }
```

ถ้า method คืนค่าผิด test ควรล้มเหลวและชี้ให้เห็นความต่าง

## Technical Term

- **System Under Test (SUT)** คือ class หรือหน่วยหลักที่ test กำลังตรวจ
- **test case** คือกรณีทดสอบหนึ่งข้อ เช่น “ควรคืนสถานะ ready”
- **test suite** คือกลุ่มของ test cases; Jest รายงาน suite ระดับ test file
- **assertion** คือการยืนยันว่าผลจริงตรงกับผลที่คาด
- **matcher** คือวิธีเปรียบเทียบ เช่น `toBeDefined()`, `toBe()` และ `toEqual()`
- **regression** คือ behavior ที่เคยถูกแต่เสียหลังการเปลี่ยน code
- **mock** คือ dependency ตัวแทนที่ test ควบคุมคำตอบได้

## ไฟล์ `.spec.ts`

Nest CLI มักสร้าง test scaffold คู่กับ source:

```text
status.service.ts
status.service.spec.ts
```

ไฟล์ `.spec.ts` ไม่ถูกโหลดเป็นส่วนหนึ่งของ production application แต่ Jest ค้นหาและรันตาม test configuration

## ตัวอย่าง Service

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus(): { status: 'ready' } {
    return { status: 'ready' };
  }
}
```

behavior ที่ต้องการตรวจ:

```text
เรียก getStatus()
-> ต้องได้ { status: 'ready' }
```

## ตัวอย่าง Unit Test ด้วย Nest Testing Module

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should return a ready status', () => {
    const result = service.getStatus();

    expect(result).toEqual({ status: 'ready' });
  });
});
```

Test นี้สร้าง Nest testing environment ขนาดเล็กและเรียก Service โดยตรง ยังไม่ได้สร้าง HTTP application

## อ่านโครง Test ทีละส่วน

### `describe()`

```ts
describe('StatusService', () => {});
```

รวม test cases ที่เกี่ยวกับ `StatusService` และตั้งชื่อกลุ่มที่แสดงในผล Jest

### ตัวแปร SUT

```ts
let service: StatusService;
```

ประกาศตัวแปรสำหรับเก็บ reference ของ Service instance ที่เตรียมก่อนแต่ละ test

### `beforeEach()`

```ts
beforeEach(async () => {});
```

ทำ setup ใหม่ก่อน test case แต่ละข้อ:

```text
setup -> test A
setup -> test B
```

แม้ Jest รันด้วย `--runInBand` test แต่ละข้อยังมี `beforeEach()` ของตัวเอง Option นี้ไม่ได้ทำให้ทุก test ใช้ Service instance เดียวกัน

### `Test.createTestingModule()`

```ts
Test.createTestingModule({
  providers: [StatusService],
})
```

สร้างแบบร่างของ Nest Testing Module และลงทะเบียน `StatusService` กับ test DI container

### `.compile()`

```ts
await builder.compile();
```

ให้ Nest ประกอบ Testing Module, ตรวจ dependency และเตรียม providers `.compile()` คืน Promise จึงต้องใช้ `await` ภายใน callback ที่เป็น `async`

### `module.get()`

```ts
service = module.get<StatusService>(StatusService);
```

`StatusService` สองตำแหน่งทำคนละหน้าที่:

```text
<StatusService> = TypeScript Generic สำหรับตรวจ type ตอน compile
(StatusService) = runtime provider token ที่ Nest ใช้ค้นหา instance
```

ค่าที่ได้คือ reference ไปยัง instance ที่ test DI container จัดการ

## Arrange–Act–Assert

โครง test ที่อ่านง่ายแบ่งเป็นสามช่วง:

```text
Arrange = เตรียม SUT และ dependency
Act     = เรียก behavior ที่ต้องการตรวจ
Assert  = เปรียบเทียบผลจริงกับผลที่คาด
```

ในตัวอย่าง:

```ts
// Arrange อยู่ใน beforeEach()

// Act
const result = service.getStatus();

// Assert
expect(result).toEqual({ status: 'ready' });
```

ไม่จำเป็นต้องเขียน comment `Arrange`, `Act`, `Assert` ทุกครั้ง ถ้าโครง code แยกช่วงชัดเจนอยู่แล้ว

## Existence Test กับ Behavioral Test

Existence test:

```ts
expect(service).toBeDefined();
```

พิสูจน์ว่า Testing Module สร้าง Service instance ได้ แต่ยังไม่เรียก business method

Behavioral test:

```ts
const result = service.getStatus();

expect(result).toEqual({ status: 'ready' });
```

พิสูจน์ว่าเมื่อเรียก method จริง ผลลัพธ์ตรงกับ behavior ที่กำหนด

Service อาจถูกสร้างได้แม้ method คืนค่าผิด ดังนั้น `toBeDefined()` ไม่ทดแทน behavioral assertion

## Matcher ที่ใช้บ่อยในบทพื้นฐาน

### `toBeDefined()`

```ts
expect(service).toBeDefined();
```

ตรวจว่าค่าไม่ใช่ `undefined`

### `toBe()`

```ts
expect(result).toBe(5);
```

เหมาะกับ primitive value หรือกรณีที่ต้องการตรวจว่าเป็น reference เดียวกัน

### `toEqual()`

```ts
expect(result).toEqual({ status: 'ready' });
```

เปรียบเทียบข้อมูลและโครงสร้างภายใน object แม้ผลจริงและ object ที่คาดจะเป็นคนละ instance

```ts
const first = { status: 'ready' };
const second = { status: 'ready' };

expect(first).toBe(second);    // fail: คนละ reference
expect(first).toEqual(second); // pass: ข้อมูลภายในเท่ากัน
```

## อ่าน Jest Failure

เมื่อผลไม่ตรง Jest แสดง:

```text
expect(received).toEqual(expected)
```

```text
received = ผลจริงจาก production code
expected = ผลที่ test กำหนดว่าควรได้
```

ใน diff:

```text
- = ข้อมูลฝั่ง expected
+ = ข้อมูลฝั่ง received
```

test case เดียวล้มเหลวก็ทำให้ test suite และ command จบด้วย failure เพื่อหยุด CI ไม่ให้ปล่อยงานผ่านเงื่อนไขที่ผิด

## Red–Green และ Negative Control

การเปลี่ยน expectation ให้ผิดชั่วคราวแล้วรัน test เป็น negative control ที่ช่วยพิสูจน์ว่า test ตรวจจับความต่างได้:

```text
Red   = expectation ไม่ตรง แล้ว test ต้อง fail
Green = คืน expectation ที่ถูก แล้ว test ต้อง pass
```

การทดลอง Red–Green กับ code ที่มีอยู่แล้วไม่เท่ากับทำ Test-Driven Development เต็มรูปแบบ แต่ช่วยตรวจว่า test ไม่ได้ผ่านโดยไม่ตรวจ behavior

ต้องคืนค่าทดลองให้ถูกและรัน Green ซ้ำก่อนจบงานเสมอ

## Regression Safety มีขอบเขต

Test ช่วยเตือนเมื่อ behavior ที่เขียนตรวจไว้เสียในอนาคต:

```text
มี test ตรวจ status
-> จับ status ที่เปลี่ยนผิดได้

ไม่มี test ตรวจ HTTP route
-> Unit Test นี้รับประกัน route ไม่ได้
```

ผล:

```text
Test Suites: 2 passed
Tests:       3 passed
```

หมายถึง test files สองไฟล์และ test cases สามข้อที่มีอยู่ผ่านทั้งหมด ไม่ได้หมายความว่าระบบไม่มี bug หรือทุก behavior ถูกทดสอบแล้ว

## Unit Test, Integration Test และ E2E Test

```text
Unit Test
-> เรียกหน่วยเล็กโดยตรง
-> แยก dependency เมื่อจำเป็น

Integration Test
-> ตรวจหลายส่วนหรือระบบภายนอกทำงานร่วมกัน

Backend E2E Test
-> สร้าง application
-> ส่ง HTTP request
-> ผ่าน Router, Controller, Service และส่วนที่ผูกใน test application
```

ทั้งสามชนิดตอบคำถามต่างกันและไม่ทดแทนกัน

## SUT จริงกับ Mock Dependency

กฎสำคัญ:

```text
สิ่งที่กำลังทดสอบ = ใช้ implementation จริง
dependency ของมัน = พิจารณาใช้ mock เพื่อควบคุมขอบเขต
```

ถ้าทดสอบ `UsersService` ที่พึ่งพา `UsersRepository`:

```text
SUT        = UsersService จริง
dependency = UsersRepository mock
```

Test จึงตรวจ logic จริงของ Service โดยไม่ต้องต่อฐานข้อมูล

ถ้า mock `UsersService` แล้วตรวจค่าที่ mock ถูกตั้งให้คืน จะไม่ได้ทดสอบ production `UsersService`

ไม่ควรเพิ่ม mock เมื่อ SUT ยังไม่มี dependency เพราะเพิ่มความซับซ้อนโดยไม่มีขอบเขตให้แยก

## Testing Module ยังไม่ใช่ HTTP Application

```ts
Test.createTestingModule({...}).compile();
```

สร้าง test DI container แต่ยังไม่ได้เปิด HTTP application

E2E setup มักมีขั้นเพิ่ม:

```ts
const app = moduleFixture.createNestApplication();
await app.init();
```

และส่ง request ผ่าน HTTP test client

ดังนั้น Unit Test ของ Service ผ่านไม่ได้พิสูจน์ว่า route, Controller หรือ global configuration ใน `main.ts` ทำงานครบ

## จุดที่มักงง

- `describe()` จัดกลุ่ม แต่ `it()` หรือ `test()` จึงเป็น test case
- `beforeEach()` ทำ setup ก่อนแต่ละ test ไม่ใช่ครั้งเดียวต่อไฟล์
- `providers` ใน Testing Module ลงทะเบียน dependency สำหรับ test container
- `<Service>` ใน `module.get<Service>(Service)` เป็น compile-time Generic ส่วนค่าในวงเล็บเป็น runtime token
- `toBeDefined()` ตรวจการมี instance ไม่ได้ตรวจ business behavior
- `toEqual()` เปรียบเทียบข้อมูล object ส่วน `toBe()` สนใจ primitive หรือ identity
- `--runInBand` ควบคุมวิธีรัน Jest ไม่ได้เปลี่ยน lifecycle ของ `beforeEach()`
- Unit Test ผ่านไม่ได้รับประกัน HTTP, database หรือ behavior ที่ไม่มี assertion
- mock dependency ได้ แต่ไม่ควร mock SUT ที่ตั้งใจทดสอบ

## อ่านต่อ

- [Backend E2E Test ด้วย Jest และ Supertest](backend-e2e-test.md)
- [Service](service.md)
- [Dependency Injection](dependency-injection.md)
- [NestJS Commands](../commands.md)
- [Nest CLI และโครงสร้างโปรเจกต์](../nest-cli-project-structure.md)
- [Unit Test และ Regression Safety ฝั่ง Angular](../../angular/teach/unit-test-regression.md)
- [NestJS Testing — Official Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Jest Expect — Official Documentation](https://jestjs.io/docs/expect)

## เช็กตัวเอง

- Unit Test ของ Service ต่างจากการเรียก HTTP endpoint อย่างไร?
- Arrange, Act และ Assert อยู่ตรงไหนใน test?
- `toBeDefined()` กับ `toEqual()` พิสูจน์คนละเรื่องอย่างไร?
- `module.get<Service>(Service)` ใช้ชื่อ Service สองตำแหน่งทำไม?
- ผล `Tests: 3 passed` ยังไม่รับประกันอะไร?
- ถ้า Service พึ่ง Repository สิ่งใดควรเป็นของจริงและสิ่งใดควรเป็น mock?

## จำสั้น ๆ

```text
Unit Test = เรียกหน่วยเล็กโดยตรง
SUT       = สิ่งหลักที่กำลังทดสอบ
AAA       = Arrange -> Act -> Assert
received  = ผลจริง
expected  = ผลที่คาด
mock      = dependency ตัวแทนที่ควบคุมได้
regression = ของที่เคยถูกแต่เสียหลังเปลี่ยน code
```
