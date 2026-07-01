# App Config, SSR และ Hydration

บทนี้รวมไฟล์ config สำคัญของ Angular standalone app และแนวคิด SSR/prerender

## Standalone App Config

Angular รุ่นใหม่ไม่จำเป็นต้องใช้ `AppModule` แบบเก่า

ไฟล์หลักมักเป็น:

```text
src/app/app.config.ts
src/app/app.config.server.ts
src/app/app.routes.ts
src/app/app.routes.server.ts
src/main.server.ts
src/server.ts
```

ตัวอย่าง:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
  ],
};
```

ถ้าต้องการ event replay เพิ่ม อาจเห็น:

```ts
provideClientHydration(withEventReplay())
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

## Server Routes รุ่นใหม่

Angular SSR รุ่นใหม่อาจมีไฟล์ `src/app/app.routes.server.ts` เพื่อบอกฝั่ง server ว่าแต่ละ route ควร render แบบไหน:

```ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
```

ความหมาย:

```text
ServerRoute = route rule สำหรับฝั่ง server
path: '**' = ทุก path ที่เหลือ
RenderMode.Prerender = ให้สร้าง HTML ล่วงหน้าตอน build เมื่อทำได้
```

`app.config.server.ts` จะเอา server routes ไปลงทะเบียน:

```ts
provideServerRendering(withRoutes(serverRoutes))
```

ภาพจำ:

```text
app.routes.ts = URL นี้แสดง component ไหน
app.routes.server.ts = URL นี้ให้ server render แบบไหน
```

## server.ts กับ main.server.ts

เมื่อเปิด SSR จะเห็นไฟล์ฝั่ง server เพิ่ม เช่น:

```text
src/main.server.ts
src/server.ts
```

`main.server.ts` ใช้ bootstrap Angular app ฝั่ง server:

```ts
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
```

`server.ts` เป็น Node/Express server ที่รับ HTTP request และส่งต่อให้ Angular SSR engine:

```ts
const app = express();
const angularApp = new AngularNodeAppEngine();

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});
```

จุดที่มักงง:

```text
server.ts ไม่ได้ import main.server.ts ตรง ๆ
```

Angular build จะสร้าง server bundle/manifest ที่บอก SSR runtime ว่าต้อง bootstrap จาก `main.server.mjs` ซึ่งมาจาก `src/main.server.ts`

จำสั้น ๆ:

```text
server.ts = รับ HTTP request
AngularNodeAppEngine = ส่ง request เข้า Angular SSR
main.server.ts = bootstrap Angular app ฝั่ง server
manifest/server bundle = wiring ที่ Angular build สร้างให้
```

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
