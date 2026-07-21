# Wireframe คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงการสร้างบ้าน:

```text
wireframe = แปลนว่าห้อง ประตู และเฟอร์นิเจอร์อยู่ตรงไหน
visual design = สีผนัง วัสดุ แสง และของตกแต่ง
code = การลงมือสร้างบ้านจริง
```

แปลนที่ดีไม่จำเป็นต้องสวย แต่ต้องทำให้รู้ว่าเดินเข้าไปแล้วใช้งานอย่างไร

## แปลเป็นภาษาคนธรรมดา

Wireframe คือแบบร่างโครงหน้าจอก่อนออกแบบหน้าตาจริงและก่อนเขียน code ใช้ตอบคำถามว่า:

- หน้านี้มีข้อมูลและปุ่มอะไร
- อะไรสำคัญและควรเห็นก่อน
- ผู้ใช้กดแล้วเกิดอะไรขึ้น
- ตอนว่าง, loading, success หรือ error แสดงอย่างไร
- จอกว้างและจอแคบจัดองค์ประกอบต่างกันอย่างไร

## แปลเป็น Technical Term

Low-fidelity wireframe คือ UI representation แบบรายละเอียดต่ำที่เน้น layout, information hierarchy, interaction และ screen state มากกว่าสี ภาพจริง หรือ typography ขั้นสุดท้าย

```text
layout                = การจัดตำแหน่งองค์ประกอบ
information hierarchy = การจัดลำดับว่าอะไรสำคัญกว่า
interaction           = สิ่งที่เกิดเมื่อผู้ใช้กดหรือเลือก
screen state          = สภาพของหน้าในแต่ละช่วง
responsive layout     = โครงที่ปรับตามความกว้างจอ
```

## ตัวอย่างสั้นที่สุด

```text
┌─────────────────────────────────────┐
│ App Name                    [Logout]│
├─────────────────────────────────────┤
│ ชื่องาน                              │
│ [_________________________________] │
│                         [สร้างงาน]   │
├─────────────────────────────────────┤
│ งานล่าสุด                            │
│ - งานที่ 1                           │
│ - งานที่ 2                           │
└─────────────────────────────────────┘
```

กล่องและเส้นบอกตำแหน่ง ไม่ได้บังคับว่าสี ฟอนต์ หรือระยะจริงต้องเป็นแบบนี้

## Flow ทีละขั้น

1. อ่าน product scope และ API contract ก่อน
2. ทำ screen map ว่ามีหน้า/state ใดบ้าง
3. เลือกงานหลักของแต่ละหน้า
4. จัด information hierarchy ให้งานหลักเด่นกว่างานรอง
5. วาด initial/happy state
6. เติม loading, empty, validation, error และ permission state
7. วาง desktop layout แล้วกำหนด mobile stacking/fallback
8. ตรวจว่าทุกปุ่มมี flow รองรับและไม่มี feature นอก scope

## Screen Map ก่อนวาด

Screen map ช่วยไม่ให้เริ่มจากกล่องจำนวนมากโดยยังไม่รู้ว่าต้องมีหน้าอะไร

```text
Public
├── Login
└── Register

Login required
├── Main Workspace
└── History
```

หลังเห็นภาพรวมจึงตัดสินใจได้ว่า History ควรเป็นหน้าแยกหรือรวมกับ Main Workspace

## Screen State สำคัญอย่างไร

หน้าจอไม่ได้อยู่ใน success state ตลอดเวลา:

```text
initial    = ยังไม่เริ่มทำงาน
typing     = user กำลังกรอกข้อมูล
invalid    = ข้อมูลไม่ผ่าน validation
loading    = request กำลังทำงาน
success    = ได้ผลลัพธ์แล้ว
empty      = request สำเร็จแต่ยังไม่มีรายการ
auth error = session/token ใช้ไม่ได้
```

ถ้าวาดเฉพาะ success state ตอนเขียน code มักพบทีหลังว่าไม่รู้จะวาง error หรือ loading ไว้ตรงไหน

## Wireframe กับ Sequence Diagram ต่างกันอย่างไร

```text
Wireframe       = ผู้ใช้เห็นอะไร อยู่ตรงไหน และกดอย่างไร
Sequence Diagram = ใครส่งอะไรให้ใคร และอะไรเกิดก่อนหลัง
```

ทั้งสองต้องสอดคล้องกัน เช่น wireframe ไม่ควรมีปุ่มที่ไม่มี API/flow รองรับ และ sequence diagram ที่มี validation error ควรมีพื้นที่แสดง error ใน wireframe

อ่านต่อ: [Sequence Diagram](../../backend/concepts/sequence-diagram.md)

## Motion ใน Wireframe

Wireframe ระบุ behavior ของ animation ได้โดยยังไม่ต้องเขียน CSS:

```text
เริ่มจาก state ใด
องค์ประกอบใดเคลื่อนที่
เคลื่อนไป state ใด
mobile ใช้ fallback แบบไหน
ถ้าปิด motion แล้วยังใช้งานได้หรือไม่
```

Animation ควรเป็น enhancement ไม่ใช่เงื่อนไขที่ทำให้ form หรือ navigation ใช้งานได้

## จุดที่มักงง

- Wireframe ไม่ใช่ mockup สวยสำเร็จ จึงยังไม่ต้องเลือกภาพ สี และฟอนต์จริง
- กล่องรูปภาพใน wireframe เป็น placeholder ได้
- Wireframe ไม่ใช่ sequence diagram: หนึ่งอย่างแสดงหน้าจอ อีกอย่างแสดงลำดับระบบ
- การรวมทุก feature ลงหน้าจอไม่ได้ทำให้ wireframe สมบูรณ์ขึ้น อาจเป็น scope creep
- Loading/error/empty state เป็นส่วนของ design ไม่ใช่รายละเอียดที่ค่อยคิดหลังเขียน code
- Mobile ไม่จำเป็นต้องย่อ desktop ตรง ๆ ควรกำหนดลำดับการเรียงใหม่

## ศัพท์ที่เกี่ยวข้อง

- [Sequence Diagram](../../backend/concepts/sequence-diagram.md)
- [API Contract](../../backend/concepts/api-contract.md)
- [Angular Concepts](index.md)

## เช็กตัวเอง

- Wireframe ช่วยตอบคำถามอะไรที่ sequence diagram ไม่ได้ตอบ
- ทำไมต้องวาด loading และ error state ก่อนเขียน component
- ถ้า API ยังไม่มี profile flow ควรใส่ Profile button ใน wireframe หรือไม่
- เหตุใด animation ต้องมี fallback ที่ไม่พึ่ง motion

## จำสั้น ๆ

```text
Wireframe = โครงหน้าจอก่อนความสวยและก่อน code
วางงานหลัก + interaction + ทุก state
ทุกปุ่มต้องมี flow รองรับ
```
