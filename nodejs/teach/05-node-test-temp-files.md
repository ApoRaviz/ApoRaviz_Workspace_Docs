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

บันทึกเป็น `numbers.test.mjs` แล้วรัน `node --test numbers.test.mjs` โดย `--test` ให้ Node ค้นและรัน test ในไฟล์ที่ระบุ:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

test('adds numbers', () => {
  assert.equal(1 + 1, 2);
});
```

เมื่อทดสอบงานไฟล์ function ของ test ต้องเป็น `async` และใช้ `await` รอทั้งงานเขียนและงานอ่านก่อนตรวจผล ดูตัวอย่างครบในหัวข้อถัดไป

## สร้าง temp workspace

บันทึกตัวอย่างนี้เป็น `files.test.mjs` ได้โดยอิสระจากตัวอย่างแรก ใช้เฉพาะ API ที่มากับ Node:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('writes and reads a temporary file', async () => {
  const workDir = await mkdtemp(join(tmpdir(), 'docs-file-test-'));
  try {
    const outputPath = join(workDir, 'result.txt');
    await writeFile(outputPath, 'example content\n', 'utf8');
    const output = await readFile(outputPath, 'utf8');
    assert.equal(output, 'example content\n');
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
});
```

รันด้วย:

```bash
node --test files.test.mjs
```

`--test` เปิด test runner ผลควรมีหนึ่ง test ผ่านและไม่มี test ล้มเหลว รูปแบบข้อความอาจต่างตาม Node version ส่วนข้อมูลทดลองจะถูกลบหลัง test แม้ assertion ไม่ผ่าน

flow ของตัวอย่าง:

```text
test runner เรียก async function
-> mkdtemp สร้างโฟลเดอร์ใหม่
-> writeFile เขียนและรอจนเสร็จ
-> readFile อ่านผลกลับ
-> assert.equal เทียบข้อความจริงกับที่คาด
-> finally ลบโฟลเดอร์ทดลอง
```

`join()` ประกอบ path ตามระบบปฏิบัติการ, `tmpdir()` เลือก temp directory และ `mkdtemp()` เติมส่วนท้ายให้ชื่อไม่ซ้ำ `recursive: true` ให้ลบไฟล์ภายใน ส่วน `force: true` ยอมให้ path หายไปแล้วได้ ใช้ `rm` กับ `workDir` ที่ตัวอย่างสร้างเท่านั้น

test นี้พิสูจน์ flow เขียน/อ่านและการตรวจข้อความในพื้นที่ทดลอง ยังไม่ได้พิสูจน์ parser หรือกฎ backup ของ application ต้องเปลี่ยนงานที่เรียกและ assertion ให้ตรง behavior นั้นเมื่อใช้กับโปรเจกต์จริง

ข้อดี:

- test ไม่แตะไฟล์จริง
- test รันซ้ำได้
- parallel test ปลอดภัยขึ้น เพราะแต่ละ test มี folder ของตัวเอง

## Test error case

ใช้ `assert.rejects()` เมื่อคาดว่า Promise ต้องถูกปฏิเสธ ตัวอย่างนี้บันทึกเป็น `missing-file.test.mjs` และรันด้วย `node --test missing-file.test.mjs` ได้เอง:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('reading a missing file reports ENOENT', async () => {
  const workDir = await mkdtemp(join(tmpdir(), 'docs-missing-test-'));
  try {
    await assert.rejects(
      () => readFile(join(workDir, 'missing.txt'), 'utf8'),
      { code: 'ENOENT' },
    );
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
});
```

เราไม่สร้าง `missing.txt` ในโฟลเดอร์ใหม่ จึงคาดให้ `readFile` ปฏิเสธ Promise ด้วยรหัส `ENOENT` ซึ่งหมายถึงหาไฟล์หรือ path ไม่พบ `assert.rejects` รอผลนั้นและตรวจรหัส ถ้าอ่านสำเร็จหรือได้ error คนละรหัส test จะไม่ผ่าน

## Test backup rule

อ่านเงื่อนไขการย้ายต้นฉบับใน [File Backup Safety](04-file-backup-safety.md) ก่อนออกแบบ test กลุ่มนี้

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
