# VitePress Guide

คู่มือนี้เขียนสำหรับคนที่ยังไม่เคยใช้ VitePress เลย และใช้กับ repo นี้โดยตรง:

```text
ApoRaviz_Workspace_Docs
```

## VitePress คืออะไร

ภาพจำง่าย ๆ:

```text
Markdown = สมุดจด
VitePress = เครื่องถ่ายเอกสาร + จัดสารบัญ + ทำเว็บให้อ่าน
Browser = คนเปิดอ่านเว็บ
```

เราเขียนไฟล์ `.md` เหมือนจด note ปกติ แล้ว VitePress แปลงเป็นเว็บ static ที่มีหน้าเว็บ, sidebar, navbar, search, code block และ dark/light mode ให้พร้อมใช้

## ทำไม repo นี้ใช้ VitePress

`ApoRaviz_Workspace_Docs` จะมีข้อมูลเยอะขึ้นเรื่อย ๆ ถ้าอ่านจากไฟล์ Markdown ตรง ๆ จะเริ่มหลงง่าย

VitePress ช่วยให้:

- เปิดอ่านเหมือนเว็บจริง
- แบ่งหมวด Angular, Labs, Projects, Rules ได้
- search ใน docs ได้
- build เป็น HTML static สำหรับ deploy ได้
- ไม่ต้องสร้าง Angular app เพื่อทำเว็บเอกสาร

## ไฟล์สำคัญใน repo นี้

```text
package.json              = รวมคำสั่งรัน VitePress
package-lock.json         = ล็อก version ของ dependency
.vitepress/config.mts     = ตั้งค่าเว็บ, nav, sidebar, base path
index.md                  = หน้าแรกของเว็บ docs
public/                   = asset ที่อยากให้ copy ไปเว็บแบบชื่อเดิม
angular/                  = บทเรียน Angular/Tailwind
projects/                 = case study จากโปรเจกต์จริง
templates/                = template สำหรับเขียนบทเรียน
```

## ก่อนรันต้องใช้ Node 24+

PowerShell:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
node -v
```

ผลที่ควรเห็น:

```text
v24.16.0
```

จำสั้น ๆ:

```text
Angular 22 และ VitePress ใน repo นี้ใช้ Node 24+
ถ้า shell เป็น Node 22.14 ให้สลับก่อนรัน
```

## ติดตั้ง dependency ครั้งแรก

ถ้าเพิ่ง clone repo หรือยังไม่มี `node_modules`:

```powershell
npm install
```

คำสั่งนี้อ่าน `package.json` และ `package-lock.json` แล้วติดตั้ง VitePress ให้พร้อมรัน

## เปิดเว็บ docs ตอนเขียน

```powershell
npm run docs:dev
```

เมื่อรันสำเร็จ จะเห็น URL ประมาณนี้:

```text
http://127.0.0.1:5173/ApoRaviz_Workspace_Docs/
```

เปิด URL นี้ใน browser เพื่อดูเว็บ docs

คำว่า dev server แปลแบบง่าย:

```text
server ชั่วคราวในเครื่องเรา
ใช้ดูเว็บระหว่างเขียน
แก้ไฟล์แล้วเว็บอัปเดตเร็ว
```

## Build เป็นเว็บ static

```powershell
npm run docs:build
```

คำสั่งนี้ใช้ตรวจว่า docs ทั้งเว็บ build ผ่านไหม

ผลลัพธ์จะถูกสร้างที่:

```text
.vitepress/dist/
```

โฟลเดอร์นี้ไม่ต้อง commit เพราะเป็น build output

## Preview หลัง build

```powershell
npm run docs:preview
```

ใช้ดู output ที่ build แล้วแบบใกล้เคียงตอน deploy จริง

ลำดับที่แนะนำ:

```text
เขียน docs -> npm run docs:dev -> npm run docs:build -> npm run docs:preview
```

## การแปลง Markdown เป็น URL

VitePress ใช้ file-based routing

แปลแบบง่าย:

```text
ไฟล์อยู่ตรงไหน URL ก็เกิดตามโฟลเดอร์นั้น
```

ตัวอย่างใน repo นี้:

```text
index.md                              -> /
PROJECT_START_HERE.md                 -> /PROJECT_START_HERE
angular/README.md                     -> /angular/
angular/concepts/signal.md            -> /angular/concepts/signal
angular/labs/01-signal-counter.md     -> /angular/labs/01-signal-counter
projects/mooping/README.md            -> /projects/mooping/
```

เพราะ config เปิด `cleanUrls: true` จึงไม่ต้องใส่ `.html` ตอนเปิดหน้า

## เพิ่มหน้าใหม่ต้องทำอะไร

ตัวอย่าง: อยากเพิ่ม concept เรื่อง `inject`

1. สร้างไฟล์:

```text
angular/concepts/inject.md
```

2. เขียนเนื้อหาโดยเริ่มจากภาพจำง่าย ๆ

3. ถ้าอยากให้เห็นใน sidebar ให้เพิ่มที่ `.vitepress/config.mts`

```ts
{ text: 'Inject Concept', link: '/angular/concepts/inject' }
```

4. รัน build:

```powershell
npm run docs:build
```

ถ้า build ผ่าน แปลว่า link และ Markdown ใช้งานได้

## เพิ่มเมนู sidebar

sidebar อยู่ใน:

```text
.vitepress/config.mts
```

ตัวอย่าง:

```ts
{
  text: 'Angular Learning',
  items: [
    { text: 'Signal Concept', link: '/angular/concepts/signal' },
    { text: 'Signal Counter Lab', link: '/angular/labs/01-signal-counter' }
  ]
}
```

กติกา:

- `text` คือข้อความที่เห็นบน sidebar
- `link` คือ path ของหน้า Markdown
- link ควรขึ้นต้นด้วย `/`
- ถ้า link ไปไฟล์ที่ไม่มีจริง `npm run docs:build` จะ fail

## รูปภาพและไฟล์ static

ถ้าเป็นรูปที่ใช้ใน Markdown ใกล้ ๆ กัน ใช้ relative path ได้:

```md
![ภาพตัวอย่าง](./image.png)
```

ถ้าเป็นไฟล์ที่อยากให้มีชื่อเดิม เช่น logo, favicon, PDF ให้ใส่ใน `public/`

ตัวอย่าง:

```text
public/aporaviz-docs-logo.svg
```

เวลาเรียกใช้ใน config:

```ts
logo: '/aporaviz-docs-logo.svg'
```

## `base` คืออะไร

ใน `.vitepress/config.mts` มี:

```ts
base: '/ApoRaviz_Workspace_Docs/'
```

ภาพจำง่าย ๆ:

```text
base = ชื่อซอยก่อนถึงบ้านของเว็บ
```

ถ้าเว็บอยู่ที่:

```text
https://aporaviz.github.io/ApoRaviz_Workspace_Docs/
```

base ต้องเป็น:

```text
/ApoRaviz_Workspace_Docs/
```

ถ้า base ผิด รูป/ลิงก์/ไฟล์ JS อาจหาไม่เจอตอน deploy

## Error ที่เจอจริงจากตัวอย่างแรก

### 1. Node version ไม่ถูก

อาการ:

```text
Angular CLI requires a minimum Node.js version...
```

แก้:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
node -v
```

### 2. ใช้ placeholder แบบ `<...>` ใน Markdown

อาการ:

```text
Element is missing end tag
```

สาเหตุ:

VitePress compile Markdown เป็น Vue component ถ้าเขียน `<ชื่อ Concept>` นอก code fence Vue จะคิดว่าเป็น HTML tag

ห้าม:

```md
# <ชื่อ Concept>
```

ใช้แบบนี้แทน:

```md
# [[ชื่อ Concept]]
```

### 3. link ไปไฟล์ที่ยังไม่มีจริง

อาการ:

```text
dead link(s) found
```

ใน template ให้เขียนเป็น text ก่อน:

```md
[[Concept]]: `../concepts/concept-file.md`
```

พอสร้างไฟล์จริงแล้วค่อยเปลี่ยนเป็น link:

```md
[Signal](../concepts/signal.md)
```

## กฎสำหรับบทเรียนใหม่ใน VitePress

บทเรียนใหม่ควรมี:

- ภาพจำง่าย ๆ
- technical term
- flow ทีละขั้น
- code ตัวอย่าง
- expected result
- self-check
- link ไป concept ที่เกี่ยวข้อง

ถ้าเป็น lab ให้ดูตัวอย่างแรก:

```text
angular/labs/01-signal-counter.md
```

## คำสั่งที่ใช้บ่อย

```powershell
# ใช้ Node 24
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH

# ติดตั้ง dependency
npm install

# เปิดเว็บระหว่างเขียน
npm run docs:dev

# ตรวจ build
npm run docs:build

# preview output หลัง build
npm run docs:preview
```

## จำสั้น ๆ

```text
VitePress = เอา Markdown มาทำเว็บเอกสาร
ไฟล์ .md = หน้าเว็บ
.vitepress/config.mts = เมนูและ config ของเว็บ
npm run docs:dev = เปิดเว็บระหว่างเขียน
npm run docs:build = ตรวจว่าเว็บพร้อม deploy
```

## แหล่งอ้างอิง

- [VitePress Getting Started](https://vitepress.dev/guide/getting-started)
- [VitePress Routing](https://vitepress.dev/guide/routing)
- [VitePress Asset Handling](https://vitepress.dev/guide/asset-handling)
- [VitePress Site Config](https://vitepress.dev/reference/site-config)
