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

### tsconfig.json

`tsconfig.json` คือกฎ TypeScript กลางของ project

ตัวอย่าง:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "strictTemplates": true
  }
}
```

ตั้งแบบนี้แล้วได้อะไร:

```text
strict = TypeScript ตรวจเข้มขึ้น ลด bug จากชนิดข้อมูลหลวม
target = JavaScript version ที่ compile ไปหา
module = รูปแบบ module ที่ toolchain ใช้ต่อ
strictTemplates = Angular ตรวจ template เข้มขึ้น เช่น binding/type ใน HTML
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

- [Angular Run Flow And angular.json](10-angular-run-flow-and-angular-json.md)
- [Angular 22 Baseline](09-angular-22-baseline.md)
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
