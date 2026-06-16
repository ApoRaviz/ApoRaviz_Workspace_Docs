# Node.js Commands

คำสั่งหน้านี้ใช้กับงาน Node.js ใน workspace เช่น `ApoRaviz_Tools/split-order-txt`

ถ้าคำสั่งไหนมี path เฉพาะโปรเจกต์ เช่น input/output/backup ให้เก็บรายละเอียดจริงไว้ใน `docs/commands.md` ของโปรเจกต์นั้น

## Version Check

```bash
node -v
npm -v
```

workspace นี้ยึด Node 24+ เป็นค่า default สำหรับ Angular, VitePress, Node CLI และ backend

บน Windows ถ้า shell ยังชี้ไป Node เก่า:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
node -v
```

## Install

```bash
npm install
npm ci
```

จำสั้น ๆ:

```text
npm install = ใช้ตอนพัฒนาและเพิ่ม dependency
npm ci      = ใช้ install ตาม package-lock.json แบบตรงที่สุด
```

## Build TypeScript

```bash
npm run build
npx tsc
```

ใช้เมื่อต้องการแปลง TypeScript ใน `src/` เป็น JavaScript ใน `dist/`

## Run CLI

รูปแบบทั่วไป:

```bash
npm run start
npm run start -- input/order.txt
npm run start -- input/order.txt --output output --backup backup
npm run start -- input/order.txt --no-backup
```

เครื่องหมาย `--` หลัง script สำคัญ เพราะเป็นตัวบอก npm ว่า argument ต่อจากนี้ให้ส่งเข้าโปรแกรมของเรา

```text
npm run start -- input/order.txt
                  ^^^^^^^^^^^^^^^
                  ส่งเข้า process.argv ของ Node app
```

## Test

```bash
npm test
npm run test
```

ถ้าใช้ `node:test` โดยตรง:

```bash
node --test
node --test dist/**/*.test.js
```

## Search Useful Files

```bash
rg --files
rg "process.argv|createReadStream|createWriteStream|node:test|assert" src test
```

ใช้ตอนอยากรู้ว่าโปรเจกต์มี CLI args, stream, writer หรือ test อยู่ตรงไหน

## Debug Flow แบบเร็ว

```text
package.json scripts
-> src/index.ts
-> parse CLI arguments
-> call core function
-> read input
-> write output
-> move backup when success
```

ถ้าโปรแกรม fail:

1. ดู error message ว่าเป็น input format หรือ file system
2. ดูว่า input file ยังอยู่ที่เดิมไหม
3. ดูว่า output ถูกเขียนค้างไว้หรือไม่
4. รัน test เฉพาะ logic ที่เกี่ยวข้อง

## สรุปจำสั้น ๆ

```text
Node.js CLI = package.json script + process.argv + fs/stream + test
```

