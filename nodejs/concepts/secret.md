# Secret คืออะไร

## ภาพจำง่าย ๆ

ถ้า code คือสูตรอาหาร secret คือกุญแจห้องเก็บวัตถุดิบ

```text
สูตรอาหารแชร์ได้
กุญแจห้องเก็บของห้ามแชร์
```

ในโปรเจกต์ software ก็เหมือนกัน:

```text
source code = แชร์ให้ทีม / public repo บางโปรเจกต์ได้
secret      = ห้ามหลุด เพราะใช้เข้าถึงระบบจริงได้
```

## แปลเป็นภาษาคนธรรมดา

secret คือค่าที่ถ้าคนอื่นรู้แล้วอาจเอาไปเข้าถึงระบบ, ข้อมูล, เงิน, service หรือสิทธิ์บางอย่างแทนเราได้

ตัวอย่าง:

```text
DATABASE_URL พร้อม user/password
API_KEY
JWT_SECRET
OAuth client secret
Webhook signing secret
Access token
Private key
```

## แปลเป็น technical term

secret คือ sensitive credential หรือ sensitive configuration ที่ต้องถูกจัดการนอก source code และควบคุมสิทธิ์การเข้าถึง

ใน Node.js/backend มักอ่าน secret ผ่าน environment variable:

```ts
const jwtSecret = process.env["JWT_SECRET"];
```

## ทำไมไม่ hardcode secret

ไม่ควรเขียน secret ลง code แบบนี้:

```ts
const jwtSecret = "real-production-secret";
```

เพราะเมื่อ commit แล้ว secret จะติดไปกับ Git history

แม้ commit ถัดไปลบบรรทัดนั้นออก:

```text
commit A = เพิ่ม secret ลงไฟล์
commit B = ลบ secret ออกจากไฟล์
```

secret ยังเคยอยู่ใน commit A และคนที่เข้าถึง history อาจย้อนดูได้

ถ้า push ขึ้น remote เช่น GitHub แล้ว ความเสี่ยงยิ่งมากขึ้น เพราะ secret ไม่ได้อยู่แค่ในเครื่องเราแล้ว

## ทำไมลบทีหลังยังไม่พอ

Git เก็บประวัติเป็น commit chain

```text
commit A: มี API key
commit B: ลบ API key
```

ไฟล์ล่าสุดอาจดูสะอาดแล้ว แต่ commit เก่ายังมีร่องรอย

ดังนั้นถ้า secret หลุดจริง สิ่งที่ควรคิดคือ:

```text
1. revoke หรือ rotate secret นั้นทันที
2. ตรวจว่า remote/history/cache/log มีร่องรอยไหม
3. ค่อย clean history ถ้าจำเป็นและเข้าใจผลกระทบ
```

สำหรับมือใหม่ จำก่อนว่า:

```text
อย่าให้ secret เข้า Git ตั้งแต่แรก ง่ายและปลอดภัยกว่าแก้ทีหลังมาก
```

## วิธีที่ปลอดภัยกว่า

code อ่านชื่อค่าจาก environment:

```ts
const databaseUrl = process.env["DATABASE_URL"];
```

ค่าจริงอยู่ข้างนอก code เช่น:

```text
local machine  -> .env ที่ไม่ commit
server/hosting -> secret setting ของ platform
CI/CD          -> repository secrets
```

อ่านต่อ: [.env File](dotenv-file.md)

ภาพจำ:

```text
code = รู้ว่าต้องใช้กุญแจชื่อ DATABASE_URL
env  = เป็นที่เก็บกุญแจจริงตอน runtime
Git  = ไม่ควรเห็นกุญแจจริง
```

## Secret ต่างจาก config ทั่วไปอย่างไร

config บางอย่างไม่ลับ:

```text
APP_NAME=ApoRaviz DevEng
PUBLIC_API_BASE_URL=https://api.example.com
FEATURE_FLAG_DEMO=true
```

แต่ secret ต้องปกป้อง:

```text
DATABASE_PASSWORD=...
JWT_SECRET=...
OPENAI_API_KEY=...
```

จุดตัดสินง่าย ๆ:

```text
ถ้าคนอื่นเห็นแล้วเอาไปใช้แทนเราได้ = secret
ถ้าคนอื่นเห็นแล้วไม่เสียหายมาก = config ทั่วไป
```

## Frontend ต้องระวังเป็นพิเศษ

ค่าที่ถูก build เข้า frontend เช่น Angular app มักไปอยู่ใน JavaScript ที่ browser โหลดได้

ดังนั้น:

```text
Angular environment files = ใช้กับ public config ได้
Angular environment files = ไม่ใช่ที่เก็บ secret
```

secret จริงควรอยู่ฝั่ง backend/server/CI/CD ไม่ใช่อยู่ใน bundle ที่ส่งให้ browser

อ่านต่อ: [Angular Environment Files](../../angular/concepts/environment-files.md)

## Flow ทีละขั้น

1. developer เขียน code ให้อ่าน `process.env["DATABASE_URL"]`
2. developer เก็บค่าจริงไว้ใน environment หรือ `.env` local ที่ไม่ commit
3. `.gitignore` ป้องกันไม่ให้ `.env` หลุดเข้า Git
4. ตอน deploy ให้ server/hosting platform ใส่ secret จริงใน setting ของระบบ
5. app รันแล้วอ่าน secret จาก environment ตอน runtime

## จุดที่มักงง

- `.env` ช่วยจัด secret ในเครื่องเรา แต่ถ้าเผลอ commit `.env` ก็ยังอันตราย
- ลบ secret จากไฟล์ล่าสุดไม่ได้แปลว่าลบจาก Git history แล้ว
- ค่า `PUBLIC_*` หรือ frontend env มักไม่ควรถือเป็น secret เพราะ browser อาจเห็นได้
- `process.env` เป็นวิธีอ่านค่า ไม่ใช่ระบบรักษาความลับด้วยตัวเอง
- ถ้า secret หลุดจริง ควร rotate/revoke secret ไม่ใช่แค่ลบบรรทัด

## ศัพท์ที่เกี่ยวข้อง

- [Environment Variable](environment-variable.md)
- [.env File](dotenv-file.md)
- [Angular Environment Files](../../angular/concepts/environment-files.md)
- [Git .gitignore](../../git/concepts/gitignore.md)
- [Git Commit](../../git/concepts/commit.md)

## เช็กตัวเอง

- ทำไม commit secret แล้วลบทีหลังยังเสี่ยง
- ถ้า API key หลุด สิ่งแรกที่ควรทำคืออะไร
- ทำไม Angular environment files ไม่เหมาะกับ secret จริง
- config ทั่วไปต่างจาก secret อย่างไร

## จำสั้น ๆ

```text
secret = ค่าที่คนอื่นเห็นแล้วเอาไปใช้แทนเราได้
ห้าม hardcode secret
ห้าม commit secret
ถ้าหลุด ให้ rotate/revoke ไม่ใช่แค่ลบไฟล์
```
