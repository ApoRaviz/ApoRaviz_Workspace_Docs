# TypeScript

## ภาพจำง่าย ๆ

JavaScript คือภาษาที่ browser และ Node.js รันได้จริง

TypeScript คือ JavaScript ที่มี "คนตรวจแบบร่าง" คอยดูชนิดข้อมูลก่อนส่งไป run

```text
เราเขียน .ts
-> TypeScript ตรวจ type
-> build แปลงเป็น .js/.mjs
-> browser หรือ Node.js รัน JavaScript
```

## ความหมายแบบคนธรรมดา

TypeScript ช่วยบอกก่อนว่าเราอาจส่งข้อมูลผิดชนิด เช่น function ต้องการ `string` แต่เราเผลอส่ง `number`

ข้อดีคือ bug หลายอย่างถูกจับตอนเขียน code หรือ build ไม่ต้องรอให้ผู้ใช้เปิดหน้าเว็บแล้วเจอ error

## ความหมายแบบ technical term

TypeScript คือ superset ของ JavaScript ที่เพิ่ม static type checking และ compile/transpile ไปเป็น JavaScript

ใน Angular project เครื่องมือที่ใช้ TypeScript ตอนพัฒนาอยู่ใน `devDependencies` เพราะ browser ไม่ได้รัน TypeScript โดยตรง

## ตัวอย่างสั้นที่สุด

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

greet('ApoRaviz');
greet(123); // TypeScript เตือน เพราะ 123 ไม่ใช่ string
```

## จุดที่มักงง

`readonly` ไม่ได้แปลว่าค่าข้างใน object หรือ signal จะเปลี่ยนไม่ได้เสมอไป

```ts
readonly title = signal('ApoRaviz_DevEng');

this.title.set('New title'); // ได้: เปลี่ยนค่าข้างใน signal
this.title = signal('Other'); // ไม่ได้: เปลี่ยนกล่อง title เป็นกล่องใหม่
```

ภาพจำ:

```text
readonly = ห้ามเปลี่ยนกล่อง
signal.set() = เปลี่ยนของที่อยู่ในกล่อง
```

## อ่านต่อ

- [TypeScript Generic](typescript-generics.md)
- [Reactive State และ Signals](../teach/reactive-signals.md)
- [Angular Config Files](../teach/angular-config-files.md)
- [TypeScript ใน Angular](../teach/typescript-in-angular.md)

## เช็กตัวเอง

- Browser รัน `.ts` โดยตรง หรือรัน JavaScript ที่ build ออกมา
- ถ้า `typescript` อยู่ใน `devDependencies` แปลว่าใช้ตอน runtime บนเว็บหรือใช้ตอนพัฒนา
- `readonly title = signal(...)` ห้ามเปลี่ยนอะไร และยังเปลี่ยนอะไรได้

## จำสั้น ๆ

```text
TypeScript = JavaScript + type check ก่อน runtime
Angular ใช้ TypeScript เพื่อจับ bug เร็วขึ้น
browser รัน JavaScript ไม่ได้รัน TypeScript ตรง ๆ
```
