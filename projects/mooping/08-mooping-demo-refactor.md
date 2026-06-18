# 08 MooPing Demo Refactor

บทนี้สรุปวิธีคิดตอน refactor demo ของ `ApoRaviz_Mooping`: เมื่อไหร่ควรแยกไฟล์ เมื่อไหร่ยังไม่ควรเพิ่ม abstraction และทำอย่างไรให้ flow หน้าร้านอ่านง่ายขึ้น

## Refactor คืออะไร

Refactor คือการปรับโครงสร้าง code โดยไม่เปลี่ยนพฤติกรรมหลักของระบบ

เป้าหมายคือทำให้ code:

- อ่านง่ายขึ้น
- test ง่ายขึ้น
- แก้จุดหนึ่งแล้วไม่กระทบทั้งหน้า
- คนอื่นเข้าใจ intent ได้เร็ว

## สัญญาณว่าเริ่มควรแยก Component

พิจารณาแยก component เมื่อ:

- HTML ยาวจนหา section ยาก
- state หลายชุดปนกัน
- UI ส่วนหนึ่งมีหน้าที่เฉพาะ
- ต้อง reuse layout หรือ behavior
- test หรือ debug เริ่มยาก

ใน MooPing Reward สัญญาณเหล่านี้เกิดเมื่อหน้าเริ่มมีทั้ง:

```text
hero
iPad display
POS
reward choice
LINE OA mock
```

## Refactor ที่ดีควรทำทีละชั้น

ลำดับที่ดี:

```text
1. ทำ feature ให้ flow ถูกก่อน
2. ตั้งชื่อ model/type ให้ชัด
3. แยก presentation components
4. ย้าย layout/style ทั่วไปไปใช้ Tailwind utility classes
5. เก็บ CSS เฉพาะ animation หรือ visual effect ที่จำเป็นจริง
6. ค่อยพิจารณา service เมื่อ state/business action เริ่มถูกใช้ร่วมกัน หรือเริ่มเตรียมต่อ data source จริง
7. เพิ่ม tests กัน regression
```

ถ้าแยก service เร็วเกินไป อาจได้ abstraction ที่ไม่ตรงกับปัญหา

## จุดที่ MooPing ถึงเวลามี Store Service

ช่วงแรก `App` เป็น container ที่เหมาะสม เพราะ flow ยังเล็กและกำลังค้นหา product direction

หลังจากเพิ่ม Quick Sale, Member Sale, reward claim, undo, customer search และ LINE message state แล้ว `App` ต้องรับผิดชอบหลายเรื่องพร้อมกัน:

```text
App
├─ UI composition
├─ customer state
├─ pending sale state
├─ reward calculation
├─ confirm/undo actions
└─ message history
```

จุดนี้ service เริ่มลดความสับสนได้จริง จึงแยกเป็น:

```text
App
└─ composition + event forwarding

LoyaltyStoreService
└─ shared state + business actions

reward-calculation.ts
└─ pure calculation ที่ไม่ผูกกับ Angular/UI
```

ผลที่ได้:

- `App` อ่านแล้วเห็นโครงหน้าจอและ event wiring
- business state อยู่จุดเดียว
- pure helper test กรณี 9, 10, 20 และ 7 + 5 ไม้ได้ตรง ๆ
- เตรียมแยก mock repository และ HTTP adapter ได้ง่ายขึ้น

จากนั้นแยก presentation ตาม flow:

```text
PosPanelComponent
├─ shared quantity/confirm/undo controls
├─ QuickSalePanelComponent
└─ MemberSalePanelComponent

App
├─ ShiftStatusPanelComponent
├─ PosPanelComponent
├─ DisplayPanelComponent
├─ RewardPanelComponent
└─ LinePanelComponent
```

เหตุผลที่ไม่แยกปุ่มจำนวนและยืนยันซ้ำเข้าไปทั้งสอง panel คือทั้ง Quick Sale และ Member Sale ใช้ interaction ชุดเดียวกัน ต่างกันเฉพาะ customer context และคำอธิบาย flow การแยกแบบนี้จึงลด duplication มากกว่าการสร้างสองหน้าที่เหมือนกันเกือบทั้งหมด

`ShiftStatusPanelComponent` รับค่าที่คำนวณเสร็จแล้วจาก parent เช่น mode, status label และ progress message โดยไม่ inject store เอง ทำให้ presentation component ไม่รู้ว่า state มาจาก mock data, local storage หรือ backend

## Repository Contract ก่อนต่อ Backend

เมื่อ store ยังถือ mock customer array เอง store จะรู้ทั้ง business flow และรู้ว่าข้อมูลถูกสร้างจากที่ไหน

จึงเพิ่ม boundary:

```text
LoyaltyStoreService
        |
        v
CustomerRepository contract
        |
        v
MockCustomerRepository
```

store อ่าน `customers` และขอให้ repository อัปเดตข้อมูลผ่าน contract เดียว ภายหลังสามารถเปลี่ยน provider เป็น HTTP/NestJS adapter ได้โดย component และ store action ไม่ต้องรู้ URL หรือรูปแบบ transport

ใน Angular interface ของ TypeScript ไม่มีตัวตนตอน runtime จึงใช้ `InjectionToken<CustomerRepository>` เป็น token สำหรับ Dependency Injection

## SSR-safe Prototype Persistence

Mock repository สามารถเก็บ customer state ใน `localStorage` เพื่อให้ refresh แล้วข้อมูลทดลองไม่หาย แต่ต้อง guard ก่อนใช้ browser API:

```text
browser -> อ่าน/เขียน localStorage
SSR     -> ใช้ initial mock data และไม่แตะ window
```

ข้อมูลที่เก็บต้องเป็นข้อมูล prototype ที่ไม่มี secret เท่านั้น และต้อง validate JSON ก่อนนำกลับเข้า state เพราะ localStorage อาจเก่าหรือถูกแก้จาก DevTools

ปุ่ม reset ควรคืนทั้ง repository data และ transient store state เช่น pending sale, selected mode, reward credits และ undo history เพื่อไม่ให้ state คนละส่วนขัดกัน

## ทำไมไม่ควรปล่อย app.css ใหญ่เกินไป

ตอน prototype อาจรวม style ไว้ที่ `app.css` เพื่อเห็นภาพเร็ว

แต่เมื่อโปรเจกต์มี `pos-panel`, `display-panel`, `reward-panel` และ `line-panel` แล้ว style ควรมี owner ชัดขึ้น:

- layout และ spacing ทั่วไป ใช้ Tailwind ใน template
- theme token ใช้ `src/styles.css` ผ่าน `@theme`
- animation เฉพาะจอ เช่น grill/stamp pulse อยู่ใน component CSS ได้
- `app.css` เหลือไว้เป็น host token และ selector กลางที่จำเป็นกับ Angular component เท่านั้น

แนวนี้ทำให้คนอ่านรู้ว่า HTML บอกโครงหน้าจอ, TypeScript บอก state/logic และ CSS ที่เหลือมีเหตุผลเฉพาะ

## ทำไม TypeScript Models สำคัญ

ไฟล์ model เช่น:

```text
src/app/models/loyalty.models.ts
```

ช่วยบอกว่า object หลักในระบบหน้าตาเป็นอย่างไร

ตัวอย่าง concept:

```ts
export interface Customer {
  id: number;
  name: string;
  sticks: number;
  pendingRewards: number;
  savedRewards: number;
}
```

ข้อดี:

- component เห็น contract เดียวกัน
- typo ถูกจับได้เร็วขึ้น
- test อ่านง่าย
- เวลาเพิ่ม backend จะ map data ได้ชัดขึ้น

## อย่าให้ Component ลูกถือ Business Logic มากเกินไป

component ลูกควร emit event เช่น:

```text
confirmSale
clearDraft
redeemReward
saveRewardForLater
```

ส่วนการคำนวณว่า reward เพิ่มเท่าไร หรือ state ต้องเปลี่ยนอย่างไร ควรอยู่ใน container หรือ service

เหตุผลหลัก:

- business logic อยู่จุดเดียว
- ลดการคำนวณซ้ำ
- test ง่าย
- เปลี่ยน UI ได้โดยไม่ต้องเปลี่ยนกฎธุรกิจ

## สิ่งที่ควรเรียนจากไฟล์นี้

refactor ที่ดีทำให้ intent ของระบบชัดขึ้น

จำง่าย:

```text
แยกตาม responsibility ไม่ใช่แยกเพราะไฟล์ยาวอย่างเดียว
เพิ่ม abstraction เมื่อมันลดความสับสนจริง
```
