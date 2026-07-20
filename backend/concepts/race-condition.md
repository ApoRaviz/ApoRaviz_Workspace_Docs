# Race Condition คืออะไร

## ภาพจำง่าย ๆ

ลองนึกว่ามีบัตรเข้างานเหลือหนึ่งใบ แต่มีเคาน์เตอร์สองจุด:

```text
เคาน์เตอร์ A มอง: บัตรยังว่าง
เคาน์เตอร์ B มอง: บัตรยังว่าง
```

ถ้าทั้งคู่ตรวจแล้วแจกโดยไม่มีจังหวะตัดสินผู้ชนะ คนสองคนอาจได้สิทธิ์จากบัตรใบเดียวกัน

## แปลเป็นภาษาคนธรรมดา

Race condition คือปัญหาที่ผลลัพธ์ขึ้นกับว่า request หรืองานใดวิ่งถึงจุดสำคัญก่อน เมื่อหลายงานอ่านและเปลี่ยนข้อมูลเดียวกันใกล้ ๆ กัน

การตรวจว่า “ยังว่าง” ก่อน ไม่ได้รับประกันว่าตอนลงมือจริงข้อมูลจะยังว่างอยู่ เพราะงานอื่นอาจเปลี่ยนข้อมูลระหว่างสองจังหวะนั้น

## แปลเป็น Technical Term

Race condition เกิดเมื่อ concurrent operations เข้าถึง shared state และไม่มีการควบคุมที่รับประกันว่าการตรวจเงื่อนไขกับการเปลี่ยนสถานะเป็นงานเดียวกัน

```text
concurrent operations = งานหลายงานที่ช่วงเวลาทับซ้อนกัน
shared state          = ข้อมูลเดียวกันที่หลายงานอ่านหรือแก้
atomic operation      = งานที่มองจากภายนอกเหมือนเกิดเป็นก้อนเดียว แทรกกลางไม่ได้
```

## ตัวอย่างสั้นที่สุด

แบบที่เสี่ยง:

```text
1. SELECT ว่าสิทธิ์ยังว่างไหม
2. ถ้าว่าง ค่อย UPDATE ว่าใช้แล้ว
```

Request A และ B อาจผ่านข้อ 1 พร้อมกัน

แนวคิดที่ปลอดภัยกว่า:

```text
UPDATE เฉพาะ row ที่ยังว่าง
แล้วตรวจว่ามี row ถูก update จริงหรือไม่
```

## Flow เมื่อ Update Row เดียวกัน

1. Request A update row และได้ row-level lock
2. Request B ต้องรอ เพราะกำลังแตะ row เดียวกัน
3. ถ้า A commit สถานะใหม่จะถูกบันทึก
4. PostgreSQL ตรวจเงื่อนไขของ B ใหม่
5. ถ้า row ไม่ตรง `WHERE` แล้ว B จะ update ได้ 0 row
6. Backend ใช้ผล 0 row เป็นสัญญาณว่า request นี้ไม่ได้สิทธิ์

Row ไม่ได้หายไป เพียงแต่ไม่ตรงเงื่อนไขอีกแล้ว

## ทำไม Transaction ยังจำเป็น

Conditional update ป้องกัน shared row ถูกใช้ซ้ำ แต่ถ้า flow สร้างข้อมูลอื่นก่อน งานทั้งหมดต้องอยู่ใน transaction เดียวกันด้วย

```text
สร้าง record ใหม่
-> conditional update ไม่สำเร็จ
-> rollback record ที่เพิ่งสร้าง
```

ถ้าไม่มี transaction record ที่สร้างก่อนหน้าอาจหลงเหลือ แม้ request แพ้การแย่งสิทธิ์

## จุดที่มักงง

- JavaScript ทำงานทีละบรรทัดใน request หนึ่ง ไม่ได้แปลว่า server มี request เดียว
- การ `SELECT` ก่อน `UPDATE` ช่วยตัดสิน flow แต่ไม่ใช่ตัวรับประกัน concurrency
- Row-level lock ทำให้ผู้แก้ row เดียวกันรอคิว ไม่ได้แปลว่า database ทั้งก้อนถูกล็อก
- ถ้า request แรก rollback request ที่รออยู่อาจตรวจเงื่อนไขผ่านและทำต่อได้
- Unique constraint เป็นด่านสุดท้ายของ race ที่เกี่ยวกับค่าห้ามซ้ำ

## ศัพท์ที่เกี่ยวข้อง

- [Sequence Diagram](sequence-diagram.md)
- [Database Transaction](../../postgresql/concepts/database-transaction.md)
- [Unique Constraint](../../postgresql/concepts/unique-constraint.md)

## เช็กตัวเอง

- ทำไม request สองตัวจึงผ่านการตรวจว่า row ยังว่างพร้อมกันได้
- Conditional update ช่วยเลือกผู้ชนะอย่างไร
- ถ้าสร้าง record ก่อน update shared row เหตุใดจึงต้องมี transaction

## จำสั้น ๆ

```text
Race Condition = ผลขึ้นกับว่าใครมาถึงก่อน
เช็กก่อนอย่างเดียวไม่พอ
เขียนแบบมีเงื่อนไข + transaction = กันใช้ซ้ำและกันข้อมูลค้าง
```
