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

1. Tailwind utility class คืออะไร
2. แยก class เป็นกลุ่ม: layout, spacing, color, typography, state
3. responsive prefix ทำงานอย่างไร
4. flex/grid ใน component layout
5. button/card/form styling
6. Angular template กับ Tailwind class ทำงานร่วมกันอย่างไร
7. เมื่อไหร่ควรย้าย style ไป CSS
8. Tailwind กับ design system ของ ApoRaviz

## Folder Direction

ตอนนี้ใช้โฟลเดอร์นี้เป็น landing page ก่อน

ภายหลังสามารถแยกเพิ่มได้:

```text
angular/tailwind/concepts/
angular/tailwind/teach/
```

ถ้าบทเรียนยังเล็ก ให้เก็บในโฟลเดอร์นี้ก่อนเพื่อไม่ให้แตกไฟล์เร็วเกินไป
