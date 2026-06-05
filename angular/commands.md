# Angular Commands

ไฟล์นี้คือ command กลางสำหรับ Angular 21 + Node 24 ใน workspace `ApoRaviz`

ถ้า command มี path, port, repo URL, base-href หรือ output folder เฉพาะโปรเจกต์ ให้เก็บรายละเอียดจริงไว้ใน `Project/docs/commands.md`

## Node 24

```bash
nvm use 24
```

ใช้เมื่อ shell มี `nvm` และต้องการสลับ Node version ให้ตรงกับโปรเจกต์

ถ้า command ใน sandbox หรือ automation หา Node ไม่เจอ ให้บังคับ path แบบชัดเจน:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
```

บทเรียน:

- Angular project ใน workspace นี้ยึด Node 24 เป็นค่าเริ่มต้น
- ถ้า build ผ่านในเครื่องแต่ fail ใน CI ให้เช็ก Node version ก่อน
- command ที่ส่งให้ Codex ใช้ควรระบุ Node path เมื่อ project เคยมีปัญหา version ไม่ตรง

## Install Dependencies

```bash
npm install
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
```

## Dev Server

```bash
npm start
```

หรือรัน Angular CLI ตรง:

```bash
./node_modules/.bin/ng serve --host 127.0.0.1 --port 4200
```

ถ้า port ซ้ำ ให้ใช้ port อื่น เช่น `4201`, `4202`, `4204`

บทเรียน:

- dev server ใช้ตรวจ UI และ interaction
- ถ้าเป็น frontend change ให้นอกจาก build แล้วควรเปิดดูจริง
- port เป็นเรื่องเฉพาะเครื่อง จึงควรจด port ที่ใช้จริงใน `Project/docs/commands.md`

## Build

```bash
npm run build
```

ใช้ตรวจว่า Angular compile, SSR และ prerender ผ่าน

ถ้าต้องรัน Angular CLI โดยตรง:

```bash
./node_modules/.bin/ng build --configuration production --progress=false
```

บทเรียน:

- `--progress=false` ทำให้ log ใน automation อ่านง่ายขึ้น
- ถ้าโปรเจกต์ใช้ SSR/prerender ต้องดูว่ามีข้อความ prerender สำเร็จ
- build ผ่านคือขั้นต่ำก่อน push งานที่แตะ code หรือ route

## GitHub Pages Build

GitHub Pages แบบ project site ต้องมี base path เป็นชื่อ repo:

```bash
ng build --configuration production --base-href /Repo_Name/
```

ตัวอย่าง:

```bash
npm run build:gh-pages
```

บทเรียน:

- ถ้าไม่ตั้ง `base-href` asset เช่น JS/CSS อาจโหลดผิด path
- ค่า `/Repo_Name/` ต้องตรงกับ repo name บน GitHub Pages
- output folder เฉพาะโปรเจกต์ต้องดูใน `angular.json` และ workflow ของ repo นั้น

## Unit Test

```bash
npm test -- --watch=false
```

หรือถ้าโปรเจกต์มี script:

```bash
npm run test:ci
```

บทเรียน:

- `--watch=false` ทำให้ test รันครั้งเดียวแล้วจบ เหมาะกับ CI และก่อน commit
- ถ้า test เกี่ยวกับ browser API อาจต้อง mock เช่น `IntersectionObserver`
- ถ้า logic เกี่ยวกับเงิน, reward, auth หรือ data สำคัญ ต้องมี test กัน regression

## Angular CLI New Project

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH \
npx -y @angular/cli@21.2.12 new New_Project_Name --routing --style css --ssr --skip-git --package-manager npm
```

เหตุผลของ flags:

- `--routing`: เปิด Angular Router ตั้งแต่แรก
- `--style css`: ใช้ CSS ปกติ อ่านง่ายสำหรับ learning
- `--ssr`: รองรับ SSR/prerender สำหรับ demo/portfolio
- `--skip-git`: แต่ละ project จะตั้ง git เองและต่อ remote เอง
- `--package-manager npm`: ใช้ npm ให้เหมือนกันทั้ง workspace

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

