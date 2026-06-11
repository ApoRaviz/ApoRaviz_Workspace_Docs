# 06 POS Error Prevention และ Correction Flow

บทนี้อธิบาย UX ของ POS หน้าร้าน โดยเน้นการป้องกันการกดผิดและการแก้ไขรายการ

## ทำไม POS ต้องคิดเรื่อง error ก่อน

หน้าร้านจริงมีความเร่ง:

- ลูกค้ารอคิว
- พนักงานต้องรับเงิน
- ต้องหยิบสินค้า
- ต้องคุยกับลูกค้า
- อาจกดจอ iPad ด้วยมือที่ไม่สะดวก

error จึงไม่ใช่เรื่องผิดปกติ แต่เป็นสิ่งที่ design ต้องรองรับตั้งแต่แรก

## Prevention กับ Correction ต่างกันยังไง

`Prevention` คือป้องกันไม่ให้พลาดตั้งแต่แรก

ตัวอย่าง:

```text
กดจำนวนแล้วต้อง confirm ก่อนบันทึก
แสดง preview ว่าจะบวกกี่ไม้
ปุ่มสำคัญมีข้อความชัด
```

`Correction` คือถ้าพลาดแล้วต้องแก้ได้เร็ว

ตัวอย่าง:

```text
clear draft
undo latest sale
แสดงรายการล่าสุดให้ตรวจสอบ
```

ระบบ POS ควรมีทั้งสองแบบ

## Confirm ก่อน Commit

หลักคิด:

```text
การแตะเลือกจำนวนยังเป็น draft
การกดยืนยันจึงเป็น commit
```

flow:

```text
tap amount
→ pendingSticks เพิ่ม
→ preview เปลี่ยน
→ confirm sale
→ customer state ถูก update
```

ข้อดี:

- ลดการบันทึกผิด
- พนักงานมีจังหวะตรวจ
- ลูกค้าเห็นยอดก่อน commit
- test business logic ได้ชัด

## Undo latest sale ควรเก็บข้อมูลอะไร

การ undo ต้องมี snapshot ของ state ก่อนรายการล่าสุด

ข้อมูลที่ควรมี:

```text
customerId
sticksBefore
pendingRewardsBefore
savedRewardsBefore
totalPurchasedBefore
saleAmount
createdAt
```

ถ้าเก็บแค่จำนวนไม้ที่เพิ่ม อาจ undo ไม่ครบ เพราะรายการขายหนึ่งครั้งอาจสร้าง reward และเปลี่ยนหลาย state พร้อมกัน

## Clear draft ต่างจาก Undo

`Clear draft` ใช้ก่อนยืนยัน:

```text
ล้างจำนวนที่กำลังเลือก แต่ยังไม่เคยกระทบข้อมูลลูกค้า
```

`Undo latest sale` ใช้หลังยืนยัน:

```text
ย้อนรายการที่บันทึกแล้ว และต้องคืน state ให้ถูก
```

การแยกสองคำนี้ทำให้ UX ชัดและลดความสับสนของพนักงาน

## Button Hierarchy สำคัญอย่างไร

ปุ่มใน POS ควรมีลำดับความสำคัญ:

- primary: ยืนยันรายการ
- secondary: เก็บสิทธิ์หรือ action ที่ไม่อันตราย
- destructive/quiet: ล้าง draft หรือ undo

ถ้าทุกปุ่มเด่นเท่ากัน พนักงานจะตัดสินใจช้าหรือกดผิดง่ายขึ้น

## สิ่งที่ควรเรียนจากไฟล์นี้

UX ของ POS ไม่ใช่แค่ปุ่มใหญ่ แต่คือ flow ที่ยอมรับว่าคนพลาดได้ และช่วยแก้โดยไม่ทำลายข้อมูล
