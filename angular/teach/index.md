# Angular Teach Index

ชุดนี้คือบทเรียน Angular/Tailwind กลางที่สรุปจากการทำ `ApoRaviz_Portfolio`, `ApoRaviz_Mooping` และโปรเจกต์ใหม่ในอนาคต

เป้าหมายคือให้เริ่มเรียนจากที่เดียวก่อน แล้วค่อยไปดู case study จริงใน `projects/`

## Lessons

1. [Reactive State และ Signals](01-reactive-signals.md)
2. [Services และ Dependency Injection](02-services-dependency-injection.md)
3. [App Config, SSR และ Hydration](03-app-config-ssr-hydration.md)
4. [Browser APIs และ SSR Safety](04-browser-apis-ssr-safety.md)
5. [Component Structure และ Data Flow](05-component-structure-data-flow.md)
6. [Unit Test และ Regression Safety](06-unit-test-regression.md)
7. [CI/CD และ GitHub Pages](07-cicd-github-pages.md)
8. [Tailwind CSS v4 ใน Angular](08-tailwind-css-v4.md)
9. [Angular 22 Baseline](09-angular-22-baseline.md)
10. [Angular Run Flow And angular.json](10-angular-run-flow-and-angular-json.md)
11. [Angular Config Files](11-angular-config-files.md)

## How To Read With Real Projects

```text
อ่าน concept กลางใน angular/teach/
-> เปิด repo ของโปรเจกต์จริง (เช่น ApoRaviz_DevEng, ApoRaviz_Portfolio) เพื่อดูตัวอย่าง
-> เปิด source code ของโปรเจกต์ถ้าต้องการดู implementation
-> ถ้าเจอ rule reusable ให้กลับมาเพิ่มเป็นตัวอย่างในหน้า topic ของ angular/
```

ตัวอย่าง:

- อ่าน `01-reactive-signals.md` แล้วดู state/service ในโปรเจกต์จริง
- อ่าน `05-component-structure-data-flow.md` แล้วดู component ของ `ApoRaviz_Mooping`
- อ่าน `07-cicd-github-pages.md` แล้วดู workflow deploy ของ repo ลูก
- อ่าน `10-angular-run-flow-and-angular-json.md` แล้วเปิด `angular.json` ของ Portfolio หรือ MooPing เทียบ flow
- อ่าน `11-angular-config-files.md` แล้วเปิดไฟล์ config เช่น `tsconfig.app.json`, `.prettierrc`, `.vscode/settings.json` เทียบกับ repo จริง
