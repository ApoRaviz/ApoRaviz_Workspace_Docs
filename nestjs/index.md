# NestJS Learning Hub

NestJS คือ framework สำหรับทำ backend ด้วย TypeScript บน Node.js

ถ้า Angular คือระบบจัดบ้านฝั่งหน้าจอ NestJS ก็คล้ายระบบจัดบ้านฝั่งหลังบ้าน:

```text
Angular component/service/module
NestJS controller/service/module
```

แนวคิดหลายอย่างจึงต่อยอดจาก Angular ได้ง่ายกว่าการเริ่ม backend แบบโล่ง ๆ

## ทำไม ApoRaviz ใช้ NestJS

ใน workspace นี้ ถ้าโปรเจกต์ต้องมี backend เราจะใช้:

```text
Angular + NestJS + PostgreSQL/Supabase
```

เหตุผล:

- ใช้ TypeScript เหมือน Angular
- โครงสร้างชัด เช่น controller, service, module
- เหมาะกับ API, upload file, download file, auth, database
- รองรับการแยก business logic จาก CLI หรือ frontend ได้ดี

## ภาพจำจาก split-order-txt

ตอนนี้ `split-order-txt` เป็น CLI:

```text
terminal
-> index.ts
-> splitOrderTxt()
-> output files
```

ถ้าทำเป็น NestJS:

```text
Angular upload page
-> POST /orders/split
-> OrdersController
-> SplitOrderService
-> core split logic
-> download ZIP
```

## NestJS File Mapping

```text
controller = รับ request จาก frontend
service    = ทำ business logic
module     = รวม controller/service เป็น feature
provider   = class ที่ NestJS สร้างและส่งให้ใช้ผ่าน dependency injection
```

## ตัวอย่างโครงอนาคต

```text
apps/
  web/                 Angular frontend
  api/                 NestJS backend
packages/
  split-order-core/    parser/split logic ที่ใช้ร่วมกัน
```

หรือถ้ายังเป็น repo เดียว:

```text
split-order-api/
  src/orders/orders.controller.ts
  src/orders/orders.service.ts
  src/orders/orders.module.ts
```

## ตัวอย่าง service แบบย่อ

```ts
export class SplitOrderService {
  async splitUploadedFile(inputPath: string) {
    return splitOrderTxt({
      inputPath,
      outputDir: './output',
      backupDir: './backup',
      shouldBackup: true,
    });
  }
}
```

## จุดที่มักงง

- NestJS ไม่ได้แทน Angular แต่ทำงานคู่กับ Angular
- NestJS ไม่ใช่ Next.js: NestJS คือ backend framework ส่วน Next.js คือ React full-stack framework
- NestJS ไม่ใช่ database ต้องต่อ PostgreSQL/Supabase เอง
- Browser upload file มาให้ NestJS แล้ว NestJS ค่อยใช้ Node.js `fs`
- function ที่มี `console.log` หรืออ่าน CLI args ไม่ควรเป็น core logic ระยะยาว

## สิ่งที่ควร refactor ก่อนเอา split-order-txt เข้า NestJS

- แยก parser/split decision ออกจาก file system ให้มากขึ้น
- ลด `console.log` ใน core function แล้วให้ caller เลือกว่าจะ log อย่างไร
- ทำ service ที่รับ `inputPath`, `outputDir`, `backupDir`
- เพิ่ม API-level error response เช่น 400 เมื่อไฟล์ format ผิด
- เตรียม ZIP output ถ้าจะให้ frontend download ทีเดียว

## สรุปจำสั้น ๆ

```text
Angular = หน้าบ้าน
NestJS = หลังบ้าน
PostgreSQL/Supabase = ฐานข้อมูล
Node.js = runtime ที่ NestJS ใช้ทำงาน
```
