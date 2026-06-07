# 08 MooPing Demo Refactor

ไฟล์นี้สอนวิธีคิดตอน refactor demo ของ `ApoRaviz_Mooping`: เมื่อไหร่ควรแยกไฟล์ เมื่อไหร่ยังไม่ควรเพิ่ม abstraction และจะทำให้ flow หน้าร้านอ่านง่ายขึ้นได้อย่างไร

## Refactor คืออะไร

Refactor คือการปรับโครงสร้าง code โดยไม่เปลี่ยนพฤติกรรมหลักของระบบ

เป้าหมายไม่ใช่ทำให้ code ดูซับซ้อนขึ้น แต่ทำให้:

- อ่านง่ายขึ้น
- test ง่ายขึ้น
- แก้จุดหนึ่งแล้วไม่กระทบทั้งหน้า
- คนอื่นเข้าใจ intent ได้เร็ว

## สัญญาณว่าเริ่มควรแยก Component

ควรพิจารณาแยก component เมื่อ:

- HTML ยาวจนหา section ยาก
- state หลายชุดปนกัน
- UI ส่วนหนึ่งมีหน้าที่เฉพาะ
- ต้อง reuse layout หรือ behavior
- test หรือ debug เริ่มยาก

ใน MooPing Loyalty สัญญาณเหล่านี้เกิดเมื่อหน้าเริ่มมีทั้ง:

```text
hero
iPad display
POS
reward choice
LINE OA mock
```

## Refactor ที่ดีควรทำทีละชั้น

ลำดับที่ดี:

```text
1. ทำ feature ให้ flow ถูกก่อน
2. ตั้งชื่อ model/type ให้ชัด
3. แยก presentation components
4. ย้าย layout/style ทั่วไปไปใช้ Tailwind utility classes
5. เก็บ CSS เฉพาะ animation หรือ visual effect ที่จำเป็นจริง
6. ค่อยพิจารณา service เมื่อมี data source จริง
7. เพิ่ม tests กัน regression
```

ถ้าแยก service เร็วเกินไป อาจได้ abstraction ที่ไม่ตรงกับปัญหาจริง

## ทำไมไม่ควรปล่อย app.css ใหญ่เกินไป

ตอน prototype เราอาจรวม style ไว้ที่ `app.css` เพื่อเห็นภาพเร็ว

แต่เมื่อโปรเจกต์มี `pos-panel`, `display-panel`, `reward-panel` และ `line-panel` แล้ว style ควรมี owner ชัดขึ้น:

- layout และ spacing ทั่วไป ใช้ Tailwind ใน template
- theme token ใช้ `src/styles.css` ผ่าน `@theme`
- animation เฉพาะจอ เช่น grill/stamp pulse อยู่ใน component CSS ได้
- `app.css` เหลือไว้เป็น host token และ selector กลางที่จำเป็นกับ Angular component เท่านั้น

แนวนี้ทำให้คนอ่านรู้ว่า HTML บอกโครงหน้าจอ, TypeScript บอก state/logic และ CSS ที่เหลือมีเหตุผลเฉพาะจริง ๆ

## ทำไม TypeScript Models สำคัญ

ไฟล์ model เช่น:

```text
src/app/models/loyalty.models.ts
```

ช่วยบอกว่า object สำคัญในระบบหน้าตาเป็นอย่างไร

ตัวอย่าง concept:

```ts
export interface Customer {
  id: number;
  name: string;
  sticks: number;
  pendingRewards: number;
  savedRewards: number;
}
```

ข้อดี:

- component เห็น contract เดียวกัน
- typo ถูกจับได้เร็วขึ้น
- test อ่านง่าย
- เวลาเพิ่ม backend จะ map data ได้ชัดขึ้น

## อย่าให้ Component ลูกถือ Business Logic มากเกินไป

component ลูกควร emit event เช่น:

```text
confirmSale
clearDraft
redeemReward
saveRewardForLater
```

ส่วนการคำนวณว่า reward เพิ่มเท่าไร หรือ state ต้องเปลี่ยนอย่างไร ควรอยู่ใน container หรือ service

เหตุผล:

- business logic อยู่จุดเดียว
- ลดการคำนวณซ้ำ
- test ง่าย
- เปลี่ยน UI ได้โดยไม่ต้องเปลี่ยนกฎธุรกิจ

## สิ่งที่ควรเรียนจากไฟล์นี้

refactor ที่ดีคือการทำให้ intent ของระบบชัดขึ้น

จำง่าย:

```text
แยกตาม responsibility ไม่ใช่แยกเพราะไฟล์ยาวอย่างเดียว
เพิ่ม abstraction เมื่อมันลดความสับสนจริง
```
