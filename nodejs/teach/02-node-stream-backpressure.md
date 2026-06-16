# Node Stream And Backpressure

บทนี้สรุปสิ่งที่เจอจาก `ApoRaviz_Tools/split-order-txt`: อ่านไฟล์ใหญ่ทีละส่วน และเขียนไฟล์ output โดยไม่ยัดทุกอย่างเข้า memory พร้อมกัน

## ภาพจำง่าย ๆ

ถ้าไฟล์คือถังน้ำใหญ่:

```text
readFile = เทน้ำทั้งถังเข้ากะละมังทีเดียว
stream   = เปิดก๊อกให้น้ำไหลทีละช่วง
```

งานแยก order ควรใช้ stream เพราะไฟล์จริงอาจใหญ่ และเราไม่อยากให้เครื่องกิน memory เกินจำเป็น

## Technical Term

```text
stream = การอ่าน/เขียนข้อมูลทีละ chunk
read stream = stream สำหรับอ่านไฟล์
write stream = stream สำหรับเขียนไฟล์
backpressure = สัญญาณว่า writer รับข้อมูลไม่ทัน ให้รอก่อน
drain = event ที่บอกว่า writer พร้อมรับข้อมูลต่อ
async generator = function ที่ส่งค่ากลับทีละรอบด้วย for await
```

## อ่านไฟล์ทีละบรรทัด

ตัวอย่างแนวคิด:

```ts
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

async function* readLines(filePath: string) {
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  const rl = createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    yield line;
  }
}
```

flow:

```text
createReadStream()
-> readline แปลง chunk เป็น line
-> for await อ่านทีละบรรทัด
-> yield ส่ง line ให้ core logic
```

ข้อดี:

- ไม่ต้องเก็บไฟล์ทั้งหมดใน memory
- process ไฟล์ใหญ่ได้ดีกว่า
- code อ่านเป็นลำดับเหมือน loop ธรรมดา

## เขียนไฟล์และ backpressure

เวลาใช้ `createWriteStream()` เมธอด `write()` จะคืนค่า boolean:

```ts
const ok = stream.write(line);
```

ความหมาย:

```text
true  = writer ยังรับข้อมูลได้
false = buffer เริ่มแน่น ให้รอ drain ก่อน
```

ตัวอย่างแนวคิด:

```ts
import { once } from 'node:events';

async function writeLine(stream: NodeJS.WritableStream, line: string) {
  if (!stream.write(`${line}\n`)) {
    await once(stream, 'drain');
  }
}
```

นี่คือ backpressure handling: ถ้า writer บอกว่ารับไม่ทัน เรารอก่อน ไม่ฝืนเขียนต่อ

## ปิด stream ให้จบ

เมื่อเขียนเสร็จต้องปิด stream:

```ts
stream.end();
```

ถ้ามีหลาย writer ควรปิดทุกตัว แม้มี error:

```ts
try {
  // write files
} finally {
  await writer.close();
}
```

`finally` ช่วยให้ cleanup ทำงานเสมอ

## ทำไม split-order-txt ใช้ two-pass

บางงานต้องรู้ข้อมูลรอบแรกก่อน เช่น header order ใดจับคู่กับ detail ใด

```text
pass 1 = อ่านไฟล์เพื่อเก็บ order header/map
pass 2 = อ่านไฟล์อีกครั้งเพื่อเขียน output ตามกลุ่ม
```

ข้อดีคือ logic ชัดและยังไม่ต้องโหลดไฟล์ทั้งก้อนเข้า memory

## จุดที่มักงง

- stream ไม่ได้แปลว่าเร็วกว่าเสมอ แต่ช่วยคุม memory และเหมาะกับไฟล์ใหญ่
- `for await` ใช้กับ async iterable เช่น readline interface ได้
- `write()` คืน `false` ไม่ได้แปลว่า fail แต่แปลว่าควรรอ
- `drain` คือสัญญาณให้เขียนต่อ
- ต้องปิด stream ไม่งั้นไฟล์อาจเขียนไม่ครบหรือ process ไม่จบ

## Self-check

ลองตอบเอง:

1. ถ้าไฟล์ใหญ่ ควรใช้ `readFile` หรือ `createReadStream`
2. `write()` คืน `false` หมายความว่าอะไร
3. `drain` ใช้เมื่อไหร่
4. ทำไมควรปิด writer ใน `finally`
5. two-pass ต่างจากอ่านไฟล์ครั้งเดียวอย่างไร

## สรุปจำสั้น ๆ

```text
stream = อ่าน/เขียนทีละส่วน
backpressure = writer บอกให้รอก่อน
drain = writer พร้อมไปต่อ
```

