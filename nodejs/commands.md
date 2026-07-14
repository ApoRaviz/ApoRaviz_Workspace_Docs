# Node.js Commands

คำสั่งหน้านี้ใช้กับงาน Node.js ใน workspace เช่น `ApoRaviz_Tools/split-order-txt`

ถ้าคำสั่งไหนมี path เฉพาะโปรเจกต์ เช่น input/output/backup ให้เก็บรายละเอียดจริงไว้ใน `docs/commands.md` ของโปรเจกต์นั้น

## Version Check

```bash
node -v
npm -v
which node
which npm
node -p "process.versions"
```

workspace นี้ยึด Node ตาม [`baseline.md`](../baseline.md) สำหรับ Angular, VitePress, Node CLI และ backend

`node -v` และ `npm -v` ใช้ดู version ส่วน `which node` และ `which npm` ใช้ดูว่า command ทั้งสองมาจาก Node installation ชุดเดียวกันหรือไม่

อ่าน flow เต็ม: [Node And npm Version Check](teach/06-node-npm-version-check.md)

ถ้าใช้ `nvm` และ shell หลุดไป Node version เก่า ให้สลับกลับมา Node 24:

```bash
nvm use 24
node -v
npm -v
which node
which npm
```

คาดหวังให้ `node` และ `npm` ชี้ไป Node version เดียวกันตาม [`baseline.md`](../baseline.md)

ถ้า shell ชี้ไป Node เก่า ให้เลือก version (machine-agnostic):

```bash
# macOS:   nvm use            (อ่าน .nvmrc)
# Windows: nvm use <version>  (nvm-windows ไม่อ่าน .nvmrc)
node -v
```

อ่าน concept:

- [Environment Variable](concepts/environment-variable.md)

## Environment Variables

ดูค่า environment variable ที่มีอยู่ใน shell:

```bash
printenv HOME
printenv PATH
```

อ่านค่าเดียวกันผ่าน Node.js:

```bash
node -p "process.env.HOME"
node -p "process.env.PATH"
```

ตรวจว่า `PATH` พา shell ไปเจอ `node` ตัวไหน:

```bash
which node
node -v
```

ถ้าอยากให้ shell ใช้ Node ตาม baseline ของ workspace:

```bash
nvm use 24
which node
node -v
```

จำสั้น ๆ:

```text
printenv HOME            = shell อ่าน env
node -p "process.env.X"  = Node.js อ่าน env
PATH                     = env ที่ช่วย shell หา command
nvm use                  = เปลี่ยน PATH ของ shell รอบนั้น
```

อ่าน concept:

- [Environment Variable](concepts/environment-variable.md)
- [Secret](concepts/secret.md)

## Local .env Files

เช็กก่อนว่า `.gitignore` มี rule กัน `.env` หรือยัง:

```bash
grep -n '^\\.env' .gitignore
```

ตัวอย่าง rule ที่ควรมี:

```text
# Environment files
.env
.env.*
!.env.example
```

สร้างไฟล์ `.env` เปล่า:

```bash
touch .env
```

สร้าง `.env` จาก template:

```bash
cp .env.example .env
```

ตรวจว่า `.env` มีอยู่จริง:

```bash
ls -la .env .env.example
```

ถาม Git ว่า `.env` ถูก ignore ด้วย rule ไหน:

```bash
git check-ignore -v .env
```

ตรวจว่า `.env.example` ถูกยกเว้นจาก ignore rule:

```bash
git check-ignore -v .env.example
```

ดู status ก่อน commit:

```bash
git status --short
```

ควรเห็นเฉพาะไฟล์ที่ commit ได้:

```text
 M .gitignore
?? .env.example
```

หลัง stage แล้วดู staged diff:

```bash
git add .gitignore .env.example
git diff --cached -- .gitignore .env.example
```

จำสั้น ๆ:

```text
.env = local secret/config ห้าม commit
.env.example = template ไม่มีค่าจริง commit ได้
git check-ignore -v = ตรวจว่า ignore จาก rule ไหน
```

อ่าน concept:

- [.env File](concepts/dotenv-file.md)
- [Secret](concepts/secret.md)
- [Git .gitignore](../git/concepts/gitignore.md)

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
