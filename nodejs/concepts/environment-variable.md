# Environment Variable คืออะไร

## ภาพจำง่าย ๆ

ลองนึกว่าโปรแกรมคือคนทำงานคนหนึ่ง

```text
code = วิธีทำงานที่เขียนไว้
environment variable = กระดาษโน้ตที่ห้องทำงานส่งให้ก่อนเริ่มงาน
```

โปรแกรมไม่จำเป็นต้องเขียนค่าทุกอย่างไว้ใน code เอง แต่สามารถรับค่าบางอย่างจาก environment ตอนเริ่มรันได้

## แปลเป็นภาษาคนธรรมดา

environment variable คือค่าแบบ `ชื่อ -> ค่า` ที่ระบบ, shell, dev tool, server หรือ CI/CD ส่งให้โปรแกรมตอนโปรแกรมเริ่มทำงาน

ตัวอย่างค่าที่เครื่องมักมีอยู่แล้ว:

```text
HOME -> /Users/[[username]]
PATH -> รายชื่อโฟลเดอร์ที่ shell ใช้หา command
USER -> ชื่อ user ของเครื่อง
SHELL -> shell ที่กำลังใช้ เช่น /bin/zsh
```

ตัวอย่างค่าที่แอปจริงอาจต้องใช้:

```text
DATABASE_URL -> connection string ของ database
JWT_SECRET   -> secret สำหรับ sign token
API_KEY      -> key สำหรับเรียก service ภายนอก
```

## แปลเป็น technical term

environment variable คือ key/value pair ที่อยู่ใน environment ของ process

ใน Node.js โปรแกรมอ่านค่าเหล่านี้ผ่าน `process.env`

```ts
const home = process.env["HOME"];
const databaseUrl = process.env["DATABASE_URL"];
```

คำว่า `process` ในที่นี้คือ process ของ Node.js ที่กำลังรันอยู่ ส่วน `env` คือ object ที่เก็บ environment variables ที่ process นั้นได้รับมาตอนเริ่มทำงาน

## ทำไมเราเริ่มจาก HOME

ตอนเรียนเราใช้ `HOME` เพราะเป็นตัวอย่างที่ปลอดภัย:

```text
HOME = มีอยู่จริงในเครื่อง
HOME = ไม่ใช่ secret
HOME = ไม่ต้องสร้างไฟล์ใหม่
HOME = ใช้พิสูจน์กลไกว่า shell และ Node.js อ่าน env ได้จริง
```

เราไม่ได้ใช้ `API_KEY` จริงตั้งแต่แรก เพราะยังไม่ควรเอา secret จริงมาเล่นในบทเรียน

## ตัวอย่างสั้นที่สุด

ดูค่า env จาก shell:

```bash
printenv HOME
```

ผลลัพธ์เช่น:

```text
/Users/[[username]]
```

ดูค่า env จาก Node.js:

```bash
node -p "process.env.HOME"
```

ผลลัพธ์ควรเป็นค่าเดียวกัน:

```text
/Users/[[username]]
```

นี่พิสูจน์ว่า:

```text
shell มี HOME
Node.js process รับ HOME จาก shell
Node.js อ่าน HOME ได้ผ่าน process.env
```

## PATH สำคัญอย่างไร

`PATH` คือ environment variable ที่เก็บรายชื่อโฟลเดอร์ที่ shell จะใช้ค้นหา command

เวลาเราพิมพ์:

```bash
node
```

shell ไม่ได้รู้เองว่า `node` อยู่ที่ไหน มันจะไล่หาไฟล์ executable ชื่อ `node` จากโฟลเดอร์ใน `PATH` จากซ้ายไปขวา

ตรวจว่า shell เจอ `node` ที่ไหน:

```bash
which node
```

ตัวอย่าง:

```text
/Users/[[username]]/.nvm/versions/node/v24.16.0/bin/node
```

แปลว่า command `node` รอบนี้มาจาก Node v24.16.0 ที่ `nvm` จัดให้

## nvm use เปลี่ยน env อย่างไร

คำสั่ง:

```bash
nvm use 24
```

ไม่ได้แก้ code ของโปรเจกต์ แต่เปลี่ยน environment ของ shell รอบนั้น โดยเฉพาะ `PATH`

ก่อนใช้ `nvm use 24` อาจเป็น:

```text
which node -> /Users/[[username]]/.nvm/versions/node/v22.14.0/bin/node
```

หลังใช้ `nvm use 24` ควรเป็น:

```text
which node -> /Users/[[username]]/.nvm/versions/node/v24.16.0/bin/node
node -v    -> v24.16.0
```

ภาพจำ:

```text
nvm use 24 = ย้ายชั้นวาง Node 24 ขึ้นมาให้ shell เจอก่อน
```

## Flow ทีละขั้น

1. shell เปิดขึ้นมาและมี environment ของตัวเอง เช่น `HOME`, `PATH`
2. user รัน command เช่น `node -p "process.env.HOME"`
3. shell ใช้ `PATH` หา executable ชื่อ `node`
4. shell เริ่ม Node.js process พร้อมส่ง environment ให้
5. Node.js อ่านค่าผ่าน `process.env`

## ใช้กับ secret อย่างไร

ในแอปจริง เราไม่ควรเขียนค่าลับลง code:

```ts
const databaseUrl = "postgres://real-user:real-password@host:5432/app";
```

แต่ควรอ่านจาก env:

```ts
const databaseUrl = process.env["DATABASE_URL"];
```

code จึงรู้แค่ว่า "ต้องอ่านค่า `DATABASE_URL`" แต่ไม่รู้ password จริงจากตัวไฟล์ code

อ่านต่อ: [Secret](secret.md)

ถ้าต้องจัด env หลายตัวบนเครื่อง local ตอนพัฒนา อ่านต่อ: [.env File](dotenv-file.md)

## จุดที่มักงง

- environment variable ไม่ได้ใช้เฉพาะการเขียนโปรแกรม แต่ shell, OS, dev tools, server และ CI/CD ใช้ด้วย
- `HOME` ไม่ใช่ secret แต่ใช้เป็นตัวอย่างปลอดภัยเพื่อเรียนกลไก
- `PATH` ไม่ใช่ path เดียว แต่เป็นรายชื่อหลายโฟลเดอร์ที่คั่นด้วย `:` บน Unix/macOS และ `;` บน Windows
- `nvm use` เปลี่ยน environment ของ shell รอบนั้น ไม่ได้แก้ source code
- Angular environment files ไม่ใช่ที่เก็บ secret เพราะค่าฝั่ง frontend ถูก build ไปอยู่ใน JavaScript ที่ browser โหลดได้

## ศัพท์ที่เกี่ยวข้อง

- [Secret](secret.md)
- [.env File](dotenv-file.md)
- [Angular Environment Files](../../angular/concepts/environment-files.md)
- [Node And npm Version Check](../teach/06-node-npm-version-check.md)

## เช็กตัวเอง

- ทำไมเราใช้ `HOME` เป็นตัวอย่างแทน `API_KEY` จริง
- `PATH` เกี่ยวอะไรกับคำสั่ง `node`
- `nvm use 24` เปลี่ยนอะไรใน shell
- ทำไม backend จึงนิยมอ่าน `DATABASE_URL` จาก env

## จำสั้น ๆ

```text
environment variable = ค่า key/value ที่ process รับจาก environment ตอนเริ่มทำงาน
PATH = env ที่ช่วย shell หา command
process.env = วิธีที่ Node.js อ่าน env
```
