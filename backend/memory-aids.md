# ภาพจำง่าย ๆ — Backend

หน้านี้รวมเฉพาะภาพจำสั้น ๆ สำหรับทบทวน Backend, Node.js และ NestJS โดยไม่ต้องอ่านบทเต็ม

เมื่อเพิ่มภาพจำใหม่ในเนื้อหา Backend ให้เพิ่มสรุปและลิงก์กลับมาที่หน้านี้ด้วย

## [Backend Stack](index.md)

```text
Angular    = หน้าร้านที่ user ใช้
Backend    = หลังร้านที่รับคำขอและตัดสินใจ
PostgreSQL = สมุดข้อมูลถาวรของร้าน
Node.js    = พื้นที่ทำงานที่ทำให้ backend รันได้
```

## [API Contract](concepts/api-contract.md)

```text
frontend     = คนสั่งอาหาร
endpoint     = คนรับออเดอร์
API contract = เมนูและกติกาว่าต้องสั่งอย่างไร
service/DB   = ครัวหลังร้าน
```

## [Privilege Escalation](concepts/privilege-escalation.md)

```text
user ทั่วไป          = บัตรผ่านเข้าบางห้อง
admin                = บัตรผ่านระดับสูง
privilege escalation = คนที่ไม่ควรเป็น admin ได้บัตรระดับสูงเอง
```

## [Sequence Diagram](concepts/sequence-diagram.md)

```text
sequence diagram = แชตกลุ่มที่เรียงว่าใครส่งอะไรให้ใครตามเวลา
```

## [Race Condition](concepts/race-condition.md)

```text
มีบัตรเหลือ 1 ใบ
เคาน์เตอร์ A และ B เห็นพร้อมกันว่ายังว่าง
ถ้าไม่มีจังหวะตัดสินผู้ชนะ ทั้งสองคนอาจได้บัตรใบเดียวกัน
```

## [Monorepo](concepts/monorepo.md)

```text
repository เดียว = ศูนย์การค้าหนึ่งอาคาร
แต่ละ app/library = ร้านคนละร้านในอาคาร
เครื่องมือจัดการ  = ฝ่ายอาคารที่ดูความสัมพันธ์ระหว่างร้าน
```

## [Fastify](fastify.md)

```text
Fastify = เคาน์เตอร์รับ request แบบเบาและตรง
NestJS  = ระบบหลังบ้านที่แบ่งเป็น controller/service/module
```

## [LINE OA Webhook](line-oa-webhook.md)

```text
Angular frontend   = หน้าจอที่ staff ใช้
Backend            = หลังร้านที่เก็บกุญแจและตัดสินใจ
LINE Messaging API = พนักงานส่งข้อความไปหาลูกค้า
```

## [Node.js](../nodejs/)

```text
JavaScript ใน browser = ทำงานบนหน้าจอ user
Node.js                = ทำงานหลังบ้าน แตะไฟล์ รัน command และเปิด server
```

## [CLI File Processing](../nodejs/teach/01-cli-file-processing.md)

```text
parser   = คนอ่านและแยกชนิดของแต่ละบรรทัด
splitter = ผู้จัดการลำดับการอ่านและเขียน
writer   = คนเขียน output และย้ายไฟล์เข้า backup
index    = ประตูหน้า CLI ที่รับ command
```

## [Stream และ Backpressure](../nodejs/teach/02-node-stream-backpressure.md)

```text
readFile = เทน้ำทั้งถังเข้ากะละมังทีเดียว
stream   = เปิดก๊อกให้น้ำไหลทีละช่วง
```

## [CLI Arguments และ Errors](../nodejs/teach/03-cli-arguments-and-errors.md)

```text
terminal argument = ใบงานที่ user ยื่นมา
parser            = คนอ่านใบงาน
options           = รายละเอียดงาน
core logic        = คนทำงานจริง
```

## [File Backup Safety](../nodejs/teach/04-file-backup-safety.md)

```text
input/  = ถาดเอกสารรอทำ
output/ = ถาดงานที่ทำเสร็จ
backup/ = แฟ้มเก็บต้นฉบับหลังทำสำเร็จ

งานสำเร็จค่อยย้ายต้นฉบับ งานไม่สำเร็จต้องไม่ย้าย
```

## [Test และ Temp Files](../nodejs/teach/05-node-test-temp-files.md)

```text
ไฟล์ project จริง = โต๊ะทำงานจริง
temp folder        = โต๊ะทดลองชั่วคราว
```

## [Node และ npm Version](../nodejs/teach/06-node-npm-version-check.md)

```text
Node.js = ตัวรัน JavaScript นอก browser
npm     = ผู้จัดการ package และปุ่มรัน script ที่มากับชุด Node
```

## [Environment Variable](../nodejs/concepts/environment-variable.md)

```text
code                 = วิธีทำงานที่เขียนไว้
environment variable = กระดาษโน้ตที่ห้องทำงานส่งให้ก่อนเริ่มงาน
```

## [.env File](../nodejs/concepts/dotenv-file.md)

```text
.env         = สมุดกุญแจจริงของเครื่องเรา
.env.example = รายการว่าต้องเตรียมกุญแจชื่ออะไร
.gitignore   = ป้ายบอก Git ว่าห้ามเก็บสมุดกุญแจจริง
```

## [Secret](../nodejs/concepts/secret.md)

```text
source code = สูตรอาหารที่แชร์ได้
secret      = กุญแจห้องเก็บวัตถุดิบที่ห้ามแชร์
```

## [NestJS](../nestjs/)

```text
Angular component/service/config
NestJS  controller/service/module

หน้าบ้านและหลังบ้านใช้แนวคิดแบ่งหน้าที่คล้ายกัน
```

## [Nest CLI และโครงสร้างโปรเจกต์](../nestjs/nest-cli-project-structure.md)

```text
NestJS   = โครงสร้างและวัสดุที่ใช้สร้าง backend
Nest CLI = ผู้ช่วยช่างที่ตั้งโครงเริ่มต้นตามแบบมาตรฐาน
```

## [NestJS Module](../nestjs/concepts/module.md)

```text
AppModule    = สำนักงานใหญ่
FeatureModule = แผนกที่รวม controller/service ของเรื่องเดียวกัน
```
