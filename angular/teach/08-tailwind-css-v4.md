# Tailwind CSS v4 ใน Angular

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

หลังสร้าง Angular project ให้รัน:

```bash
ng add tailwindcss
```

ถ้าต้อง setup เอง:

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
```
