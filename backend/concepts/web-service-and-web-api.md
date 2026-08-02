# Web Service, Web API และ REST

คำกลุ่มนี้ทับซ้อนกันได้ จึงควรแยกจาก “สิ่งที่ผู้ใช้เห็น” และ “ช่องทางที่ระบบคุยกัน”

| คำ | ความหมายหลัก | ตัวอย่าง |
|---|---|---|
| Web | ระบบข้อมูล/บริการที่เข้าถึงผ่านเทคโนโลยีเว็บ | เว็บไซต์และ API บน HTTP/HTTPS |
| Website | หน้าเว็บที่เน้นให้คนอ่านหรือดูเนื้อหา | เว็บข่าว, documentation |
| Web App | application ที่คนโต้ตอบผ่าน browser | ระบบคลังสินค้า, email web client |
| Service | หน่วยความสามารถที่รับผิดชอบงานหนึ่ง | คำนวณราคา, ส่ง notification |
| Web Service | service ที่ระบบอื่นเรียกผ่าน network/web protocol | SOAP service หรือ HTTP service |
| Web API | interface ที่เปิดให้ client เรียกผ่านเว็บ โดยมากใช้ HTTP | `GET /products`, `POST /orders` |
| REST-style API | Web API ที่ออกแบบ resource-oriented และใช้ HTTP semantics | `/orders/123` + GET/PATCH/DELETE |
| SOAP | protocol ที่มี XML envelope และ contract เช่น WSDL | enterprise integration รุ่นเดิม/บางอุตสาหกรรม |

## ความสัมพันธ์

```text
Web Service
├─ SOAP service
└─ HTTP/Web API
   └─ REST-style API (หนึ่งแนวทางออกแบบ)
```

แผนภาพนี้เป็นภาพจำ ไม่ใช่กฎจัดหมวดแบบตายตัว เพราะวงการใช้คำ “web service” กว้างไม่เท่ากัน

## จุดที่มักงง

- Web API ไม่จำเป็นต้องเป็น REST ทุกตัว เช่น RPC-style HTTP API ก็ยังเป็น Web API
- REST เป็น architectural style ไม่ใช่ programming language หรือ framework
- Web App มักเรียก Web API แต่ทั้งสองไม่ใช่สิ่งเดียวกัน
- Service อาจเป็น class ภายใน application และไม่เปิด network endpoint เลยก็ได้
- Controller คือส่วนรับ HTTP request ไม่ควรแบก business logic ทั้งหมดของ service

## ตัวอย่าง flow

```text
Browser เปิด Web App
-> Web App เรียก Web API ผ่าน HTTPS
-> Controller รับ request
-> application service ทำงาน
-> API ส่ง JSON response
-> Web App แสดงผลให้ผู้ใช้
```

## สรุปจำสั้น ๆ

```text
Website/Web App = สิ่งที่คนใช้ผ่าน browser
Web API          = ช่องทางที่ software เรียกกันผ่านเว็บ
Service          = ความสามารถที่ทำงานหนึ่ง ไม่จำเป็นต้องเปิด HTTP เอง
REST/SOAP        = แนวทางหรือ protocol ที่ใช้สร้างการสื่อสาร
```
