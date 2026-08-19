# Environment Files คืออะไร

## ภาพจำง่าย ๆ

ให้นึกว่าแอป Angular มีป้ายบอกทางคนละชุดตามสถานที่:

```text
ตอน dev        = ยิง API ไป localhost
ตอน production = ยิง API ไป domain จริง
```

Environment files คือป้ายบอกทางแบบนี้ แต่เป็น config ฝั่ง frontend

## แปลเป็นภาษาคนธรรมดา

Environment files คือไฟล์ที่เก็บค่า public config ของแอป เช่น API base URL หรือ feature flag ที่ไม่ลับ

ใช้เมื่อแอปเดียวกันต้องใช้ค่าคนละชุดระหว่าง development กับ production

## แปลเป็น Angular

ใน Angular project เราอาจมีไฟล์เช่น:

```text
src/environments/environment.ts
src/environments/environment.development.ts
```

ใน Angular 22 pattern ที่ `ng generate environments` สร้างให้:

```text
environment.ts             = base/default config สำหรับ production
environment.development.ts = config สำหรับ development
```

แล้วตั้ง `fileReplacements` ใน `angular.json` เพื่อให้ development build ใช้ไฟล์ development แทน base file

ตัว generator สร้างไฟล์ทั้งสองเป็น object ว่างก่อน:

```ts
export const environment = {};
```

ชื่อ field เช่น `apiBaseUrl` หรือ `production` ไม่ได้เกิดขึ้นเอง เราต้องเพิ่มตาม public config ที่แอปต้องใช้

## ตัวอย่างสั้นที่สุด

```ts
// src/environments/environment.ts
export const environment = {
  apiBaseUrl: 'https://api.example.invalid',
};
```

```ts
// src/environments/environment.development.ts
export const environment = {
  apiBaseUrl: 'http://localhost:3000',
};
```

`.invalid` เป็นโดเมนที่สงวนไว้สำหรับตัวอย่างและค่าที่ตั้งใจให้ใช้จริงไม่ได้ จึงเหมาะเป็น placeholder แบบ fail loudly ก่อนรู้ production domain จริง แต่ต้องเปลี่ยนก่อน deploy

## Flow ทีละขั้น

1. เรารัน `ng generate environments` เพื่อ scaffold `src/environments/`
2. เรา import จาก `src/environments/environment.ts` เสมอ
3. Angular CLI อ่าน `angular.json` ตอน build
4. ถ้าเป็น development configuration และมี `fileReplacements` Angular จะใช้ `environment.development.ts` แทน `environment.ts`
5. ค่าที่ application ใช้งานถูก bundle ไปอยู่ใน JavaScript ที่ browser โหลด

โค้ดที่ใช้ค่า config ควร import จากไฟล์ฐานเสมอ:

```ts
import { environment } from '../../environments/environment';

const statusUrl = `${environment.apiBaseUrl}/status`;
```

อย่า import `environment.development.ts` โดยตรง เพราะจะข้ามการเลือกไฟล์ของ Angular และเสี่ยงให้ production ใช้ค่า development

## Serve, Build และ Unit Test เลือกไฟล์ไหน

สำหรับ Angular 22 scaffold ที่ไม่ได้ override target เพิ่ม:

```text
ng serve      -> build:development -> environment.development.ts
ng build      -> build:production  -> environment.ts
ng test       -> build:development -> environment.development.ts
```

`@angular/build:unit-test` ใช้ build target ของ project พร้อม configuration `development` เป็นค่าเริ่มต้นเมื่อไม่ได้ระบุ `buildTarget`

ข้อสรุปนี้ผูกกับ Angular 22 builder behavior ควรตรวจ schema หรือ `angular.json` อีกครั้งเมื่ออัปเกรด major version หรือกำหนด test target เอง

## Build ผ่านแต่ค้นค่าไม่พบได้อย่างไร

ถ้า Service ที่อ่าน Environment ยังไม่มีผู้ใช้ใน application Angular อาจตัด Service และ URL ออกจาก bundle ขั้นตอนนี้เรียกว่า tree shaking

ดังนั้น:

```text
Build ผ่าน + ค้น URL ไม่พบ
!= fileReplacements เสียเสมอไป
```

ต้องตรวจด้วยว่าโค้ดนั้นถูก Component หรือ entrypoint เรียกใช้จริงหรือยัง การพิสูจน์ค่าใน browser ควรทำเมื่อ application มี flow ที่ใช้ Service นั้นแล้ว

## จุดที่มักงง

- Environment files ฝั่ง Angular ไม่ใช่ที่เก็บ secret
- ค่าใน frontend bundle มีโอกาสถูกผู้ใช้ inspect เห็นได้
- ใส่ได้เฉพาะ public config เช่น API base URL ที่เปิดเผยได้
- ห้ามใส่ password, private token, secret key หรือ credential จริง
- Angular 22 ใช้ `environment.ts` เป็น base/default production ไม่ใช่ไฟล์ dev
- Angular 22 Unit Test Builder ใช้ development configuration เป็นค่าเริ่มต้น ถ้าไม่ได้กำหนด `buildTarget` เอง
- Test ตรวจพฤติกรรมที่เกิดขึ้น ไม่ได้รู้เองว่า URL มาจาก Environment หรือ hardcode ถ้าค่าทั้งสองเท่ากัน
- โปรเจกต์ใหม่บางตัวอาจยังไม่มี `src/environments/` จนกว่าจะรัน `ng generate environments` หรือแยก dev/prod จริง

## ศัพท์ที่เกี่ยวข้อง

- อ่าน flow เต็ม: [Angular Config Files](../teach/angular-config-files.md)

## แหล่งอ้างอิง

- [Angular CLI — Configuring application environments](https://angular.dev/tools/cli/environments)
- [IANA — Special-Use Domain Names](https://www.iana.org/assignments/special-use-domain-names/special-use-domain-names.xhtml)

## เช็กตัวเอง

- Environment files ใช้แยกค่าแบบไหน
- ทำไม API base URL ใส่ได้ แต่ secret key ไม่ควรใส่
- ถ้า project ยังไม่มี backend/API จริง จำเป็นต้องสร้าง environment files ทันทีไหม

## จำสั้น ๆ

```text
Environment files = public frontend config แยก dev/prod
ไม่ใช่ที่เก็บ secret เพราะสุดท้ายไปอยู่ใน browser bundle
```
