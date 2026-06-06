# Angular Teach Index

ชุดนี้คือบทเรียน Angular กลางที่สรุปจากการทำ `ApoRaviz_Portfolio` และ `ApoRaviz_Mooping`

เป้าหมายคือให้โปรเจกต์ใหม่อ่านจากที่เดียวก่อน แล้วค่อยไปดูตัวอย่างจริงในแต่ละ repo

## Lessons

1. [Reactive State และ Signals](01-reactive-signals.md)
2. [Services และ Dependency Injection](02-services-dependency-injection.md)
3. [App Config, SSR และ Hydration](03-app-config-ssr-hydration.md)
4. [Browser APIs และ SSR Safety](04-browser-apis-ssr-safety.md)
5. [Component Structure และ Data Flow](05-component-structure-data-flow.md)
6. [Unit Test และ Regression Safety](06-unit-test-regression.md)
7. [CI/CD และ GitHub Pages](07-cicd-github-pages.md)
8. [Tailwind CSS v4 ใน Angular](08-tailwind-css-v4.md)
9. [Angular 22 จาก Angular 21](09-angular-22-from-21.md)

## How To Read With Project Docs

```text
อ่าน concept กลางใน _docs/angular/teach/
-> เปิด Project/docs/teach/ เพื่อดูตัวอย่างจริง
-> เปิด source code ที่ไฟล์นั้นอ้างถึง
-> ถ้าเจอ rule ที่ใช้ซ้ำได้ ให้กลับมาอัปเดต _docs/angular/
```

ตัวอย่าง:

- อ่าน `01-reactive-signals.md` แล้วดู `ApoRaviz_Portfolio/src/app/services/theme.service.ts`
- อ่าน `05-component-structure-data-flow.md` แล้วดู component ของ `ApoRaviz_Mooping`
- อ่าน `07-cicd-github-pages.md` แล้วดู `.github/workflows/deploy-pages.yml` ในแต่ละ repo
- อ่าน `08-tailwind-css-v4.md` แล้วดู `ApoRaviz_Portfolio/src/styles.css` และ component template ที่ใช้ utility classes
