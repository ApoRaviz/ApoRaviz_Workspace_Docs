# Foreign Key คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงบ้านกับกล่องพัสดุ

```text
users.id = บ้านเลขที่ของ user
translations.user_id = ป้ายบนกล่องว่าเป็นของบ้านไหน
foreign key = กติกาว่าป้ายต้องชี้ไปบ้านที่มีอยู่จริง
```

ถ้าป้ายเขียน `user_999` แต่ไม่มีบ้าน `user_999` จริง กล่องนั้นจะกลายเป็นของใครก็ไม่รู้

## แปลเป็นภาษาคนธรรมดา

foreign key คือ column ที่ชี้ไป row ใน table อื่น เพื่อบอกความสัมพันธ์ระหว่างข้อมูล

มันช่วยกันไม่ให้ข้อมูลชี้มั่ว เช่น translation ที่บอกว่าเป็นของ user ที่ไม่มีอยู่จริง

## แปลเป็น technical term

Foreign key คือ constraint ที่บังคับให้ค่าของ column ฝั่ง child table ต้อง match กับ primary key หรือ unique key ใน parent table

ตัวอย่าง:

```text
translations.user_id -> users.id
```

แปลว่า `translations.user_id` ต้องเป็นค่า `users.id` ที่มีอยู่จริง

## ตัวอย่างสั้นที่สุด

```text
users
- id = user_1

translations
- id = tr_1
- user_id = user_1
```

อันนี้ถูก เพราะ `user_1` มีอยู่จริงใน `users`

ตัวอย่างที่ควรถูก DB ปฏิเสธ:

```text
translations.user_id = user_999
```

ถ้าไม่มี `users.id = user_999`

## ON DELETE คืออะไร

Foreign key มีผลตอนลบ parent row ด้วย

```text
RESTRICT / NO ACTION = ยังมีคนอ้างอยู่ ห้ามลบ
CASCADE = ลบแม่แล้วลูกหายตาม
SET NULL = ลบแม่แล้วลูกอยู่ แต่สายสัมพันธ์หาย
```

ตัวอย่าง:

```text
users.id = user_1
translations.user_id = user_1
```

ถ้าลบ `user_1`:

```text
RESTRICT / NO ACTION -> ไม่ให้ลบ เพราะยังมี translations อ้างอยู่
CASCADE -> ลบ translations ของ user_1 ตามไปด้วย
SET NULL -> translations ยังอยู่ แต่ user_id กลายเป็น null
```

## Flow ทีละขั้น

1. Backend ขอ insert หรือ update child row
2. Database เช็กว่า foreign key ชี้ parent row ที่มีจริงไหม
3. ถ้าไม่มี parent row จริง database reject
4. ถ้าจะลบ parent row database ใช้กติกา `ON DELETE` ที่ schema กำหนดไว้

## จุดที่มักงง

- foreign key ไม่ใช่แค่ naming convention เช่น `_id`; ต้องเป็น constraint ใน database ด้วย
- foreign key ช่วยกันข้อมูล orphan หรือ record ที่หาเจ้าของไม่เจอ
- `CASCADE` ไม่ได้ผิดเสมอ แต่ต้องตั้งใจ เพราะลบ parent แล้ว child หายตาม
- `RESTRICT / NO ACTION` เหมาะเมื่อไม่อยากให้ history/audit หายเงียบ ๆ

## ศัพท์ที่เกี่ยวข้อง

- [Primary Key](primary-key.md)
- [Check Constraint](check-constraint.md)
- [PostgreSQL Learning Hub](../index.md)

## เช็กตัวเอง

- ถ้า `translations.user_id` ชี้ user ที่ไม่มีจริง จะเกิดปัญหาอะไร
- `RESTRICT / NO ACTION` ต่างจาก `CASCADE` ยังไง
- ทำไม history หรือ audit data มักไม่ควรถูกลบแบบ cascade ง่าย ๆ

## จำสั้น ๆ

```text
Foreign Key = กันชี้มั่ว
ON DELETE = กติกาว่าถ้าลบแม่ ลูกจะทำยังไง
```
