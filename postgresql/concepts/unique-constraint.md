# Unique Constraint คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงระบบสมัครสมาชิก

```text
email = apo@example.com
```

ถ้าระบบบอกว่า email ห้ามซ้ำ ก็ต้องมีคนใช้ email นี้ได้แค่ account เดียว

## แปลเป็นภาษาคนธรรมดา

unique constraint คือกติกาว่า column นี้หรือชุด column นี้ห้ามมีค่าซ้ำกันใน table

ใช้กับข้อมูลที่ต้องไม่ซ้ำ เช่น email, username, token hash หรือ external id

## แปลเป็น technical term

Unique constraint คือ database constraint ที่ enforce uniqueness บน column หรือชุด column

ใน PostgreSQL unique constraint มักสร้าง unique index เบื้องหลังเพื่อให้ database ตรวจค่าซ้ำได้เร็ว

## ตัวอย่างสั้นที่สุด

```text
users.email_normalized UNIQUE
```

ถ้ามี row แล้ว:

```text
email_normalized = apo@example.com
```

row ใหม่ที่ใช้ค่าเดียวกันต้องถูก reject

## ต่างจาก Primary Key อย่างไร

```text
Primary Key
= ตัวตนหลักของ row
= มีได้หนึ่งชุดหลักต่อ table
= ห้าม null
= table อื่นนิยมใช้ foreign key มาชี้
```

```text
Unique Constraint
= กติกาห้ามค่าซ้ำใน field อื่น
= มีได้หลายอันต่อ table
= ใช้กับข้อมูลที่ unique แต่ไม่ใช่ตัวตนหลักของ row
```

ตัวอย่าง:

```text
users.id = primary key
users.email_normalized = unique
```

## Email Normalization กับ Unique

ถ้า user สมัครด้วย:

```text
Apo@Example.com
apo@example.com
APO@example.com
```

ระบบอาจต้องมองว่าเป็น email เดียวกัน

วิธีหนึ่งคือเก็บ:

```text
email = ค่าที่ user กรอก หลัง trim
email_normalized = lower-case email หลัง trim
```

แล้วตั้ง unique ที่:

```text
email_normalized
```

## จุดที่มักงง

- unique ไม่ได้แปลว่า field นั้นต้องเป็น primary key
- unique ช่วยกันข้อมูลซ้ำใน database แม้ backend มี bug
- ถ้าจะกัน email ซ้ำ ต้องตัดสินใจ normalization ให้ชัดก่อนสร้าง unique constraint
- unique constraint กับ unique index ใกล้กันมาก แต่ในบทเรียน design ให้จำว่า unique คือกติกาห้ามซ้ำ

## ศัพท์ที่เกี่ยวข้อง

- [Primary Key](primary-key.md)
- [Index](database-index.md)
- [Check Constraint](check-constraint.md)

## เช็กตัวเอง

- ทำไม `users.email_normalized` ควร unique
- primary key กับ unique constraint ต่างกันยังไง
- ถ้า unique ที่ `email` ตรง ๆ แต่ไม่ normalize จะเสี่ยงอะไร

## จำสั้น ๆ

```text
Unique = กันซ้ำ
Primary Key = ตัวตนหลัก
```
