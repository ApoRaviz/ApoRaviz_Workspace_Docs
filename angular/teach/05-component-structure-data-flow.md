# Component Structure และ Data Flow

บทเรียนนี้สรุปวิธีแยก component และส่งข้อมูลใน Angular app

## ทำไมไม่ใส่ทุกอย่างไว้ใน app component

ตอนเริ่ม MVP การใส่ทุกอย่างใน `app.ts`, `app.html`, `app.css` ช่วยให้ขึ้นรูปเร็ว

แต่เมื่อระบบมีหลายส่วน เช่น nav, hero, POS, reward, LINE mock, modal, page data ถ้ายังรวมไว้ไฟล์เดียวจะเริ่มมีปัญหา:

- หา logic ยาก
- test ยาก
- component ทำหลายหน้าที่เกินไป
- แก้ UI จุดหนึ่งแล้วกระทบส่วนอื่นง่าย

## Container Component

Container component คือ component ที่ถือ state หรือ orchestrate flow

หน้าที่:

- ถือ state หลักของหน้า
- คำนวณ business logic หรือเรียก service
- ส่ง data ลง component ลูก
- รับ event จาก component ลูก

ตัวอย่าง concept:

```text
App/Page container
-> ส่ง customer, rewards, draftSale ลง child
<- รับ confirmSale, clearDraft, redeemReward จาก child
```

## Presentation Component

Presentation component เน้นแสดงผลและ emit event

หน้าที่:

- รับ data ผ่าน input
- แสดง UI
- emit event เมื่อผู้ใช้ทำ action
- ไม่ถือ business rule หลักมากเกินไป

## input() และ output()

Angular รุ่นใหม่ใช้ `input()` และ `output()` ได้

```ts
readonly customer = input.required<Customer>();
readonly confirmSale = output<void>();
```

ใน template:

```html
<button type="button" (click)="confirmSale.emit()">
  Confirm sale
</button>
```

หลักนี้เรียกว่า one-way data flow:

```text
parent ส่ง data ลง
child ส่ง event ขึ้น
```

## เมื่อไหร่ควรแยก component

ควรแยกเมื่อ:

- UI ส่วนนั้นมีหน้าที่ชัด
- HTML ยาวจนอ่าน flow ยาก
- ต้อง reuse
- ต้อง test แยก
- มี input/output ชัดเจน

ยังไม่ควรแยกเมื่อ:

- แยกแล้วต้องส่ง props จำนวนมากจนอ่านยาก
- ยังไม่รู้ responsibility ที่แท้จริง
- abstraction เพิ่มภาระมากกว่าลดความสับสน

## Folder Ownership

ใช้หลายหน้า:

```text
src/app/components/
```

ใช้เฉพาะ page เดียว:

```text
src/app/pages/<page>/components/<component-name>/
```

data ที่เป็น source ของ page:

```text
src/app/pages/<page>/<page-data>.ts
```

หลักคิด:

```text
วางไฟล์ใกล้ owner ที่สุดก่อน
ค่อยย้ายขึ้น shared เมื่อ reuse จริง
```

