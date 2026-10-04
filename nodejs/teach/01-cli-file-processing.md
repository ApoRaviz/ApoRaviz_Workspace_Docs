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

ตัวอย่างนี้ย่อเหลือการเลือก detail ของกลุ่ม A โดยสร้างไฟล์ทดลองเอง ไม่ต้องเปิด repo โปรเจกต์จริง บันทึกเป็น `file-processing.mjs` ในโฟลเดอร์ทดลอง; `.mjs` คือ JavaScript module ที่ Node รันได้โดยตรง ไม่ต้อง build TypeScript

```js
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function parseRecord(line) {
  const [type, group, value] = line.split('|');
  return { type, group, value };
}

const workDir = await mkdtemp(join(tmpdir(), 'docs-cli-'));
try {
  const inputPath = join(workDir, 'input.txt');
  const outputPath = join(workDir, 'output.txt');
  await writeFile(inputPath, 'header|A|Orders\ndetail|A|apple\ndetail|B|tea\n', 'utf8');

  const input = await readFile(inputPath, 'utf8');
  const selected = [];
  for (const line of input.trim().split('\n')) {
    const record = parseRecord(line);
    if (record.type === 'detail' && record.group === 'A') {
      selected.push(record.value);
    }
  }

  await writeFile(outputPath, selected.join('\n') + '\n', 'utf8');
  console.log((await readFile(outputPath, 'utf8')).trim());
} finally {
  await rm(workDir, { recursive: true, force: true });
}
```

รันจากโฟลเดอร์ที่บันทึกไฟล์:

```bash
node file-processing.mjs
```

ผลที่คาดหวังคือ `apple` หนึ่งบรรทัด และโฟลเดอร์ข้อมูลทดลองถูกลบเมื่อจบ ตัวอย่างอ่านไฟล์เล็กทั้งก้อนเพื่อให้เห็นหน้าที่ก่อน; การอ่านไฟล์ใหญ่ทีละบรรทัดอยู่ใน [Streams and Backpressure](02-node-stream-backpressure.md)

## อธิบาย code ทีละบรรทัด

| ส่วนของ code | หน้าที่ |
|---|---|
| `import ... from 'node:...'` | ขอ API ที่มากับ Node ไม่ต้องติดตั้ง package เพิ่ม |
| `parseRecord(line)` | แยกหนึ่งบรรทัดที่คั่นด้วย `\|` เป็น type, group และ value; ไม่ได้อ่านไฟล์เอง |
| `mkdtemp(join(tmpdir(), 'docs-cli-'))` | สร้างพื้นที่ชั่วคราวชื่อไม่ซ้ำใน temp directory ของระบบ |
| `join(workDir, ...)` | ประกอบ path ของ input/output ภายในพื้นที่ทดลอง |
| `await writeFile(inputPath, ...)` | รอให้เขียนข้อมูลตัวอย่างเสร็จก่อนอ่าน |
| `await readFile(...)` | อ่านข้อความจากไฟล์เล็กเข้าหน่วยความจำ |
| `input.trim().split('\n')` | ตัดบรรทัดว่างท้ายข้อมูลตัวอย่าง แล้วแยกข้อความเป็นบรรทัด |
| `for (const line of ...)` | ส่งแต่ละบรรทัดให้ parser |
| `if (...)` และ `selected.push(...)` | เลือกเฉพาะ detail กลุ่ม A แล้วเก็บ value |
| `writeFile(outputPath, ...)` | รวมผลที่เลือกเป็นข้อความและเขียน output |
| `console.log(...)` | อ่าน output กลับมาแสดง เพื่อเห็นผลของงานไฟล์จริง |
| `finally` และ `rm(...)` | ล้างพื้นที่ทดลองแม้ขั้นก่อนหน้าเกิด error |

`recursive: true` ให้ลบไฟล์ภายในโฟลเดอร์ด้วย ส่วน `force: true` ไม่ฟ้อง error ถ้า path หายไปแล้ว การลบนี้ใช้เฉพาะ `workDir` ที่ `mkdtemp` เพิ่งสร้าง ห้ามเปลี่ยนเป็น path ของงานจริง

parser นี้เป็นตัวอย่าง format ง่ายที่ตกลงไว้เท่านั้น ยังไม่ตรวจ malformed input; อ่านการรายงานข้อผิดพลาดต่อใน [CLI Arguments and Errors](03-cli-arguments-and-errors.md)

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

1. บันทึกและรันตัวอย่างด้านบน ตรวจว่าได้ `apple`
2. เปลี่ยนเงื่อนไข `record.group === 'A'` เป็นกลุ่ม B แล้วรันใหม่ ควรได้ `tea`
3. เพิ่ม detail อีกบรรทัดของกลุ่ม B ในข้อมูลตัวอย่าง แล้วดูว่า output มีสองบรรทัด
4. อธิบายว่า parser, เงื่อนไขเลือกข้อมูล และส่วนเขียนไฟล์ทำคนละหน้าที่อย่างไร

เมื่อเข้าใจแล้ว ค่อยเปิด implementation ของโปรเจกต์จริงเพื่อเทียบวิธีแยก parser/splitter/writer เป็นไฟล์ และอ่าน [Node Test and Temp Files](05-node-test-temp-files.md) เพื่อเปลี่ยนการตรวจด้วยตาเป็น test

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
