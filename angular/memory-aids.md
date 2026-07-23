# ภาพจำง่าย ๆ — Angular

หน้านี้รวมเฉพาะภาพจำสั้น ๆ สำหรับทบทวน Angular โดยไม่ต้องอ่านบทเต็ม

เมื่อเพิ่มภาพจำใหม่ในเนื้อหา Angular ให้เพิ่มสรุปและลิงก์กลับมาที่หน้านี้ด้วย

## [TypeScript](concepts/typescript.md)

```text
JavaScript = ของจริงที่ขึ้นเวทีและถูกรัน
TypeScript = ครูตรวจบทก่อนขึ้นเวที
```

## [Angular Run Flow](teach/angular-run-flow-and-angular-json.md)

```text
package.json  = ปุ่มสั่งงาน
Angular CLI   = คนรับคำสั่ง
angular.json  = คู่มือว่าปุ่มนั้นทำงานอย่างไร
src/main.ts   = ประตูเข้าแอปฝั่ง browser
app.config.ts = การตั้งค่าหลักของแอป
```

## [Angular Config Files](teach/angular-config-files.md)

```text
package.json          = กดปุ่มอะไร
angular.json          = ปุ่มนั้นทำงานอย่างไร
tsconfig*             = TypeScript อ่าน source แบบไหน
.postcssrc.json       = CSS ผ่าน plugin อะไร
.prettierrc           = code หน้าตาแบบไหน
.vscode/settings.json = editor ใช้เครื่องมืออะไร
```

## [Signal](concepts/signal.md)

```text
signal     = กล่องเก็บค่าหรือป้ายตัวเลขหน้าร้าน
template   = คนที่มองป้ายนั้นอยู่
set/update = พนักงานเปลี่ยนค่าบนป้าย
Angular    = คนที่ช่วยประกาศให้หน้าจอวาดใหม่
```

## [Computed](concepts/computed.md)

```text
signal   = กล่องเก็บค่าต้นทาง
computed = เครื่องคิดเลขที่คำนวณใหม่เมื่อค่าต้นทางเปลี่ยน
template = จุดที่นำคำตอบไปแสดง
```

## [Form Input Data Flow](concepts/form-input-data-flow.md)

```text
ช่องกรอกชื่อ = input
ชื่อที่จำไว้  = signal
ป้ายแสดงผล   = template

[value] = ส่งค่าจาก component ลง input
(input) = ส่ง event จาก input กลับ component
```

## [input() และ output()](concepts/input-output.md)

```text
input  = ของที่ parent ส่งเข้าไปให้ child
output = เสียงที่ child ส่งกลับไปบอก parent
```

## [inject()](concepts/inject.md)

```text
component/service
-> ยื่นมือขอเครื่องมือด้วย inject(SomeService)
-> Angular ส่ง instance ที่เตรียมไว้ให้
```

## [Environment Files](concepts/environment-files.md)

```text
development = ป้ายบอกทางไป API บน localhost
production  = ป้ายบอกทางไป API บน domain จริง
```

## [SSR Browser Guard](concepts/ssr-browser-guard.md)

```text
browser = มี window, document, localStorage
server  = ไม่มีของเหล่านี้

ก่อนหยิบเครื่องมือของ browser ต้องเช็กก่อนว่าอยู่ฝั่ง browser จริง
```

## [Hydration](concepts/hydration.md)

```text
SSR       = server จัดจานอาหารไว้ให้ก่อน
hydration = browser ทำให้จานนั้นกด ใช้ และโต้ตอบได้
```

## [ViewEncapsulation](concepts/view-encapsulation.md)

```text
Emulated = CSS อยู่ในรั้ว component เป็นหลัก
None     = CSS ไม่มีรั้วและกระทบทั้งหน้าได้
```

## [Wireframe](concepts/wireframe.md)

```text
wireframe     = แปลนห้อง ประตู และตำแหน่งเฟอร์นิเจอร์
visual design = สีผนัง วัสดุ แสง และของตกแต่ง
code          = การลงมือสร้างบ้านจริง
```
