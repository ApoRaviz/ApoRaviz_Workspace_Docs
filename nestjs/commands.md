# NestJS Commands

หน้านี้รวมคำสั่ง NestJS ที่เรียนและตรวจผลแล้ว โดยเพิ่มทีละคำสั่งตามบทเรียน ไม่รวบคำสั่งที่ยังไม่เคยใช้งานมาให้จำพร้อมกัน

## หลักก่อนรันคำสั่ง

```text
สร้าง project ใหม่      = รันจากโฟลเดอร์แม่ที่ต้องการให้ project ไปอยู่
generate ส่วนประกอบ     = รันจาก root ของ NestJS project ที่มี nest-cli.json
ไม่แน่ใจว่าแก้อะไรบ้าง = ใช้ --dry-run ก่อน
```

ถ้า Nest CLI อยู่ใน `devDependencies` ของ project แล้ว `npx nest` จะเลือก binary จาก `node_modules` ของ project ก่อน จึงไม่จำเป็นต้องติดตั้ง CLI แบบ global

## สร้าง NestJS Project

ดูผลล่วงหน้าโดยยังไม่เขียนไฟล์:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git --dry-run
```

สร้างจริง:

```bash
npx -y @nestjs/cli@latest new api --package-manager npm --strict --skip-git
```

option ที่ใช้:

```text
--package-manager npm = ใช้ npm และไม่ถามซ้ำ
--strict              = เปิด TypeScript strict settings
--skip-git            = ไม่สร้าง Git repository ซ้อน
--dry-run             = แสดงสิ่งที่จะเปลี่ยน แต่ยังไม่เขียนไฟล์
```

อ่าน flow และ File Map: [Nest CLI และโครงสร้างโปรเจกต์](nest-cli-project-structure.md)

## สร้าง Module

ดูผลล่วงหน้า:

```bash
npx nest generate module health --dry-run
```

สร้างจริง:

```bash
npx nest generate module health
```

รูปแบบทั่วไป:

```text
npx nest generate module [[ชื่อ feature]]
```

ผลที่คาด:

```text
CREATE src/health/health.module.ts
UPDATE src/app.module.ts
```

CLI จะสร้าง feature module และเพิ่ม module นั้นเข้า `imports` ของ module แม่ที่เหมาะสม แต่ยังต้องอ่าน diff ทุกครั้งว่า CLI update ไฟล์ใดจริง

คำสั่งแบบย่อมีอยู่ แต่ช่วงเรียนพื้นฐานใช้ชื่อเต็ม `generate module` ก่อนเพื่อให้อ่านแล้วรู้หน้าที่ทันที

## ตรวจผลหลัง Generate

```bash
git status --short
git diff
npm run lint
npm run build
```

`generate` สำเร็จไม่ได้แปลว่าโครงสร้างถูกกับความต้องการเสมอ ต้องอ่านไฟล์และรัน validation ต่อ

## จุดที่มักงง

- `nest new` สร้าง project ใหม่ ส่วน `nest generate` เพิ่มส่วนประกอบใน project ที่มีอยู่
- `--dry-run` ไม่สร้างไฟล์ จึงต้องนำ option ออกเมื่อตรวจรายการแล้ว
- ต้องรัน `generate` ใน NestJS project ไม่ใช่ root ของ frontend ที่ไม่มี `nest-cli.json`
- `npx nest` ใช้ CLI ของ project ได้ ไม่จำเป็นต้องพึ่ง version global
- Module ที่ generate แล้วอาจยังไม่มี route เพราะต้องมี Controller ก่อน

## เช็กตัวเอง

- ถ้าต้องการดูว่า CLI จะแก้ไฟล์อะไรโดยยังไม่เขียนจริง ต้องเพิ่ม option ใด?
- `nest new` กับ `nest generate module` ต่างกันอย่างไร?
- หลัง generate แล้ว เหตุใดต้องดู `git diff` อีกครั้ง?

## จำสั้น ๆ

```text
new          = สร้าง project
generate     = เพิ่มส่วนประกอบ
--dry-run    = ดูก่อน ยังไม่เขียน
git diff     = ตรวจสิ่งที่ CLI เปลี่ยนจริง
```

