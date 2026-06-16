# Node.js Learning Hub

Node.js คือ runtime ที่ทำให้ JavaScript/TypeScript รันนอก browser ได้ เช่น รัน CLI, อ่านไฟล์, เขียนไฟล์, ทำ backend หรือเป็นฐานให้ NestJS/Fastify

ภาพจำง่าย ๆ:

```text
JavaScript ใน browser = ทำงานบนหน้าจอ user
Node.js              = ทำงานหลังบ้าน แตะไฟล์ รัน command และเปิด server ได้
```

## เรียน Node.js เพื่ออะไร

ใน `ApoRaviz_Tools/split-order-txt` เราใช้ Node.js เพราะต้องทำงานกับไฟล์จริง:

- อ่านไฟล์ TXT จาก `input/`
- parse ข้อมูลทีละบรรทัด
- เขียน output หลายไฟล์
- ย้ายไฟล์ต้นฉบับไป `backup/` เมื่อสำเร็จ
- รันผ่าน terminal ด้วย `npm run start`
- test logic ด้วย Node test runner

สิ่งเหล่านี้ browser ทำตรง ๆ ไม่ได้ แต่ Node.js ทำได้

## Technical Term

```text
runtime = ตัวที่เอา code ไปรัน
CLI = โปรแกรมที่ใช้ผ่าน terminal
fs = file system API ของ Node.js
stream = อ่าน/เขียนข้อมูลทีละส่วน ไม่ยกทั้งไฟล์เข้า memory
process.argv = argument ที่ user ส่งมาจาก terminal
node:test = test runner ที่มากับ Node.js
```

## Recommended Order

1. [Node.js Commands](commands.md)
2. [01 CLI File Processing](teach/01-cli-file-processing.md)
3. [02 Node Stream And Backpressure](teach/02-node-stream-backpressure.md)
4. [03 CLI Arguments And Errors](teach/03-cli-arguments-and-errors.md)
5. [04 File Backup Safety](teach/04-file-backup-safety.md)
6. [05 Node Test And Temp Files](teach/05-node-test-temp-files.md)

## Node.js กับ NestJS/Fastify ต่างกันยังไง

```text
Node.js = runtime
NestJS  = backend framework ที่รันบน Node.js
Fastify = backend web framework ที่รันบน Node.js
```

ภาพจำ:

```text
Node.js = ห้องครัว
NestJS  = ระบบจัดครัวแบบมีแผนก controller/service/module
Fastify = เคาน์เตอร์ API ที่เบาและตรง
```

## จุดที่มักงง

- ไฟล์ใน `src/` เป็น TypeScript ที่เราเขียน
- ไฟล์ใน `dist/` เป็น JavaScript หลัง build
- `npm run build` แปลง `src/*.ts` เป็น `dist/*.js`
- `npm run start` มักรันไฟล์ที่ build แล้ว หรือรันผ่าน script ที่ project ตั้งไว้
- browser เรียก `fs`, `createReadStream`, `rename` ตรง ๆ ไม่ได้

## สรุปจำสั้น ๆ

```text
Node.js = JavaScript/TypeScript หลังบ้านที่แตะไฟล์ รัน CLI และเป็นฐานให้ backend ได้
```

