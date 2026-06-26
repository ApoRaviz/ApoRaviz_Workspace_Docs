# ApoRaviz Teaching Rules

ไฟล์นี้กำหนดวิธีเขียนบทเรียนใน `ApoRaviz_Workspace_Docs`

เป้าหมายคือทำให้คนที่ไม่เก่งภาษาอังกฤษ หรือยังไม่มั่นใจกับศัพท์ technical สามารถอ่านแล้วค่อย ๆ เข้าใจได้ โดยไม่ต้องออกไปอ่านเว็บ official ก่อน

## Teaching Style

ทุกบทเรียนต้องเริ่มจากภาพจำง่าย ๆ ก่อน แล้วค่อยพาไปสู่ศัพท์ Angular

```text
ชีวิตจริงก่อน -> แปลเป็นคำ technical -> flow ทีละขั้น -> code -> สรุปจำสั้น ๆ
```

ตัวอย่าง:

```text
ไม่มี SSR = ส่งกระดาษเปล่า + ปากกาไปให้ browser แล้ว browser วาดเอง
มี SSR    = server วาดภาพหลักให้ก่อน แล้ว browser ค่อยเติมปุ่ม/การโต้ตอบ
```

จากนั้นค่อยแปลว่า:

```text
SSR       = server render HTML ให้ก่อน
Hydration = browser รับ HTML นั้นมาต่อให้ interactive
```

## Do Not Start With Technical Definition

ห้ามเริ่มบทด้วยนิยามแบบแข็ง ๆ เช่น:

```text
Signal is a reactive primitive...
Dependency Injection is a design pattern...
```

ให้เริ่มด้วยคำถามหรือภาพจำ เช่น:

```text
signal = กล่องเก็บค่าที่มีไฟแจ้งเตือน
inject = การขอของจากคลังกลางของ Angular
isPlatformBrowser = เช็กก่อนว่าตอนนี้เราอยู่ในบ้าน browser จริงไหม
```

## Document Types

บทเรียนต้องแยกชนิดเอกสารให้ชัด

```text
Concept   = อธิบายศัพท์หรือแนวคิดหนึ่งเรื่อง
Lesson    = อธิบาย flow การทำงานเป็นลำดับ
Lab       = แบบฝึกหัดหรือ mini example ที่ลองทำตามได้
Guide     = กติกา workflow หรือวิธีเริ่มงาน
Checklist = คำถามเช็กความเข้าใจ
```

ใช้ template เหล่านี้เมื่อสร้างเนื้อหาใหม่:

```text
templates/CONCEPT_TEMPLATE.md
templates/LESSON_TEMPLATE.md
templates/LAB_TEMPLATE.md
```

## Concept Rule

หนึ่ง concept ต้องสอนหนึ่งเรื่องเท่านั้น

concept page ต้องมี:

- ภาพจำชีวิตจริง
- ความหมายแบบคนธรรมดา
- ความหมายแบบ Angular
- ตัวอย่างสั้นที่สุด
- จุดที่มักงง
- link ไป concept ที่เกี่ยวข้อง
- สรุปจำสั้น ๆ

ถ้าใช้ศัพท์ใหม่ใน concept แล้วศัพท์นั้นอาจทำให้มือใหม่งง ต้อง link ไป concept page ของศัพท์นั้น

ถ้ายังไม่มี concept page ให้สร้าง placeholder ไว้ก่อน

## Lesson Rule

lesson ต้องสอน flow ไม่ใช่แค่สอน syntax

lesson page ต้องมี:

- เรียนเรื่องนี้เพื่อแก้อาการงงอะไร
- ภาพจำง่าย ๆ ก่อนเข้า code
- tiny Angular example
- flow ทีละขั้น
- อธิบาย code ทีละบรรทัด
- ศัพท์ที่เจอในบทนี้
- ลองทำเอง
- เช็กตัวเอง
- สรุปจำสั้น ๆ

## Lab Rule

lab ต้องเล็กมากและจบในตัวเอง

lab ที่ดีควรมี:

- เป้าหมายเดียว
- code เริ่มต้น
- step ให้ลองแก้
- expected result
- คำถามหลังทำ
- link กลับไป concept/lesson ที่เกี่ยวข้อง

## Link Rule

บทเรียนหลักต้องอ่านจบใน `ApoRaviz_Workspace_Docs`

อนุญาตให้มี official docs เป็น reference ท้ายหน้าได้ แต่ห้ามทำให้คนเรียนต้องออกไปอ่านภาษาอังกฤษก่อนถึงจะเข้าใจบทเรียน

ถ้าใช้ศัพท์ใหม่ ให้ link ไปหน้าใน repo นี้ก่อน

```text
ถูกต้อง: อ่านต่อใน ../concepts/signal.md
ไม่ดี: อ่าน Angular docs เองก่อน
```

## Example Rule

ตัวอย่างการสอนต้องอยู่ใน `ApoRaviz_Workspace_Docs`

ห้ามบังคับให้คนเรียนไปดู `ApoRaviz_Portfolio` เพื่อเข้าใจ concept กลาง

ถ้าต้องโชว์ code:

- ใช้ tiny Angular snippet
- ใช้ pseudo flow
- ใช้ lab ใน docs กลาง
- ใช้ diagram หรือ text flow

## Language Rule

ใช้ภาษาไทยเป็นหลัก

ศัพท์ technical เขียนได้ แต่ต้องมีคำแปลแบบคนธรรมดาประกบไว้เสมอในครั้งแรกที่เจอ

ตัวอย่าง:

```text
render = การวาดหน้าจอออกมาให้เห็น
provider = ตัวลงทะเบียนของที่ Angular จะเอาไว้แจก
bootstrap = การเริ่มประกอบแอป Angular
```

## Depth Rule

คำว่า "ละเอียด" ใน docs นี้หมายถึง:

- รู้ว่าไฟล์นี้รันตอนไหน
- รู้ว่า command นี้ไปอ่าน config ไหน
- รู้ว่า function นี้ถูกเรียกเมื่อไหร่
- รู้ว่า state เปลี่ยนแล้ว UI เปลี่ยนได้อย่างไร
- รู้ว่าบรรทัดนี้มีหน้าที่อะไร

ไม่ใช่แค่เขียนคำอธิบายยาว ๆ

## Short Memory Rule

ทุกบทต้องมีสรุปจำสั้น ๆ ตอนท้าย

ตัวอย่าง:

```text
signal = กล่องค่าที่ Angular track ได้
set    = ตั้งค่าใหม่ตรง ๆ
update = เปลี่ยนจากค่าเดิม
```

## File Map Recap Rule

ถ้าบทเรียนมีไฟล์หรือ config หลายไฟล์ เช่น Angular scaffold, SSR files, `tsconfig*.json`, `package.json`, `angular.json` ให้ recap แผนที่ไฟล์ก่อนถาม Knowledge Check

เป้าหมายคือเช็กความเข้าใจ ไม่ใช่เช็กว่าผู้เรียนจำชื่อไฟล์จำนวนมากได้หมดในหัวหรือไม่

รูปแบบที่ควรใช้:

```text
แผนที่ก่อนตอบ:
package.json = npm scripts/dependencies
angular.json = Angular build/serve/test config
src/main.ts = browser entry
src/main.server.ts = server bootstrap
src/server.ts = Node/Express SSR server
```

แล้วค่อยถาม:

```text
จากแผนที่นี้ ถ้า npm run build ต้องรู้ entry browser จากไฟล์ไหน
```

ถ้าผู้เรียนตอบไม่ได้เพราะไฟล์เยอะ ให้ย้อนกลับไปที่ file map ก่อน ไม่รีบสรุปว่าไม่เข้าใจ concept

## VitePress Markdown Rule

- ห้ามใช้ placeholder แบบ `<...>` นอก code fence เพราะ VitePress/Vue จะมองเป็น HTML tag และอาจ build fail
- ให้ใช้ placeholder แบบ `[[...]]` แทน เช่น `[[ชื่อ Concept]]`, `[[คำถาม 1]]`
- ใน template ห้ามทำ markdown link ปลอมไปยังไฟล์ที่ยังไม่มีจริง เพราะ VitePress จะตรวจ dead link ตอน build ให้เขียนเป็น path ใน backtick ก่อน
