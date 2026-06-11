# App Config, SSR และ Hydration

บทนี้รวมไฟล์ config สำคัญของ Angular standalone app และแนวคิด SSR/prerender

## Standalone App Config

Angular รุ่นใหม่ไม่จำเป็นต้องใช้ `AppModule` แบบเก่า

ไฟล์หลักมักเป็น:

```text
src/app/app.config.ts
src/app/app.config.server.ts
src/app/app.routes.ts
```

ตัวอย่าง:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
```

## provideRouter()

```ts
provideRouter(routes)
```

ใช้เปิด Angular Router

แม้เป็นเว็บหน้าเดียวก็ยังมีประโยชน์:

- รองรับ route เพิ่มในอนาคต
- SSR/prerender รู้ route structure
- แยกหน้า `/teach`, `/commands`, `/projects/:id` ได้เป็นระบบ

## Hydration

SSR/prerender สร้าง HTML ให้ browser เห็นก่อน แต่ HTML นั้นยังไม่ได้ผูก event/state ครบ

`hydration` คือ Angular ฝั่ง browser เข้ามารับช่วง HTML เดิม แล้วผูก event/state กลับเข้าไป

```ts
provideClientHydration(withEventReplay())
```

`withEventReplay()` ช่วยเก็บ event ที่ผู้ใช้กดระหว่างรอ hydration แล้ว replay หลัง Angular พร้อม

## Prerender

`Prerender` คือการสร้าง HTML static ตอน build

```text
ng build
-> Angular render route เป็น HTML
-> deploy static files ไป hosting
```

เหมาะกับงานแบบนี้:

- portfolio
- product demo
- document-like page
- app ที่หน้าแรกไม่ต้องดึงข้อมูล real-time ก่อนแสดง

## SSR Safety Rule

เมื่อเปิด SSR/prerender ให้จำ:

```text
code อาจรันบน server ก่อนถึง browser
```

ห้ามเรียกสิ่งเหล่านี้ตรง ๆ ใน constructor หรือ field initializer โดยไม่ guard:

- `window`
- `document`
- `localStorage`
- `IntersectionObserver`
- scroll APIs
- DOM measurement เช่น `getBoundingClientRect()`

## Project Page บน GitHub Pages

ถ้า deploy ด้วย GitHub Pages แบบ project site ต้องตั้ง `base-href`

```bash
ng build --configuration production --base-href /Repo_Name/
```

ถ้าไม่ตั้ง path นี้ browser อาจหา JS/CSS ผิดตำแหน่ง เพราะ URL จริงอยู่ใต้ path ของ repo
