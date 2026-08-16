# Angular Teach Index

ชุดนี้คือบทเรียน Angular/Tailwind กลาง สรุปจากงานจริงในโปรเจกต์ `ApoRaviz_*` เป็นความรู้ตาม topic ที่ใช้ซ้ำได้ทุกโปรเจกต์

เป้าหมายคือเริ่มเรียนจากที่เดียวก่อน แล้วเปิด repo โปรเจกต์จริงดูตัวอย่างประกอบ

## Lessons — ลำดับที่ควรอ่าน

> ชื่อไฟล์ไม่มีเลขนำหน้า (เป็น topic slug ล้วน) — **ลำดับการอ่านคือ 1-13 ตาม stage ด้านล่าง** ที่จัดไว้ในหน้านี้ + sidebar เท่านั้น ลำดับอยู่ที่ presentation ไม่ผูกกับชื่อไฟล์ เวลาจัดใหม่จึงแก้แค่ที่นี่ (ดู No Number Prefix Rule ใน `../../TEACHING_RULES.md`)

**Stage 1 — Foundation (เข้าใจโปรเจกต์ก่อนเขียน code)**

1. [Angular 22 Baseline](angular-22-baseline.md) — version/stack ที่ workspace ยึด
2. [TypeScript ใน Angular](typescript-in-angular.md) — ภาษาที่ใช้เขียน + tsconfig
3. [Angular Run Flow And angular.json](angular-run-flow-and-angular-json.md) — โปรเจกต์รัน/build ยังไง
4. [Angular Config Files](angular-config-files.md) — ไฟล์ config แต่ละตัวทำอะไร

**Stage 2 — Build Components (เริ่มเขียนของจริง)**

5. [Component Structure และ Data Flow](component-structure-data-flow.md)
6. [Reactive State และ Signals](reactive-signals.md)
7. [Services และ Dependency Injection](services-dependency-injection.md)
8. [HttpClient และ HTTP Unit Test](http-client-and-http-testing.md)

**Stage 3 — Rendering / SSR**

9. [App Config, SSR และ Hydration](app-config-ssr-hydration.md)
10. [Browser APIs และ SSR Safety](browser-apis-ssr-safety.md)

**Stage 4 — Styling**

11. [Tailwind CSS v4 ใน Angular](tailwind-css-v4.md)

**Stage 5 — Quality & Ops**

12. [Unit Test และ Regression Safety](unit-test-regression.md)
13. [CI/CD และ GitHub Pages](cicd-github-pages.md)

## How to Read with Real Projects

```text
อ่าน concept กลางใน angular/teach/
-> เปิด repo ของโปรเจกต์จริง (เช่น ApoRaviz_DevEng, ApoRaviz_Portfolio) เพื่อดูตัวอย่าง
-> เปิด source code ของโปรเจกต์ถ้าต้องการดู implementation
-> ถ้าเจอ rule reusable ให้กลับมาเพิ่มเป็นตัวอย่างในหน้า topic ของ angular/
```

ตัวอย่าง:

- อ่าน `reactive-signals.md` แล้วดู state/service ในโปรเจกต์จริง
- อ่าน `component-structure-data-flow.md` แล้วดู component ของ `ApoRaviz_Mooping`
- อ่าน `cicd-github-pages.md` แล้วดู workflow deploy ของ repo ลูก
- อ่าน `angular-run-flow-and-angular-json.md` แล้วเปิด `angular.json` ของ Portfolio หรือ MooPing เทียบ flow
- อ่าน `angular-config-files.md` แล้วเปิดไฟล์ config เช่น `tsconfig.app.json`, `.prettierrc`, `.vscode/settings.json` เทียบกับ repo จริง
- อ่าน `typescript-in-angular.md` แล้วเปิด `app.ts`, `package.json`, `tsconfig.json` เทียบว่า TypeScript อยู่ตรงไหนของ Angular flow
- อ่าน `http-client-and-http-testing.md` แล้วตามว่า Service, testing backend และ test ส่ง request/response ต่อกันอย่างไร
