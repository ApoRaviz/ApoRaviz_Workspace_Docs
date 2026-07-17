# Privilege Escalation คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงงานออฟฟิศที่มีบัตรผ่านหลายระดับ

```text
พนักงานทั่วไป = เข้าได้บางห้อง
admin = เข้าได้เกือบทุกห้อง
privilege escalation = คนที่ควรมีบัตรธรรมดา กลับได้บัตร admin โดยไม่ผ่านการอนุมัติ
```

ปัญหาไม่ได้อยู่ที่ระบบมี admin แต่ปัญหาคือคนที่ไม่ควรเป็น admin ได้สิทธิ์สูงขึ้นเอง

## แปลเป็นภาษาคนธรรมดา

privilege escalation คือสถานการณ์ที่ user ได้สิทธิ์มากกว่าที่ควรมี

ตัวอย่างง่าย ๆ:

```text
สมัครเป็น user ธรรมดา
แต่แอบส่ง role = admin ไปใน request
backend เชื่อ request นั้น
user คนนั้นกลายเป็น admin
```

## แปลเป็น technical term

privilege escalation คือ security issue ที่ actor ได้ privilege หรือ permission สูงกว่าที่ได้รับอนุญาตจริง

ใน backend API มักเกิดเมื่อ server เชื่อข้อมูลจาก client มากเกินไป เช่นรับ `role`, `isActive`, `createdByAdminId` หรือ field สำคัญอื่นจาก request body โดยไม่ตรวจสิทธิ์จากฝั่ง server

## ตัวอย่างสั้นที่สุด

Request ที่ไม่ควรยอมรับ:

```json
{
  "email": "apo@example.com",
  "password": "example-password",
  "role": "admin"
}
```

แนวทางที่ถูก:

```text
frontend ส่งข้อมูลสมัคร
backend สร้าง user
backend กำหนด role = user เอง
```

## Flow ทีละขั้น

1. User ส่ง request มาที่ backend
2. Backend รับเฉพาะ field ที่ user ควรควบคุมได้
3. Backend กำหนดสิทธิ์เอง เช่น `role = user`
4. ถ้าจะให้เป็น admin ต้องผ่าน flow ที่ตรวจสิทธิ์ admin หรือ process พิเศษ

## จุดที่มักงง

- ไม่ใช่ทุก field ที่ frontend ส่งมาได้ควรถูกเชื่อ
- Field ที่เกี่ยวกับสิทธิ์ต้องเป็น server-owned field
- Validation อย่างเดียวไม่พอ ถ้ากติกาสิทธิ์ผิดตั้งแต่ design

## ศัพท์ที่เกี่ยวข้อง

- [API Contract](api-contract.md)

## เช็กตัวเอง

- ทำไม register request ไม่ควรมี `role`
- ถ้า backend รับ `isActive: true` จาก user เองจะเสี่ยงอะไร
- field แบบไหนควรเป็น server-owned field

## จำสั้น ๆ

```text
privilege escalation = ได้สิทธิ์สูงกว่าที่ควรมี
สิทธิ์ต้องให้ backend คุม ไม่ให้ user พิมพ์เอง
```
