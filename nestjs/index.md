# NestJS Learning Hub

NestJS คือ backend framework สำหรับทำ API ด้วย TypeScript บน Node.js

ถ้า Angular คือระบบจัดบ้านฝั่งหน้าจอ NestJS ก็คล้ายระบบจัดบ้านฝั่งหลังบ้าน:

```text
Angular component/service/config
NestJS controller/service/module
```

แนวคิดหลายอย่างต่อยอดจาก Angular ได้ง่าย เพราะมี TypeScript, dependency injection และการแยก responsibility ชัด

## เริ่มเรียน

- [NestJS Commands](commands.md)
- [NestJS Concepts](concepts/)
- [Module](concepts/module.md)
- [Controller](concepts/controller.md)
- [Nest CLI และโครงสร้างโปรเจกต์ที่สร้างมา](nest-cli-project-structure.md)
- [Monorepo และ Managed Monorepo](../backend/concepts/monorepo.md)

## ทำไม ApoRaviz ใช้ NestJS เป็น default

ใน workspace นี้ ถ้าโปรเจกต์ต้องมี backend ระยะยาว เราจะเริ่มจาก:

```text
Angular + NestJS + PostgreSQL/Supabase
```

เหตุผล:

- ใช้ TypeScript เหมือน Angular
- โครงสร้างชัด เช่น controller, service, module
- เหมาะกับ API, upload file, download file, auth, database
- รองรับการแยก business logic จาก CLI หรือ frontend ได้ดี
- สอนต่อยอดจาก Angular dependency injection ได้ง่าย

## NestJS File Mapping

```text
controller = รับ request จาก frontend
service    = ทำ business logic
module     = รวม controller/service เป็น feature
provider   = class ที่ NestJS สร้างและส่งให้ใช้ผ่าน dependency injection
guard      = ตรวจสิทธิ์หรือเงื่อนไขก่อนเข้า route
pipe       = แปลงหรือตรวจข้อมูลเข้า route
```

## ตัวอย่างจาก split-order-txt

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

ตัวอย่าง service แบบย่อ:

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

## Fastify เกี่ยวอะไรกับ NestJS

Fastify เป็น framework/server engine ฝั่ง Node.js ที่เบาและเร็ว

จำแบบง่ายก่อน:

```text
NestJS = default backend architecture ของ workspace
Fastify = option สำหรับ API/webhook เล็ก หรือใช้เป็น adapter ภายใต้ NestJS เมื่อมีเหตุผล
```

อ่านต่อ: [Fastify In ApoRaviz Workspace](../backend/fastify.md)

## สิ่งที่ควร refactor ก่อนเอา CLI เข้า NestJS

- แยก parser/split decision ออกจาก file system ให้มากขึ้น
- ลด `console.log` ใน core function แล้วให้ caller เลือกว่าจะ log อย่างไร
- ทำ service ที่รับ `inputPath`, `outputDir`, `backupDir`
- เพิ่ม API-level error response เช่น 400 เมื่อไฟล์ format ผิด
- เตรียม ZIP output ถ้าจะให้ frontend download ทีเดียว

## จุดที่มักงง

- NestJS ไม่ได้แทน Angular แต่ทำงานคู่กับ Angular
- NestJS ไม่ใช่ Next.js
- NestJS ไม่ใช่ database ต้องต่อ PostgreSQL/Supabase เอง
- Browser upload file มาให้ backend แล้ว backend ค่อยใช้ Node.js `fs`
- function ที่อ่าน CLI args ไม่ควรเป็น core logic ระยะยาว

## สรุปจำสั้น ๆ

```text
Angular = หน้าบ้าน
NestJS = หลังบ้าน
PostgreSQL/Supabase = ฐานข้อมูล
Node.js = runtime ที่ NestJS ใช้ทำงาน
```
