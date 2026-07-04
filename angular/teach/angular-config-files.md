# Angular Config Files

บทนี้อธิบายไฟล์ config ที่เจอบ่อยใน Angular project ว่าแต่ละไฟล์ทำอะไร ตั้งค่าแบบนี้แล้วได้อะไร และควรแก้ไฟล์ไหนเมื่อเจออาการแบบไหน

## เรียนเรื่องนี้เพื่อแก้อาการงงอะไร

เวลาเปิด Angular project เรามักเห็นไฟล์หลายตัวอยู่ root project:

```text
package.json
angular.json
tsconfig.json
tsconfig.app.json
tsconfig.spec.json
.postcssrc.json
.prettierrc
.vscode/settings.json
```

ถ้าไม่รู้บทบาทของแต่ละไฟล์ จะเริ่มงงว่า:

- command นี้ไปอ่าน config ไหน
- build output ไปอยู่ที่ไหน
- TypeScript warning ต้องแก้ไฟล์ไหน
- Tailwind CSS ถูกผูกเข้า Angular ตรงไหน
- format code ควรตั้งใน VS Code หรือ Prettier

## ภาพจำง่าย ๆ

ให้นึกว่า Angular project เป็นร้านทำอาหาร:

```text
package.json        = ปุ่มสั่งงานหน้าร้าน
angular.json        = คู่มือครัวว่าจะ build, serve, test อย่างไร
tsconfig.json       = กฎภาษา TypeScript กลางของร้าน
tsconfig.app.json   = กฎ TypeScript เฉพาะอาหารจาน app
tsconfig.spec.json  = กฎ TypeScript เฉพาะจาน test
.postcssrc.json     = เครื่องปรุง CSS เช่น Tailwind
.prettierrc         = กฎจัดหน้าตา code
.vscode/settings.json = กติกา editor ของคนทำงานใน repo นี้
```

จำสั้น ๆ:

```text
package.json = กดปุ่มอะไร
angular.json = ปุ่มนั้นทำงานอย่างไร
tsconfig*    = TypeScript อ่าน source แบบไหน
PostCSS      = CSS ผ่าน plugin อะไร
Prettier     = code หน้าตาแบบไหน
VS Code      = editor ใช้เครื่องมืออะไร
```

## Angular Scaffold File Map

เวลา `ng new` สร้าง project ใหม่ อย่าเริ่มจากการเปิด `src/app` ทันที ให้แยกไฟล์ระดับ root เป็นกลุ่มก่อน:

```text
Project docs
- README.md
- AGENTS.md
- CLAUDE.md

npm/dependency
- package.json
- package-lock.json
- node_modules/

Angular/TypeScript config
- angular.json
- tsconfig.json
- tsconfig.app.json
- tsconfig.spec.json

Source/assets
- src/
- public/

Tooling/editor/git
- .editorconfig
- .prettierrc
- .gitignore
- .vscode/

Generated/cache/output
- .angular/
- dist/
```

ภาพจำ:

```text
root project = แผงควบคุมและกติกาของบ้าน
src/         = ห้องที่เราเขียน code app จริง
public/      = ชั้นวาง static asset ที่ copy ไปกับ build เช่น favicon หรือรูป
node_modules = dependency ที่ npm ดาวน์โหลดมา
dist/        = output ที่สร้างจาก npm run build
```

จุดสำคัญ:

```text
package.json + package-lock.json = source of truth ของ dependency
node_modules = ของที่ติดตั้งจาก source of truth นั้น

src + angular.json + tsconfig* = source/config ที่ใช้ build app
dist = ผลลัพธ์หลัง build ไม่ใช่ไฟล์ที่เราแก้เอง
```

ดังนั้นตอนอ่าน project ใหม่รอบแรก ควร exclude `node_modules/` และ `dist/` ออกจากแผนที่ก่อน เพราะสองโฟลเดอร์นี้ใหญ่และสร้างใหม่ได้

ตัวอย่างคำสั่ง:

```bash
find . -maxdepth 2 -not -path './node_modules*' -not -path './dist*' -print | sort
```

ถ้าต้องการดู flow ว่า command ไปอ่าน `package.json`, `angular.json`, `main.ts` อย่างไร ให้อ่านต่อที่ [Angular Run Flow And angular.json](angular-run-flow-and-angular-json.md)

ถ้าต้องการดู SSR files เช่น `main.server.ts`, `server.ts`, `app.routes.server.ts` ให้อ่านต่อที่ [App Config, SSR และ Hydration](app-config-ssr-hydration.md)

### src/app File Map

ใน Angular standalone app ที่ `ng new` สร้างมา `src/app` มักมีไฟล์เป็นครอบครัวเดียวกัน:

```text
src/app/app.ts
src/app/app.html
src/app/app.css
src/app/app.spec.ts
src/app/app.config.ts
src/app/app.config.server.ts
src/app/app.routes.ts
src/app/app.routes.server.ts
```

ให้แยกเป็น 2 กลุ่มก่อน:

```text
Root component family
- app.ts
- app.html
- app.css
- app.spec.ts

App setup family
- app.config.ts
- app.config.server.ts
- app.routes.ts
- app.routes.server.ts
```

ความหมายแบบจำง่าย:

```text
app.ts   = component class, selector, imports, state
app.html = template ของ root component
app.css  = style เฉพาะ root component
app.spec.ts = test ของ root component

app.config.ts = provider/config ฝั่ง browser
app.config.server.ts = provider/config ฝั่ง server
app.routes.ts = client route config
app.routes.server.ts = server render route config
```

จุดที่มักงง:

```text
app.ts ไม่ใช่ไฟล์ test
app.spec.ts คือไฟล์ test ที่ทดสอบ app.ts/app.html behavior
```

ใน standalone component ถ้า template ใช้ component/directive อื่น เช่น `<router-outlet />` ต้องมี import ใน component:

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

อ่านว่า:

```text
imports: [RouterOutlet]
= app.html ใช้ <router-outlet /> ได้
```

ถ้าต้องการดูว่า `<app-root>` ใน `index.html` จับกับ `selector: 'app-root'` อย่างไร ให้อ่านต่อที่ [Angular Run Flow And angular.json](angular-run-flow-and-angular-json.md)

## Flow เวลาเรารัน command

ตัวอย่าง:

```bash
npm run build
```

flow:

```text
npm
-> อ่าน package.json
-> เจอ script build เช่น ng build --progress=false
-> Angular CLI อ่าน angular.json
-> เข้า target build
-> build target อ่าน tsconfig.app.json
-> TypeScript อ่าน tsconfig.json ผ่าน extends
-> styles อ่าน .postcssrc.json ถ้าใช้ PostCSS/Tailwind
-> output ไป dist/ หรือ out-tsc ตามหน้าที่ของแต่ละ tool
```

นี่คือเหตุผลที่เวลา build พัง เราไม่ควรเดาสุ่ม ต้องไล่ถามว่า command ไปอ่าน config ตัวไหน

## ไฟล์หลักทำหน้าที่อะไร

### package.json

`package.json` คือไฟล์ที่บอกว่า project มี dependency อะไร และมี script อะไรให้เรียก

ตัวอย่าง:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build --progress=false",
    "test:ci": "ng test --watch=false --progress=false"
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
npm run start  = เปิด dev server
npm run build  = build production ตาม angular.json
npm run test:ci = รัน test ครั้งเดียว เหมาะกับ CI
```

ควรแก้ไฟล์นี้เมื่อ:

- อยากเพิ่ม command ลัด
- อยากเปลี่ยน script ให้รันบน Windows/PowerShell ได้
- อยากล็อก Node/npm baseline ผ่าน `engines` หรือ `packageManager`

จุดที่มักงง:

```text
package.json ไม่ได้บอก build detail ทั้งหมด
มันแค่บอกว่าจะเรียก ng ด้วยคำสั่งอะไร
detail ส่วนใหญ่ไปอยู่ที่ angular.json
```

### package-lock.json

`package-lock.json` คือไฟล์ล็อก dependency version จริงที่ npm ติดตั้ง

ภาพจำ:

```text
package.json      = ใบสั่งของ ว่าอยากได้ package อะไรและช่วง version ไหน
package-lock.json = ใบเสร็จละเอียด ว่าติดตั้ง package version จริงอะไร
node_modules/     = ของที่ npm ดาวน์โหลดมาตาม lockfile
```

ตัวอย่าง:

```text
package.json      = "@angular/core": "^22.0.0"
package-lock.json = "@angular/core": "22.0.2"
```

ความหมาย:

```text
^22.0.0 = range หรือช่วง version ที่ยอมรับได้
22.0.2  = version จริงที่ lock แล้ว
```

`package-lock.json` ยังช่วยล็อก dependency ลูก, download URL (`resolved`) และ hash ตรวจความถูกต้อง (`integrity`) เพื่อให้เครื่อง dev/CI ติดตั้ง dependency ได้ตรงกัน

จุดที่มักงง:

```text
ลบ node_modules      = ลบของที่ติดตั้งไว้ npm สร้างใหม่ได้
ลบ package-lock.json = ขอ npm resolve dependency graph ใหม่ทั้งชุด
```

ดังนั้นถ้า dependency เพี้ยน ให้เริ่มจาก `npm ci` ก่อน เพราะคำสั่งนี้ลบ `node_modules` แล้ว install ใหม่จาก `package-lock.json` ในคำสั่งเดียว และจะ fail ถ้า `package.json` กับ lockfile ไม่ sync กัน

ไม่ควรลบ `package-lock.json` เป็นท่าแรก ยกเว้นตั้งใจ refresh dependency graph และพร้อม review diff + run build/test

### angular.json

`angular.json` คือแผงควบคุมหลักของ Angular CLI

ตัวอย่างส่วนสำคัญ:

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
projects  = project ใน Angular workspace
architect = รายการงานที่ CLI ทำได้
target    = งานหนึ่งอย่าง เช่น build, serve, test
builder   = engine ที่ Angular ใช้ทำ target
options   = ค่า default ของ target
configurations = ค่าแยกตามโหมด เช่น production/development
```

ตั้งค่าแบบนี้แล้วได้อะไร:

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "public"
    }
  ],
  "styles": ["src/styles.css"],
  "browser": "src/main.ts"
}
```

ความหมาย:

```text
assets  = copy ไฟล์ใน public ไปกับ build เช่น favicon, resume, image
styles  = global CSS ของ app
browser = entry file ฝั่ง browser
```

ถ้าใช้ SSR อาจเห็น:

```json
{
  "server": "src/main.server.ts",
  "outputMode": "server",
  "ssr": {
    "entry": "src/server.ts"
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
Angular รู้ว่าต้องมี entry ฝั่ง browser และฝั่ง server
ใช้สำหรับ SSR/prerender และ output ที่มี browser/server แยกกัน
```

ควรแก้ไฟล์นี้เมื่อ:

- asset ไม่ถูก copy ไป build
- stylesheet หลักไม่ถูกโหลด
- GitHub Pages ต้องใช้ base path ตอน build
- ต้องปรับ production/development configuration
- ต้องดูว่า output deploy อยู่ folder ไหน

### Angular CLI Cache

ปกติ Angular CLI ใช้ disk cache เพื่อให้ build ครั้งถัดไปเร็วขึ้น

ตั้งค่าอยู่ใน `angular.json`:

```json
{
  "cli": {
    "cache": {
      "enabled": false
    }
  }
}
```

ไม่ควรปิด cache เป็นค่า default ทุกโปรเจกต์ เพราะ cache ช่วยลดเวลา build

แต่ปิดได้เมื่อมีหลักฐานว่า native cache layer มีปัญหา เช่น:

```text
Node process abort โดยไม่แสดง Angular diagnostic
macOS crash report ชี้ไปที่ LMDB native addon
เกิด malloc/double-free ตอน Angular เปิด cache environment
```

ผลที่ได้:

```text
ข้อดี = หลีกเลี่ยง native cache crash และ build ต่อได้
ข้อเสีย = build อาจช้าลง เพราะต้องคำนวณใหม่มากขึ้น
```

จุดสำคัญคือแยกให้ออกว่า:

```text
TypeScript/Angular compiler error = code หรือ config compile ไม่ผ่าน
native cache crash               = process/tooling ล้มก่อนรายงาน code error
```

ก่อนปิด cache ควรลองตรวจ compiler โดยตรง เช่น `ngc -p tsconfig.app.json` และอ่าน system crash report เพื่อยืนยันต้นเหตุ

### tsconfig.json

`tsconfig.json` คือกฎ TypeScript กลางของ project

ตัวอย่าง:

```json
{
  "compilerOptions": {
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
noImplicitOverride = override method ต้องเขียนให้ชัด
noPropertyAccessFromIndexSignature = property ที่มาจาก index signature ต้องอ่านแบบ bracket ให้ชัด
noImplicitReturns = function ที่ควร return ต้อง return ให้ครบทุกทาง
noFallthroughCasesInSwitch = กันลืม break/return ใน switch case
target = JavaScript version ที่ compile ไปหา
module = รูปแบบ module ที่ toolchain ใช้ต่อ
strictInjectionParameters = Angular ตรวจ dependency injection ให้ชัดขึ้น
strictInputAccessModifiers = Angular ตรวจ input access modifier ให้ตรงกติกา
```

เรื่อง `strict`:

```text
Angular schematic strict option = option ตอน generate project
TypeScript "strict": true = เปิดชุด strict family หลายข้อพร้อมกัน
strict family = ความเข้มเรื่อง type/null เช่น strictNullChecks, noImplicitAny
additional checks = กันพลาด logic คนละแกน เช่น noImplicitReturns, noFallthroughCasesInSwitch
```

ใน Angular CLI 22 ที่ใช้กับ `ApoRaviz_DevEng` ตัวเลือก schematic `strict` มีค่า default เป็น `true` แต่ template ที่ generate ออกมาไม่ได้ใส่ TypeScript `"strict": true` แบบ umbrella ลงใน `tsconfig.json`

ดังนั้น scaffold นี้ยังไม่ได้เปิด strict family ทั้งชุด เช่น `strictNullChecks` หรือ `noImplicitAny` ผ่าน umbrella flag แต่เปิด additional checks รายตัว เช่น `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride` และ Angular strict options เพื่อจับ bug สำคัญก่อน build/deploy

จำสั้น ๆ:

```text
ไม่มี "strict": true ไม่ได้แปลว่าไม่ตรวจเข้มเลย แต่ก็ไม่ได้แปลว่าได้ strict family ครบ
ให้ดู compilerOptions และ angularCompilerOptions ว่าเปิด safety flags อะไรไว้
```

ควรแก้ไฟล์นี้เมื่อ:

- ต้องเปลี่ยน TypeScript rule ระดับทั้ง project
- Angular template type check แจ้งปัญหาที่ควรแก้จริง
- ต้องปรับ compiler option ที่ทุก target ใช้ร่วมกัน

จุดที่มักงง:

```text
tsconfig.json มักเป็นแม่
tsconfig.app.json และ tsconfig.spec.json มัก extends จากไฟล์นี้
```

ถ้าต้องการเข้าใจภาพรวมว่า TypeScript อยู่ตรงไหนใน Angular flow ให้อ่านต่อที่ [TypeScript ใน Angular](typescript-in-angular.md)

### tsconfig.app.json

`tsconfig.app.json` คือ TypeScript config เฉพาะ app code

ตัวอย่าง:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
extends = ใช้กฎกลางจาก tsconfig.json
outDir  = output ชั่วคราวของ TypeScript สำหรับ app
rootDir = บอก TypeScript ว่า source หลักเริ่มที่ ./src
types   = โหลด type definition เพิ่ม เช่น node
include = ไฟล์ที่ app compiler ควรอ่าน
exclude = ไฟล์ที่ app compiler ไม่ควรเอาเข้า app build เช่น spec
```

pattern ที่เจอบ่อย:

```text
*  = match แค่ชั้นเดียว
** = match ได้หลายชั้นลึกลงไปเรื่อย ๆ

src/*.ts    = ไฟล์ .ts ที่อยู่ตรงใต้ src เท่านั้น
src/**/*.ts = ไฟล์ .ts ทุกระดับใต้ src
```

ดังนั้น:

```text
src/**/*.ts      = app source ทุกชั้นใต้ src
src/**/*.spec.ts = test files ทุกชั้นใต้ src
```

ภาพจำของ `rootDir` และ `outDir`:

```text
rootDir = ครัวที่เริ่มหยิบ source code
outDir  = กล่องที่ TypeScript เอาผลงาน compile ไปวาง
```

ถ้าเจอ warning แบบนี้:

```text
The common source directory is './src'.
The 'rootDir' setting must be explicitly set.
```

ให้เข้าใจว่า TypeScript เดาได้ว่า source อยู่ `src` แต่ version ใหม่อยากให้เราบอกชัด ๆ เพื่อคุม output layout

แก้แบบนี้:

```json
{
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "rootDir": "./src",
    "types": ["node"]
  }
}
```

ผลที่ได้:

```text
IDE warning หาย
TypeScript รู้ขอบเขต source ชัดเจน
output layout คาดเดาได้มากขึ้น
```

### tsconfig.spec.json

`tsconfig.spec.json` คือ TypeScript config เฉพาะ test

ตัวอย่าง:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "rootDir": "./src",
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.d.ts", "src/**/*.spec.ts"]
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
test compiler อ่านเฉพาะไฟล์ test และ type declaration
types ของ test เช่น vitest/globals ทำให้ describe, it, expect ใช้ได้
outDir แยกจาก app เพื่อไม่ปนกัน
```

`.d.ts` คือ type declaration file:

```text
.ts   = ไฟล์ code ที่มี logic
.d.ts = ไฟล์ประกาศ type ให้ TypeScript รู้จักของบางอย่าง
```

ใน test config จึงมัก include `.d.ts` ด้วย เพื่อให้ test compiler รู้จัก type เพิ่มเติมที่ test หรือ tooling ต้องใช้

ควรแก้ไฟล์นี้เมื่อ:

- test framework เปลี่ยน
- `describe`, `it`, `expect` ขึ้น type error
- ต้องเพิ่ม type สำหรับ test environment

### .postcssrc.json

`PostCSS` คือขั้นตอนประมวลผล CSS ก่อนเอาไปใช้จริง

ตัวอย่าง Tailwind CSS v4:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
Angular build รู้ว่าต้องให้ PostCSS ใช้ Tailwind plugin
Tailwind utility class ใน CSS/HTML ถูกประมวลผลตาม toolchain
```

ควรแก้ไฟล์นี้เมื่อ:

- เพิ่มหรือลบ PostCSS plugin
- Tailwind ไม่ทำงานทั้งที่ package ติดตั้งแล้ว
- build แจ้ง error เกี่ยวกับ PostCSS plugin

### .prettierrc

`Prettier` คือ formatter สำหรับจัดหน้าตา code

ตัวอย่าง:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
printWidth = ความยาวบรรทัดที่ formatter พยายามรักษา
singleQuote = ใช้ single quote ในไฟล์ที่ formatter คุมได้
parser angular = ให้ Prettier เข้าใจ Angular template syntax ใน HTML
```

ควรแก้ไฟล์นี้เมื่อ:

- format code ออกมาไม่ตรง style ที่ทีมต้องการ
- HTML Angular format แปลกเพราะ formatter ใช้ parser ไม่ตรง
- อยากให้ทุกคนใน project format เหมือนกัน

จุดที่มักงง:

```text
.prettierrc บอกกติกา format
แต่ VS Code ต้องเลือกใช้ Prettier extension ด้วย
ถ้า editor ใช้ formatter ตัวอื่น ผลลัพธ์อาจไม่ตรง .prettierrc
```

### .vscode/settings.json

`.vscode/settings.json` คือ setting เฉพาะ workspace สำหรับ VS Code

ตัวอย่าง:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
typescript.tsdk = ใช้ TypeScript version จาก node_modules ของ project
enablePromptUseWorkspaceTsdk = ให้ VS Code ชวนใช้ TypeScript ของ project
editor.defaultFormatter = ใช้ Prettier เป็น formatter กลาง
[json]/[jsonc] = ให้ JSON ใช้ Prettier ด้วย
```

ควรแก้ไฟล์นี้เมื่อ:

- IDE ใช้ TypeScript คนละ version กับ project
- กด Format Document แล้วไม่ได้ใช้ Prettier
- JSON ถูก format ไม่เหมือนที่ `.prettierrc` ตั้งไว้

## วิธีเลือกว่าจะไปแก้ไฟล์ไหน

```text
อยากเพิ่ม npm command             -> package.json
ng build/serve/test อ่านผิด flow   -> angular.json
asset ไม่ออก dist                  -> angular.json assets
CSS/Tailwind ไม่ทำงาน              -> .postcssrc.json, styles ใน angular.json
TypeScript rule ทั้ง project       -> tsconfig.json
app build type warning             -> tsconfig.app.json
test type warning                  -> tsconfig.spec.json
format code ไม่ตรงใจ               -> .prettierrc
VS Code ไม่ใช้ formatter ที่ต้องการ -> .vscode/settings.json
```

## Tiny Example: แก้ TypeScript rootDir Warning

อาการ:

```text
The common source directory of 'tsconfig.app.json' is './src'.
The 'rootDir' setting must be explicitly set.
```

คิดแบบคน:

```text
TypeScript รู้ว่า source น่าจะอยู่ src
แต่ต้องการให้เราบอกชัด ๆ เพื่อจัด output layout
```

แก้:

```json
{
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "rootDir": "./src",
    "types": ["node"]
  }
}
```

ผล:

```text
warning หาย
source root ชัด
compile output คาดเดาได้
```

## Tiny Example: กด Format แล้ว JSON แตกหลายบรรทัด

อาการ:

```json
{
  "types": [
    "node"
  ]
}
```

คิดแบบคน:

```text
นี่ไม่ใช่ bug ของ Angular
เป็น style จาก formatter ที่ editor เลือกใช้
```

ถ้าอยากให้ VS Code ใช้ Prettier:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

ผล:

```text
editor กับ .prettierrc มีโอกาสให้ผลตรงกันมากขึ้น
diff จาก format ลดความสับสน
```

## สิ่งที่ไม่ควรทำ

- อย่าแก้ `angular.json` แบบเดาสุ่มเพราะ build flow ทั้ง project อาจเปลี่ยน
- อย่าใส่ config เฉพาะเครื่องส่วนตัวลง project ถ้ามันไม่ช่วยทีม
- อย่าเปลี่ยน formatter ไปมาหลายตัวใน repo เดียว เพราะ diff จะรก
- อย่าแก้ `tsconfig.json` กลางถ้าปัญหาเกิดเฉพาะ test หรือ app target
- อย่าเก็บ command เฉพาะ repo ไว้ใน docs กลาง ให้จดใน project docs แทน

## เช็กตัวเอง

- ถ้าอยากรู้ว่า `npm run build` ทำอะไร ต้องเริ่มอ่านไฟล์ไหน
- ถ้า asset ใน `public` ไม่ไปกับ build ต้องดู config ส่วนไหน
- ถ้า TypeScript เตือนเรื่อง `rootDir` ควรแก้ไฟล์ไหน
- ถ้า `expect` ใน test หา type ไม่เจอ ควรดูไฟล์ไหน
- ถ้า Format Document ไม่ใช้ Prettier ควรดูไฟล์ไหน

## อ่านต่อ

- [Angular Run Flow And angular.json](angular-run-flow-and-angular-json.md)
- [Angular 22 Baseline](angular-22-baseline.md)
- [Angular Commands](../commands.md)

## สรุปจำสั้น ๆ

```text
package.json        = ปุ่ม command
angular.json        = วิธีที่ Angular CLI ทำงาน
tsconfig.json       = กฎ TypeScript กลาง
tsconfig.app.json   = กฎ TypeScript ของ app
tsconfig.spec.json  = กฎ TypeScript ของ test
.postcssrc.json     = plugin สำหรับ CSS
.prettierrc         = กติกาจัดหน้าตา code
.vscode/settings.json = ให้ editor ใช้ tool ตรงกับ project
```
