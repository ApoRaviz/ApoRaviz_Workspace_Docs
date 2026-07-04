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

## ตัวอย่างสั้นที่สุด

```ts
// src/environments/environment.ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.example.com',
};
```

```ts
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
};
```

## Flow ทีละขั้น

1. เรารัน `ng generate environments` เพื่อ scaffold `src/environments/`
2. เรา import จาก `src/environments/environment.ts` เสมอ
3. Angular CLI อ่าน `angular.json` ตอน build
4. ถ้าเป็น development configuration และมี `fileReplacements` Angular จะใช้ `environment.development.ts` แทน `environment.ts`
5. ค่าเหล่านี้ถูก bundle ไปอยู่ใน JavaScript ที่ browser โหลด

## จุดที่มักงง

- Environment files ฝั่ง Angular ไม่ใช่ที่เก็บ secret
- ค่าใน frontend bundle มีโอกาสถูกผู้ใช้ inspect เห็นได้
- ใส่ได้เฉพาะ public config เช่น API base URL ที่เปิดเผยได้
- ห้ามใส่ password, private token, secret key หรือ credential จริง
- Angular 22 ใช้ `environment.ts` เป็น base/default production ไม่ใช่ไฟล์ dev
- โปรเจกต์ใหม่บางตัวอาจยังไม่มี `src/environments/` จนกว่าจะรัน `ng generate environments` หรือแยก dev/prod จริง

## ศัพท์ที่เกี่ยวข้อง

- อ่าน flow เต็ม: [Angular Config Files](../teach/angular-config-files.md)

## เช็กตัวเอง

- Environment files ใช้แยกค่าแบบไหน
- ทำไม API base URL ใส่ได้ แต่ secret key ไม่ควรใส่
- ถ้า project ยังไม่มี backend/API จริง จำเป็นต้องสร้าง environment files ทันทีไหม

## จำสั้น ๆ

```text
Environment files = public frontend config แยก dev/prod
ไม่ใช่ที่เก็บ secret เพราะสุดท้ายไปอยู่ใน browser bundle
```
