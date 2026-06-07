# 05 วิธีเล่าโปรเจกต์นี้เป็น Portfolio Case Study

ไฟล์นี้สอนวิธีเขียน case study ให้โปรเจกต์ดูเป็นงาน product จริง ไม่ใช่แค่ demo หน้าเว็บ

## Case Study ควรตอบอะไร

case study ที่ดีควรตอบ 5 คำถาม:

- ปัญหาคืออะไร
- ใครเจอปัญหานี้
- เราออกแบบ solution อย่างไร
- มีข้อจำกัดอะไร
- ถ้าทำต่อ production จะทำอะไรเพิ่ม

ถ้าตอบครบ คนดูจะเห็นวิธีคิด ไม่ใช่เห็นแค่ภาพสวย

## โครงเรื่องที่เหมาะกับ MooPing Loyalty

ใช้โครงนี้ได้เลย:

```text
1. Problem
2. Goal
3. User Flow
4. UX Decisions
5. Technical Decisions
6. Mock vs Production Plan
7. What I Learned
```

โครงนี้เหมาะกับ portfolio เพราะอ่านง่ายและทำให้ recruiter หรือผู้ชมเข้าใจเร็วว่าเราทำอะไรเอง

## Problem

ส่วน problem ควรเล่าให้สั้นและเป็นมนุษย์:

```text
ร้านหมูปิ้งมีโปรโมชันซื้อครบ 10 ไม้ แถม 1 แต่การจำยอดด้วยกระดาษหรือความจำทำให้พลาดง่าย และลูกค้าไม่เห็นสถานะของตัวเองแบบ real-time
```

นี่ดีกว่าพูดแค่ว่า:

```text
ทำระบบสะสมแต้มหมูปิ้ง
```

เพราะมันบอกว่าทำไมระบบนี้ถึงควรมี

## UX Decisions

สิ่งที่ควรเล่า:

- ใช้ confirmation ก่อนบันทึกยอด เพราะหน้าร้านมีโอกาสกดผิด
- มี undo latest sale เพื่อแก้รายการล่าสุดได้เร็ว
- ให้ลูกค้าเลือกของแถมเองเพื่อเพิ่มความรู้สึกมีส่วนร่วม
- แสดง saved rewards เพื่อไม่ให้ลูกค้ากังวลว่าสิทธิ์หาย
- ทำ iPad display ให้หน้าร้านดูทันสมัยและโปร่งใส

UX decisions ควรมีเหตุผลเสมอ ไม่ใช่แค่บอกว่า "เพิ่มปุ่มนี้"

## Technical Decisions

สิ่งที่ควรเล่า:

- ใช้ Angular standalone components
- แยก container component กับ presentation components
- ใช้ mock data ก่อนเพื่อพิสูจน์ flow
- เขียน business logic ให้รองรับซื้อเกิน 10 ไม้
- เตรียม LINE OA mock โดยไม่ใส่ token ใน frontend
- deploy demo ผ่าน GitHub Pages ด้วย CI/CD

ส่วนนี้ช่วยแสดง engineering maturity

## What I Learned

หัวข้อนี้สำคัญมาก เพราะโปรเจกต์ portfolio ไม่ได้มีไว้โชว์แค่ว่าทำได้ แต่โชว์ว่าเราเรียนรู้อะไร

ตัวอย่าง learning:

- การแปลงกติกาธุรกิจเป็น state model
- การออกแบบ POS ให้ลด human error
- การแยก component เมื่อ flow เริ่มซับซ้อน
- การใช้ CI/CD ให้ demo พร้อมเปิดบนอุปกรณ์จริง
- การแยก mock concept ออกจาก production architecture

## Screenshot และ Demo ควรเล่าอะไร

ถ้าใส่รูปใน portfolio อย่าให้รูปทำหน้าที่เป็นแค่ภาพประกอบ

ควรมี caption แบบนี้:

```text
POS confirmation prevents accidental loyalty updates before staff confirms the sale.
```

หรือ:

```text
Saved rewards remain visible after customers choose to redeem later.
```

caption แบบนี้ทำให้ภาพกลายเป็นหลักฐานของการตัดสินใจออกแบบ
