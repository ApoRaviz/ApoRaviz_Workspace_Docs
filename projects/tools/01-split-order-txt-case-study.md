# Split Order TXT Case Study

case study นี้สรุปสิ่งที่เรียนจาก `ApoRaviz_Tools/split-order-txt`

เอกสาร requirement ตัวจริงของโปรเจกต์อยู่ใน `ApoRaviz_Tools/docs/split-order-txt-requirement.md` ส่วนหน้านี้ใช้เล่าเป็นบทเรียนย้อนอ่าน

## Problem

มีไฟล์ TXT/CSV จากงาน order ที่ต้องแยก output ตามกลุ่ม โดยยังรักษา header, detail, separator และ trailer row ให้ถูกต้อง

โจทย์หลัก:

- อ่านไฟล์ input จาก folder หรือ path ที่ user ระบุ
- parse บรรทัด CSV ที่มี comma, quote, escaped quote และ BOM
- จับคู่ header/detail
- เขียน output หลายไฟล์
- ย้าย input ไป backup หลัง process สำเร็จ
- ถ้า fail ให้ input อยู่ที่เดิม

## Why Node.js CLI First

เริ่มจาก Node.js CLI เพราะงานนี้เป็น file processing:

```text
terminal
-> Node.js CLI
-> read input file
-> split data
-> write output files
-> move input to backup
```

ยังไม่ต้องมี frontend/backend ตั้งแต่แรก เพราะ user หลักต้องการผลลัพธ์ไฟล์ก่อน

## Architecture

โครงที่ดีควรแยกหน้าที่:

```text
index.ts   = รับ CLI args และแสดงผลลัพธ์/error
parser.ts  = parse CSV line เป็น record
splitter.ts = อ่านไฟล์, ตัดสินใจแยก order, คุม flow หลัก
writer.ts  = เขียน output, คุม stream, backup input
tests/     = test parser, splitter, writer และ error case
```

ข้อดี:

- test แยกส่วนได้
- logic ไม่ปนกับ terminal
- อนาคต NestJS service นำ core logic ไปใช้ได้
- เปลี่ยน UI เป็น web ได้โดยไม่ต้องเขียน parser ใหม่

## Important Decisions

### Stream Instead Of Loading Whole File

ใช้ stream เพราะไฟล์อาจใหญ่:

```text
createReadStream
-> readline
-> for await line
-> parse/process ทีละบรรทัด
```

อ่านต่อ: [Node Stream And Backpressure](../../nodejs/teach/02-node-stream-backpressure.md)

### Two-pass Processing

งานนี้ต้องรู้ความสัมพันธ์ของข้อมูลก่อนเขียน output ที่ถูกต้อง จึงใช้แนวคิด two-pass:

```text
pass 1 = อ่านเพื่อเก็บข้อมูลสำคัญ
pass 2 = อ่านเพื่อเขียน output จริง
```

ข้อดีคือไม่ต้องเก็บไฟล์ทั้งก้อนไว้ใน memory แต่ยังตัดสินใจจากข้อมูลครบพอ

### Safe Backup Rule

กติกาที่สำคัญ:

```text
success -> move input to backup
failure -> keep input in input folder
```

อ่านต่อ: [File Backup Safety](../../nodejs/teach/04-file-backup-safety.md)

### Parser Must Be Strict Enough

CSV ที่เจอจริงอาจมี:

- quoted comma
- escaped quote
- empty field
- BOM
- separator row เช่น `1:`
- trailer row เช่น `1#`

ดังนั้น parser ต้องมี test ครอบ edge case ไม่ใช่แค่ split ด้วย comma ธรรมดา

## Future Backend Path

ถ้าจะทำ web version:

```text
Angular upload page
-> NestJS upload endpoint
-> SplitOrderService
-> reuse parser/splitter core
-> write output or ZIP
-> return download result
```

สิ่งที่ต้องเตรียม:

- แยก core logic ออกจาก file path เฉพาะ CLI ให้มากขึ้น
- ให้ service รับ input/output แบบชัดเจน
- เพิ่ม API error response เช่น 400 เมื่อไฟล์ format ผิด
- เพิ่ม job status ถ้างานใหญ่
- ถ้าต้องเก็บประวัติ job ค่อยเพิ่ม PostgreSQL/Supabase

Fastify ใช้ได้ถ้าอยาก prototype upload API เล็ก ๆ แต่ default ระยะยาวของ workspace ยังเป็น NestJS

อ่านต่อ:

- [Backend Stack](../../backend/index.md)
- [Fastify In ApoRaviz Workspace](../../backend/fastify.md)
- [NestJS Learning Hub](../../nestjs/index.md)

## What To Put Where

```text
Requirement เฉพาะ split-order-txt -> ApoRaviz_Tools/docs/
CLI/stream/test concept กลาง       -> ApoRaviz_Workspace_Docs/nodejs/
Case study จาก project             -> ApoRaviz_Workspace_Docs/projects/tools/
Future backend architecture         -> backend/ หรือ nestjs/
```

## Self-check

ลองตอบเอง:

1. ทำไมโปรเจกต์นี้เริ่มจาก Node.js CLI ก่อน web app
2. ทำไมไม่ควร parse CSV ด้วย `line.split(',')` อย่างเดียว
3. ถ้า process fail input file ควรอยู่ที่ไหน
4. ทำไมต้องแยก `index.ts` ออกจาก core logic
5. ถ้าย้ายไป NestJS ควร reuse ส่วนไหน

## สรุปจำสั้น ๆ

```text
split-order-txt = file processing ที่ต้องคุม parser, stream, output, backup และ test ให้แน่นก่อนคิดเรื่อง UI
```

