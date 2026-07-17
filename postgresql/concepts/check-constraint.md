# Check Constraint คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงแบบฟอร์มสมัครสมาชิกที่มีกติกา:

```text
role ต้องเป็น admin หรือ user
ข้อความต้องยาว 1-1000 ตัวอักษร
```

ถ้ากรอกนอกกติกา ระบบไม่ควรรับข้อมูลนั้นเข้า database

## แปลเป็นภาษาคนธรรมดา

check constraint คือกติกาใน database ที่บอกว่า value ใน row ต้องผ่านเงื่อนไขที่กำหนด

มันเป็นด่านสุดท้ายที่ช่วยกันข้อมูลผิด แม้ backend จะมี bug หรือมี script ใส่ข้อมูลตรงเข้า database

## แปลเป็น technical term

Check constraint คือ database constraint ที่ evaluate boolean expression ต่อ row ถ้า expression ไม่เป็นจริง database จะ reject insert/update

## ตัวอย่างสั้นที่สุด

Role ต้องเป็นหนึ่งในค่าที่ระบบรองรับ:

```text
CHECK (role IN ('admin', 'user'))
```

ข้อความ input ต้องยาว 1-1000 characters:

```text
CHECK (char_length(input_text) BETWEEN 1 AND 1000)
```

## ทำไมต้องมีทั้ง API Validation และ DB Check

```text
API validation = กันตั้งแต่ประตูหน้า
DB check constraint = กันชั้นสุดท้าย
```

ถ้า backend route ลืม validate, seed script ผิด, หรือ future endpoint bypass validation, DB ยังช่วย reject ข้อมูลที่ผิดกติกาได้

## ใช้กับอะไรดี

เหมาะกับกติกาที่ชัดและไม่ซับซ้อน เช่น:

```text
role อยู่ในชุดค่าที่อนุญาต
จำนวนต้องมากกว่า 0
ข้อความต้องไม่ว่างและไม่ยาวเกิน
วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น
```

ไม่เหมาะกับกติกาที่ต้องเรียก service ภายนอก หรือ business flow ซับซ้อนมาก

## จุดที่มักงง

- check constraint ไม่ใช่ index
- check constraint ไม่ได้ช่วยให้ query เร็วขึ้น จุดหลักคือกันข้อมูลผิด
- validation ที่ backend ดีแล้วก็ยังมี DB check ได้ เพราะเป็นคนละชั้นป้องกัน
- check constraint ควรอ่านง่ายและตรงกับ business rule สำคัญ

## ศัพท์ที่เกี่ยวข้อง

- [Unique Constraint](unique-constraint.md)
- [Foreign Key](foreign-key.md)
- [PostgreSQL Learning Hub](../index.md)

## เช็กตัวเอง

- ทำไม `role` ควรมี check constraint
- API validation กับ DB check constraint ต่างกันยังไง
- check constraint ช่วยเรื่อง performance ไหม

## จำสั้น ๆ

```text
Check Constraint = กันค่าผิดกติกา
API กันประตูหน้า DB กันชั้นสุดท้าย
```
