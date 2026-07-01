# Angular 22 Baseline

> เลข version จริง (source หลัก) อยู่ที่ [`baseline.md`](../../baseline.md) — บทนี้เป็น **คำอธิบาย/snapshot** ของ baseline นั้น ถ้า bump version ให้แก้ `baseline.md` ก่อน แล้วค่อยปรับคำอธิบายในบทนี้

บทนี้สรุป baseline ปัจจุบันของ Angular workspace `ApoRaviz`

ใช้ไฟล์นี้เมื่อ:

- เริ่มโปรเจกต์ Angular ใหม่ใน workspace `ApoRaviz`
- ตรวจโปรเจกต์เดิมให้ตรงกับ frontend baseline ปัจจุบัน
- ตรวจว่าทำไม workspace ต้องใช้ Node 24 LTS, TypeScript 6.0.x และ Tailwind CSS v4

## สถานะ Release

Angular 22 ออกวันที่ 2026-06-03 และเป็น active release ปัจจุบัน

ความหมายใน workspace:

```text
new Angular project = Angular 22
existing Angular project = sync ให้ตรงกับ baseline เมื่อ build/test พร้อม
old docs ที่เขียน version เก่า = ต้องแก้ wording ไม่ให้สับสนกับ current baseline
```

## Version Baseline

Angular 22 dependency baseline สำหรับ workspace นี้:

| Topic | Workspace Baseline | Decision |
|---|---|---|
| Angular | `22.x` | ใช้เป็น default ของโปรเจกต์ Angular ใหม่ |
| Node.js | `>=24.15.0 <25` | ใช้ Node 24 LTS |
| TypeScript | `>=6.0.0 <6.1.0` | ใช้ TypeScript 6.0.x |
| RxJS | Angular default | ไม่ override ถ้าไม่มีเหตุผล |
| Browser baseline | browser ปัจจุบัน | ตรวจ UI บน desktop และ mobile width |

ตัวอย่าง `package.json` สำหรับ frontend project ใหม่:

```json
{
  "engines": {
    "node": ">=24.15.0 <25"
  },
  "dependencies": {
    "@angular/core": "^22.0.0"
  },
  "devDependencies": {
    "@angular/cli": "^22.0.0",
    "@angular/compiler-cli": "^22.0.0",
    "typescript": "~6.0.3"
  }
}
```

## Change Detection

Angular 22 ทำให้ component ที่ไม่ได้ระบุ `changeDetection` เป็น `OnPush` โดย default

สำหรับ workspace นี้ถือว่าเข้าทาง เพราะเราตั้งใจใช้:

- signals
- `computed()`
- `input()`
- `output()`
- state ที่เปลี่ยนจาก event ชัดเจน

ถ้าต้องการ behavior แบบ eager:

```ts
// ระบุเองเฉพาะ component ที่มีเหตุผลจริง
changeDetection: ChangeDetectionStrategy.Eager
```

แต่ default ของโปรเจกต์ใหม่ควรออกแบบให้ทำงานกับ `OnPush` ได้ตั้งแต่แรก

## Template และ Compiler เข้มขึ้น

Angular 22 ตรวจ template เข้มขึ้น:

- `data-*` attribute ไม่ bind input/output แล้ว
- duplicate input/output/model binding จะ error
- expression ที่ใช้ `in` ใน template จะ error
- optional chaining และ nullish coalescing มี diagnostics ที่ช่วยจับ nullable case ได้มากขึ้น
- element ที่ match หลาย selector พร้อมกันจะ error ตอน compile

ผลดีคือ bug ถูกจับเร็วขึ้นตอน build

จุดที่ต้องระวังคือ template เก่าบางส่วนอาจต้องแก้ type หรือ binding ให้ชัด

## API เก่าที่ถูกถอด

Angular 22 ถอด API เก่าหลายตัว:

- `ComponentFactoryResolver`
- `ComponentFactory`
- `createNgModuleRef`
- `ChangeDetectorRef.checkNoChanges`
- `provideRoutes()`

แนวทางใหม่:

```ts
// ใช้ component class โดยตรงกับ dynamic component API
viewContainerRef.createComponent(MyComponent);

// ใช้ provideRouter สำหรับ routing
provideRouter(routes);
```

ใน test ให้ใช้:

```ts
fixture.detectChanges();
```

แทนการพึ่ง `checkNoChanges()`

## Router Behavior

`paramsInheritanceStrategy` เปลี่ยน default เป็น `always`

ผลคือ child route จะ inherit route params จาก parent route มากขึ้น

ถ้าต้องการ behavior เดิม:

```ts
provideRouter(routes, withRouterConfig({
  paramsInheritanceStrategy: 'emptyOnly',
}));
```

ในโปรเจกต์ใหม่ให้ใช้ default ใหม่ก่อน แล้วค่อย override เมื่อมีเหตุผล

## Forms และ HTTP

Forms:

- `min` และ `max` validator ต้องรับ number หรือ null
- ไม่ควรส่ง string เข้า validator เหล่านี้

HTTP:

- `withFetch` deprecated
- `reportProgress` deprecated
- ถ้าต้องการ upload progress ให้ใช้ `provideHttpClient(withXhr)`
- ใช้ `reportUploadProgress` และ `reportDownloadProgress` แยกให้ชัด

## Animation และ Browser Integration

Angular 22 ปรับ animation และ browser integration หลายจุด:

- leave animations ไม่ถูกจำกัดอยู่แค่องค์ประกอบที่ถูกลบเท่านั้น
- Hammer.js integration ถูกถอดออก
- ถ้า app ต้องการ gesture ให้เลือก implementation เองตาม use case

ใน workspace นี้ ถ้าเป็น animation ทั่วไปให้ใช้ Tailwind/CSS ก่อน

ถ้าเป็น gesture หรือ motion ที่ซับซ้อน ให้เขียนเหตุผลใน project-specific docs ก่อนเพิ่ม library

## Checklist เวลา Sync Baseline

ก่อนติ๊ก `[x]` ว่า sync เสร็จ:

- [ ] `package.json` ใช้ Angular 22, TypeScript 6.0.x และ Node engine 24 LTS
- [ ] `package-lock.json` sync แล้ว
- [ ] `npm test` หรือ `npm run test:ci` ผ่าน
- [ ] `npm run build` ผ่าน
- [ ] search docs แล้วไม่เหลือ wording ที่ทำให้เข้าใจว่า version เก่าคือ current baseline
- [ ] ถ้าเจอ Angular concept ใหม่ที่ทุกโปรเจกต์ควรรู้ ให้เพิ่มกลับมาที่ `_docs/angular/teach/`

## Sources

- Angular releases: `https://angular.dev/reference/releases`
- Angular version compatibility: `https://angular.dev/reference/versions`
- Angular changelog: `https://github.com/angular/angular/blob/main/CHANGELOG.md`
