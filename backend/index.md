# Backend Stack ของ ApoRaviz

เวลาโปรเจกต์เริ่มมี login, upload file, database, report, webhook หรือ secret ที่ห้ามอยู่ใน frontend เราต้องมี backend

ค่า default ระยะยาวของ workspace คือ:

```text
Angular frontend
-> NestJS backend
-> PostgreSQL/Supabase database
-> Node runtime (ตาม baseline.md)
```

Fastify ใช้ได้เมื่อ scope เล็กหรือเป็น prototype API/webhook แต่ต้องเขียนเหตุผลไว้ใน project docs

## ความหมายแบบคนธรรมดา

- Angular = หน้าจอที่ user ใช้งาน
- Node.js = runtime ที่ทำให้ JavaScript/TypeScript รันหลังบ้านได้
- NestJS = backend framework ที่จัด code เป็น controller, service, module
- Fastify = backend web framework ที่เบาและตรง เหมาะกับ API เล็กหรือ webhook prototype
- PostgreSQL = database จริงที่เก็บ table และความสัมพันธ์
- Supabase = PostgreSQL แบบ managed พร้อม auth/storage/dashboard/API

## Technical Term

```text
Frontend = client-side app ที่ user เห็น
Backend API = server-side app ที่รับ HTTP request
API Contract = ข้อตกลงว่า frontend ต้องเรียก endpoint ไหน ส่งอะไร และ backend จะตอบอะไร
Database = ที่เก็บข้อมูลถาวร
Controller = class หรือ handler ที่รับ route/request
Service = class ที่เก็บ business logic
Migration = ไฟล์เปลี่ยน schema database แบบมีประวัติ
Webhook = endpoint ที่ระบบอื่นเรียกเข้ามา
```

## Default Rule

ถ้า `ApoRaviz_*` project ต้องมี backend ให้เริ่มคิดจาก:

```text
Angular + NestJS + PostgreSQL/Supabase
```

เลือก PostgreSQL ตรง ๆ เมื่อ:

- ต้องควบคุม database เอง
- อยากฝึก SQL/schema ลึกขึ้น
- deploy backend/database เอง

เลือก Supabase เมื่อ:

- อยากเริ่มเร็ว
- ต้องการ managed PostgreSQL
- ต้องการ auth/storage/dashboard

ใช้ Fastify ได้เมื่อ:

- API เล็กและ scope ชัด
- ต้องทำ webhook prototype
- อยากเรียน HTTP request/response แบบตรง
- ยังไม่ต้องมี structure ใหญ่แบบ NestJS

อ่านต่อ:

- [API Contract](concepts/api-contract.md)
- [Fastify In ApoRaviz Workspace](fastify.md)

## Flow ตัวอย่างจาก MooPing Reward

```text
1. Staff กดยืนยันยอดขายใน Angular
2. Angular ส่ง request ไป backend API
3. Backend ตรวจข้อมูลและเรียก service
4. Service บันทึก transaction และ reward ใน PostgreSQL/Supabase
5. Backend ส่ง LINE message ผ่าน token ที่อยู่ฝั่ง server
6. Backend ส่ง result กลับ Angular
```

จุดสำคัญ:

```text
LINE token และ Supabase service role key ต้องอยู่ backend เท่านั้น
```

## Flow ตัวอย่างจาก ApoRaviz_Tools

ตอนนี้ `split-order-txt` เป็น Node.js CLI:

```text
terminal
-> Node.js reads input file
-> splitOrderTxt()
-> output files
```

ถ้าทำเป็น backend ในอนาคต:

```text
Angular upload page
-> NestJS upload endpoint
-> splitOrderTxt core/service
-> ZIP output หรือ download result
-> Angular download button
```

## อ่านต่อ

- [Node.js Learning Hub](../nodejs/)
- [Node.js Commands](../nodejs/commands.md)
- [Backend Concepts](concepts/)
- [API Contract](concepts/api-contract.md)
- [LINE OA Webhook And Messaging API](line-oa-webhook.md)
- [NestJS Learning Hub](../nestjs/)
- [Fastify In ApoRaviz Workspace](fastify.md)
- [PostgreSQL Learning Hub](../postgresql/)

## จุดที่มักงง

- Backend ไม่ใช่ database แต่เป็นตัวคุม request/business logic
- PostgreSQL คือ database ส่วน Supabase คือบริการที่ใช้ PostgreSQL เป็นแกน
- NestJS และ Fastify รันบน Node.js
- Browser แตะ secret หรือ file system backend โดยตรงไม่ได้
- CLI file processing เริ่มจาก Node.js ได้ แต่ถ้าจะทำ web ระยะยาวควรแยก core logic ให้ backend ใช้ต่อได้

## สรุปจำสั้น ๆ

```text
มีแค่หน้าจอ -> Angular
มี API / file / database / secret -> Angular + backend + PostgreSQL/Supabase
```
