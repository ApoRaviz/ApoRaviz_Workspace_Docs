# 01 CLI File Processing ด้วย Node.js

เวลาคนทำงานเอกสารใหญ่ ๆ เขาไม่อยากเปิดไฟล์ทั้งก้อนแล้ว copy เองทีละส่วน

`split-order-txt` จึงทำหน้าที่เหมือนพนักงานหลังร้าน:

```text
หยิบไฟล์จาก input/
อ่านทีละบรรทัด
จัดเข้ากองตาม group
เขียนไฟล์ใหม่ใน output/
ย้ายไฟล์ต้นฉบับไป backup/
```

## เรียนเรื่องนี้เพื่อแก้อาการงงอะไร

- ทำไมต้องมี `src/` และ `dist/`
- ทำไม Node.js อ่านไฟล์ได้ แต่ Angular/browser อ่าน path ตรง ๆ ไม่ได้
- ทำไมไฟล์ใหญ่ควรใช้ stream
- ทำไมต้องแยก parser, splitter, writer

## ภาพจำก่อนเข้า code

```text
parser   = คนอ่านบรรทัดแล้วบอกว่าเป็น header/detail/separator/trailer
splitter = ผู้จัดการ flow ว่าต้องอ่านรอบไหน เขียนอะไร
writer   = คนถือปากกาเขียน output และย้ายไฟล์เข้า backup
index    = ประตูหน้า CLI ที่รับ command จาก terminal
```

## Flow ทีละขั้น

```text
1. user รัน npm run start
2. index.ts อ่าน argument จาก terminal
3. splitter.ts ตรวจว่า input file มีจริงและไม่ว่าง
4. splitter.ts อ่าน pass แรกเพื่อหา header ทั้งหมด
5. writer.ts สร้าง output file ตาม header
6. splitter.ts อ่าน pass สองเพื่อส่ง detail ไปยัง output ที่ตรง group
7. writer.ts ใส่ separator/trailer ในทุก output file
8. writer.ts ย้าย input ไป backup เมื่อสำเร็จ
```

## Tiny Code Example

```ts
for await (const line of readLines(inputPath)) {
  const record = parseRecord(line);

  if (record.type === 'detail') {
    await writer.appendLine(record.groupNumber, record.raw);
  }
}
```

## อธิบาย code ทีละบรรทัด

```ts
for await (const line of readLines(inputPath))
```

อ่านไฟล์ทีละบรรทัดแบบ async เหมาะกับไฟล์ใหญ่

```ts
const record = parseRecord(line);
```

แปลง string หนึ่งบรรทัดให้เป็นชนิดข้อมูลที่ code ตัดสินใจได้

```ts
if (record.type === 'detail')
```

ทำงานเฉพาะ detail row เพราะ header ถูกจัดการตอน pass แรกแล้ว

```ts
await writer.appendLine(record.groupNumber, record.raw);
```

เขียนบรรทัดนี้ลงไฟล์ output ของ group ที่ตรงกัน

## ศัพท์ที่เจอในบทนี้

- `CLI` = โปรแกรมที่สั่งผ่าน terminal
- `stream` = อ่าน/เขียนทีละส่วน
- `parser` = ตัวแปลงข้อความเป็นข้อมูลที่ code เข้าใจ
- `writer` = ตัวรับผิดชอบเขียนไฟล์
- `backup` = ที่เก็บไฟล์ต้นฉบับหลังงานสำเร็จ

## จุดที่มักงง

- `input/`, `output/`, `backup/` เป็น runtime folder ไฟล์จริงในนั้นถูก ignore จาก git
- `dist/` ไม่ใช่ไฟล์ที่เราแก้หลัก แต่เป็นผลจาก build
- ถ้าแก้ `.ts` แล้วต้อง `npm run build` ก่อน `npm run start`
- ถ้าไฟล์มี format พิเศษ เช่น `13:` หรือ `31629#` parser ต้องรู้จักชนิดบรรทัดนั้น

## ลองทำเอง

1. เปิด `ApoRaviz_Tools/split-order-txt/src/parser.ts`
2. หา function `parseRecord`
3. ดูว่า header, detail, separator, trailer ถูกแยกจากกันอย่างไร
4. รัน `npm run build`
5. รัน `npm test`

## เช็กตัวเอง

- `parseRecord` มีหน้าที่อ่านไฟล์ทั้งก้อนหรืออ่านแค่หนึ่งบรรทัด?
- ทำไม `writer.ts` ไม่ควรตัดสินใจว่า line เป็น header หรือ detail?
- ทำไมไฟล์ใหญ่ควรอ่านด้วย stream?
- ถ้าจะเอา logic นี้ไป NestJS ส่วนไหนควรกลายเป็น service?

## สรุปจำสั้น ๆ

```text
Node.js CLI = terminal สั่งงาน
parser = แยกชนิดบรรทัด
splitter = คุม flow
writer = เขียนไฟล์
stream = อ่านทีละส่วน ไม่ยกทั้งไฟล์
```
