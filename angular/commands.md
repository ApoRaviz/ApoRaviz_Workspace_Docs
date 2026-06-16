# Angular Commands

ไฟล์นี้คือ command กลางสำหรับ Angular latest stable + Node LTS + Tailwind CSS v4 ใน workspace `ApoRaviz`

ถ้า command มี path, port, repo URL, base-href หรือ output folder เฉพาะโปรเจกต์ ให้เก็บรายละเอียดจริงไว้ใน `Project/docs/commands.md`

## Runtime Baseline

ณ 2026-06-06:

```text
Angular CLI/Core        = 22.0.0
Node.js production/dev  = Node 24 LTS
TypeScript              = 6.0.x สำหรับ Angular 22
Tailwind CSS            = 4.3.0
@tailwindcss/postcss    = 4.3.0
```

ใช้ Node LTS เป็น default แม้จะมี Node Current ที่ใหม่กว่า เพราะ Node official แนะนำให้ production ใช้ Active LTS หรือ Maintenance LTS

```bash
nvm use 24
node -v
npm -v
npx ng version
```

ถ้า command ใน sandbox หรือ automation หา Node ไม่เจอ ให้บังคับ path แบบชัดเจน:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
```

บทเรียน:

- Angular project ใน workspace นี้ยึด Node 24 LTS เป็นค่าเริ่มต้น
- ถ้า Angular major ใหม่ต้องใช้ Node ต่ำสุดสูงขึ้น ให้เช็ก `angular.dev/reference/versions` ก่อนสร้าง project
- ถ้า build ผ่านในเครื่องแต่ fail ใน CI ให้เช็ก Node version ก่อน
- command ที่ส่งให้ Codex ใช้ควรระบุ Node path เมื่อ project เคยมีปัญหา version ไม่ตรง

## Version Checks

เช็ก Angular CLI ที่ใช้ในโปรเจกต์:

```bash
npx ng version
./node_modules/.bin/ng version
```

เช็ก dependency ที่ติดตั้ง:

```bash
npm list @angular/core @angular/cli typescript
npm outdated
```

บทเรียน:

- ใช้ `npx ng version` เพื่อให้ Angular CLI ตรงกับ dependency ในโปรเจกต์
- `npm outdated` ใช้ดูของที่มี version ใหม่ แต่ไม่ควรอัปเดตทันทีโดยไม่อ่าน breaking change
- Angular 22 ใน workspace นี้คู่กับ Node 24 LTS และ TypeScript 6.0.x

## Install Dependencies

```bash
npm install
npm install package-name
npm install -D package-name
```

ใช้ตอนพัฒนาในเครื่อง และเมื่อต้องเพิ่ม dependency ใหม่

```bash
npm ci
```

ใช้ใน CI/CD หรือเมื่อต้องการ install จาก `package-lock.json` แบบตรงที่สุด

จำสั้น ๆ:

```text
npm install = ใช้ตอนพัฒนา
npm ci      = ใช้ใน automation/CI
npm install -D = เพิ่ม dev dependency
```

ล้างและติดตั้งใหม่เมื่อ dependency แปลก:

```bash
npm ci
```

ถ้าจำเป็นต้องล้าง `node_modules` ให้ทำอย่างตั้งใจในโปรเจกต์นั้น และอย่าลบไฟล์ที่ไม่เกี่ยว

## Dev Server

```bash
npm start
npm start -- --host 127.0.0.1 --port 4200
```

หรือรัน Angular CLI ตรง:

```bash
./node_modules/.bin/ng serve --host 127.0.0.1 --port 4200
./node_modules/.bin/ng serve --configuration development --host 127.0.0.1 --port 4200
```

ถ้า port ซ้ำ ให้ใช้ port อื่น เช่น `4201`, `4202`, `4204`

บทเรียน:

- dev server ใช้ตรวจ UI และ interaction
- ถ้าเป็น frontend change ให้นอกจาก build แล้วควรเปิดดูจริง
- port เป็นเรื่องเฉพาะเครื่อง จึงควรจด port ที่ใช้จริงใน `Project/docs/commands.md`

## Generate Code

สร้าง component:

```bash
npx ng generate component components/component-name
```

สร้าง service:

```bash
npx ng generate service services/service-name
```

สร้าง interface:

```bash
npx ng generate interface models/model-name
```

แบบย่อ:

```bash
npx ng g c components/component-name
npx ng g s services/service-name
npx ng g i models/model-name
```

บทเรียน:

- ใช้ generator เมื่ออยากให้ Angular สร้างไฟล์และ naming pattern ให้ถูก
- ใน standalone Angular รุ่นใหม่ component ที่ generate จะไม่ต้องอยู่ใน `NgModule`
- ถ้าเป็นไฟล์ model เล็ก ๆ สร้างเองได้ แต่ต้องวางไว้ใน folder ที่มี owner ชัด

## Build

```bash
npm run build
npm run build -- --configuration production
```

ใช้ตรวจว่า Angular compile, SSR และ prerender ผ่าน

ถ้าต้องรัน Angular CLI โดยตรง:

```bash
./node_modules/.bin/ng build --configuration production --progress=false
./node_modules/.bin/ng build --configuration development --progress=false
```

บทเรียน:

- `--progress=false` ทำให้ log ใน automation อ่านง่ายขึ้น
- ถ้าโปรเจกต์ใช้ SSR/prerender ต้องดูว่ามีข้อความ prerender สำเร็จ
- build ผ่านคือขั้นต่ำก่อน push งานที่แตะ code หรือ route

## Type Check And Format Checks

Angular build จะช่วยตรวจ template และ TypeScript หลายอย่างอยู่แล้ว

ถ้าโปรเจกต์มี script เพิ่ม ให้ใช้:

```bash
npm run lint
npm run format
npm run typecheck
```

ถ้าไม่มี script เหล่านี้ อย่าสรุปว่าโปรเจกต์พัง ให้ดู `package.json` ก่อนว่า repo นั้นตั้งคำสั่งอะไรไว้

## GitHub Pages Build

GitHub Pages แบบ project site ต้องมี base path เป็นชื่อ repo:

```bash
ng build --configuration production --base-href /Repo_Name/
npx ng build --configuration production --base-href /Repo_Name/
```

ตัวอย่าง:

```bash
npm run build:gh-pages
```

บทเรียน:

- ถ้าไม่ตั้ง `base-href` asset เช่น JS/CSS อาจโหลดผิด path
- ค่า `/Repo_Name/` ต้องตรงกับ repo name บน GitHub Pages
- output folder เฉพาะโปรเจกต์ต้องดูใน `angular.json` และ workflow ของ repo นั้น

ตรวจ output folder:

```bash
ls dist
find dist -maxdepth 3 -type f | head
```

สำหรับ Angular SSR/static output มัก deploy จาก:

```text
dist/<AngularProjectName>/browser
```

## Unit Test

```bash
npm test -- --watch=false
npm test -- --watch=false --browsers=ChromeHeadless
```

หรือถ้าโปรเจกต์มี script:

```bash
npm run test:ci
```

บทเรียน:

- `--watch=false` ทำให้ test รันครั้งเดียวแล้วจบ เหมาะกับ CI และก่อน commit
- ถ้า test เกี่ยวกับ browser API อาจต้อง mock เช่น `IntersectionObserver`
- ถ้า logic เกี่ยวกับเงิน, reward, auth หรือ data สำคัญ ต้องมี test กัน regression

รัน test เฉพาะ watch mode ตอนกำลังพัฒนา:

```bash
npm test
```

บทเรียน:

- watch mode ดีตอนเขียน code
- ก่อน commit หรือ CI ใช้ run-once เช่น `--watch=false`

## Angular CLI New Project

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH \
npx -y @angular/cli@22.0.0 new New_Project_Name --routing --style css --ssr --skip-git --package-manager npm
```

ดู options ของ `ng new`:

```bash
npx -y @angular/cli@22.0.0 new --help
```

เหตุผลของ flags:

- `--routing`: เปิด Angular Router ตั้งแต่แรก
- `--style css`: ใช้ stylesheet มาตรฐานเพื่อให้ Tailwind v4 ทำงานตรงกับ Angular/Tailwind docs
- `--ssr`: รองรับ SSR/prerender สำหรับ demo/portfolio
- `--skip-git`: แต่ละ project จะตั้ง git เองและต่อ remote เอง
- `--package-manager npm`: ใช้ npm ให้เหมือนกันทั้ง workspace

หลังสร้างโปรเจกต์:

```bash
cd New_Project_Name
npm run build
npm test -- --watch=false
git init
git status --short --branch
```

ถ้า repo จะ deploy ไป GitHub Pages ให้เพิ่ม script เฉพาะโปรเจกต์ เช่น:

```json
{
  "scripts": {
    "build:gh-pages": "ng build --configuration production --base-href /Repo_Name/"
  }
}
```

## Tailwind CSS v4 Setup

ใช้ automated setup ก่อน:

```bash
ng add tailwindcss
npx ng add tailwindcss
```

ถ้าต้องทำ manual:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
npm install -D tailwindcss @tailwindcss/postcss postcss
```

เพิ่ม `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

ใน `src/styles.css`:

```css
@import "tailwindcss";
```

บทเรียน:

- Tailwind เป็น styling default ของ Angular frontend ใน workspace นี้
- ใช้ utility classes ใน template เป็นหลัก
- ใช้ `@theme` ใน `src/styles.css` สำหรับสี/font/shadow กลางของโปรเจกต์
- component `.css` ใช้เฉพาะ animation/keyframes หรือ style ที่ Tailwind อ่านยากจริง

## Angular Update

เช็กว่ามี migration อะไร:

```bash
npx ng update
```

อัปเดต Angular major อย่างตั้งใจ:

```bash
npx ng update @angular/core@22 @angular/cli@22
```

หลัง update ต้องรัน:

```bash
npm test -- --watch=false
npm run build
```

บทเรียน:

- อย่า update major version โดยไม่อ่าน changelog
- หลัง update ให้ commit แยกจาก feature งานอื่น
- ถ้า workspace baseline เปลี่ยน ต้องอัปเดต docs กลางด้วย

## SSR And Browser API Checks

ค้นหา browser API ที่ต้อง guard:

```bash
rg "window|document|localStorage|IntersectionObserver|requestAnimationFrame" src
```

ค้นหา `isPlatformBrowser`:

```bash
rg "isPlatformBrowser|PLATFORM_ID" src
```

บทเรียน:

- Angular SSR/prerender อาจรัน code บน server ก่อน browser
- ถ้าแตะ browser API ต้องมี guard
- อ่านต่อที่ `angular/teach/04-browser-apis-ssr-safety.md`

## Inspect Project Config

อ่าน core flow ของ `package.json -> Angular CLI -> angular.json -> main.ts` ได้ที่:

```text
angular/teach/10-angular-run-flow-and-angular-json.md
```

ดู scripts:

```bash
npm run
```

ดู Angular config:

```bash
sed -n '1,220p' angular.json
```

ดู package versions:

```bash
cat package.json
```

ค้นหา output path:

```bash
rg "outputPath|baseHref|prerender|server" angular.json
```

บทเรียน:

- ก่อนรัน command ต้องรู้ว่า repo นั้นตั้ง script อะไรไว้
- `angular.json` บอก build target, output path และ config สำคัญ
- `package.json` บอก dependency และ script ที่ควรใช้

## Git Checks Before Push

```bash
git status --short --branch
git diff --check
git diff --cached --stat
```

บทเรียน:

- `git status --short --branch` ใช้ดูว่า local sync กับ remote หรือไม่
- `git diff --check` ใช้จับ whitespace error
- `git diff --cached --stat` ใช้ดู staged files ก่อน commit

## Search And Read

```bash
rg "search text"
rg --files
sed -n '1,220p' path/to/file.md
```

บทเรียน:

- ใช้ `rg` ก่อน `grep` เพราะเร็วและอ่านง่าย
- ใช้ `rg --files` เมื่ออยากเห็น file list
- ใช้ `sed -n` อ่านช่วงไฟล์โดยไม่เปิดทั้งไฟล์ยาวเกินจำเป็น
