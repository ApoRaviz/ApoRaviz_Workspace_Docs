# ApoRaviz Teaching Rules

ไฟล์นี้กำหนดวิธีเขียนบทเรียนใน `ApoRaviz_Workspace_Docs`

เป้าหมายคือทำให้คนที่ไม่เก่งภาษาอังกฤษ หรือยังไม่มั่นใจกับศัพท์ technical สามารถอ่านแล้วค่อย ๆ เข้าใจได้ โดยไม่ต้องออกไปอ่านเว็บ official ก่อน

## Working Mode Rule

ให้ `AGENTS.md` ของแต่ละโปรเจกต์ระบุ `Default Working Mode` เป็น `teach` หรือ `execute` และให้คำสั่งของผู้ใช้ในงานปัจจุบันเปลี่ยน mode ชั่วคราวได้

`teach` กับ `execute` เป็นสองทางเลือกสำหรับการลงมือทำ ส่วน `walkthrough` เป็น follow-up หลังมี code หรือ artifact อยู่แล้ว ไม่ใช่ implementation mode ที่อยู่ระดับเดียวกัน

```text
teach
-> AI สอนระหว่างสร้าง
-> learner ลงมือเองผ่าน Learning Loop

execute
-> AI implement, validate และส่งมอบงานให้ครบ

execute -> walkthrough
-> learner พบส่วนที่สงสัยในงานที่มีอยู่แล้ว
-> AI พาไล่อ่านและอธิบายของเดิมอย่างเป็นลำดับ
```

### `teach`

ใช้เมื่อเป้าหมายคือความเข้าใจและการลงมือเองอย่างจริงจัง ต้องใช้ Learning Loop + Explanation Protocol, ประกอบ core code ทีละส่วน, ตรวจผล และทำ Knowledge Check ก่อนผ่านเรื่องใหม่

### `execute`

ใช้เมื่อผู้ใช้ต้องการให้ AI ทำงานให้ครบ end-to-end: ตรวจ context, แก้ code/docs, validate และส่งมอบผลลัพธ์ โดยไม่บังคับให้ผู้ใช้พิมพ์ code หรือทำ Knowledge Check

### `walkthrough`

ใช้เมื่อมี code หรือ artifact อยู่แล้วและผู้ใช้ขอให้สอนสิ่งที่เห็น AI ต้องอธิบายให้ลึกแบบ `teach` ทั้งภาพจำ ศัพท์ Why และ flow แต่ไม่ให้ผู้ใช้เขียน implementation เดิมซ้ำ และไม่แก้ไฟล์โดยอัตโนมัติ

ถ้าระหว่าง `walkthrough` พบว่าต้องเปลี่ยนงาน ให้เลือกใหม่:

```text
learner ต้องการแก้เองพร้อมเรียน -> teach
ผู้ใช้ต้องการให้ AI แก้ให้ครบ  -> execute
```

คำสั่งของผู้ใช้ในงานปัจจุบันมีลำดับเหนือ Default Working Mode เฉพาะงานนั้น แต่ไม่ยกเลิกกฎด้าน safety, scope, validation หรือ Knowledge Sync

## Teaching Style

ทุกบทเรียนต้องเริ่มจากภาพจำง่าย ๆ ก่อน แล้วค่อยพาไปสู่ศัพท์ technical ของหัวข้อนั้น

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

## Interactive Session Rule

เวลาเรียนแบบโต้ตอบ ให้เลือกวิธีลงมือตามทักษะเป้าหมายของบท ไม่บังคับให้ทุกบทเริ่มจากหน้าว่างเหมือนกัน

```text
อธิบาย Why และภาพจำ
-> ให้ตัวอย่างที่ copy/run/apply ได้
-> learner ส่งผลหรืออธิบายความเข้าใจกลับมา
-> AI อธิบายผลและเกลาคำตอบ
-> Knowledge Check
-> ค่อยเพิ่มความยาก
```

รูปแบบตามชนิดงาน:

```text
Git/command    = AI ให้ command -> learner รัน -> ส่ง output -> AI อธิบาย
เขียน code     = AI ให้ snippet เล็ก -> อธิบาย -> learner ทดลอง -> ส่งผล build/runtime
ออกแบบระบบ     = ออกแบบร่วมกัน -> learner ตอบ decision สำคัญ -> AI ร่าง artifact -> learner ตรวจความเข้าใจ
Knowledge Sync = Codex ร่าง docs -> Claude review/QA ตามข้อตกลงของโปรเจกต์
```

### Knowledge Check Format Rule

เมื่อใช้ Working Mode `teach` ให้ Knowledge Check เป็นคำถามแบบ 5 ตัวเลือก:

```text
A. ...
B. ...
C. ...
D. ...
E. ...
```

กติกา:

- มีคำตอบที่ดีที่สุดเพียงข้อเดียว
- ตัวลวงต้องสมเหตุสมผลและวัดความเข้าใจจริง ไม่ใช่ผิดแบบเห็นได้ทันที
- เพิ่มความยากได้เมื่อ learner ขอหรือเมื่อพื้นฐานแน่นแล้ว แต่ห้ามสร้างคำถามกำกวม
- learner ตอบเพียง A-E ได้ ไม่บังคับให้พิมพ์คำอธิบายยาว
- ถ้าตอบผิด ให้อธิบาย misconception แล้วถามใหม่ทีละจุดจนเข้าใจ
- ห้ามเปลี่ยนเป็นคำถามปลายเปิดเองเมื่อ learner กำหนดให้ใช้ตัวเลือก

### Incremental Code Teaching Rule

เมื่อ Working Mode เป็น `teach` และทักษะเป้าหมายคือการอ่านหรือเขียน core code ให้สอนประกอบ code ทีละส่วน แทนการส่งไฟล์ฉบับสำเร็จทั้งไฟล์ให้ learner วางทับในครั้งแรก

learner ไม่จำเป็นต้องส่งผลกลับหลังทุกส่วนย่อย ให้ทำหลายส่วนต่อเนื่องได้ แล้วส่ง code/output กลับเมื่อถึง checkpoint ที่มีความหมาย

คำสั่งแก้ code แต่ละส่วนต้องระบุ:

```text
ไฟล์       = กำลังแก้ไฟล์ใด
ตำแหน่ง    = อ้างด้วยโครงสร้างหรือบรรทัด code ที่มีอยู่จริง
ให้ทำ      = เพิ่ม / แทนที่ / ลบ / ย้าย
code       = snippet เฉพาะส่วนที่ต้องทำ
หน้าที่    = code ส่วนนี้รับผิดชอบอะไร
เหตุผล     = ทำไมต้องมี และทำไมวางตรงตำแหน่งนี้
ผลหลังทำ   = ตอนนี้ flow ทำอะไรได้แล้ว และยังขาดอะไร
```

กติกาตำแหน่ง:

- ไม่ใช้เลขบรรทัดเป็นหลัก เพราะเลื่อนทันทีเมื่อ code เปลี่ยน
- ใช้คำอ้างอิง เช่น `ภายใน catch() ใต้บรรทัด ...` หรือ `ใต้ import block ที่ลงท้ายด้วย ...`
- ถ้ามีบรรทัดเหมือนกันหลายจุด ให้แสดง surrounding code เพิ่มจนระบุตำแหน่งได้แน่นอน
- แยกให้ชัดว่าตำแหน่งนั้นจำเป็นเพราะ dependency/runtime order หรือเป็นเพียง convention เพื่อความอ่านง่าย

อย่าลงทะเบียนหรือรัน intermediate implementation ที่ยังไม่สามารถจบ request/flow ได้อย่างปลอดภัย ให้ประกอบจนถึง checkpoint ที่ทำงานสมบูรณ์ก่อน แล้วค่อย validate ตามผลกระทบจริง ไม่รัน validation ซ้ำทุก microstep

### Command Option Explanation Rule

ก่อนให้ learner รัน command ต้องอธิบาย option ที่ขึ้นต้นด้วย `-` หรือ `--` ทุกตัวในบริบทนั้นก่อน เช่น:

```text
--dry-run = แสดงสิ่งที่จะเกิดขึ้นโดยยังไม่เขียนไฟล์
--flat    = ไม่สร้างโฟลเดอร์ชื่อ artifact ซ้อนเพิ่ม
--no-spec = ไม่สร้างไฟล์ test จาก generator
-i        = ให้ curl แสดง response headers พร้อม body
```

ถ้า command ที่พิมพ์เรียก npm script ซึ่งซ่อน option สำคัญไว้ภายใน เช่น `--fix` ที่สามารถเขียนแก้ source file ต้องบอกผลของ option นั้นก่อนให้ learner รันด้วย

อย่าให้ learner สร้างไฟล์หรือ artifact จาก blank page เพียงเพื่อให้ดูเหมือนได้ลงมือ ถ้าการสร้างโครงนั้นไม่ใช่ทักษะเป้าหมายของบท

ก่อนสร้าง project artifact ต้องอธิบายว่าไฟล์นั้นจำเป็นต่อ step ปัจจุบันอย่างไร และแยกให้ชัดจาก reusable knowledge ที่ต้องกลับมาที่ Workspace Docs

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
- ความหมายแบบ technical ของหัวข้อนั้น
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
- tiny example ของหัวข้อนั้น
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

- ใช้ tiny snippet ที่ตรงกับหัวข้อนั้น
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

## File Map Rule

เมื่อบทเรียนต้องแนะนำไฟล์หรือโฟลเดอร์จำนวนมากพร้อมกัน เช่น Angular scaffold, SSR files, `tsconfig*.json`, `package.json`, `angular.json` ห้ามไล่ทีละไฟล์รวดเดียวแล้วถาม Knowledge Check ทันที

ให้ทำ File Map ก่อน:

- จัดไฟล์เป็นกลุ่มตามหน้าที่ เช่น docs, dependency, config, source, tooling, generated/cache/output
- ให้ one-liner ว่าแต่ละไฟล์หรือกลุ่มไฟล์คืออะไร
- แยกให้ชัดว่าไฟล์ไหนคือ source of truth และไฟล์ไหนเป็น generated/cache/output ที่สร้างใหม่ได้
- ค่อยถาม Knowledge Check ทีละกลุ่ม ไม่ถามรวบทุกไฟล์

เป้าหมายคือเช็กความเข้าใจ ไม่ใช่เช็กว่าผู้เรียนจำชื่อไฟล์จำนวนมากได้หมดในหัวหรือไม่ และลด cognitive load ตอนเจอ scaffold ที่มีไฟล์เยอะ

รูปแบบที่ควรใช้:

```text
แผนที่ก่อนตอบ:
package.json + package-lock.json = source of truth ของ dependency
package.json = npm scripts/dependencies
angular.json = Angular build/serve/test config
src/main.ts = browser entry
src/main.server.ts = server bootstrap
src/server.ts = Node/Express SSR server
node_modules = generated dependency folder
dist = generated build output
```

แล้วค่อยถาม:

```text
จากแผนที่นี้ ถ้า npm run build ต้องรู้ entry browser จากไฟล์ไหน
```

ถ้าผู้เรียนตอบไม่ได้เพราะไฟล์เยอะ ให้ย้อนกลับไปที่ file map ก่อน ไม่รีบสรุปว่าไม่เข้าใจ concept

## Progress Date Rule

เมื่อบทเรียนหรือ progress log บันทึกว่า step ไหนเรียนจบ, reviewed แล้ว, หรืออัปเดตล่าสุด ต้องเช็กวันที่ปัจจุบันก่อนเขียนทุกครั้ง

ในเอกสารที่ต้องอ่านย้อนหลัง ให้ใช้วันที่เต็ม เช่น:

```text
1 กรกฎาคม 2026
```

ไม่ใช้คำว่า "วันนี้" เป็นหลัก เพราะพอกลับมาอ่านทีหลังจะไม่รู้ว่าวันไหน

ถ้า lesson page เป็นความรู้ตาม topic ปกติ ไม่จำเป็นต้องใส่วันที่ในทุกหัวข้อ แต่ถ้ามี header/status ที่พูดถึงเวลา ต้องให้วันที่ตรงกับเหตุการณ์จริง

## VitePress Markdown Rule

- ห้ามใช้ placeholder แบบ `<...>` นอก code fence เพราะ VitePress/Vue จะมองเป็น HTML tag และอาจ build fail
- ให้ใช้ placeholder แบบ `[[...]]` แทน เช่น `[[ชื่อ Concept]]`, `[[คำถาม 1]]`
- ใน template ห้ามทำ markdown link ปลอมไปยังไฟล์ที่ยังไม่มีจริง เพราะ VitePress จะตรวจ dead link ตอน build ให้เขียนเป็น path ใน backtick ก่อน

## No Number Prefix Rule

**ห้ามใส่เลขนำหน้าชื่อไฟล์บทเรียน** (`teach/`, `concepts/`, `labs/`) เช่น `09-angular-22-baseline.md` — ใช้ **topic slug ล้วน** เช่น `angular-22-baseline.md`

เหตุผล:

- เลขในชื่อไฟล์สื่อว่า "นี่คือลำดับการอ่าน" แต่ลำดับเปลี่ยนได้ (เพิ่มบท/จัดใหม่) — ทุกครั้งที่เปลี่ยนต้อง rename ไฟล์ + ไล่แก้ทุก link ซ้ำ = เปราะ
- ลำดับการอ่านอยู่ที่ **presentation อย่างเดียว**: `angular/teach/index.md` (canonical) + sidebar ใน `.vitepress/config.mts` — จัดใหม่แก้แค่ 2 ที่นี้ ไม่ต้องแตะไฟล์/URL
- ชื่อไฟล์ = topic ID นิ่ง, URL ไม่เปลี่ยนเวลาจัดลำดับใหม่

กติกา:

- ตั้งชื่อไฟล์ตาม topic เป็น kebab-case ไม่มีเลข (`services-dependency-injection.md`)
- ลำดับการอ่านกำหนดใน index + sidebar เท่านั้น
- ถ้าอยากโชว์เลขลำดับให้ผู้เรียน ใส่ใน label ของ index/sidebar ได้ (`1 Angular 22 Baseline`) แต่ **ไม่ใส่ในชื่อไฟล์**
- ไฟล์เก่าที่ยังมีเลข (`nodejs/teach/`, `angular/labs/`) = ทยอย migrate เป็น slug ล้วนภายหลัง
