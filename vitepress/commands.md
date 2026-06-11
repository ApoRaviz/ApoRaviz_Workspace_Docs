# VitePress Commands

ไฟล์นี้รวม command ที่ต้องเรียนรู้สำหรับดูแลเว็บ docs กลาง `ApoRaviz_Workspace_Docs`

ถ้าต้องการอธิบายแนวคิด VitePress แบบเต็ม ให้อ่าน [VitePress Guide](index.md)

## Runtime Check

repo นี้ใช้ Node 24+

PowerShell:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
node -v
npm -v
```

macOS/Linux:

```bash
nvm use 24
node -v
npm -v
```

ผลที่ควรเห็น:

```text
v24.x.x
```

## Install Dependencies

ติดตั้ง dependency ตอนพัฒนา:

```bash
npm install
```

ติดตั้งจาก lockfile สำหรับ CI หรือเครื่องที่ต้องการความตรง:

```bash
npm ci
```

จำสั้น ๆ:

```text
npm install = ใช้ตอนพัฒนา
npm ci      = ใช้ตอน automation หรือ build ให้ตรง lockfile
```

## Dev Server

เปิดเว็บระหว่างเขียน:

```bash
npm run docs:dev
```

ระบุ port เอง:

```bash
npm run docs:dev -- --port 5174
```

รัน VitePress ตรง:

```bash
npx vitepress dev --host 127.0.0.1
```

บทเรียน:

- ใช้ dev server เพื่อดู sidebar, link, code block และ layout ขณะเขียน
- ถ้า port ชน ให้เปลี่ยน port
- ถ้าย้ายไฟล์หรือเปลี่ยน sidebar แล้วเว็บไม่อัปเดต ให้หยุด server แล้วรันใหม่

## Build

ตรวจว่าเว็บพร้อม deploy:

```bash
npm run docs:build
```

รัน VitePress build ตรง:

```bash
npx vitepress build
```

ผลลัพธ์อยู่ที่:

```text
.vitepress/dist
```

บทเรียน:

- build ผ่านคือขั้นต่ำก่อน push งาน docs
- ถ้า link ไปไฟล์ไม่มีจริง build จะ fail
- ไม่ต้อง commit `.vitepress/dist` เพราะเป็น build output

## Preview

ดู output หลัง build:

```bash
npm run docs:preview
```

ระบุ port เอง:

```bash
npm run docs:preview -- --port 4174
```

รัน preview ตรง:

```bash
npx vitepress preview --host 127.0.0.1
```

ใช้เมื่ออยากดูเว็บใกล้เคียง production หลัง build แล้ว

## Route And Link Checks

ดูไฟล์ Markdown ทั้งหมด:

```bash
rg --files -g '*.md'
```

ดูเฉพาะบทเรียน Angular:

```bash
rg --files angular
```

ดูหัวข้อในไฟล์:

```bash
rg "^## " vitepress/index.md
rg "^## " angular/labs/03-basic-form-input.md
```

เช็ก path ใน sidebar:

```bash
rg "/angular/labs|/angular/concepts|/projects/mooping" .vitepress/config.mts
```

กติกา route:

```text
index.md                              -> /
vitepress/index.md                    -> /vitepress/
vitepress/commands.md                 -> /vitepress/commands
angular/labs/03-basic-form-input.md   -> /angular/labs/03-basic-form-input
projects/mooping/index.md             -> /projects/mooping/
```

## Sidebar And Nav

เปิด config:

```bash
sed -n '1,220p' .vitepress/config.mts
```

ค้นหา menu:

```bash
rg "sidebar|nav|Commands|Angular Learning" .vitepress/config.mts
```

หลังแก้ sidebar ให้รัน:

```bash
npm run docs:build
```

บทเรียน:

- nav คือเมนูด้านบน
- sidebar คือสารบัญด้านซ้าย
- ถ้าเพิ่มหน้าใหม่แล้วอยากให้คนเห็น ต้องเพิ่ม link เข้า sidebar หรือ index ที่เกี่ยวข้อง

## Deploy GitHub Pages

repo นี้ใช้ GitHub Actions:

```text
.github/workflows/deploy-pages.yml
```

ปกติแค่ push เข้า `main`:

```bash
git push origin main
```

workflow จะรัน:

```bash
npm ci
npm run docs:build
```

แล้ว upload:

```text
.vitepress/dist
```

URL ที่ควรได้:

```text
https://aporaviz.github.io/ApoRaviz_Workspace_Docs/
```

ถ้าต้องการสั่ง deploy เอง:

```text
Actions -> Deploy VitePress to GitHub Pages -> Run workflow
```

## ก่อน Push

```bash
npm run docs:build
git status --short --branch
git diff --check
git diff --cached --stat
```

## จำสั้น ๆ

```text
docs:dev = เปิดเว็บระหว่างเขียน
docs:build = ตรวจว่าเว็บพร้อม deploy
docs:preview = ดู output หลัง build
.vitepress/config.mts = nav/sidebar/config
.vitepress/dist = output สำหรับ GitHub Pages
```
