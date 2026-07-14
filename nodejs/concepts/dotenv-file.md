# .env File คืออะไร

## ภาพจำง่าย ๆ

ถ้า [environment variable](environment-variable.md) คือกระดาษโน้ตที่ส่งให้โปรแกรมตอนเริ่มทำงาน

`.env` คือสมุดโน้ต local ที่เราเตรียมไว้บนเครื่อง dev

```text
.env         = สมุดกุญแจจริงของเครื่องเรา
.env.example = ใบรายการว่าต้องเตรียมกุญแจชื่ออะไร
.gitignore   = ป้ายบอก Git ว่าห้ามเก็บสมุดกุญแจจริง
```

## แปลเป็นภาษาคนธรรมดา

`.env` คือไฟล์ที่เก็บค่า environment variable สำหรับเครื่อง local ตอนพัฒนา เช่น:

```text
DATABASE_URL=postgres://local-dev-placeholder
JWT_SECRET=local-dev-placeholder
```

ไฟล์นี้สะดวกมาก แต่ต้องระวังมาก เพราะในงานจริงอาจมี [secret](secret.md) เช่น password, token, API key

ดังนั้น `.env` ต้องทำงานคู่กับ `.gitignore`

## แปลเป็น technical term

`.env` คือไฟล์ key/value ที่ tool หรือ framework บางตัวโหลดเข้า environment ของ process

ตัวไฟล์ `.env` เองไม่ได้วิเศษและไม่ได้ป้องกัน secret โดยอัตโนมัติ ความปลอดภัยมาจาก workflow รอบตัว:

```text
.env อยู่ local
.gitignore กันไม่ให้ Git track
.env.example commit ได้ เพราะไม่มีค่าจริง
server/CI/CD ใส่ secret จริงผ่าน settings ของระบบ
```

## Pattern ที่ควรใช้

ใน `.gitignore`:

```text
# Environment files
.env
.env.*
!.env.example
```

ความหมาย:

```text
.env          = ignore local secret file
.env.*        = ignore variants เช่น .env.local, .env.development
!.env.example = ยกเว้น template ให้ Git track ได้
```

ใน `.env.example`:

```text
DATABASE_URL=
JWT_SECRET=
```

ใน `.env` local:

```text
DATABASE_URL=postgres://local-dev-placeholder
JWT_SECRET=local-dev-placeholder
```

## ทำไม commit .env.example แต่ไม่ commit .env

`.env.example` ไม่มีค่าจริง มีแค่ชื่อ key ที่โปรเจกต์ต้องใช้ จึง commit ได้

```text
DATABASE_URL=
JWT_SECRET=
```

`.env` มีค่าจริงของเครื่องนั้น หรือในอนาคตอาจมี secret จริง จึงห้าม commit

```text
DATABASE_URL=postgres://user:password@host:5432/app
JWT_SECRET=real-secret
```

จำสั้น ๆ:

```text
แชร์ชื่อ key ผ่าน .env.example
ไม่แชร์ค่าจริงผ่าน Git
```

## ตรวจว่า .env ถูก ignore จริง

ดู status:

```bash
git status --short
```

ผลลัพธ์ที่ดี:

```text
 M .gitignore
?? .env.example
```

ไม่ควรเห็น `.env`

ถาม Git ตรง ๆ ว่า `.env` ถูก ignore ด้วย rule ไหน:

```bash
git check-ignore -v .env
```

ผลลัพธ์เช่น:

```text
.gitignore:60:.env      .env
```

แปลว่า `.env` ถูก ignore จาก rule `.env` ใน `.gitignore`

ตรวจว่า `.env.example` ถูกยกเว้นจาก ignore:

```bash
git check-ignore -v .env.example
```

ถ้าเห็น:

```text
.gitignore:62:!.env.example     .env.example
```

แปลว่า `.env.example` ไปเจอ exception rule `!.env.example` และ Git สามารถ track ได้

ถ้าไม่มี output ก็อาจแปลว่าไฟล์นั้นไม่ได้ถูก ignore เช่นกัน ให้ดู `git status --short` ประกอบเสมอ

## Dev หลายเครื่องส่ง .env กันอย่างไร

ไม่ควรส่ง `.env` ผ่าน Git

flow ที่ดีกว่า:

```text
1. commit .env.example
2. dev แต่ละเครื่อง copy .env.example เป็น .env
3. ใส่ค่าจริงผ่านช่องทางปลอดภัย
```

คำสั่งเริ่มจาก template:

```bash
cp .env.example .env
```

ช่องทางเก็บหรือส่งค่าจริงที่เหมาะกว่า Git:

```text
password manager เช่น 1Password, Bitwarden
hosting dashboard เช่น Vercel, Railway, Render, Netlify
CI/CD secrets เช่น GitHub Actions Secrets
secret manager เช่น Doppler, Infisical, AWS Secrets Manager
```

ภาพจำ:

```text
.env.example = รายการชื่อกุญแจ
.env         = พวงกุญแจจริงของเครื่องนั้น
secret manager/password manager = ตู้เซฟ
```

## Password manager, secret manager, hosting dashboard ต่างกันยังไง

```text
password manager = ตู้เซฟที่คนเปิดดูได้ เช่น 1Password, Bitwarden
secret manager   = ตู้เซฟสำหรับระบบ dev/deploy workflow เช่น Doppler, Infisical, AWS Secrets Manager
hosting dashboard = หน้า settings ของ platform ที่ใส่ env ให้ app ตอน deploy เช่น Railway, Render, Vercel
```

สำหรับ solo dev:

```text
local dev         -> .env.example + .env + password manager
production deploy -> hosting dashboard env
ทีมใหญ่ขึ้น       -> secret manager
```

## Flow ทีละขั้น

1. เพิ่ม ignore rule ใน `.gitignore`
2. สร้าง `.env.example` ที่มีชื่อ key แต่ไม่มีค่าจริง
3. สร้าง `.env` local ที่มีค่าฝึกหรือค่าจริงของเครื่องนั้น
4. ใช้ `git check-ignore -v .env` ตรวจว่า `.env` ถูก ignore
5. stage เฉพาะ `.gitignore` และ `.env.example`
6. commit และ push
7. ให้เครื่องอื่น copy `.env.example` เป็น `.env` แล้วเติมค่าจริงเองจากช่องทางปลอดภัย

## จุดที่มักงง

- `.env` ไม่ปลอดภัยเอง ถ้าเผลอ commit ก็ยังหลุดได้
- `.env.example` ควรมีชื่อ key แต่ไม่ควรมี secret จริง
- `!.env.example` คือ exception rule ที่ยกเว้นไฟล์ตัวอย่างจาก `.env.*`
- private repo ไม่ใช่ที่เก็บ secret ที่ดีที่สุด เพราะยังมี history และสิทธิ์การเข้าถึง
- frontend environment files ไม่ควรเก็บ secret เพราะค่าฝั่ง browser อาจถูกเห็นได้

## ศัพท์ที่เกี่ยวข้อง

- [Environment Variable](environment-variable.md)
- [Secret](secret.md)
- [Git .gitignore](../../git/concepts/gitignore.md)
- [Angular Environment Files](../../angular/concepts/environment-files.md)

## เช็กตัวเอง

- ทำไม `.env.example` commit ได้ แต่ `.env` ไม่ควร commit
- `!.env.example` ใน `.gitignore` แปลว่าอะไร
- `git check-ignore -v .env` ใช้ตรวจอะไร
- ถ้ามี dev 2 เครื่อง ควรแชร์ค่าจริงใน `.env` ผ่าน Git ไหม

## จำสั้น ๆ

```text
.env = ค่าจริงของเครื่อง local ห้าม commit
.env.example = template ชื่อ key commit ได้
.gitignore = ด่านกัน .env ไม่ให้เข้า Git
```

