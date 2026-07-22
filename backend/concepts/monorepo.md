# Monorepo และ Managed Monorepo

## ภาพจำ

ลองนึกถึงศูนย์การค้าที่มีหลายร้านอยู่ในอาคารเดียว:

```text
อาคารเดียว = Git repository เดียว
แต่ละร้าน   = application หรือ library คนละตัว
ฝ่ายอาคาร   = เครื่องมือช่วยบริหารความสัมพันธ์ระหว่างร้าน
```

มีหลายร้านในอาคารเดียวได้โดยยังไม่มีฝ่ายบริหารอัตโนมัติ และจะเพิ่มเครื่องมือบริหารเมื่อความซับซ้อนมากพอก็ได้

## ความหมายแบบคนธรรมดา

**Monorepo** คือการเก็บหลาย application หรือหลาย package ไว้ใน Git repository เดียว

```text
product/
├─ frontend/
├─ backend/
├─ admin/
└─ shared/
```

ทั้งหมดใช้ `.git` ชุดเดียว แต่ไม่จำเป็นต้องใช้ dependency หรือ deploy พร้อมกัน

**Managed monorepo** คือ monorepo ที่มีเครื่องมือช่วยจำว่า project ใดพึ่ง project ใด และช่วยจัดการคำสั่ง build, test, cache หรือ affected projects

## Technical Term

- **repository** คือพื้นที่ที่ Git ติดตามประวัติ
- **monorepo** คือ repository เดียวที่มีหลาย project
- **polyrepo** หรือ multi-repo คือแยก project ไปคนละ repository
- **dependency graph** คือแผนที่ว่า project หรือ library ใดพึ่งส่วนใด
- **affected project** คือ project ที่ได้รับผลกระทบจากไฟล์ที่เปลี่ยน
- **Nx** คือเครื่องมือหนึ่งสำหรับบริหาร monorepo หลาย framework รวมถึง Angular และ NestJS

## Monorepo ธรรมดากับ Managed Monorepo

```text
Monorepo ธรรมดา
-> developer และ CI รู้เองว่าต้องเข้าโฟลเดอร์ไหน
-> แต่ละ project อาจมี package.json และ scripts ของตัวเอง

Managed monorepo
-> tool อ่าน project graph
-> รู้ว่าอะไรพึ่งอะไร
-> เลือก build/test เฉพาะส่วนที่ได้รับผลกระทบได้
-> ใช้ cache ลดงานซ้ำได้
```

ตัวอย่างโครงสร้างที่เครื่องมืออย่าง Nx มักบริหาร:

```text
product/
├─ apps/
│  ├─ web/
│  └─ api/
├─ libs/
│  ├─ shared-types/
│  └─ shared-utils/
├─ nx.json
└─ package.json
```

ถ้าแก้ `shared-types` ที่ทั้ง web และ api ใช้ dependency graph จะบอกว่าทั้งสอง project ได้รับผลกระทบ แต่ถ้าแก้ style ที่ web ใช้เพียงตัวเดียว ก็อาจรันเฉพาะ build/test ของ web

## เมื่อใดควรอยู่ Repo เดียว

- frontend และ backend เปลี่ยน API ไปด้วยกันบ่อย
- ทีมเดียวกันดูแลทั้งระบบ
- ต้องการแก้ข้ามหลาย project ใน commit/PR เดียว
- ต้องการแชร์ type, library หรือ configuration

## เมื่อใดควรแยก Repo

- คนละทีมและมี ownership แยกชัด
- ต้องกำหนดสิทธิ์เข้าถึง repository ต่างกัน
- release และ deploy มีวงจรชีวิตอิสระจริง
- project ไม่ได้เปลี่ยนไปด้วยกันและไม่แชร์ code

ขนาดของ code อย่างเดียวไม่ใช่คำตอบ ต้องดู team boundary, access control และ deployment lifecycle ประกอบ

## จุดที่มักงง

- Monorepo ไม่ได้แปลว่า application ทั้งหมดต้อง deploy พร้อมกัน
- Monorepo ไม่ได้แปลว่าเป็น microservices
- มีหลาย project ใน repo เดียวได้โดยยังไม่ใช้ Nx
- Nx เป็นเครื่องมือ ไม่ใช่คำเรียก architecture ของ backend
- Nest CLI monorepo mode เน้นหลาย Nest applications/libraries ส่วน Nx จัด workspace ที่มีหลาย framework ได้
- เพิ่มเครื่องมือเมื่อมีปัญหาที่มันช่วยแก้จริง ไม่จำเป็นต้องเพิ่มตั้งแต่มีเพียงสอง project

## เช็กตัวเอง

- Git repo เดียวที่มี frontend และ backend สองโฟลเดอร์เรียกว่าอะไรในความหมายกว้าง?
- คำว่า managed เพิ่มความสามารถอะไรให้ monorepo?
- เหตุใด project ใหญ่จึงไม่ได้แปลว่าต้องแยก repository เสมอ?

## อ่านต่อ

- [Nest CLI และโครงสร้างโปรเจกต์](../../nestjs/nest-cli-project-structure.md)
- [NestJS Workspaces](https://docs.nestjs.com/cli/monorepo)
- [npm Workspaces](https://docs.npmjs.com/cli/using-npm/workspaces/)
- [Nx with Angular](https://nx.dev/docs/technologies/angular/introduction)

## จำสั้น ๆ

```text
Monorepo         = หลาย project ใน Git repo เดียว
Managed monorepo = มี tool ช่วยจัด graph/build/test/cache
Nx               = หนึ่งในเครื่องมือที่ทำหน้าที่นั้น
```

