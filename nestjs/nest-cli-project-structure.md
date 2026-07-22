# Nest CLI และโครงสร้างโปรเจกต์ที่สร้างมา

## เรียนเรื่องนี้เพื่ออะไร

บทนี้ช่วยแยกให้ออกว่า NestJS กับ Nest CLI ไม่ใช่สิ่งเดียวกัน และช่วยให้อ่านโครงสร้างที่ `nest new` สร้างมาได้โดยไม่ต้องจำชื่อไฟล์ทั้งหมดพร้อมกัน

## ภาพจำง่าย ๆ

ลองนึกถึงการสร้างบ้าน:

```text
NestJS   = โครงสร้างและวัสดุที่ใช้สร้าง backend
Nest CLI = ผู้ช่วยช่างที่ตั้งโครงเริ่มต้นตามแบบมาตรฐาน
```

ผู้ช่วยสร้างโครงให้ได้ แต่ business logic ของระบบยังต้องออกแบบและเขียนเอง

## แปลเป็นศัพท์เทคนิค

- **NestJS** คือ backend framework ที่ application ใช้ตอนทำงานจริง
- **Nest CLI** คือ command-line tool สำหรับ scaffold, generate, build และ start โปรเจกต์
- **scaffolding** คือการสร้างไฟล์และ configuration เริ่มต้นให้พร้อมพัฒนาต่อ
- **standard mode** คือโครงสร้างเริ่มต้นของ Nest ที่มี application และ `package.json` ของตัวเอง

## สร้างอย่างปลอดภัย

เริ่มด้วย dry run เพื่อดูรายการไฟล์โดยยังไม่เขียนลง disk:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git --dry-run
```

เมื่อรายการถูกต้องจึงนำ `--dry-run` ออก:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git
```

ความหมายของ option:

- `--package-manager npm` เลือก npm โดยไม่ถามซ้ำ
- `--strict` เปิดกฎ TypeScript ที่เข้มงวดขึ้น
- `--skip-git` ไม่สร้าง Git repository ซ้อนในโฟลเดอร์ใหม่
- `--dry-run` รายงานสิ่งที่จะสร้าง แต่ไม่เขียนไฟล์

## File Map

```text
api/
├─ Configuration
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ nest-cli.json
│  ├─ tsconfig.json
│  ├─ tsconfig.build.json
│  ├─ eslint.config.mjs
│  └─ .prettierrc
│
├─ Application source
│  └─ src/
│     ├─ main.ts
│     ├─ app.module.ts
│     ├─ app.controller.ts
│     ├─ app.service.ts
│     └─ app.controller.spec.ts
│
├─ End-to-end tests
│  └─ test/
│     ├─ jest-e2e.json
│     └─ app.e2e-spec.ts
│
└─ Generated/local output
   ├─ node_modules/
   ├─ dist/
   └─ coverage/
```

แผนที่หน้าที่:

```text
package.json      = scripts และช่วง version ของ dependencies
package-lock.json = dependency tree และ version ที่ resolve แล้ว
nest-cli.json     = configuration ที่ Nest CLI อ่าน
tsconfig*.json    = กฎ compile TypeScript
src/              = source code ที่เราแก้
test/             = end-to-end tests
node_modules/     = dependencies ที่ติดตั้งใหม่ได้
dist/             = build output ที่สร้างใหม่ได้
coverage/         = test report ที่สร้างใหม่ได้
```

## Entry Point: `main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
```

อธิบายทีละส่วน:

- `NestFactory` สร้าง Nest application
- `AppModule` เป็น root module ที่ Nest ใช้เริ่มสร้าง application graph
- `app.listen(...)` เปิด HTTP server โดยใช้ `PORT` ถ้ามี มิฉะนั้นใช้ `3000`
- `void bootstrap()` เรียกฟังก์ชันเริ่มระบบและระบุชัดว่าไม่ได้นำค่าจาก Promise ไปใช้ตรงนั้น

`main.ts` กับ `nest-cli.json` จึงมีคนละหน้าที่:

```text
main.ts       = entry point ของ application
nest-cli.json = กติกาที่ CLI ใช้จัดการ source และ compiler
```

## Flow ตอน Start และ Build

```text
npm run start:dev
-> package.json เรียก nest start --watch
-> Nest CLI อ่าน nest-cli.json และ tsconfig
-> compile src/*.ts
-> เริ่ม application จาก main.ts
-> เฝ้าดูไฟล์และ incremental compile เมื่อ source เปลี่ยน
```

```text
npm run build
-> nest build
-> compile TypeScript จาก src/
-> สร้าง JavaScript และไฟล์ประกอบใน dist/
```

ไฟล์ใน `dist` อาจมี:

- `.js` คือ JavaScript ที่ Node.js รัน
- `.d.ts` คือ type declaration
- `.js.map` คือ source map ที่เชื่อม error กลับไปยัง TypeScript
- `.tsbuildinfo` คือข้อมูลช่วย incremental build

แก้ source ใน `src` แล้ว build ใหม่เสมอ อย่าแก้ไฟล์ใน `dist` ด้วยมือ

## Source Of Truth กับสิ่งที่สร้างใหม่ได้

ต้อง commit:

```text
src/
test/
package.json
package-lock.json
nest-cli.json
tsconfig*.json
lint/format config
```

ไม่ commit:

```text
node_modules/ = สร้างใหม่ด้วย npm install หรือ npm ci
dist/         = สร้างใหม่ด้วย npm run build
coverage/     = สร้างใหม่ด้วย npm run test:cov
```

ถ้าสร้าง Nest project เป็นโฟลเดอร์ย่อยใน Git repo เดิมและใช้ `--skip-git` ต้องตรวจว่า `.gitignore` ของ repo แม่ครอบคลุมโฟลเดอร์ย่อยจริง:

```text
/api/node_modules
/api/dist
/api/coverage
```

ตรวจด้วย:

```bash
git check-ignore -v api/node_modules/@nestjs/core/package.json api/dist/main.js
git status --short --untracked-files=all
```

## Validation เริ่มต้น

```bash
npm run lint
npm run build
npm test -- --runInBand
npm run test:e2e
```

- unit test ตรวจ behavior ของ class หรือหน่วยย่อย
- end-to-end test สร้าง application แล้วส่ง HTTP request ผ่าน flow จริงมากขึ้น
- lint warning ยังควรอ่านและแก้ แม้ command จะจบด้วย exit code สำเร็จ

ตัวอย่าง warning ที่พบบ่อยคือ floating Promise จาก `bootstrap();` เมื่อ lint rule บังคับให้ Promise ต้องถูกจัดการหรือระบุว่าไม่ใช้ค่า จึงเขียน `void bootstrap();` ได้เมื่อเป็นเจตนาของโปรแกรม

## จุดที่มักงง

- Nest CLI ไม่ใช่ backend และไม่ได้สร้าง business logic ให้เสร็จ
- `main.ts` เปิด application ส่วน `AppModule` เป็นตัวรวบรวมส่วนประกอบหลัก
- `nest-cli.json` ไม่ใช่ runtime entry point
- `package-lock.json` ต้อง commit แต่ `node_modules` ไม่ต้อง commit
- Git repo เดียวที่มีหลาย application ไม่ได้แปลว่าต้องใช้ Nx ทันที อ่านต่อที่ [Monorepo และ Managed Monorepo](../backend/concepts/monorepo.md)
- ต้องรัน `npm install` ใน project ที่ import package นั้น ถ้า frontend กับ backend มี `package.json` แยกกัน

## ลองทำเอง

1. รัน `nest new` แบบ `--dry-run` และอ่านรายการไฟล์ก่อนสร้างจริง
2. เปิด server ด้วย `npm run start:dev`
3. เปลี่ยนข้อความใน service ชั่วคราวแล้วดู incremental compilation
4. คืน behavior เดิมและรัน test ให้ผ่าน
5. build แล้วตรวจว่า `dist` ถูก ignore จาก Git

## เช็กตัวเอง

- Nest CLI ต่างจาก NestJS อย่างไร?
- `main.ts` ต่างจาก `nest-cli.json` อย่างไร?
- เหตุใด `package-lock.json` ต้อง commit แต่ `node_modules` และ `dist` ไม่ต้อง commit?
- ถ้า backend มี `package.json` ของตัวเอง ควรติดตั้ง database package ที่โฟลเดอร์ใด?

## จำสั้น ๆ

```text
Nest CLI      = สร้างและจัดการโครงโปรเจกต์
main.ts       = จุดเริ่ม application
nest-cli.json = กติกาของ CLI
src           = แก้และ commit
node_modules/dist = สร้างใหม่ได้ ไม่ commit
```

## อ้างอิง

- [NestJS First Steps](https://docs.nestjs.com/first-steps)
- [Nest CLI Overview](https://docs.nestjs.com/cli/overview)
- [Nest CLI Usage](https://docs.nestjs.com/cli/usages)
