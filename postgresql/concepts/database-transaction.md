# Database Transaction คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงการโอนเงิน:

```text
หักเงินจากบัญชี A
เพิ่มเงินให้บัญชี B
```

สองขั้นนี้ต้องสำเร็จด้วยกัน ถ้าหักเงินแล้วเพิ่มให้อีกบัญชีไม่สำเร็จ ระบบต้องย้อนการหักเงินด้วย

## แปลเป็นภาษาคนธรรมดา

Database transaction คือซองงานที่รวมหลายคำสั่งไว้เป็นชุดเดียว:

```text
สำเร็จครบทุกคำสั่ง -> ยืนยันทั้งชุด
มีคำสั่งใดผิดพลาด -> ย้อนทั้งชุด
```

จึงไม่เหลือข้อมูลครึ่งสำเร็จครึ่งล้มเหลว

## แปลเป็น Technical Term

Transaction คือหน่วยงานของ database ที่เริ่มด้วย `BEGIN` แล้วจบด้วย `COMMIT` หรือ `ROLLBACK`

```text
BEGIN    = เริ่มชุดงาน
COMMIT   = ยืนยันการเปลี่ยนแปลงทั้งหมด
ROLLBACK = ย้อนการเปลี่ยนแปลงทั้งหมดในชุดงาน
```

คุณสมบัติที่ว่า “สำเร็จทั้งหมดหรือไม่เปลี่ยนเลย” เรียกว่า atomicity

## ตัวอย่างสั้นที่สุด

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 'account_a';

UPDATE accounts
SET balance = balance + 100
WHERE id = 'account_b';

COMMIT;
```

ถ้าขั้นใดผิดพลาดให้ `ROLLBACK` แทน `COMMIT`

## Flow ทีละขั้น

1. Backend ขอ `BEGIN`
2. Database ทำแต่ละคำสั่งภายใน transaction
3. การเปลี่ยนแปลงยังไม่ถือว่าสำเร็จถาวรจนกว่าจะ commit
4. ถ้าทุกขั้นผ่าน backend ขอ `COMMIT`
5. ถ้ามีขั้นใดล้มเหลว backend ขอ `ROLLBACK`
6. หลัง rollback ข้อมูลกลับไปเหมือนก่อนเริ่ม transaction

## ใช้ร่วมกับ Conditional Update

สมมติ flow ต้องสร้าง record และใช้สิทธิ์ที่มีเพียงหนึ่งสิทธิ์:

```text
BEGIN
-> สร้าง record
-> UPDATE สิทธิ์เฉพาะเมื่อยังว่าง
-> update ได้ 1 row: COMMIT
-> update ได้ 0 row: ROLLBACK
```

Conditional update เลือกว่า request ใดได้สิทธิ์ ส่วน transaction รับประกันว่า request ที่ไม่ได้สิทธิ์จะไม่ทิ้ง record ครึ่งทางไว้

อ่านแนวคิดเรื่องหลาย request แย่งข้อมูลเดียวกันต่อที่ [Race Condition](../../backend/concepts/race-condition.md)

## จุดที่มักงง

- Transaction ไม่ได้ทำให้ทุก request สำเร็จ แต่ทำให้ผลของแต่ละชุดงานไม่ค้างครึ่งทาง
- `INSERT` ที่เกิดใน transaction อาจถูก rollback เหมือนไม่เคยเกิดขึ้น
- ห้ามตอบ success ก่อน commit เพราะ commit ยังอาจล้มเหลวได้
- Transaction ใน database ไม่ใช่ transaction ที่แปลว่า “รายการซื้อ” แม้ใช้คำเดียวกัน
- Transaction ควรครอบเฉพาะงานที่ต้องสำเร็จเป็นชุดเดียว ไม่ควรเปิดค้างโดยไม่มีเหตุผล

## ศัพท์ที่เกี่ยวข้อง

- [Race Condition](../../backend/concepts/race-condition.md)
- [Unique Constraint](unique-constraint.md)
- [Foreign Key](foreign-key.md)
- [PostgreSQL Learning Hub](../index.md)

## เช็กตัวเอง

- `COMMIT` กับ `ROLLBACK` ต่างกันอย่างไร
- ถ้าสร้าง record สำเร็จ แต่ขั้นใช้สิทธิ์ล้มเหลว transaction ควรทำอะไร
- ทำไม backend ไม่ควรตอบ success ก่อน commit

## จำสั้น ๆ

```text
Transaction = ซองงานหลายคำสั่ง
COMMIT = ยืนยันทั้งซอง
ROLLBACK = ย้อนทั้งซอง
```
