# Node and npm Version Check

บทนี้สรุป Step 0.1.1 จาก `ApoRaviz_DevEng`: Node.js & npm คืออะไร และทำไมต้องเลือกเวอร์ชันให้ถูกก่อนเริ่ม Angular/NestJS

## ภาพจำง่าย ๆ

ก่อนสร้างบ้าน ต้องเช็กว่าเครื่องมือชุดเดียวกันไหม:

```text
Node.js = runtime ที่เอา JavaScript ไปรันนอก browser
npm     = package manager และ script runner ที่มากับชุด Node
```

ภาพจำอีกแบบ:

```text
Node.js installation หนึ่งชุด
-> bin/node = ตัวรัน JavaScript
-> bin/npm  = ตัวติดตั้ง package และรัน script
```

ถ้า `node` กับ `npm` มาจากคนละชุดกัน ปัญหาที่เจออาจดูเหมือน code ผิด ทั้งที่จริง ๆ เป็นเครื่องมือชี้คนละทาง

## Technical Term

```text
runtime = ตัวที่เอา code ไปรัน
package manager = ตัวจัดการ dependency/package ของโปรเจกต์
script runner = ตัวรันคำสั่งที่ประกาศใน package.json
nvm = เครื่องมือจัดการ Node.js หลายเวอร์ชันในเครื่องเดียว
PATH = ลำดับที่ shell ใช้ค้นหา command
V8 = JavaScript engine ที่ Chrome และ Node.js ใช้รัน JavaScript
```

## ทำไมต้องเช็ก Node version

Angular, NestJS, TypeScript และ build tools ไม่ได้รองรับ Node ทุกเวอร์ชันเสมอไป

ถ้า Node เก่าเกินไป อาจเจออาการแบบนี้:

```text
npm install fail
Angular CLI รันไม่ได้
build ผ่านเครื่องหนึ่ง แต่ fail อีกเครื่อง
CI/CD fail ทั้งที่ local ผ่าน
```

สำหรับ workspace นี้ baseline คือ:

```text
Node.js 24 LTS
```

ตัวอย่าง requirement:

```text
^24.15.0
```

แปลว่า:

```text
ใช้ Node major 24 ที่ version ตั้งแต่ 24.15.0 ขึ้นไปได้
```

ดังนั้น:

```text
24.16.0 ใช้ได้ เพราะมากกว่า 24.15.0 และยังอยู่ในสาย major 24
```

## npm ต้องเลือกเองไหม

ปกติไม่ต้องเลือก npm version เองก่อน

เวลาเราติดตั้ง Node ผ่าน installer หรือ `nvm` มันจะพ่วง npm version ที่เหมาะกับ Node ชุดนั้นมาด้วย

flow ที่ใช้จริง:

```text
1. เลือก Node version ให้ตรง requirement ของ framework
2. ดู npm ที่ติดมาด้วย
3. ถ้า install/build/test ผ่าน ให้ใช้ต่อ
4. ค่อยอัปเดต npm แยกเมื่อมีเหตุผลจริง
```

ไม่ควรเริ่มจากการจับคู่ Node/npm เองจากศูนย์ทุกครั้ง เพราะการอัปเดต npm แยกอาจทำให้ `package-lock.json` เปลี่ยน format หรือ behavior เปลี่ยนโดยไม่จำเป็น

## ลงมือเช็กทีละ command

ก่อนเช็กให้แยกว่าแต่ละคำสั่งกำลังถาม version ของเครื่องมือคนละชั้น:

| คำสั่ง | สิ่งที่ตรวจ |
|---|---|
| `node -v` | Node.js runtime |
| `nvm version` (Windows) / `nvm --version` (macOS/Linux) | โปรแกรม NVM ที่ใช้จัดการ Node.js |
| `npm -v` | npm package manager |
| `npx tsc --version` | TypeScript ของ npm project ปัจจุบัน |
| `npx ng version` | Angular CLI, Angular packages, Node และ TypeScript ฝั่ง Angular |
| `npx nest --version` | Nest CLI ของ npm project ปัจจุบัน |

`npx` จะหา binary จาก `node_modules` ของ project ปัจจุบันก่อน ดังนั้นให้เข้าโฟลเดอร์ที่มี `package.json` ของ project ที่ต้องการตรวจ

ดู TypeScript version ที่ npm ติดตั้งไว้ตรงระดับ project:

```bash
npm ls typescript --depth=0
```

ถ้า repository เดียวมี frontend และ backend แยก `package.json` กัน ทั้งสองส่วนสามารถใช้ TypeScript คนละ version ได้:

```text
frontend/package.json -> TypeScript ช่วงที่ frontend framework รองรับ
backend/package.json  -> TypeScript ช่วงที่ backend framework รองรับ
```

ไม่จำเป็นต้องบังคับให้เลขเท่ากัน ให้ยึด compatibility ของแต่ละ project และ version จริงใน `package-lock.json`

เช็ก Node version:

```bash
node -v
```

ตัวอย่างผลลัพธ์:

```text
v24.16.0
```

เช็ก npm version:

```bash
npm -v
```

ตัวอย่างผลลัพธ์:

```text
11.13.0
```

เช็กว่า Node ข้างในพ่วง library อะไรมา:

```bash
node -p "process.versions"
```

ค่าที่ควรเริ่มรู้จัก:

```text
node = version ของ Node.js runtime
v8 = JavaScript engine ที่ใช้รัน JavaScript
openssl = library ด้าน crypto/TLS
undici = HTTP client ภายใน Node เช่น fetch
```

หมายเหตุ:

```text
process.versions ไม่มี npm
```

เพราะ `process.versions` แสดงชิ้นส่วนข้างใน Node runtime ส่วน npm เป็น CLI tool ที่ติดมากับชุดติดตั้ง Node แต่ไม่ใช่ runtime component ตัวเดียวกัน

## เช็กว่า node กับ npm มาจากชุดเดียวกันไหม

บน macOS/Linux:

```bash
which node
which npm
```

ตัวอย่างผลลัพธ์ที่ดี:

```text
/Users/<you>/.nvm/versions/node/v24.x/bin/node
/Users/<you>/.nvm/versions/node/v24.x/bin/npm
```

(path จริงต่างกันตามเครื่อง — Mac กับ Windows ไม่เหมือนกัน อย่าจด path เต็มเป็นค่าตายตัว)

แปลว่า:

```text
node และ npm มาจาก Node installation ชุดเดียวกัน
```

ถ้า path ชี้คนละ version เช่น:

```text
node -> .../v24.16.0/bin/node
npm  -> .../v20.x.x/bin/npm
```

อาจทำให้ install/build script ใช้เครื่องมือคนละชุด เกิด error แปลก ๆ หรือผลลัพธ์ไม่เหมือนเครื่องอื่น

ถ้าใช้ `nvm` แล้วพบว่า shell หลุดไป Node version เก่า ให้สลับกลับมา baseline ก่อนรัน Angular/NestJS command:

```bash
nvm use 24
node -v
npm -v
which node
which npm
```

ตัวอย่างเหตุการณ์จริง:

```text
Angular CLI 22 ต้องการ Node ^22.22.3 หรือ ^24.15.0 หรือ >=26.0.0
แต่ shell ใช้ Node v22.14.0 อยู่
แก้โดย nvm use 24 แล้วตรวจ node/npm/path ซ้ำ
```

## Chrome, V8, Node.js ต่างกันยังไง

```text
Google Chrome = browser ทั้งตัว
V8            = JavaScript engine ข้างใน Chrome
Node.js       = runtime ที่เอา V8 มาใช้รัน JavaScript นอก browser
```

ภาพจำ:

```text
Chrome = รถทั้งคัน
V8     = เครื่องยนต์ในรถ
Node.js = เอาเครื่องยนต์ JavaScript มาใส่โลก backend/CLI
```

สิ่งที่เหมือนกัน:

```text
Chrome และ Node.js ใช้ V8 เพื่อรัน JavaScript
```

สิ่งที่ต่างกัน:

```text
Chrome มี DOM เช่น document, window, button, input
Node.js มี fs, path, process, http เช่น เปิด server ได้
```

ตัวอย่างที่รันได้ทั้งคู่:

```js
console.log('hello');
```

ตัวอย่างที่ใช้ใน browser:

```js
document.querySelector('button');
```

ตัวอย่างที่ใช้ใน Node.js:

```js
import { readFileSync } from 'node:fs';

readFileSync('file.txt', 'utf8');
```

## จุดที่มักงง

- `npm` ไม่ใช่แค่ตัวจัดการคำสั่ง แต่จัดการ package, dependency, script และ lockfile ด้วย
- Node version ถูก แต่ `npm` path ผิด ก็ยังทำให้โปรเจกต์เพี้ยนได้
- `process.versions` บอก runtime internals ไม่ได้บอก npm version
- Angular ไม่ได้ต้องใช้ Node version สูงสุดเสมอไป ต้องใช้ version ที่อยู่ใน compatibility range
- Node 26 ใหม่กว่า Node 24 แต่ไม่ได้แปลว่าควรรีบใช้ ถ้า workspace baseline ยังล็อก Node 24 LTS อยู่

## Self-check

ลองตอบเอง:

1. Node.js ต่างจาก npm อย่างไร
2. ทำไมต้องเช็ก `node -v` ก่อนสร้าง Angular project
3. `^24.15.0` แปลว่าอะไร
4. ทำไม `which node` และ `which npm` สำคัญ
5. ทำไม `process.versions` ถึงไม่มี npm
6. Chrome, V8, Node.js เกี่ยวข้องกันอย่างไร

## สรุปจำสั้น ๆ

```text
Node.js = runtime
npm     = package manager/script runner ที่มากับ Node ชุดนั้น
V8      = JavaScript engine
เช็กให้ครบ = node -v -> npm -v -> which node -> which npm
```
