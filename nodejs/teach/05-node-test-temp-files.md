# Node Test and Temp Files

บทนี้สรุป pattern การ test Node.js CLI/file processing จาก `ApoRaviz_Tools/split-order-txt`

## ภาพจำง่าย ๆ

เวลาทดสอบงานไฟล์ อย่าใช้โต๊ะทำงานจริง:

```text
project input/output จริง = โต๊ะทำงานจริง
temp folder ใน test       = โต๊ะทดลองชั่วคราว
```

test ควรสร้างไฟล์ของตัวเองใน temp folder แล้วลบทิ้งได้โดยไม่แตะไฟล์งานจริง

## Technical Term

```text
node:test = test runner ที่มากับ Node.js
assert = เครื่องมือยืนยันผลลัพธ์
tmpdir = folder temp ของระบบ
mkdtemp = สร้าง temp folder ใหม่
fixture = ข้อมูลตัวอย่างสำหรับ test
assert.rejects = ยืนยันว่า function ต้อง throw error
```

## ตัวอย่าง test ด้วย node:test

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

test('adds numbers', () => {
  assert.equal(1 + 1, 2);
});
```

ถ้าเป็น async:

```ts
test('writes output file', async () => {
  await runJob();
  assert.equal(result.count, 3);
});
```

## สร้าง temp workspace

```ts
import { mkdtemp, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('splits input file', async () => {
  const workDir = await mkdtemp(join(tmpdir(), 'split-order-'));
  const inputPath = join(workDir, 'input.txt');
  const outputDir = join(workDir, 'output');
  const backupDir = join(workDir, 'backup');

  await writeFile(inputPath, 'example content', 'utf8');

  await splitOrderTxt({ inputPath, outputDir, backupDir });

  const output = await readFile(join(outputDir, 'result.txt'), 'utf8');
  assert.match(output, /example/);
});
```

ข้อดี:

- test ไม่แตะไฟล์จริง
- test รันซ้ำได้
- parallel test ปลอดภัยขึ้น เพราะแต่ละ test มี folder ของตัวเอง

## Test error case

ใช้ `assert.rejects()` เมื่อคาดว่า function ต้อง fail:

```ts
await assert.rejects(
  () => splitOrderTxt({ inputPath: 'missing.txt' }),
  /ไม่พบไฟล์|ENOENT/,
);
```

หรือเช็ก class:

```ts
await assert.rejects(
  () => parseInvalidFile(),
  InvalidCsvFormatError,
);
```

## Test backup rule

สิ่งที่ควร test สำหรับ file processing:

- output ถูกสร้างเมื่อสำเร็จ
- input ถูกย้ายไป backup เมื่อสำเร็จ
- input ยังอยู่ที่เดิมเมื่อ fail
- error message บอก line number หรือสาเหตุพอแก้ได้
- parser handle comma, quote, empty field, BOM ได้

## จุดที่มักงง

- `node:test` เป็น test runner ใน Node.js ไม่ต้องลง framework เพิ่มเสมอไป
- `assert` ไม่ใช่ production validation แต่เป็นตัวตรวจใน test
- temp folder ทำให้ test ไม่ขึ้นกับไฟล์จริงในเครื่อง
- test error case สำคัญพอ ๆ กับ test happy path

## Self-check

ลองตอบเอง:

1. ทำไม test งานไฟล์ควรใช้ temp folder
2. `mkdtemp` ใช้ทำอะไร
3. `assert.rejects` ใช้เมื่อไหร่
4. ถ้า process fail ควร test ว่า input ยังอยู่ไหม
5. `node:test` ต่างจาก business logic อย่างไร

## สรุปจำสั้น ๆ

```text
test งานไฟล์ = สร้าง temp input -> run -> assert output/backup/error -> ไม่แตะไฟล์จริง
```
