# Sequence Diagram คืออะไร

## ภาพจำง่าย ๆ

ลองนึกถึงแชตกลุ่มที่เรียงข้อความตามเวลา:

```text
ลูกค้า -> พนักงาน: สั่งอาหาร
พนักงาน -> ครัว: ส่งรายการอาหาร
ครัว -> พนักงาน: อาหารพร้อม
พนักงาน -> ลูกค้า: ส่งอาหาร
```

เราเห็นว่าใครคุยกับใคร อะไรเกิดก่อน และผลลัพธ์กลับมาทางไหน โดยไม่ต้องเห็นรายละเอียดว่าครัวทำอาหารทุกขั้นอย่างไร

## แปลเป็นภาษาคนธรรมดา

Sequence diagram คือภาพลำดับเหตุการณ์ของหนึ่ง flow ใช้ตอบคำถามว่า:

- ใครเริ่มเหตุการณ์
- มีส่วนใดของระบบเข้าร่วมบ้าง
- แต่ละส่วนส่งอะไรให้กัน
- เหตุการณ์ใดต้องเกิดก่อนหรือหลัง
- ถ้าสำเร็จกับล้มเหลวเดินคนละทางอย่างไร

## แปลเป็น Technical Term

Sequence diagram เป็น interaction diagram ที่แสดง message ระหว่าง actor และ participant ตามลำดับเวลา โดยเวลาไหลจากบนลงล่าง

```text
Actor       = คนหรือระบบภายนอกที่เริ่มเหตุการณ์
Participant = ส่วนที่ร่วมทำงาน
Lifeline    = เส้นเวลาของ participant
Message     = request หรืองานที่ส่งไป
Return      = ผลลัพธ์ที่ส่งกลับ
alt         = ทางแยกตามเงื่อนไข คล้าย if/else
```

## ตัวอย่างสั้นที่สุด

```text
User -> Frontend:
กดบันทึก

Frontend -> Backend:
POST /items

Backend -> Database:
INSERT item

Database --> Backend:
created item

Backend --> Frontend:
201 Created

Frontend --> User:
แสดงผลสำเร็จ
```

## Flow ทีละขั้น

1. เลือก use case เดียว เช่น login หรือสร้างรายการ
2. วาง actor และ participant ที่เกี่ยวข้องจากซ้ายไปขวา
3. เขียน happy path หรือทางสำเร็จก่อน
4. เติม validation, authentication และ database operation ตามลำดับจริง
5. เติมทางผิดพลาดด้วย `alt`
6. ตรวจว่าไม่ได้ตอบ success ก่อนงานสำคัญบันทึกสำเร็จ
7. แยก diagram หากหนึ่งภาพเริ่มมีหลาย use case ปนกันจนอ่านยาก

## ทำไมต้องวาดก่อนเขียน Code

Diagram ช่วยเห็นปัญหาที่ code อาจซ่อนไว้ เช่น:

```text
ตรวจสิทธิ์หลังทำงานไปแล้ว
เชื่อ owner id จาก request body
เรียก service ก่อน validate input
ตอบ success ก่อน database commit
มีหลายขั้นที่ควรสำเร็จหรือ rollback พร้อมกัน
```

API contract บอกว่า frontend/backend คุยกันด้วยข้อมูลอะไร ส่วน sequence diagram บอกว่าระบบนำข้อตกลงนั้นไปทำงานตามลำดับใด

## Happy Path กับ Error Path

Happy path คือเส้นทางที่ทุกอย่างสำเร็จ:

```text
authenticate -> validate -> process -> save -> respond
```

Error path คือทางที่ต้องหยุดเมื่อเงื่อนไขไม่ผ่าน:

```text
authentication fail -> 401 และหยุด
validation fail     -> 400 และหยุด
```

การหยุดทันทีเมื่อรู้ว่า request ไปต่อไม่ได้เรียกว่า fail fast ช่วยลดงานที่ไม่จำเป็นและไม่ปล่อยข้อมูลผิดไปยังขั้นถัดไป

## จุดที่มักงง

- Sequence diagram ไม่ใช่ database schema: schema แสดงโครงสร้างข้อมูล ส่วน sequence diagram แสดงลำดับเหตุการณ์
- Diagram เน้น responsibility และลำดับ ไม่จำเป็นต้องใส่ code หรือ SQL ทุกบรรทัด
- `alt` ไม่ได้แปลว่าทุก error ต้องบอกรายละเอียดแก่ client เพราะบางรายละเอียดอาจ leak sensitive state
- Diagram ใหญ่ภาพเดียวไม่จำเป็นต้องดีกว่า ควรแยกตาม use case เมื่ออ่านยาก
- Participant ภายในอาจเปลี่ยน implementation ได้โดยไม่เปลี่ยน public API contract

## ศัพท์ที่เกี่ยวข้อง

- [API Contract](api-contract.md)
- [Race Condition](race-condition.md)
- [Database Transaction](../../postgresql/concepts/database-transaction.md)
- [Backend Stack ของ ApoRaviz](../index.md)

## เช็กตัวเอง

- Sequence diagram ต่างจาก database schema อย่างไร
- ทำไม protected endpoint ควรตรวจ authentication ก่อนทำงานหลัก
- ถ้า validation ไม่ผ่าน participant ใดไม่ควรถูกเรียกต่อ
- เหตุใดบาง flow ควรแยกเป็นหลาย diagram

## จำสั้น ๆ

```text
Sequence Diagram = ใครคุยกับใคร และอะไรเกิดก่อนหลัง
เวลาไหลบนลงล่าง
วาด happy path ก่อน แล้วเติม alt ของ error path
```
