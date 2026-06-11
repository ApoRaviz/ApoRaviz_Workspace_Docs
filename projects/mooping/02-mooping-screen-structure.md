# 02 MooPing Screen Structure และการแยก Component

บทนี้อธิบายโครงสร้างหน้าจอของ `ApoRaviz_Mooping`: การแยก POS, iPad display, reward และ LINE mock เพื่อให้ flow หน้าร้านอ่านง่ายและต่อยอดได้

## ทำไมไม่ควรใส่ทุกอย่างไว้ในไฟล์เดียว

ตอนเริ่ม MVP การเขียนทุกอย่างไว้ใน `app.ts`, `app.html`, และ `app.css` ช่วยให้เห็นภาพเร็ว

แต่เมื่อ flow มี POS, iPad display, reward และ LINE OA mock การรวมทุกอย่างไว้ไฟล์เดียวจะเริ่มมีปัญหา:

- หา logic ยาก
- แก้ UI จุดหนึ่งแล้วกระทบอีกจุดง่าย
- test ยากขึ้น
- คนอ่าน portfolio ไม่เห็นว่าเราออกแบบระบบเป็นส่วน ๆ ได้

จึงควรแยกเป็น focused components

## Container Component คืออะไร

`app.ts` ในโปรเจกต์นี้ทำหน้าที่เป็น container component

หน้าที่ของ container:

- ถือ mock data หลัก
- ถือ state กลางของหน้า
- คำนวณ business logic
- รับ event จาก component ลูก
- ส่งข้อมูลลงไปให้ component ลูกแสดงผล

แนวคิดคือ:

```text
container รู้ว่าระบบทำงานอย่างไร
presentation component รู้ว่าต้องแสดงอะไร
```

## Presentation Component คืออะไร

Presentation component คือ component ที่เน้นแสดงผลและรับ action จากผู้ใช้

ตัวอย่างในโปรเจกต์:

```text
top-nav = navigation
display-panel = iPad storefront preview
pos-panel = staff POS workflow
reward-panel = customer reward choice
line-panel = mock LINE OA messages
```

ข้อดีคือแต่ละ component มีหน้าที่ชัด:

- `pos-panel` ไม่ต้องรู้วิธีคำนวณ reward ทั้งระบบ
- `reward-panel` ไม่ต้องรู้ว่า LINE OA ส่งข้อความอย่างไร
- `display-panel` ไม่ต้องแก้ยอดลูกค้าเอง

## Tailwind กับ CSS แยกกันอย่างไร

หลังปรับ baseline ปี 2026 โปรเจกต์นี้ใช้ Tailwind CSS v4 เป็น styling default เช่นเดียวกับ `ApoRaviz_Portfolio`

หลักการคือ:

```text
Tailwind class ใน template = layout, spacing, color, responsive, state ส่วนใหญ่
src/styles.css             = import Tailwind, theme token และ global base
component .css             = animation/keyframes หรือ visual effect ที่ Tailwind อ่านยาก
```

ตอนนี้ POS workspace ย้าย layout หลักไปเป็น utility class ใน HTML เพื่อให้อ่าน flow ได้จาก template โดยตรง

ไฟล์ที่ควรดูเป็นตัวอย่าง:

```text
src/app/app.html
src/app/components/pos-panel/pos-panel.html
src/app/components/reward-panel/reward-panel.html
src/app/components/line-panel/line-panel.html
```

ส่วน iPad grill animation ยังอยู่ใน `display-panel.css` ได้ เพราะมี `@keyframes`, pseudo state และ visual detail เฉพาะ component

ดังนั้น `app.css` ควรเหลือแค่ host token หรือ selector ที่ Angular component ต้องใช้ ไม่ใช่ที่เก็บ layout ทั้งหน้า

ถ้าต้องเรียน concept กลาง ให้อ่าน:

```text
../../angular/teach/08-tailwind-css-v4.md
```

## input() ใช้ทำอะไร

ใน Angular รุ่นใหม่ component ลูกรับข้อมูลผ่าน `input()`

ตัวอย่างแนวคิด:

```ts
readonly customer = input.required<Customer>();
```

แปลว่า:

- component นี้ต้องได้รับ `Customer`
- ข้อมูลถูกส่งมาจาก parent
- component ลูกไม่ต้องไปหา data เอง

ข้อดีคือ component อ่านและ test ง่าย เพราะ input ชัดเจน

## output() ใช้ทำอะไร

ถ้า component ลูกต้องบอก parent ว่าผู้ใช้ทำอะไร ใช้ `output()`

ตัวอย่างแนวคิด:

```ts
readonly confirmSale = output<void>();
```

แล้วใน template:

```html
<button type="button" (click)="confirmSale.emit()">Confirm</button>
```

แปลว่า:

```text
ลูกไม่แก้ state เอง
ลูกส่ง event ขึ้นไปให้ parent ตัดสินใจ
```

แนวนี้เรียกว่า one-way data flow:

```text
parent ส่ง data ลง
child ส่ง event ขึ้น
```

## ทำไมยังไม่รีบสร้าง Service

โปรเจกต์นี้ยังใช้ mock data จึงให้ `app.ts` ถือ state กลางก่อน

เหตุผลหลัก:

- learning flow อ่านง่าย
- ยังไม่สร้าง abstraction เร็วเกินไป
- business rule ยังปรับได้
- เมื่อมี backend หรือ localStorage ค่อยย้าย logic ไป service

service ที่น่าจะเกิดใน production:

```text
CustomerService
LoyaltyService
RewardService
LineNotificationService
```

## สิ่งที่ควรเรียนจากไฟล์นี้

โครงสร้างที่ดีไม่ได้แปลว่าแยกไฟล์เยอะที่สุด แต่คือแต่ละไฟล์มีเหตุผลชัดเจน

จำง่าย:

```text
แยก component เมื่อมันมีหน้าที่ของตัวเอง
ยังไม่แยก service ถ้ายังไม่มี data source หรือ logic กลางที่จำเป็นจริง
```
