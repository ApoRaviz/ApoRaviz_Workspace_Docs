# Quick Recall — Database

หน้านี้รวมเฉพาะภาพจำสั้น ๆ สำหรับทบทวน PostgreSQL และ Database โดยไม่ต้องอ่านบทเต็ม

เมื่อเพิ่มภาพจำใหม่ในเนื้อหา Database ให้เพิ่มสรุปและลิงก์กลับมาที่หน้านี้ด้วย

## [PostgreSQL](index.md)

```text
PostgreSQL = สมุดบัญชีที่แยกข้อมูลเป็นหลายตาราง
table      = สมุดหนึ่งเล่ม
row        = รายการหนึ่งบรรทัด
id         = เลขที่ใช้เชื่อมรายการระหว่างสมุด
```

## [Primary Key](concepts/primary-key.md)

```text
table       = สมุดรายชื่อ
row         = คนหนึ่งคน
primary key = เลขประจำตัวของคนนั้น
```

## [Foreign Key](concepts/foreign-key.md)

```text
users.id             = บ้านเลขที่
translations.user_id = ป้ายบนกล่องว่าเป็นของบ้านไหน
foreign key          = กติกาว่าป้ายต้องชี้ไปบ้านที่มีอยู่จริง
```

## [Unique Constraint](concepts/unique-constraint.md)

```text
email หนึ่งค่า = ใช้สมัครได้เพียง account เดียว
unique constraint = คนเฝ้าประตูที่ไม่ยอมให้ค่าซ้ำเข้ามา
```

## [Database Index](concepts/database-index.md)

```text
ไม่มี index = เปิดหนังสือไล่ทีละหน้า
มี index    = เปิดสารบัญแล้วกระโดดไปหน้าที่ต้องการ
```

## [Check Constraint](concepts/check-constraint.md)

```text
check constraint = กติกาหน้าแบบฟอร์มของ database

role ต้องเป็น admin หรือ user
จำนวนต้องไม่ติดลบ
```

## [Database Transaction](concepts/database-transaction.md)

```text
หักเงินจากบัญชี A
เพิ่มเงินให้บัญชี B

สองขั้นต้องสำเร็จพร้อมกัน ถ้าขั้นหนึ่งพังต้องย้อนทั้งหมด
```
