# PostgreSQL Advisory Lock คืออะไร

## ภาพจำง่าย ๆ

ให้นึกถึงงาน cron ที่รันอยู่บน API 3 เครื่อง แต่มี “กุญแจห้องเก็บของ” เพียงดอกเดียว เครื่องที่หยิบกุญแจได้ทำ cleanup ส่วนเครื่องอื่นข้ามรอบนั้นไป จึงไม่ลบข้อมูลชุดเดียวกันซ้ำ

## แปลเป็นภาษาคนธรรมดา

Advisory lock คือกุญแจที่ application ตั้งชื่อด้วยตัวเลขเอง PostgreSQL ไม่ได้เดาว่า row ไหนต้องล็อกให้ เราใช้มันประสานงานข้าม process หรือหลาย replicas เช่น cleanup, reconciliation และ singleton background job

## Technical terms

```text
session-level lock     = ล็อกอยู่จนสั่ง unlock หรือ connection ปิด
transaction-level lock = ล็อกอยู่จน transaction จบ
blocking lock          = รอจนได้ล็อก
try lock               = ถ้าไม่ได้ล็อกให้ตอบ false ทันที
```

ฟังก์ชันที่ใช้บ่อย:

```sql
SELECT pg_try_advisory_lock(71001);
SELECT pg_advisory_unlock(71001);
SELECT pg_try_advisory_xact_lock(71001);
```

## Flow สำหรับ scheduled job หลาย replicas

1. แต่ละ replica ขอ `pg_try_advisory_lock` ด้วย key เดียวกัน
2. มีเพียง connection เดียวที่ได้ `true`
3. เจ้าของ lock ทำงานและบันทึกผลแบบ idempotent
4. สั่ง unlock ด้วย connection เดิมใน `finally`
5. คืน connection เข้า pool

## ตัวอย่าง Node.js กับ connection pool

```ts
const client = await pool.connect();
let acquired = false;

try {
  const result = await client.query(
    'SELECT pg_try_advisory_lock($1) AS acquired',
    [71001],
  );
  acquired = Boolean(result.rows[0]?.acquired);
  if (!acquired) return;

  await runCleanup();
} finally {
  if (acquired) {
    await client.query('SELECT pg_advisory_unlock($1)', [71001]);
  }
  client.release();
}
```

## จุดที่มักพลาด

- Session-level lock ผูกกับ database connection ไม่ได้ผูกกับ service object หรือ request
- ห้าม acquire ผ่าน pooled query หนึ่งครั้งแล้ว unlock ผ่าน pooled query อีกครั้ง เพราะ pool อาจเลือกคนละ connection ทำให้ lock เดิมค้าง
- ถ้างานครอบอยู่ใน database transaction สั้น ๆ ใช้ `pg_try_advisory_xact_lock`; lock จะปล่อยเองเมื่อ commit/rollback
- อย่าเปิด transaction ค้างระหว่างเรียก network ภายนอกนาน ๆ เพียงเพื่อถือ lock
- Lock ป้องกันงานซ้อน แต่ไม่ได้แทน idempotency; งานที่ retry ได้ยังต้องออกแบบให้ทำซ้ำอย่างปลอดภัย
- กำหนด key เป็นค่าคงที่และจด ownership ไม่ให้คนละ job ใช้เลขชนกันโดยไม่ตั้งใจ

## เช็กตัวเอง

1. เพราะเหตุใด session-level lock จึงต้อง unlock ด้วย connection เดิม?
2. เมื่อไรควรเลือก transaction-level lock?
3. Advisory lock ทำให้ไม่ต้องมี idempotency แล้วหรือไม่?

## จำสั้น ๆ

```text
Advisory lock = กุญแจประสานงานที่ application ตั้งชื่อเอง
session lock = connection เดิมตั้งแต่ lock ถึง unlock
transaction lock = ปล่อยเองเมื่อ transaction จบ
หลาย replicas = lock + idempotent job
```
