# Angular Run Flow and angular.json

บทนี้อธิบาย core การทำงานหลักของโปรเจกต์ Angular เวลาเรา run, build, หรือ test

แต่ละโปรเจกต์อาจมี `angular.json` ไม่เหมือนกันได้ เช่น ชื่อ project, SSR, budget, base href, output หรือ script เฉพาะ repo แต่แกนหลักเหมือนกัน:

```text
package.json script
-> Angular CLI
-> angular.json target
-> entry files
-> Angular bootstrap app
```

## ภาพจำง่าย ๆ

ให้นึกว่าโปรเจกต์ Angular เหมือนร้านที่มีแผงควบคุม:

```text
package.json = ปุ่มที่เรากด เช่น start, build, test
Angular CLI  = คนรับคำสั่งจากปุ่ม
angular.json = คู่มือว่าปุ่มนั้นต้องทำงานแบบไหน
src/main.ts  = ประตูเข้าร้านฝั่ง browser
app.config.ts = การตั้งค่าหลักของแอป
```

เวลาเราพิมพ์:

```bash
npm run start
```

มักแปลว่า:

```text
npm อ่าน package.json
-> เจอ script start = ng serve
-> Angular CLI อ่าน angular.json
-> หา target serve
-> serve เรียก build target แบบ development
-> เปิด dev server ให้ browser เข้าใช้งาน
```

## Technical Term

```text
script = คำสั่งลัดใน package.json
Angular CLI = เครื่องมือ ng ที่ช่วย serve/build/test project
target = งานที่ Angular CLI ทำ เช่น build, serve, test
builder = engine ที่ Angular ใช้ทำ target นั้น
configuration = ชุด setting ย่อย เช่น production, development
entry file = ไฟล์เริ่มต้นที่ระบบเข้าไปทำงานก่อน
```

## ไฟล์หลักทำหน้าที่อะไร

### package.json

`package.json` บอกว่าโปรเจกต์นี้มีคำสั่งอะไรให้เรียก:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  }
}
```

จำสั้น ๆ:

```text
npm run start = กดปุ่ม start
npm run build = กดปุ่ม build
npm test      = กดปุ่ม test
```

### angular.json

`angular.json` บอก Angular CLI ว่าแต่ละปุ่มต้องทำอะไร:

```json
{
  "projects": {
    "portfolio": {
      "architect": {
        "build": {},
        "serve": {},
        "test": {}
      }
    }
  }
}
```

คำที่ต้องจำ:

```text
projects   = รายชื่อ Angular project ใน workspace
architect  = รายการ target ที่ Angular CLI ทำได้
build      = วิธี compile app
serve      = วิธีเปิด dev server
test       = วิธี run unit test
```

### build target

ตัวอย่างแนวคิด:

```json
{
  "build": {
    "builder": "@angular/build:application",
    "options": {
      "browser": "src/main.ts",
      "styles": ["src/styles.css"],
      "assets": [{ "glob": "**/*", "input": "public" }]
    }
  }
}
```

ความหมาย:

```text
builder = ใช้ Angular application builder
browser = ไฟล์เริ่มต้นของ app ฝั่ง browser
styles  = global stylesheet
assets  = ไฟล์ static ที่ copy ไปกับ build เช่น รูป, resume, favicon
```

ถ้ามี SSR จะเห็นไฟล์เพิ่ม เช่น:

```text
server = src/main.server.ts
ssr.entry = src/server.ts
outputMode = server
```

จำว่า SSR ไม่ได้แทน `main.ts` แต่เป็นอีกทางหนึ่งที่ช่วยให้ server render หน้าได้ก่อน browser ทำงานต่อ

### serve target

ตัวอย่างแนวคิด:

```json
{
  "serve": {
    "builder": "@angular/build:dev-server",
    "configurations": {
      "development": {
        "buildTarget": "portfolio:build:development"
      }
    },
    "defaultConfiguration": "development"
  }
}
```

ความหมาย:

```text
ng serve
-> เข้า target serve
-> serve ไปใช้ build target แบบ development
-> เปิด local dev server
```

ดังนั้น `ng serve` ไม่ได้ข้าม build process แต่ใช้ build แบบเร็วสำหรับ dev

### configurations

`configurations` คือชุด setting คนละโหมด:

```json
{
  "production": {
    "budgets": [],
    "outputHashing": "all"
  },
  "development": {
    "optimization": false,
    "sourceMap": true
  }
}
```

จำง่าย ๆ:

```text
development = อ่านง่าย debug ง่าย build เร็ว
production  = optimize สำหรับ deploy จริง
```

## Flow ตอนเริ่มแอปจริง

เมื่อ Angular build หรือ serve แล้ว browser จะเริ่มจาก `src/main.ts`

ตัวอย่างแนวคิด:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig);
```

flow:

```text
src/main.ts
-> bootstrapApplication(App, appConfig)
-> App component เป็น root component
-> app.config.ts ใส่ providers เช่น router, hydration, error listener
-> Angular render template และผูก event/state
```

### index.html กับ root selector

`src/index.html` เป็น HTML shell ของทั้งหน้า และมีจุดที่ Angular จะ mount แอป:

```html
<body>
  <app-root></app-root>
</body>
```

tag นี้ต้องตรงกับ `selector` ของ root component:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
```

flow:

```text
index.html มี <app-root>
-> App component มี selector: 'app-root'
-> main.ts bootstrap App
-> Angular เอา app.html ไป render ในตำแหน่ง <app-root>
```

จำสั้น ๆ:

```text
index.html = กรอบ HTML ทั้งหน้า
selector = ชื่อ tag ที่ Angular ใช้จับ component
app.html = template ที่ถูก render ข้างใน root component
```

ถ้าโปรเจกต์ใช้ routing:

```text
app.config.ts
-> provideRouter(routes)
-> routes บอกว่า URL ไหนเปิด component ไหน
```

## Flow ของคำสั่งหลัก

### npm run start

```text
npm run start
-> package.json scripts.start
-> ng serve
-> angular.json projects.[name].architect.serve
-> buildTarget development
-> src/main.ts
-> browser เปิด localhost
```

ใช้ตอน:

- พัฒนา UI
- ดู interaction จริง
- ตรวจ responsive ใน browser

### npm run build

```text
npm run build
-> package.json scripts.build
-> ng build
-> angular.json projects.[name].architect.build
-> defaultConfiguration มักเป็น production
-> compile TypeScript/template/styles
-> เขียนผลลัพธ์ลง dist/
```

ใช้ตอน:

- ตรวจว่า compile ผ่าน
- เตรียม deploy
- เช็ก SSR/prerender issue

### npm test

```text
npm test
-> package.json scripts.test
-> ng test
-> angular.json projects.[name].architect.test
-> unit test builder
-> อ่านไฟล์ spec
```

ใช้ตอน:

- ตรวจ logic
- กัน regression
- ตรวจ component/service ที่มี business rule

## ทำไมแต่ละ project เขียน angular.json ไม่เหมือนกันได้

เพราะ `angular.json` เป็น config เฉพาะ repo สิ่งที่ต่างได้ เช่น:

- ชื่อ project ใน `projects`
- budget ขนาดไฟล์
- SSR เปิดหรือปิด
- asset folder
- stylesheet
- base href ตอน deploy GitHub Pages
- test builder หรือ options
- output path

แต่ core ที่ต้องมองให้ออกคือ:

```text
คำสั่งไหน -> target ไหน -> configuration ไหน -> entry file ไหน
```

ถ้าอ่าน 4 จุดนี้ได้ จะไม่หลงแม้ `angular.json` ของแต่ละ repo หน้าตาไม่เหมือนกัน

## วิธีอ่าน angular.json แบบเร็ว

เริ่มจาก 5 คำถามนี้:

1. ชื่อ project คืออะไร
2. `build` ใช้ builder อะไร
3. `build.options.browser` ชี้ไปไฟล์ไหน
4. `serve.defaultConfiguration` ใช้ development หรือ production
5. มี SSR หรือ output พิเศษไหม

คำสั่งช่วยดู:

```bash
npm run
rg "\"build\"|\"serve\"|\"test\"|\"browser\"|\"server\"|\"ssr\"|\"defaultConfiguration\"" angular.json
```

บน PowerShell:

```powershell
npm run
rg '"build"|"serve"|"test"|"browser"|"server"|"ssr"|"defaultConfiguration"' angular.json
```

## จุดที่มักงง

- `package.json` ไม่ได้ build เอง มันแค่เก็บ script ให้ npm เรียก
- `ng serve` ใช้ `angular.json` เหมือนกัน ไม่ใช่ magic แยกต่างหาก
- `development` และ `production` เป็น configuration คนละชุด
- `src/main.ts` คือ entry ฝั่ง browser
- `src/main.server.ts` และ `src/server.ts` เกี่ยวกับ SSR
- `public/` มักเป็น static asset ที่ copy ไปกับ build
- ถ้า GitHub Pages asset หาย ให้ดู `base-href` และ output folder

## Self-check

ลองตอบเอง:

1. ถ้า `npm run build` fail เราควรเปิดดูไฟล์ไหนก่อน
2. ถ้า `ng serve` เปิดคนละ port ได้ไหม และส่ง port ผ่านคำสั่งไหน
3. ถ้าอยากรู้ว่า browser เริ่มจากไฟล์ไหน ต้องดู key อะไรใน `angular.json`
4. `development` ต่างจาก `production` ตรงไหน
5. SSR เพิ่มไฟล์หลักอะไรเข้ามา

## สรุปจำสั้น ๆ

```text
package.json = ปุ่มคำสั่ง
angular.json = คู่มือของ Angular CLI
build/serve/test = target
configuration = โหมด
main.ts = จุดเริ่ม app ฝั่ง browser
```
