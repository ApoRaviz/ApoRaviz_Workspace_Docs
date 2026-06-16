# PostgreSQL Learning Hub

PostgreSQL คือ relational database ที่เก็บข้อมูลเป็น table และความสัมพันธ์ เหมาะกับระบบจริงที่ต้องการความถูกต้อง เช่น WMS, sales, reward, report, customer และ transaction

ใน workspace นี้ PostgreSQL หรือ Supabase เป็น default database สำหรับ backend ระยะยาว

```text
Angular frontend
-> NestJS backend
-> PostgreSQL/Supabase database
```

## ภาพจำง่าย ๆ

PostgreSQL เหมือนสมุดบัญชีที่มีหลายตาราง:

```text
customers     = สมุดรายชื่อลูกค้า
transactions  = สมุดรายการซื้อ
rewards       = สมุดสิทธิ์ของแถม
reward_claims = สมุดประวัติการใช้สิทธิ์
```

แต่ละ table มีแถวข้อมูล และเชื่อมกันด้วย id

## Technical Term

```text
table = ตารางข้อมูล เช่น customers
row = แถวข้อมูลหนึ่งรายการ
column = ช่องข้อมูล เช่น name, phone
primary key = id หลักของ row
foreign key = id ที่อ้างไป table อื่น
index = ตัวช่วยค้นหาเร็วขึ้น
transaction = ชุดคำสั่ง database ที่ต้องสำเร็จหรือ fail พร้อมกัน
migration = ไฟล์เปลี่ยน schema แบบมีประวัติ
schema = โครงสร้าง table/column/relationship
```

## ตัวอย่างจาก MooPing Reward

ระบบสะสมสิทธิ์หมูปิ้งควรมีข้อมูลประมาณนี้:

```text
customers
- id
- name
- phone
- line_user_id
- stamp_count
- total_stamps_lifetime

transactions
- id
- customer_id
- stick_count
- reward_earned
- created_at

rewards
- id
- customer_id
- reward_type
- status
- created_at
- claimed_at
```

ความสัมพันธ์:

```text
customers.id
-> transactions.customer_id
-> rewards.customer_id
```

แปลว่า customer หนึ่งคนมี transaction ได้หลายรายการ และมี reward ได้หลายสิทธิ์

## ทำไมต้องมี transaction

สมมติลูกค้าซื้อ 20 ไม้ ระบบต้อง:

```text
1. บันทึก transaction
2. เพิ่มยอดสะสม
3. สร้าง reward 2 สิทธิ์
4. ส่ง LINE message
```

ถ้าขั้นตอนหนึ่ง fail กลางทาง ข้อมูลอาจเพี้ยน เช่น transaction ถูกบันทึกแล้วแต่ reward ไม่ถูกสร้าง

database transaction ช่วยให้:

```text
สำเร็จครบทุกขั้น -> commit
มีขั้นตอนไหน fail -> rollback
```

สำหรับระบบขายจริง เรื่องนี้สำคัญมาก

## Supabase คืออะไร

Supabase ใช้ PostgreSQL เป็นแกน แล้วเพิ่มเครื่องมือให้เริ่มเร็ว:

```text
PostgreSQL database
+ dashboard
+ auth
+ storage
+ generated API
+ edge functions บางกรณี
```

จำง่าย ๆ:

```text
PostgreSQL = database engine
Supabase   = service ที่ให้ PostgreSQL พร้อมเครื่องมือรอบตัว
```

## ใช้กับ ApoRaviz_Tools อย่างไร

ตอนนี้ `split-order-txt` เป็น Node.js CLI ที่อ่านไฟล์และเขียน output ในเครื่อง

ถ้าอนาคตทำเป็น web/backend อาจใช้ database เพื่อเก็บ:

- upload job metadata
- file name
- status เช่น pending, success, failed
- output download path
- error message
- created_at

แต่ไม่ควรรีบใส่ database ถ้า CLI local ยังพอ และ user ไม่ต้องมี history/report

## กติกาออกแบบ schema เบื้องต้น

- table name ใช้รูปพหูพจน์ เช่น `customers`, `transactions`
- ทุก table ควรมี `id`
- ข้อมูลเวลาใช้ `created_at`, `updated_at`
- ความสัมพันธ์ใช้ foreign key เช่น `customer_id`
- field ที่เป็นเงิน/จำนวนต้องระวัง type
- business rule สำคัญควร test ทั้ง backend และ database transaction
- secret และ service role key ต้องอยู่ฝั่ง backend เท่านั้น

## จุดที่มักงง

- PostgreSQL ไม่ใช่ backend API ต้องมี backend เช่น NestJS คุยกับ database
- Supabase ไม่ได้แปลว่าไม่ต้องเข้าใจ SQL เพราะแกนยังเป็น PostgreSQL
- foreign key คือการบอกว่า row นี้อ้างถึง row ในอีก table
- transaction ใน database ไม่ใช่ transaction รายการขาย แต่ชื่อ concept ซ้ำกัน
- migration คือประวัติการเปลี่ยน schema ไม่ใช่ไฟล์ backup ข้อมูล

## Self-check

ลองตอบเอง:

1. table กับ row ต่างกันอย่างไร
2. primary key กับ foreign key ทำหน้าที่อะไร
3. ทำไมการบันทึกยอดขายและ reward ควรคิดเรื่อง transaction
4. Supabase ต่างจาก PostgreSQL อย่างไร
5. MooPing Reward ควรเก็บ transaction history เพราะอะไร

## สรุปจำสั้น ๆ

```text
PostgreSQL = ตารางข้อมูลจริงและความสัมพันธ์
Supabase = PostgreSQL แบบ managed พร้อมเครื่องมือช่วยเริ่มเร็ว
```

