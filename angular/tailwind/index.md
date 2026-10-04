# Tailwind CSS with Angular

โฟลเดอร์นี้เก็บบทเรียน Tailwind CSS ที่ใช้คู่กับ Angular ใน ecosystem `ApoRaviz`

Angular project ของ ApoRaviz ใช้ Tailwind CSS เป็น styling system หลักเสมอ

## ทำไม Tailwind อยู่ใต้ Angular

เพราะโปรเจ็คจริงของ ApoRaviz ไม่ได้เรียน Angular แบบแยกจาก UI

เวลาเขียน component จริง เราจะต้องเข้าใจพร้อมกันว่า:

```text
Angular = logic, state, template, component structure
Tailwind = layout, spacing, responsive, color, visual state
```

ตัวอย่าง:

```html
<button
  type="button"
  class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
>
  Save
</button>
```

บทเรียนแบบนี้ต้องอธิบายทั้ง:

- Angular template ใช้ element นี้ทำอะไร
- Tailwind class แต่ละกลุ่มทำหน้าที่อะไร
- class ไหนคือ layout
- class ไหนคือ spacing
- class ไหนคือ color
- class ไหนคือ state เช่น `hover:`

## What Belongs Here

- Tailwind CSS setup ใน Angular
- `@import "tailwindcss";`
- utility class คืออะไร
- responsive prefix เช่น `sm:`, `md:`, `lg:`
- flex/grid layout
- spacing เช่น `p-4`, `px-6`, `gap-3`
- typography เช่น `text-sm`, `font-semibold`, `leading-7`
- color token และ theme direction
- hover/focus/disabled state
- dark UI pattern
- animation/keyframes ที่ควรอยู่ใน CSS
- เมื่อไหร่ควรใช้ Tailwind class
- เมื่อไหร่ควรเขียน CSS แยก

## Teaching Rule

Tailwind lesson ต้องใช้สไตล์เดียวกับ `TEACHING_RULES.md`

```text
ภาพจำง่าย ๆ -> แปลเป็น Tailwind -> ดู class ทีละกลุ่ม -> ลองแก้เอง -> จำสั้น ๆ
```

ตัวอย่างภาพจำ:

```text
Tailwind class = สติกเกอร์คำสั่งเล็ก ๆ ที่แปะบน element
แปะ `p-4` = ใส่ padding
แปะ `bg-orange-500` = ใส่สีพื้นหลัง
แปะ `hover:bg-orange-600` = ตอนเอาเมาส์วางให้เปลี่ยนสี
```

## Suggested Learning Path

เริ่มจาก [Tailwind CSS v4 ใน Angular](../teach/tailwind-css-v4.md) ซึ่งรวมบทเรียนที่มีอยู่แล้วไว้ครบในหน้าเดียว:

1. [ติดตั้งใน Angular](../teach/tailwind-css-v4.md#setup-ใน-angular) — package, PostCSS และ stylesheet ทำงานร่วมกันอย่างไร
2. [Pipeline เบื้องหลัง](../teach/tailwind-css-v4.md#pipeline-เบื้องหลัง) — class ใน template กลายเป็น CSS อย่างไร
3. [ตรวจว่า Tailwind ทำงานจริง](../teach/tailwind-css-v4.md#ตรวจว่า-tailwind-ทํางานจริง) — ดูผลบนหน้าจอ
4. [Global styles](../teach/tailwind-css-v4.md#styles-css-ใช้ทําอะไร) และ [Component CSS](../teach/tailwind-css-v4.md#component-css-ใช้เมื่อไหร่) — เลือกที่อยู่ของ style
5. [Responsive Design](../teach/tailwind-css-v4.md#responsive-design) — อ่าน prefix ตามขนาดหน้าจอ

## Folder Direction

หน้านี้เป็นทางเข้าหัวข้อ styling ส่วนเนื้อหา setup และการใช้งานอยู่ใน [บทเรียน Tailwind](../teach/tailwind-css-v4.md) กลับไปเลือกบท Angular อื่นได้ที่ [Teach Index](../teach/)
