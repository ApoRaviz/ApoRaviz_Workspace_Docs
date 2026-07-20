# Primary Key คืออะไร

## ภาพจำง่าย ๆ

ลองนึกว่า table คือสมุดรายชื่อ และแต่ละแถวคือคนหนึ่งคน

```text
primary key = เลขประจำตัวของแถวนั้น
```

ชื่อหรือ email อาจเปลี่ยนได้ แต่เลขประจำตัวของ record ไม่ควรเปลี่ยน

## แปลเป็นภาษาคนธรรมดา

primary key คือค่าหลักที่ใช้บอกว่า row นี้คือ row ไหน

ใน table หนึ่ง ๆ แต่ละ row ต้องมี primary key ไม่ซ้ำกัน

ตัวอย่าง:

```text
users.id = ตัวตนของ user
translations.id = ตัวตนของ translation record
invite_tokens.id = ตัวตนของ invite token record
```

## แปลเป็น technical term

Primary key คือ constraint ที่ระบุ column หรือชุด column สำหรับ identify row แบบ unique และ not null

โดยทั่วไป table หนึ่งมี primary key หลักหนึ่งชุด

## ตัวอย่างสั้นที่สุด

```text
users
- id uuid primary key
- email
- display_name
```

ถ้า user เปลี่ยน email:

```text
email เปลี่ยนได้
id ยังเป็นค่าเดิม
```

table อื่นจึงควรอ้าง `users.id` ไม่ใช่อ้าง `users.email`

## Flow ทีละขั้น

1. Database สร้าง row ใหม่
2. Row นั้นได้ `id`
3. Table อื่นใช้ `id` นี้เป็นตัวอ้างอิง
4. ต่อให้ข้อมูลอื่นเปลี่ยน ความสัมพันธ์ยังชี้ row เดิมได้

## จุดที่มักงง

- primary key ไม่ใช่แค่ "เลขเรียง" เสมอไป จะเป็น `uuid` ก็ได้
- email unique ได้ แต่ไม่ควรเป็น primary key ถ้าอนาคตอาจเปลี่ยน email
- primary key ใช้อ้างตัว row ส่วน unique constraint ใช้กันค่าซ้ำใน field อื่น

## ศัพท์ที่เกี่ยวข้อง

- [Foreign Key](foreign-key.md)
- [Unique Constraint](unique-constraint.md)
- [PostgreSQL Learning Hub](../index.md)

## เช็กตัวเอง

- ทำไม translation history ควรชี้ไป `users.id` ไม่ใช่ `users.email`
- primary key ต่างจาก unique constraint ยังไง
- ถ้า user เปลี่ยน email แล้ว table อื่นอ้าง email อยู่ จะเสี่ยงอะไร

## จำสั้น ๆ

```text
Primary Key = ตัวตนของ row
นิ่งที่สุด ใช้อ้างอิง record นี้
```
