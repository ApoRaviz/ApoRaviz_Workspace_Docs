# Index คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงหนังสือเล่มหนา

```text
ไม่มี index = เปิดไล่ทีละหน้า
มี index = เปิดสารบัญแล้วกระโดดไปหน้าที่ต้องการ
```

Database index ก็คล้ายกัน มันช่วยให้ database หา หรือเรียงข้อมูลบางแบบได้เร็วขึ้น

## แปลเป็นภาษาคนธรรมดา

index คือสารบัญของ database

ถ้า query ต้องหา row จาก column บางตัวบ่อย ๆ หรือเรียงข้อมูลแบบเดิมซ้ำ ๆ index อาจช่วยให้เร็วขึ้น

## แปลเป็น technical term

Index คือ data structure ที่ database สร้างเพิ่มจาก table เพื่อช่วย lookup, filtering, ordering หรือ uniqueness

ใน PostgreSQL index ที่เจอบ่อยคือ B-Tree แต่รายละเอียดลึกจะเรียนตอนทำ query performance จริง

## ตัวอย่างสั้นที่สุด

DevEng ต้องดึง history ล่าสุดของ user:

```sql
SELECT *
FROM translations
WHERE user_id = :user_id
ORDER BY created_at DESC
LIMIT 20;
```

Index ที่เข้ากับ query:

```text
INDEX (user_id, created_at DESC)
```

ภาพจำ:

```text
index(created_at) = ชั้นวางเรียงตามเวลา แต่ปนของทุกคน
index(user_id, created_at) = ชั้นวางแยกเจ้าของก่อน แล้วเรียงเวลาข้างใน
```

## Composite Index คืออะไร

composite index คือ index ที่มีหลาย column

```text
(user_id, created_at)
```

แปลว่า index จัดข้อมูลโดยดู `user_id` ก่อน แล้วค่อยดู `created_at`

เหมาะกับ query ที่ทำทั้งสองอย่าง:

```text
หาเฉพาะ user คนนี้
เรียงล่าสุดก่อน
```

## Index ไม่ฟรี

ข้อดี:

```text
ค้นหาเร็วขึ้น
เรียงข้อมูลบางแบบเร็วขึ้น
unique index กันค่าซ้ำได้
```

ข้อเสีย:

```text
insert/update/delete ช้าลงนิดหนึ่ง เพราะต้องอัปเดตสารบัญด้วย
ใช้พื้นที่เพิ่ม
สร้างมั่วเยอะไป database หนักขึ้น
```

ดังนั้นไม่ควรสร้าง index ทุก column แต่สร้างตาม query ที่ใช้จริง

## จุดที่มักงง

- index ไม่ได้ทำให้ทุกอย่างเร็วขึ้นเสมอไป
- index ควรตาม query ไม่ใช่ตามความรู้สึก
- column order ใน composite index มีความหมาย
- unique constraint มักใช้ unique index เบื้องหลัง แต่จุดประสงค์หลักคือกันค่าซ้ำ
- รายละเอียด B-Tree, cost, และ `EXPLAIN ANALYZE` ควรเรียนตอนดู performance จริง

## ศัพท์ที่เกี่ยวข้อง

- [Unique Constraint](unique-constraint.md)
- [Primary Key](primary-key.md)
- [PostgreSQL Learning Hub](../index.md)

## เช็กตัวเอง

- ทำไม `translations(user_id, created_at DESC)` เหมาะกับ history query
- index มีข้อเสียอะไร
- composite index ต่างจาก index column เดียวอย่างไร

## จำสั้น ๆ

```text
Index = สารบัญช่วยหา/เรียงเร็ว
สร้างตาม query ที่ใช้จริง ไม่ใช่สร้างทุก column
```
