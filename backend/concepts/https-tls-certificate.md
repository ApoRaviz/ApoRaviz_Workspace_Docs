# HTTPS, TLS และ Certificate

## ภาพจำก่อน

การเชื่อมต่อ HTTPS ต้องตอบสองเรื่อง:

```text
1. เรากำลังคุยกับ server ที่อ้างว่าเป็น domain นี้จริงหรือไม่
2. ข้อมูลระหว่างทางถูกเข้ารหัสและถูกแก้ไขหรือไม่
```

TLS เป็นกลไกสร้างช่องทางสื่อสารที่เข้ารหัส ส่วน certificate เป็นหลักฐานดิจิทัลที่ผูก public key กับชื่อ domain/identity ตามขอบเขตและช่วงเวลาที่กำหนด

## TLS handshake อยู่ก่อน Controller

```text
client เปิด connection
-> server ส่ง certificate
-> client ตรวจชื่อ domain, วันหมดอายุ และ trust chain
-> ทั้งสองตกลงกุญแจสำหรับเข้ารหัส session
-> จึงเริ่มส่ง HTTP request ภายในช่องทาง TLS
-> middleware/router/controller ทำงาน
```

ถ้า certificate verification ล้มเหลว request อาจยังไม่ถึง ASP.NET Core Controller หรือ NestJS Controller เลย

## Client ตรวจอะไรบ้าง

- certificate ยังอยู่ในช่วงเวลาที่ใช้งานได้หรือไม่
- hostname ที่เรียกตรงกับ Subject Alternative Name (SAN) หรือไม่
- certificate ถูกลงนามต่อเนื่องไปถึง Certificate Authority (CA) ที่ client เชื่อถือหรือไม่
- certificate ถูกเพิกถอนหรือมี policy อื่นที่ client บังคับหรือไม่

ข้อความ “certificate หมดอายุ” จึงต่างจาก DNS หา domain ไม่เจอ และต่างจาก API ตอบ HTTP 500

## Development กับ Production

| เรื่อง | Development certificate | Production certificate |
|---|---|---|
| เป้าหมาย | ทดสอบ HTTPS บนเครื่องพัฒนา | ให้ผู้ใช้จริงเชื่อถือ domain สาธารณะ |
| Trust | ต้องติดตั้ง/trust ในเครื่องนั้น | ใช้ CA ที่ browser/OS เชื่อถือ |
| ชื่อ | มักใช้ `localhost` | ต้องตรงกับ domain จริง |
| Renewal | จัดการบนเครื่อง dev | ต้องมี renewal/monitoring ก่อนหมดอายุ |

`dotnet dev-certs https --trust` ช่วย trust ASP.NET Core development certificate ในเครื่องพัฒนา ไม่ได้ออก production certificate ให้ domain จริง

## Redirect และ certificate เป็นคนละเรื่อง

- HTTP 307 + `Location: https://...` คือ server บอกให้ client เปลี่ยน URL
- `curl -L` คือให้ client ตาม redirect
- หลังตามไป HTTPS client ยังต้องตรวจ certificate ตามปกติ
- `curl -k` หรือ `--insecure` คือข้าม certificate verification ไม่ได้ซ่อม certificate และไม่ควรใช้ใน production

ถ้า direct HTTPS request ผ่านโดยไม่ใช้ `-k` แปลว่า client ในเครื่องนั้นยอมรับ certificate สำหรับ URL ที่เรียกในเวลานั้น

## Domain, DNS และ Certificate เกี่ยวกันแต่ไม่เหมือนกัน

```text
Domain = ชื่อที่คนใช้เรียก
DNS    = แปลงชื่อไปเป็นปลายทาง เช่น IP address
Certificate = ยืนยัน identity/public key สำหรับชื่อที่ระบุ
TLS    = สร้างช่องทางเข้ารหัสโดยใช้ certificate ในขั้นยืนยันตัวตน
```

production deployment ต้องดูทั้ง DNS, certificate issuance, HTTPS termination, renewal และ reverse proxy/application routing เป็นคนละชั้น

## สรุปจำสั้น ๆ

```text
DNS พาไปถูกเครื่อง
Certificate ช่วยยืนยันว่าปลายทางมี identity ตรงกับชื่อ
TLS สร้างช่องทางเข้ารหัส
HTTP request จึงเดินต่อไปยัง middleware และ Controller
```

อ้างอิงทางการ: [Enforce HTTPS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/enforcing-ssl), [`dotnet dev-certs`](https://learn.microsoft.com/dotnet/core/tools/dotnet-dev-certs)
