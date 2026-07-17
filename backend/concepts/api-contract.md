# API Contract คืออะไร

## ภาพจำง่าย ๆ

ลองนึกว่า frontend กับ backend เหมือนคนสั่งอาหารกับคนรับออเดอร์

```text
frontend = คนสั่ง
backend endpoint = คนรับออเดอร์
API contract = ใบเมนูและกติกาว่าต้องสั่งยังไง
service/database/AI = ครัวหลังร้าน
```

ถ้าไม่มีเมนูและกติกาชัด ๆ คนสั่งอาจพูดอย่างหนึ่ง แต่คนรับออเดอร์เข้าใจอีกอย่างหนึ่ง สุดท้ายอาหารออกมาผิด หรือระบบพังตอนเอามาประกอบกัน

## แปลเป็นภาษาคนธรรมดา

API contract คือข้อตกลงระหว่าง frontend กับ backend ว่า:

- ต้องเรียก endpoint ไหน
- ต้องส่งข้อมูลอะไรไป
- backend จะตอบข้อมูลอะไรกลับมา
- ถ้าสำเร็จใช้ status code อะไร
- ถ้าผิดพลาดใช้ status code อะไร
- endpoint นั้นต้อง login หรือมีสิทธิ์พิเศษไหม

มันคือการออกแบบ “ภาษาที่สองฝั่งใช้คุยกัน” ก่อนลงมือเขียน code จริง

## แปลเป็น technical term

API contract คือ specification ของ HTTP API ที่กำหนดอย่างน้อย:

```text
method
path
auth requirement
request body หรือ query parameter
response body
success status code
error status code
error response shape
```

ตัวอย่าง endpoint หนึ่งตัว:

```text
POST /translations
```

แปลว่า client ส่ง request แบบ `POST` ไปที่ path `/translations` เพื่อให้ backend ทำงานบางอย่าง เช่น แปลข้อความและบันทึกผล

## ตัวอย่างสั้นที่สุด

```text
POST /translations
Auth: login required
```

Request:

```json
{
  "inputText": "I got disconnected from the server."
}
```

Success:

```text
201 Created
```

```json
{
  "id": "tr_123",
  "inputText": "I got disconnected from the server.",
  "translatedText": "ฉันหลุดออกจากเซิร์ฟเวอร์",
  "grammarExplanation": "I got disconnected = ฉันถูกตัดการเชื่อมต่อหรือหลุดออกจากระบบ",
  "createdAt": "2026-07-15T10:30:00.000Z"
}
```

## Flow ทีละขั้น

1. Product owner บอกว่า user ต้องทำอะไรได้ เช่น พิมพ์ประโยคอังกฤษแล้วให้ระบบแปล
2. ทีมออกแบบ endpoint เช่น `POST /translations`
3. ทีมตกลง request body เช่น ใช้ key `inputText`
4. ทีมตกลง response body เช่น `translatedText`, `grammarExplanation`, `createdAt`
5. ทีมตกลง error เช่น `400` เมื่อ `inputText` ว่าง และ `401` เมื่อยังไม่ login
6. frontend, backend, database schema, test case และ docs ใช้ข้อตกลงเดียวกัน

## Status Code ที่เจอบ่อย

```text
200 OK = request สำเร็จแบบทั่วไป
201 Created = สร้าง resource หรือ record ใหม่สำเร็จ
400 Bad Request = request ผิดกติกา เช่น field ขาดหรือรูปแบบผิด
401 Unauthorized = ยังไม่ login, token ไม่มี, token ผิด, หรือ token หมดอายุ
403 Forbidden = login แล้ว แต่สิทธิ์ไม่พอ
404 Not Found = ไม่เจอ resource ที่ขอ เช่น id นี้ไม่มี
409 Conflict = request ถูกรูปแบบแล้ว แต่ชนกับ state ปัจจุบัน เช่น email ซ้ำ
500 Internal Server Error = backend พังเอง
```

จุดสำคัญ:

```text
400 = client ส่งมาผิดกติกา
409 = client ส่งมาถูกรูปแบบ แต่ชนกับข้อมูลหรือสถานะที่มีอยู่แล้ว
```

## Server-Owned Field คืออะไร

บาง field ไม่ควรให้ frontend หรือ user ส่งมาเอง เพราะ backend ต้องคุมเอง

ตัวอย่าง:

```text
id
role
createdAt
isActive
tokenHash
```

ถ้า register endpoint ยอมรับ `role` จาก request body คนสมัครอาจส่ง:

```json
{
  "email": "apo@example.com",
  "password": "example-password",
  "role": "admin"
}
```

ผลคือ user คนนั้นอาจได้สิทธิ์ `admin` ทันทีโดยไม่มีใครอนุมัติ แบบนี้เรียกว่า [privilege escalation](privilege-escalation.md) หรือการยกระดับสิทธิ์โดยไม่ได้รับอนุญาต

ระบบจึงต้องกำหนด `role` เองหลังบ้าน ไม่รับจาก user

## Error Response ควรบอกแค่ไหน

Error ที่เป็น validation ควรบอกเหตุผลให้แก้ได้:

```json
{
  "message": "limit must be between 1 and 50",
  "error": "Bad Request",
  "statusCode": 400
}
```

แต่ error ที่เกี่ยวกับ login หรือ token ต้องระวังไม่บอกละเอียดเกินไป:

```json
{
  "message": "Invalid email or password",
  "error": "Unauthorized",
  "statusCode": 401
}
```

ไม่ควรแยกแบบนี้ใน login:

```text
Email exists but password is wrong
```

เพราะจะช่วยให้คนโจมตีเดาได้ว่า email ไหนมี account อยู่จริง

## จุดที่มักงง

- API contract ไม่ใช่ database schema แต่ช่วยบอกว่า database schema ต้องรองรับข้อมูลอะไร
- `endpoint` ไม่ใช่แค่ path แต่รวม method, request, response, error และ auth rule ด้วย
- `401` กับ `403` ต่างกัน: `401` ยังยืนยันตัวตนไม่ได้, `403` รู้แล้วว่าเป็นใครแต่สิทธิ์ไม่พอ
- `id` unique ไม่ได้แปลว่าควรใช้แทน `createdAt` เพื่อเรียงข้อมูลล่าสุดเสมอ
- response ไม่จำเป็นต้องส่งทุก field ที่ database มี ส่งเท่าที่ client ต้องใช้

## ศัพท์ที่เกี่ยวข้อง

- Backend Stack: [Backend Stack ของ ApoRaviz](../index.md)
- Privilege Escalation: [Privilege Escalation](privilege-escalation.md)
- NestJS: [NestJS Learning Hub](../../nestjs/index.md)
- Node.js Environment Variable: [Environment Variable](../../nodejs/concepts/environment-variable.md)
- Secret: [Secret](../../nodejs/concepts/secret.md)

## เช็กตัวเอง

- API contract ช่วยป้องกันปัญหาอะไรระหว่าง frontend กับ backend
- ทำไม request body ของ register ไม่ควรมี `role`
- `401 Unauthorized` กับ `403 Forbidden` ต่างกันยังไง
- ถ้า `GET /translations?limit=500` แต่ max คือ 50 ควรตอบอะไร และควรมี message แบบไหน

## จำสั้น ๆ

```text
API contract = ข้อตกลงการคุยกันของ frontend/backend
request = ส่งอะไรไป
response = ได้อะไรกลับมา
error = ถ้าพลาด บอกให้ถูกและไม่ leak
```
