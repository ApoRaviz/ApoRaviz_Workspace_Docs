# TypeScript ใน Angular

บทนี้สรุปว่า TypeScript เข้ามาอยู่ตรงไหนใน Angular project และทำไม Angular ถึงเลือกใช้ TypeScript เป็นภาษาหลัก

## เรียนเรื่องนี้เพื่อแก้อาการงงอะไร

เวลาเปิด Angular project จะเจอไฟล์ `.ts` แทบทุกจุด:

```text
src/main.ts
src/app/app.ts
src/app/app.config.ts
src/app/app.routes.ts
tsconfig.json
```

อาการที่มักงงคือ:

- TypeScript ต่างจาก JavaScript ยังไง
- ถ้า browser รัน JavaScript แล้วทำไมเราเขียน `.ts`
- ทำไม `typescript` อยู่ใน `devDependencies`
- `readonly` ทำไมยังใช้ `signal.set()` เปลี่ยนค่าได้
- `tsconfig.json` กำลังคุมอะไร

## ภาพจำง่าย ๆ

ให้นึกว่า JavaScript คือของจริงที่ขึ้นเวที ส่วน TypeScript คือครูตรวจบทก่อนขึ้นเวที

```text
TypeScript = ตรวจ script ก่อนแสดงจริง
JavaScript = script ที่ browser/Node.js เอาไปรันจริง
```

ถ้าบทพูดผิด เช่น function ขอชื่อเป็นข้อความ แต่เราเผลอส่งตัวเลข TypeScript จะเตือนก่อน build ผ่าน

## แปลเป็น Angular

ใน Angular flow:

```text
เราเขียน .ts
-> Angular/TypeScript compiler ตรวจ type และ template
-> build สร้าง JavaScript output ใน dist/
-> browser รันไฟล์ .js
-> SSR server รันไฟล์ .mjs ฝั่ง server
```

ดังนั้น TypeScript เป็นเครื่องมือช่วงพัฒนาและ build ไม่ใช่ไฟล์ที่ browser เอาไปรันโดยตรง

## ตัวอย่างจาก Angular component

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ApoRaviz_DevEng');
}
```

อ่านทีละชิ้น:

```text
@Component(...) = metadata บอก Angular ว่า class นี้เป็น component
export class App = class ที่ไฟล์อื่น import ไปใช้ได้
protected = ใช้ใน class นี้และ class ลูกได้
readonly = ห้าม assign property นี้ใหม่
signal(...) = กล่อง state ที่ Angular track ได้
```

## readonly กับ signal.set()

จุดนี้สำคัญมาก เพราะ `readonly` กับ `signal` อยู่คนละระดับ

```ts
readonly title = signal('ApoRaviz_DevEng');

this.title.set('New title'); // ได้
this.title = signal('Other title'); // ไม่ได้
```

ภาพจำ:

```text
readonly title = ห้ามเปลี่ยนกล่อง title เป็นกล่องใหม่
title.set(...) = เปลี่ยนของที่อยู่ในกล่อง signal
```

ถ้าไม่ใช่ signal:

```ts
readonly title = 'ApoRaviz_DevEng';

this.title = 'New title'; // ไม่ได้ เพราะกำลัง assign ค่าใหม่ให้ readonly property
```

## TypeScript อยู่ตรงไหนใน package.json

ใน Angular project จะเห็น `typescript` อยู่ใน `devDependencies`

```json
{
  "devDependencies": {
    "typescript": "[[TypeScript version ตาม baseline.md หรือ package.json ของ repo]]"
  }
}
```

`baseline.md` คือ source of truth ของเลข version ที่ workspace ยึด อ่านคำอธิบายเต็มและตารางเทียบ Angular/Node/TypeScript ต่อได้ที่ [Angular 22 Baseline](09-angular-22-baseline.md)

เหตุผล:

```text
dependencies = ของที่ app ต้องใช้ตอน runtime
devDependencies = ของที่ใช้ตอนพัฒนา/build/test
```

TypeScript ใช้ตอนตรวจและ compile code จึงอยู่ฝั่ง dev tool

## tsconfig.json คุมอะไร

`tsconfig.json` คือกติกา TypeScript กลางของ project

ตัวอย่างจาก Angular 22 scaffold:

```json
{
  "compilerOptions": {
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true
  }
}
```

แยกเป็น 2 ชั้น:

```text
compilerOptions = TypeScript ตรวจภาษาและกำหนด output JavaScript
angularCompilerOptions = Angular ตรวจ pattern เฉพาะ Angular เช่น DI/input/template
```

ตัวอย่าง flag ที่เจอบ่อย:

```text
noImplicitReturns = function ที่ควร return ต้อง return ให้ครบทุกทาง
target = JavaScript version ที่ output จะออกไปหา
module = วิธีจัดการ import/export ให้ build tool ใช้ต่อ
strictInjectionParameters = ตรวจ dependency injection ให้ชัดขึ้น
strictInputAccessModifiers = ตรวจ input access modifier ให้ตรงกติกา Angular
```

## Flow ทีละขั้น

1. เราเขียน Angular code เป็น `.ts`
2. editor และ TypeScript อ่าน `tsconfig.json`
3. Angular compiler อ่านทั้ง TypeScript code และ template
4. ถ้า type หรือ pattern ผิด build/test จะเตือน
5. ถ้าผ่าน build จะได้ JavaScript output ใน `dist/`
6. browser/server รัน output นั้น ไม่ได้รัน `.ts` ตรง ๆ

## จุดที่มักงง

### TypeScript ไม่ได้ทำให้ runtime ปลอด bug 100%

TypeScript จับ bug จาก type และ structure ได้เยอะ แต่ข้อมูลจริงจาก user/API ยังต้อง validate อยู่ดี

### devDependencies ไม่ได้แปลว่าไม่สำคัญ

`typescript`, `@angular/cli`, `vitest` สำคัญมากต่อการ build/test แต่ไม่ต้อง bundle ไปเป็น runtime dependency ของเว็บ

### target ไม่ได้แปลว่า browser รัน TypeScript

`target: "ES2022"` แปลว่า output JavaScript จะใช้ภาษา JavaScript ระดับ ES2022 ไม่ใช่ว่า browser เข้าใจ `.ts`

## ลองทำเอง

เปิด `src/app/app.ts` แล้วหา:

```text
protected readonly title = signal('ApoRaviz_DevEng');
```

ตอบให้ได้ว่า:

- คำไหนเป็น TypeScript access/control keyword
- คำไหนเป็น Angular API
- ถ้าอยากเปลี่ยนค่าข้างใน signal ต้องใช้คำสั่งอะไร

## เช็กตัวเอง

1. TypeScript ต่างจาก JavaScript อย่างไรใน Angular project
2. ทำไม `typescript` อยู่ใน `devDependencies`
3. `readonly title = signal(...)` ห้ามเปลี่ยนอะไร และยังเปลี่ยนอะไรได้
4. ทำไม Angular ถึงได้ประโยชน์จาก TypeScript

## จำสั้น ๆ

```text
TypeScript = JavaScript + type safety ตอนเขียน/build
Angular ใช้ TypeScript เพื่อให้ component/config/template ตรวจได้เร็ว
browser รัน JavaScript output ไม่ได้รัน TypeScript source
readonly ห้ามเปลี่ยนกล่อง แต่ signal.set() เปลี่ยนค่าข้างในกล่องได้
```
