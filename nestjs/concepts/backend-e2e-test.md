# NestJS Backend E2E Test ด้วย Jest และ Supertest

## ภาพจำ

ลองนึกว่า backend เป็นร้านที่มีหลายจุดทำงานต่อกัน:

```text
Unit Test
= เดินเข้าไปตรวจพนักงานหรือเครื่องมือชิ้นหนึ่งโดยตรง

Backend E2E Test
= เข้าทางประตูรับลูกค้า ส่งคำขอ แล้วตรวจคำตอบที่ออกจากร้าน
```

Backend E2E Test จึงส่ง HTTP request ผ่านส่วนที่ประกอบอยู่ใน test application:

```text
HTTP request
-> Router
-> Controller
-> Service
-> Filter/Pipe/Interceptor ที่ผูกใน test application
-> HTTP response
```

คำว่า E2E ต้องอ่านคู่กับขอบเขตเสมอ Backend E2E ไม่ได้เปิด browser หรือพิสูจน์ว่า frontend ใช้งานได้

## Backend E2E, Unit Test และ Full E2E

```text
Unit Test
-> เรียก class หรือ method โดยตรง
-> แยก dependency เมื่อจำเป็น

Backend E2E Test
-> สร้าง Nest application
-> ส่ง HTTP request ด้วย Supertest
-> ตรวจ status, headers หรือ body

Full E2E Test
-> เปิด browser
-> ผู้ใช้โต้ตอบกับ frontend
-> frontend เรียก backend
-> ตรวจผลที่ผู้ใช้เห็น
```

ทั้งสามแบบตอบคนละคำถามและไม่ทดแทนกัน

## เครื่องมือแต่ละตัวทำอะไร

```text
Jest         = ค้นหา จัดกลุ่ม รัน และรายงานผล test
ts-jest      = แปลง TypeScript ให้ Jest รันได้
Nest Testing = ประกอบ Module และ Nest application สำหรับ test
Supertest    = ส่ง HTTP request และตรวจ HTTP response
```

Supertest ไม่ใช่ browser และไม่ใช่ test runner หลัก มันเป็น HTTP test client ที่ทำงานร่วมกับ Jest

## File Map

โครงสร้างทั่วไป:

```text
package.json
└─ script test:e2e

test/
├─ jest-e2e.json
├─ tsconfig.json
└─ status.e2e-spec.ts

src/
├─ main.ts
├─ app.module.ts
└─ configure-app.ts       # มีเมื่อแยก global config ใช้ร่วมกัน
```

หน้าที่:

```text
package.json        = เลือก command ที่ใช้รัน E2E
jest-e2e.json       = บอก Jest ว่าค้นหาและแปลง E2E file อย่างไร
test/tsconfig.json  = บอก TypeScript/IDE ว่าตรวจ type ของ src/ และ test/ อย่างไร
*.e2e-spec.ts       = สร้าง test application ส่ง request และตรวจ response
AppModule           = root Module ที่นำ application graph จริงเข้ามาประกอบ
configureApp()      = global application config ที่ runtime กับ E2E ใช้ร่วมกัน
```

`jest-e2e.json` กับ `test/tsconfig.json` ทำคนละหน้าที่ แม้ทั้งคู่จะอยู่ใน `test/`

## E2E Jest Configuration

ตัวอย่าง:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```

ความหมาย:

```text
moduleFileExtensions = นามสกุล module ที่ Jest โหลดได้
rootDir               = รากที่ใช้ค้นไฟล์
testEnvironment       = runtime environment ของ test
testRegex             = รูปแบบชื่อ test file
transform             = ตัวแปลงไฟล์ก่อน Jest รัน
```

ถ้า config อยู่ที่ `test/jest-e2e.json`, ค่า `"rootDir": "."` จะ resolve เทียบกับ directory ของ config เป็น `test/` ไม่ใช่เดาจากตำแหน่งที่พิมพ์ command

ตรวจค่าที่ Jest resolve จริงได้ด้วย:

```bash
npx jest --showConfig --config ./test/jest-e2e.json
```

บน Windows ที่ PowerShell Execution Policy บล็อก `npx.ps1` สามารถเรียก Windows command wrapper ของ executable เดียวกัน:

```powershell
npx.cmd jest --showConfig --config ./test/jest-e2e.json
```

`--showConfig` แสดง config หลัง resolve โดยไม่รัน test ส่วน `--config` เลือก config file

## ประกอบ Nest Application สำหรับ Test

ตัวอย่าง setup:

```ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Status API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });
});
```

ลำดับ:

```text
createTestingModule()
-> กำหนดแบบแปลนของ test Module

compile()
-> ประกอบ module graph และ DI container

createNestApplication()
-> สร้าง Nest application object จาก Testing Module

app.init()
-> initialize application ให้พร้อมรับ request

app.close()
-> ปล่อย resource หลังแต่ละ test
```

`app.init()` ไม่เท่ากับ `app.listen(3000)` E2E สามารถใช้ underlying HTTP server ผ่าน Supertest โดยไม่ต้องเปิด fixed port หรือรัน `start:dev` แยก

## ส่ง Request และตรวจ Response

```ts
it('/status (GET)', () => {
  return request(app.getHttpServer())
    .get('/status')
    .expect(200)
    .expect({ status: 'ready' });
});
```

อ่านทีละส่วน:

```text
app.getHttpServer() = ขอ underlying HTTP server จาก Nest application
request(server)     = ให้ Supertest ใช้ server นี้เป็นเป้าหมาย
.get('/status')     = เตรียม method และ path
.expect(200)        = ลงทะเบียนกฎตรวจ status
.expect(object)     = ลงทะเบียนกฎตรวจ body
return Test object  = ให้ Jest รอ request และ assertions จบ
```

ชื่อใน `it('/status (GET)', ...)` เป็นข้อความรายงาน ส่วน `.get('/status')` เป็น method/path ที่ทำงานจริง

## `.expect()` ลงทะเบียนก่อน ตรวจหลัง Response กลับมา

เมื่อประกอบ chain:

```ts
request(server)
  .get('/missing')
  .expect(404)
  .expect(checkResponse);
```

Supertest แยกชนิด argument ตั้งแต่เรียก `.expect(...)`:

```text
number   -> เตรียม status assertion
object   -> เตรียม body assertion
function -> เก็บ custom checker callback
```

จากนั้นเมื่อ response กลับมา จึงนำ response เดียวกันไปตรวจตามลำดับ:

```ts
const actualResponse = await sendRequest();

checkStatus(actualResponse, 404);
checkResponse(actualResponse);
```

ถ้า assertion ก่อนหน้าล้มเหลว test เป็น failure และ assertion ถัดไปอาจไม่ถูกเรียก

## Callback, Parameter และ Argument

Callback คือ function ที่ส่งให้อีก function เป็นผู้เรียก

```ts
.expect((response) => {
  expect(response.status).toBe(404);
});
```

Type definition ของ Supertest มี overload แนวนี้:

```ts
expect(status: number): this;
expect(checker: (res: Response) => any): this;
```

Overload ช่วย TypeScript เลือกรูปแบบและ infer type ตอน compile ส่วนตอน runtime Supertest เก็บ callback และเรียกหลังได้รับ response:

```ts
checker(actualResponse);
```

ดังนั้น:

```text
response       = parameter หรือช่องรับข้อมูลใน callback
actualResponse = argument จริงที่ Supertest ส่งเข้ามา
```

ชื่อ parameter เปลี่ยนเป็น `res` หรือ `value` ได้ แต่ควรใช้ชื่อที่บอกความหมาย

## `return` Callback Chain กับ `async/await`

สองแบบนี้รอ asynchronous request ได้เหมือนกัน

แบบคืน Supertest Test object:

```ts
it('/status (GET)', () => {
  return request(app.getHttpServer())
    .get('/status')
    .expect(200);
});
```

แบบ `async/await`:

```ts
it('/status (GET)', async () => {
  const response = await request(app.getHttpServer())
    .get('/status')
    .expect(200);

  expect(response.body).toEqual({ status: 'ready' });
});
```

แบบแรกฝาก Supertest เรียก callback หรือ assertions ที่ลงทะเบียนไว้ แบบหลังแสดงจุดรอและตัวแปร response ชัดกว่า ต้องอ่านให้ออกทั้งสองแบบ

ถ้าไม่ `return` และไม่ `await`, Jest อาจมองว่า test callback จบก่อน request/assertions เสร็จ

## ตรวจ Error Response ที่มีค่า dynamic

ถ้า error body มี timestamp ที่เปลี่ยนทุกครั้ง ไม่ควร hardcode เวลาเดียว ตัวอย่าง:

```ts
interface HttpErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
}

it('/missing (GET)', () => {
  return request(app.getHttpServer())
    .get('/missing')
    .expect(404)
    .expect((response) => {
      const body = response.body as HttpErrorResponse;

      expect(body.statusCode).toBe(404);
      expect(typeof body.timestamp).toBe('string');
      expect(body.path).toBe('/missing');
      expect(body.message).toBe('Cannot GET /missing');
    });
});
```

`interface` และ `as HttpErrorResponse` ช่วย TypeScript ตอน compile แต่ไม่แปลง เติม หรือ validate JSON ตอน runtime ถ้า server ส่ง `paths` แต่ test อ่าน `path`, ค่า `body.path` เป็น `undefined` และ runtime assertion ต้องเป็นผู้จับ

การตรวจเพียง `.expect(404)` ยังไม่พิสูจน์ custom error shape เพราะ default handler อาจตอบ status เดียวกันได้ ต้องตรวจ field ที่แยก behavior ที่ต้องการด้วย

## Runtime กับ E2E อาจใช้ Bootstrap คนละทาง

Runtime มักเริ่มจาก `main.ts`:

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new HttpExceptionFilter());
await app.listen(3000);
```

E2E มักสร้าง application เอง:

```ts
app = moduleFixture.createNestApplication();
await app.init();
```

E2E ไม่ได้รัน `main.ts` หรือ `bootstrap()` อัตโนมัติ Global Pipe, Filter, Interceptor หรือ Prefix ที่ผูกเฉพาะใน `main.ts` จึงอาจหายจาก test application

## ใช้ Shared Application Configuration

แนวทางหนึ่งสำหรับ configuration ที่ลงทะเบียนแบบ imperative คือแยก function กลาง:

```ts
import { INestApplication } from '@nestjs/common';

export function configureApp(app: INestApplication): void {
  app.useGlobalFilters(new HttpExceptionFilter());
}
```

Runtime:

```ts
const app = await NestFactory.create(AppModule);
configureApp(app);
await app.listen(3000);
```

E2E:

```ts
app = moduleFixture.createNestApplication();
configureApp(app);
await app.init();
```

ทั้งสองยังสร้างและเริ่ม application คนละทาง แต่ใช้ global configuration จาก source of truth เดียวกัน ลดความเสี่ยง configuration drift

การเรียก `configureApp()` ไม่ได้ทำให้ E2E พิสูจน์ fixed port, environment ทั้งหมด หรือ `bootstrap()` ใน `main.ts`

อีกแนวทางคือผูก global component ผ่าน application graph เช่น global provider แต่ควรเลือกตาม DI/lifecycle ที่ต้องการ ไม่ควรเปลี่ยน pattern โดยไม่เข้าใจขอบเขต

## Negative Control

Negative control พิสูจน์ว่า assertion มีฟันจริง เช่นเปลี่ยน path ที่คาดชั่วคราว:

```ts
expect(body.path).toBe('/wrong');
```

ผลควร fail:

```text
Expected: "/wrong"
Received: "/missing"
```

นี่พิสูจน์ว่า custom callback ถูกเรียกและอ่าน response จริง ต้องคืน expectation ให้ถูกแล้วรัน Green ซ้ำก่อนจบงานเสมอ ห้าม commit test ที่ตั้งใจทำให้ fail

## E2E ผ่านแล้วรับประกันอะไร

ถ้า test มีเพียง:

```text
GET /status -> 200 + body
GET /missing -> 404 + custom error fields
```

สรุปได้เฉพาะ behavior สองเส้นทางนั้นใน test application ไม่ได้แปลว่า:

- frontend เรียก backend ได้
- production port และ environment ถูกต้อง
- endpoint อื่นผ่านแล้ว
- database หรือ external service ทุกตัวทำงาน
- exception ทุกชนิดเข้า Filter
- ระบบไม่มี bug

จำนวน test ที่ผ่านต้องอ่านคู่กับ request และ assertions ที่มีจริง

## Validation ตามผลกระทบ

ตัวอย่างชุดตรวจเมื่อแก้ E2E และ shared bootstrap configuration:

```bash
npx eslint src/main.ts src/configure-app.ts test/status.e2e-spec.ts
npx tsc --noEmit -p test/tsconfig.json
npm run build
npm test -- --runInBand
npm run test:e2e
```

ถ้าแก้เฉพาะเอกสาร ไม่ต้องรัน backend test ทุกชุด แต่ถ้า production bootstrap เปลี่ยน ควรตรวจ build และ HTTP behavior ที่ได้รับผลกระทบ

## จุดที่มักงง

- Backend E2E ไม่ใช่ browser/full E2E
- `TestingModule.compile()` ยังไม่ใช่ HTTP application
- `app.init()` ไม่ได้เปิด fixed production port
- `AppModule` จริงไม่ได้แปลว่า `main.ts` ถูกเรียก
- `.get('/path')` เตรียม method/path ส่วน `.expect()` ลงทะเบียนกฎตรวจ
- `.expect(404)` รับ number ไม่ใช่ callback
- `.expect((response) => {...})` รับ callback ที่ Supertest เรียกหลัง response กลับมา
- overload ช่วย TypeScript แต่ runtime implementation เป็นผู้เก็บและเรียก callback
- `interface` และ `as` ไม่ validate JSON จริง
- test ผ่านรับประกันเฉพาะ behavior ที่มี assertion

## อ่านต่อ

- [Unit Test ด้วย Jest](unit-test.md)
- [Exception Filter](exception-filter.md)
- [NestJS Commands](../commands.md)
- [Nest CLI และโครงสร้างโปรเจกต์](../nest-cli-project-structure.md)
- [NestJS Testing — Official Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Jest Configuration — Official Documentation](https://jestjs.io/docs/configuration)
- [Supertest Repository](https://github.com/ladjs/supertest)

## เช็กตัวเอง

- Backend E2E ต่างจาก Unit Test และ Full E2E อย่างไร?
- `.compile()`, `createNestApplication()` และ `app.init()` ทำคนละหน้าที่อย่างไร?
- `.expect(404)` กับ `.expect(callback)` ลงทะเบียน assertion ต่างกันอย่างไร?
- ใครเป็นผู้ส่ง response เข้า parameter ของ callback?
- เพราะเหตุใด `as HttpErrorResponse` จึงไม่ใช่ runtime validation?
- ทำไม E2E ที่ import `AppModule` จึงอาจไม่เห็น configuration ใน `main.ts`?
- ผล test ผ่านสองข้อยังไม่รับประกันอะไรบ้าง?

## จำสั้น ๆ

```text
Backend E2E = สร้าง Nest app + ส่ง HTTP request + ตรวจ response
Supertest   = HTTP test client
return/await = ทำให้ Jest รอ asynchronous request
callback    = function ที่ Supertest เรียกพร้อม response
configureApp = shared global application configuration
PASS        = รับประกันเฉพาะสิ่งที่ assertions ตรวจ
```
