# Node.js Learning Hub

Node.js คือการเอา JavaScript/TypeScript ออกจาก browser แล้วให้รันบนเครื่องหรือ server ได้

ภาพจำง่าย ๆ:

```text
JavaScript ใน browser = คนทำงานบนหน้าร้าน
Node.js              = คนทำงานหลังร้านที่จับไฟล์ รัน command และคุยกับระบบเครื่องได้
```

## เรียน Node.js เพื่ออะไร

ใน `ApoRaviz_Tools/split-order-txt` เราใช้ Node.js เพราะต้องทำงานกับไฟล์จริง:

- อ่านไฟล์ TXT จาก `input/`
- แยกข้อมูลทีละบรรทัด
- เขียน output หลายไฟล์
- ย้ายไฟล์ต้นฉบับไป `backup/`
- รันผ่าน terminal ด้วย `npm run start`

สิ่งเหล่านี้ browser ทำตรง ๆ ไม่ได้ แต่ Node.js ทำได้

## Technical Term

```text
runtime = ตัวที่เอา code ไปรัน
CLI = โปรแกรมที่ใช้ผ่าน terminal
fs = file system API ของ Node.js
stream = การอ่าน/เขียนข้อมูลทีละส่วน ไม่ยกทั้งไฟล์เข้าหน่วยความจำ
process.argv = รายการ argument ที่ user ส่งมาจาก terminal
```

## บทเรียนจาก ApoRaviz_Tools

อ่าน flow หลัก:

- [01 CLI File Processing](./teach/01-cli-file-processing.md)

## Node.js กับ NestJS ต่างกันยังไง

```text
Node.js = runtime
NestJS  = framework ที่รันบน Node.js
```

เหมือน:

```text
Node.js = ห้องครัว
NestJS  = ระบบจัดครัว มี station, chef, recipe, routing ชัดเจน
```

## จุดที่มักงง

- ไฟล์ใน `src/` เป็น TypeScript ที่เราเขียน
- ไฟล์ใน `dist/` เป็น JavaScript ที่ build แล้วให้ Node.js รัน
- `npm run build` แปลง `src/*.ts` เป็น `dist/*.js`
- `npm run start` รัน `dist/index.js`

## สรุปจำสั้น ๆ

```text
Node.js = JavaScript/TypeScript ที่ทำงานหลังบ้านและแตะไฟล์เครื่องได้
```
