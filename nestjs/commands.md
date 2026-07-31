# NestJS Commands

หน้านี้รวมคำสั่ง NestJS ที่เรียนและตรวจผลแล้ว โดยเพิ่มทีละคำสั่งตามบทเรียน ไม่รวบคำสั่งที่ยังไม่เคยใช้งานมาให้จำพร้อมกัน

## หลักก่อนรันคำสั่ง

```text
สร้าง project ใหม่      = รันจากโฟลเดอร์แม่ที่ต้องการให้ project ไปอยู่
generate ส่วนประกอบ     = รันจาก root ของ NestJS project ที่มี nest-cli.json
ไม่แน่ใจว่าแก้อะไรบ้าง = ใช้ --dry-run ก่อน
```

ถ้า Nest CLI อยู่ใน `devDependencies` ของ project แล้ว `npx nest` จะเลือก binary จาก `node_modules` ของ project ก่อน จึงไม่จำเป็นต้องติดตั้ง CLI แบบ global

ตรวจ version ของ Nest CLI ที่ project ปัจจุบันใช้:

```bash
npx nest --version
```

## สร้าง NestJS Project

ดูผลล่วงหน้าโดยยังไม่เขียนไฟล์:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git --dry-run
```

สร้างจริง:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git
```

option ที่ใช้:

```text
--package-manager npm = ใช้ npm และไม่ถามซ้ำ
--strict              = เปิด TypeScript strict settings
--skip-git            = ไม่สร้าง Git repository ซ้อน
--dry-run             = แสดงสิ่งที่จะเปลี่ยน แต่ยังไม่เขียนไฟล์
```

อ่าน flow และ File Map: [Nest CLI และโครงสร้างโปรเจกต์](nest-cli-project-structure.md)

## สร้าง Module

ดูผลล่วงหน้า:

```bash
npx nest generate module health --dry-run
```

สร้างจริง:

```bash
npx nest generate module health
```

รูปแบบทั่วไป:

```text
npx nest generate module [[ชื่อ feature]]
```

ผลที่คาด:

```text
CREATE src/health/health.module.ts
UPDATE src/app.module.ts
```

CLI จะสร้าง feature module และเพิ่ม module นั้นเข้า `imports` ของ module แม่ที่เหมาะสม แต่ยังต้องอ่าน diff ทุกครั้งว่า CLI update ไฟล์ใดจริง

คำสั่งแบบย่อมีอยู่ แต่ช่วงเรียนพื้นฐานใช้ชื่อเต็ม `generate module` ก่อนเพื่อให้อ่านแล้วรู้หน้าที่ทันที

## สร้าง Controller

ดูผลล่วงหน้า:

```bash
npx nest generate controller health --dry-run
```

สร้างจริง:

```bash
npx nest generate controller health
```

รูปแบบทั่วไป:

```text
npx nest generate controller [[ชื่อ feature]]
```

ผลที่คาด:

```text
CREATE src/health/health.controller.ts
CREATE src/health/health.controller.spec.ts
UPDATE src/health/health.module.ts
```

CLI สร้าง Controller กับ unit test เริ่มต้น และเพิ่ม Controller เข้า `controllers` ของ Module ที่เกี่ยวข้อง แต่ยังไม่สร้าง route handler ให้ ต้องเพิ่ม `@Get()`, `@Post()` หรือ HTTP method อื่นตาม API contract เอง

อ่าน concept: [Controller](concepts/controller.md)

## สร้าง Service

ดูผลล่วงหน้า:

```bash
npx nest generate service health --dry-run
```

สร้างจริง:

```bash
npx nest generate service health
```

รูปแบบทั่วไป:

```text
npx nest generate service [[ชื่อ feature]]
```

ผลที่คาด:

```text
CREATE src/health/health.service.ts
CREATE src/health/health.service.spec.ts
UPDATE src/health/health.module.ts
```

CLI สร้าง Service ที่มี `@Injectable()` กับ unit test เริ่มต้น และเพิ่ม Service เข้า `providers` ของ Module ที่เกี่ยวข้อง แต่ยังไม่เพิ่ม business method หรือทำให้ Controller เรียก Service อัตโนมัติ

อ่าน concept: [Service](concepts/service.md)

## สร้าง Exception Filter

ดูผลล่วงหน้าโดยยังไม่เขียนไฟล์:

```bash
npx nest generate filter common/filters/http-exception --no-spec --flat --dry-run
```

สร้างจริง:

```bash
npx nest generate filter common/filters/http-exception --no-spec --flat
```

option ที่ใช้:

```text
--no-spec = ไม่สร้างไฟล์ test จาก generator
--flat    = สร้างไฟล์ตรงใน path ที่ระบุ ไม่สร้างโฟลเดอร์ชื่อ artifact ซ้อน
--dry-run = แสดงไฟล์ที่จะเปลี่ยนโดยยังไม่เขียนจริง
```

ผลที่คาด:

```text
CREATE src/common/filters/http-exception.filter.ts
```

คำว่า `filter` หลัง `generate` คือชนิด artifact หรือ schematic ที่ Nest CLI ใช้เลือก template ไม่ใช่คำสั่งค้นหา ถ้าไม่ระบุชนิด artifact CLI จะไม่รู้ว่าต้องสร้างโครงแบบ Module, Controller, Service หรือ Filter

CLI สร้างโครง `@Catch()` และ `implements ExceptionFilter` ให้ตามชนิด artifact และใช้ชื่อท้ายไฟล์ `.filter.ts` จาก schematic ส่วน exception ที่ต้องจับ, response shape และจุดลงทะเบียนยังต้องออกแบบและเพิ่มเอง

อ่าน concept: [Exception Filter](concepts/exception-filter.md)

## รัน Unit Test ด้วย Jest

รัน test file ที่ได้รับผลกระทบโดยตรง:

```bash
npm test -- status.service.spec.ts --runInBand
```

รัน unit test ทั้งชุด:

```bash
npm test -- --runInBand
```

ความหมาย:

```text
npm test              = เรียก script test ซึ่งรัน Jest
--                    = ตัวคั่นของ npm ส่ง argument หลังจากนี้ต่อให้ Jest
status.service.spec.ts = pattern เลือก test file ที่ต้องการ
--runInBand           = รัน test ต่อกันใน process เดียว ไม่แยก worker
```

`--runInBand` ช่วยให้ output ของ test suite เล็กเรียงตรงและอ่านง่าย แต่ไม่ได้ทำให้ test cases ใช้ Service instance เดียวกัน เพราะ lifecycle ยังขึ้นกับ `beforeEach()` และ test setup

ตรวจ lint เฉพาะ test file โดยไม่แก้อัตโนมัติ:

```bash
npx eslint src/status/status.service.spec.ts
```

`npx` เลือก binary จาก `node_modules` ของ project ก่อน คำสั่งนี้ไม่มี `--fix` จึงตรวจอย่างเดียว ไม่เขียนแก้ไฟล์

อ่าน concept: [Unit Test ด้วย Jest](concepts/unit-test.md)

## รัน Backend E2E Test ด้วย Jest และ Supertest

รัน E2E test ตาม script ของ project:

```bash
npm run test:e2e
```

ตัวอย่าง script:

```json
"test:e2e": "jest --config ./test/jest-e2e.json"
```

`--config` บอก Jest ให้ใช้ E2E configuration ที่ระบุ แทน Unit Test config หลัก

ดูค่าที่ Jest resolve จริงโดยไม่รัน test:

```bash
npx jest --showConfig --config ./test/jest-e2e.json
```

```text
--showConfig = แสดง configuration หลัง resolve
--config     = เลือก configuration file
```

ตรวจ type ของ source กับ E2E test โดยไม่สร้าง JavaScript:

```bash
npx tsc --noEmit -p test/tsconfig.json
```

```text
--noEmit = ตรวจ type แต่ไม่สร้าง output
-p       = รูปย่อของ --project ใช้เลือก tsconfig
```

E2E file มักตั้งชื่อ `*.e2e-spec.ts` และอยู่ใต้ `test/` ตาม `rootDir`/`testRegex` ของ project ไม่ควรเดาจากชื่อไฟล์อย่างเดียว ให้ตรวจ config จริง

อ่าน concept: [Backend E2E Test ด้วย Jest และ Supertest](concepts/backend-e2e-test.md)

## ตรวจผลหลัง Generate

```bash
git status --short
git diff
npm run lint
npm run build
```

`generate` สำเร็จไม่ได้แปลว่าโครงสร้างถูกกับความต้องการเสมอ ต้องอ่านไฟล์และรัน validation ต่อ

## จุดที่มักงง

- `nest new` สร้าง project ใหม่ ส่วน `nest generate` เพิ่มส่วนประกอบใน project ที่มีอยู่
- `--dry-run` ไม่สร้างไฟล์ จึงต้องนำ option ออกเมื่อตรวจรายการแล้ว
- ต้องรัน `generate` ใน NestJS project ไม่ใช่ root ของ frontend ที่ไม่มี `nest-cli.json`
- `npx nest` ใช้ CLI ของ project ได้ ไม่จำเป็นต้องพึ่ง version global
- Module ที่ generate แล้วอาจยังไม่มี route เพราะต้องมี Controller ก่อน
- Controller ที่ generate แล้วเป็น class เปล่า จึงยังไม่มี route จนกว่าจะเพิ่ม HTTP method decorator
- Service ที่ generate แล้วเป็น class เปล่า และต้องมีผู้เรียก method จึงจะเกิด behavior
- Filter ที่ generate แล้วเป็นเพียง class scaffold ยังไม่ทำงานจนกว่าจะกำหนด catch behavior และลงทะเบียน

## เช็กตัวเอง

- ถ้าต้องการดูว่า CLI จะแก้ไฟล์อะไรโดยยังไม่เขียนจริง ต้องเพิ่ม option ใด?
- `nest new` กับ `nest generate module` ต่างกันอย่างไร?
- `nest generate controller` สร้างและ update ไฟล์ใดบ้าง?
- `nest generate service` ลงทะเบียน class ใหม่ไว้ใน metadata ช่องใด?
- หลัง generate แล้ว เหตุใดต้องดู `git diff` อีกครั้ง?

## จำสั้น ๆ

```text
new          = สร้าง project
generate     = เพิ่มส่วนประกอบ
--dry-run    = ดูก่อน ยังไม่เขียน
git diff     = ตรวจสิ่งที่ CLI เปลี่ยนจริง
```
