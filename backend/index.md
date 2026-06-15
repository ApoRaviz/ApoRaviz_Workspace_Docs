# Backend Stack ของ ApoRaviz

เวลาโปรเจกต์เริ่มจากหน้าเว็บอย่างเดียว เหมือนมีหน้าร้านที่รับลูกค้าได้แล้ว

แต่พอมี login, upload file, database, report, webhook, หรือระบบหลังบ้าน เราต้องมี “ห้องทำงานหลังร้าน” ที่คอยจัดการข้อมูลจริง

ใน workspace นี้ ห้องทำงานหลังร้านมาตรฐานคือ:

```text
Angular frontend
-> NestJS backend
-> PostgreSQL/Supabase database
```

## ความหมายแบบคนธรรมดา

- Angular = หน้าจอที่ user กดใช้งาน
- NestJS = หลังบ้านที่รับ request, ตรวจข้อมูล, เรียก business logic, และคุยกับ database
- PostgreSQL = ฐานข้อมูลจริงที่เก็บตารางและความสัมพันธ์
- Supabase = PostgreSQL แบบ managed ที่แถม auth, storage, API, และ dashboard

## Technical Term

```text
Frontend = client-side app ที่ user เห็น
Backend API = server-side app ที่รับ HTTP request
Database = ที่เก็บข้อมูลถาวร
Service = class ที่เก็บ business logic
Controller = class ที่รับ route/request จาก frontend
```

## Default Rule

ถ้า `ApoRaviz_*` project ต้องมี backend ให้ใช้แนวนี้ก่อน:

```text
Angular + NestJS + PostgreSQL/Supabase
```

เลือก PostgreSQL ตรง ๆ เมื่อ:

- ต้องควบคุม database เอง
- deploy backend/database เอง
- ต้องการฝึก SQL และ schema ให้ลึก

เลือก Supabase เมื่อ:

- อยากเริ่มเร็ว
- ต้องการ auth/storage/dashboard
- ต้องการ managed PostgreSQL แต่ยังใช้ SQL จริงได้

## Flow ทีละขั้น

```text
1. User กด upload ใน Angular
2. Angular ส่งไฟล์ไป NestJS API
3. NestJS controller รับ request
4. NestJS service เรียก core logic
5. service เขียนผลลัพธ์ หรือบันทึก metadata ลง PostgreSQL/Supabase
6. NestJS ส่ง download URL หรือ result กลับให้ Angular
```

## ตัวอย่างจาก ApoRaviz_Tools

`split-order-txt` ตอนนี้เป็น Node.js CLI:

```text
terminal
-> Node.js reads input file
-> splitOrderTxt()
-> output files
```

ถ้าเปลี่ยนเป็น backend ในอนาคต:

```text
Angular upload page
-> NestJS upload endpoint
-> splitOrderTxt core/service
-> ZIP output
-> Angular download button
```

## จุดที่มักงง

- NestJS ไม่ใช่ frontend framework แต่เป็น backend framework
- NestJS รันบน Node.js
- PostgreSQL คือ database จริง ส่วน Supabase คือบริการที่ใช้ PostgreSQL เป็นแกน
- Browser เรียก `fs`, `createReadStream`, `rename` โดยตรงไม่ได้ ต้องให้ Node.js/NestJS ทำ

## อ่านต่อ

- Node.js: `../nodejs/`
- NestJS: `../nestjs/`

## สรุปจำสั้น ๆ

```text
มีแค่หน้าจอ -> Angular
มี API / file / database -> Angular + NestJS + PostgreSQL/Supabase
```
