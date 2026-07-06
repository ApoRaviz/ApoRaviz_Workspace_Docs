# Tailwind CSS v4 ใน Angular

> เลข version จริง (source หลัก) อยู่ที่ [`baseline.md`](../../baseline.md) — บทนี้เป็นคำอธิบาย/snapshot ของ Tailwind ใน baseline นั้น

บทนี้สรุปการใช้ Tailwind CSS v4 ใน Angular workspace `ApoRaviz` และบทบาทที่ยังเหลือของ CSS file

## ทำไม Tailwind เป็น default

Tailwind เป็น utility-first CSS framework

ข้อดีสำหรับโปรเจกต์ใน workspace:

- เห็น layout และ responsive rule ใน template ทันที
- ลดการกระโดดไปมาระหว่าง HTML กับ CSS
- ทำให้ component ที่แยกไฟล์แล้วอ่าน visual intent ได้เร็ว
- ใช้ theme token กลางผ่าน `@theme` ได้
- เหมาะกับ app surface เช่น POS, dashboard, portfolio page และ tool UI

## Setup ใน Angular

สำหรับ workspace นี้ให้ setup Tailwind CSS v4 แบบ manual:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

เพิ่ม `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

ใน `src/styles.css`:

```css
@import "tailwindcss";
```

ใน flow นี้ไม่ใช้ schematic command เป็นคำสั่งหลัก เพราะ Tailwind CSS v4 setup ที่ใช้จริงคือเพิ่ม package, PostCSS plugin และ import เองตามไฟล์ด้านบน

## Pipeline เบื้องหลัง

ภาพรวมการทำงาน:

```text
src/styles.css
-> Angular build อ่าน global styles จาก angular.json
-> PostCSS อ่าน .postcssrc.json
-> ใช้ plugin @tailwindcss/postcss
-> แปลง @import "tailwindcss" และ utility classes เป็น CSS output
-> browser โหลด CSS ที่ build แล้ว
```

แปลเป็นภาษาคน:

```text
styles.css = จุดเรียก Tailwind เข้ามาใน app
.postcssrc.json = ใบสั่งงานว่า CSS ต้องผ่าน plugin อะไร
@tailwindcss/postcss = plugin ที่รู้วิธีแปลง Tailwind v4
browser = ไม่รู้จัก Tailwind โดยตรง แต่รู้จัก CSS output
```

Angular build ไม่ต้องเขียน path ไปหา `.postcssrc.json` ใน `angular.json` เพราะ PostCSS tooling รู้จักชื่อไฟล์ config นี้ตาม convention เหมือนที่ npm รู้จัก `package.json` หรือ TypeScript รู้จัก `tsconfig.json`

## Tailwind config ใน v4 อยู่ตรงไหน

ใน Tailwind CSS v4 โปรเจกต์อาจไม่มี `tailwind.config.js` หรือ `tailwind.config.ts` ก็ได้

สำหรับ setup นี้ ไฟล์สำคัญคือ:

```text
.postcssrc.json = บอก PostCSS ให้ใช้ plugin @tailwindcss/postcss
src/styles.css  = import Tailwind และเก็บ theme/global CSS
```

ถ้าต้องตั้ง theme token กลาง เช่นสี brand หรือ font token ให้เริ่มคิดที่ `src/styles.css` ด้วย `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand: #2563eb;
}
```

แต่ยังไม่ควรใส่ token จริงแบบเดาสุ่มถ้ายังไม่มี design decision

```text
design decision = การตัดสินใจด้านหน้าตา/ประสบการณ์ใช้งานที่จะใช้เป็นกติกากลางของ app
```

ตัวอย่าง design decision:

```text
สีหลักคืออะไร
font หลักคืออะไร
ปุ่มควรโค้งแค่ไหน
spacing ของ panel/card ใช้ pattern ไหน
```

ถ้ายังไม่ตัดสินใจ ให้ `src/styles.css` มีแค่ `@import "tailwindcss";` ก่อน

## ตรวจว่า Tailwind ทำงานจริง

หลัง setup อย่าตรวจแค่ build อย่างเดียว ให้ตรวจ 2 ชั้น:

```text
build check  = Angular + PostCSS + Tailwind compile ผ่าน
visual check = Tailwind utility class แสดงผลจริงบนหน้าเว็บ
```

รัน build:

```bash
npm run build
```

จากนั้นเปิด dev server แล้วใส่ marker ชั่วคราวใน template เช่น:

```html
<div class="fixed left-4 top-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
  Tailwind OK
</div>
```

ถ้าเห็นกล่องสีฟ้าบนหน้าเว็บ แปลว่า Tailwind utility class ถูกแปลงและโหลดเข้าหน้าจอจริง

หลังตรวจเสร็จให้ลบ marker นี้ออก แล้ว build อีกครั้งก่อนจบ step

## styles.css ใช้ทำอะไร

`src/styles.css` เป็น global stylesheet ของทั้ง app

ใช้สำหรับงานเหล่านี้:

- `@import "tailwindcss";`
- `@theme` เช่นสี brand, font, shadow token
- base style ของ `html`, `body`
- helper global ที่ใช้หลายจุด เช่น `.sr-only`
- reduced motion rule ถ้าเป็น policy กลางของทั้ง app

ไม่ควรใช้ `styles.css` เป็นที่รวม style ของทุก component

## Component CSS ใช้เมื่อไหร่

ใช้ Tailwind class ใน template เป็นหลัก

component `.css` ใช้เมื่อ:

- มี `@keyframes` เฉพาะ component
- มี animation ซับซ้อนที่ Tailwind class อ่านยาก
- มี pseudo element หลายชั้น เช่น `::before`, `::after`
- มี browser-specific หรือ state style ที่ utility class ทำให้อ่านยากกว่าเดิม

ถ้าเป็นแค่ layout, spacing, border, color, typography หรือ responsive ให้ใช้ Tailwind ก่อน

## Responsive Design

โปรเจกต์ใหม่ต้องคิด responsive ตั้งแต่ first screen

ตัวอย่าง:

```html
<section class="grid gap-4 lg:grid-cols-[360px_1fr_320px]">
  ...
</section>
```

หลักคิด:

```text
mobile/tablet/desktop ต้องเป็น design เดียวกันที่ยืดหยุ่น
ไม่ใช่ desktop ก่อนแล้วค่อยซ่อม mobile ตอนท้าย
```

## Animation

ลำดับที่ควรใช้:

1. Tailwind transition/animation utilities
2. CSS keyframes ใน component `.css`
3. Angular animations หรือ Web Animations API เมื่อผูกกับ Angular state
4. `motion` JavaScript package เมื่อมี gesture, timeline หรือ scroll-linked effect ที่ซับซ้อนจริง

`Framer Motion` ไม่ใช่ default ของ Angular project เพราะเป็น React-first

## จำสั้น ๆ

```text
Tailwind = default styling language ของ Angular frontend ใน workspace นี้
styles.css = Tailwind import, theme, global base
component.css = animation หรือ style เฉพาะที่ Tailwind ไม่เหมาะ
build check + visual check = setup ผ่านจริงทั้ง compile และหน้าจอ
Tailwind v4 อาจไม่มี tailwind.config.*; theme token อยู่ใน @theme ได้
```
