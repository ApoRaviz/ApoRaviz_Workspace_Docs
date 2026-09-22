# ORM และการเข้าถึงฐานข้อมูล

## เรียนเรื่องนี้เพื่ออะไร

เมื่อ backend ต้องอ่านหรือบันทึกข้อมูล เราเขียน SQL เองได้ แต่จะมีงานซ้ำ เช่น จับคู่ชื่อ column กับ property และจัดรูปผลลัพธ์ บทนี้อธิบายตัวช่วยเหล่านั้นก่อนเลือกหรือติดตั้ง ORM

พื้นฐานที่ใช้: [PostgreSQL, table, row และ Docker](postgresql-first-run-with-docker.md)

## ภาพจำง่าย ๆ

PostgreSQL เหมือนโกดังข้อมูล ส่วน backend เป็นผู้ขอใช้ข้อมูล ORM เหมือนผู้ช่วยแปลงคำขอที่เขียนในภาษาโปรแกรมเป็นคำสั่งฐานข้อมูล แล้วจัดผลที่ได้ให้ code ใช้ต่อ

ORM ย่อจาก **Object-Relational Mapping**:

- Object = กลุ่มข้อมูลใน code เช่น `{ id: 10, inputText: 'Hello' }`
- Relational = รูปแบบฐานข้อมูลที่ใช้ตารางและความสัมพันธ์
- Mapping = กฎจับคู่ว่าข้อมูลใน code ตรงกับตารางหรือ column ใด

| ฝั่ง code | ฝั่ง PostgreSQL |
|---|---|
| แบบจำลอง Translation | ตาราง translations |
| property inputText | column input_text |
| object หนึ่งรายการ | row หนึ่งแถว เมื่ออ่านหรือบันทึกข้อมูลแล้ว |

ชื่อ `inputText` กับ `input_text` จะตรงกันได้เมื่อกำหนด mapping ให้ ORM ไม่ใช่ PostgreSQL เปลี่ยนชื่อให้เอง

## ผู้ทำงานและศัพท์ที่ใช้

| ผู้ทำงาน | หน้าที่ |
|---|---|
| Service | ตัดสินกฎของระบบ เช่น ผู้ใช้มีสิทธิ์ดูข้อมูลหรือไม่ |
| Entity / Model | อธิบายรูปแบบข้อมูลและการจับคู่กับฐานข้อมูล |
| Repository | ตัวเข้าถึงข้อมูลของ Entity เช่น ค้นหาและบันทึก |
| DataSource ของ TypeORM | ดูแลการเชื่อมต่อและรู้จัก Entity ที่ลงทะเบียนไว้ |
| Database Driver | library ที่สื่อสารตามรูปแบบของ PostgreSQL |
| TypeOrmModule | ตัวเชื่อม TypeORM เข้ากับ Module และ DI ของ NestJS |
| PostgreSQL | ทำคำสั่ง เก็บข้อมูล และบังคับกฎระดับฐานข้อมูล |

DI คือการประกาศว่าต้องการของอะไร แล้วให้ NestJS จัดหามาให้ อ่านทวน [Dependency Injection](../../nestjs/concepts/dependency-injection.md) และ [Module](../../nestjs/concepts/module.md)

Repository ของ TypeORM เป็นส่วนหนึ่งของ ORM ไม่ใช่โปรแกรมฐานข้อมูลอีกตัวหนึ่ง ส่วน Prisma ใช้ client API ของตัวเอง ไม่จำเป็นต้องมี class ชื่อ Repository

## Flow ทีละขั้น

1. Angular ส่ง HTTP request ไป NestJS
2. Controller รับ request และเรียก Service
3. Service ตรวจ business rule แล้วขอข้อมูลผ่าน Repository/ORM
4. ORM ใช้ mapping สร้าง SQL และส่งผ่าน Driver บนการเชื่อมต่อที่ตั้งไว้
5. PostgreSQL ทำคำสั่งและส่งผลกลับ
6. ORM จัดผลเป็น object ให้ Service ใช้งาน แล้วส่ง response กลับ Angular

กฎความเป็นเจ้าของข้อมูลอาจแสดงเป็นเงื่อนไขค้นหาด้วย เช่น ค้นหาด้วยทั้ง id และ userId; Service ยังคงเป็นผู้กำหนดกฎ ไม่จำเป็นต้องโหลดข้อมูลทุกอย่างแล้วตรวจภายหลังเสมอ

## ตัวอย่างเล็กที่สุด

`findOne` หมายถึงค้นหาหนึ่งรายการ และ `where` คือเงื่อนไข ตัวอย่าง API แบบ TypeORM นี้สมมติว่าตั้งค่า Repository และมีตารางแล้ว ใช้อ่านแนวคิด ไม่ใช่ไฟล์พร้อมรัน:

```ts
translationRepository.findOne({
  where: { id: 10 },
});
```

- `translationRepository` = ตัวเข้าถึงข้อมูล Translation
- `findOne(...)` = เริ่มงานค้นหาหนึ่งรายการ โดยผลกลับมาแบบ Promise ซึ่งต้องรอผลก่อนใช้
- `where: { id: 10 }` = จำกัดข้อมูลที่ id เท่ากับ 10

SQL เชิงแนวคิดที่สอดคล้องกัน (SQL จริงอาจมีชื่ออ้างอิงหรือ field เพิ่ม):

```sql
SELECT id, input_text FROM translations WHERE id = $1;
```

`SELECT` เลือกข้อมูล, `FROM` ระบุตาราง, `WHERE` กำหนดเงื่อนไข และ `$1` เป็นตำแหน่งค่าข้อมูลตัวแรก ซึ่งส่งแยกเป็นค่า 10

## สร้าง Object ยังไม่เท่ากับบันทึก

```ts
const translation = {
  inputText: 'Hello',
};
```

`const` ประกาศตัวแปรที่ไม่เปลี่ยนไปอ้าง object อื่น; `{ ... }` สร้าง object และ `inputText` เป็น property ที่มีค่า `'Hello'`

ข้อมูลนี้อยู่ในหน่วยความจำของโปรแกรม หรือ **memory** เท่านั้น ยังไม่มีการส่งคำสั่งเพิ่มแถว (`INSERT`) ไป PostgreSQL

การเก็บข้อมูลให้อยู่ต่อหลังโปรแกรมหยุดเรียกว่า **persistence** ต้องสั่งบันทึกและตรวจผลสำเร็จด้วย สำหรับ PostgreSQL ใน Docker named volume ช่วยเก็บไฟล์ฐานข้อมูลข้ามการสร้าง container ใหม่ แต่ไม่ได้เก็บตัวแปรของ NestJS ให้อัตโนมัติ

การเขียน Entity ก็ยังไม่สร้างตารางจริงทันที การนำโครงสร้างไปใช้กับฐานข้อมูลต้องมีขั้นตอนต่างหาก เช่น **migration** หรือประวัติการเปลี่ยนโครงสร้างฐานข้อมูล ซึ่งเรียนแยกจากบทนี้

## SQL Injection และ Parameterized Query

ภาพจำ: เตรียมแบบฟอร์มคำสั่งไว้ แล้วให้ผู้ใช้เติมเฉพาะช่องข้อมูล อย่านำข้อความผู้ใช้ไปเขียนรวมเป็นคำสั่ง

**SQL Injection** คือการที่ข้อความจากภายนอกถูกตีความเป็นส่วนหนึ่งของ SQL จนเปลี่ยนความหมายของคำสั่ง ตัวอย่างที่เสี่ยง:

```ts
"SELECT id FROM users WHERE email = '" + email + "'"
```

เครื่องหมาย `+` ต่อค่า email เข้าข้อความคำสั่งโดยตรง ส่งข้อความนี้ผ่าน ORM ก็ยังเสี่ยง

**Parameterized Query** แยกโครงสร้างคำสั่งออกจากค่าข้อมูล:

```text
คำสั่ง: SELECT id FROM users WHERE email = $1;
ค่า:    hello@example.com
```

`$1` เป็นช่องรับค่าตัวแรก Driver ส่งค่าต่างหากเพื่อให้ฐานข้อมูลใช้เป็นข้อมูล ORM API สำหรับเงื่อนไขค่าทั่วไปช่วยทำส่วนนี้ แต่ raw SQL ที่ต่อข้อความเองยังเสี่ยง ค่าพารามิเตอร์ใช้แทนข้อมูล ไม่ได้ใช้แทนชื่อตารางหรือคำสั่ง SQL ได้ทุกตำแหน่ง

## TypeORM กับ Prisma แบบสั้น

TypeORM นิยมประกาศ Entity ด้วย TypeScript class และป้ายกำกับหน้าที่ที่เรียกว่า decorator แล้วใช้ Repository อ่านเขียนข้อมูล NestJS มี `@nestjs/typeorm` ช่วยลงทะเบียนและให้ Service ขอ Repository ผ่าน DI

Prisma ใช้พิมพ์เขียวข้อมูล หรือ schema เป็นจุดเริ่มต้น ตัวอย่างต่อไปนี้อิง **Prisma 7** เพื่อไม่ผสม workflow ข้ามรุ่น:

- Prisma Schema = นิยาม Model, field และความสัมพันธ์
- Prisma Client = API พร้อมชนิดข้อมูลที่สร้างจาก schema
- Prisma Migrate = เครื่องมือบันทึกและใช้การเปลี่ยนโครงสร้างฐานข้อมูล
- Prisma Studio = หน้าจอสำหรับดูและแก้ข้อมูล

`model` ระบุแบบจำลอง, `Int` คือจำนวนเต็ม, `String` คือข้อความ, `@id` ระบุ [Primary Key](../concepts/primary-key.md), `@map` จับคู่ชื่อ field กับ column:

```prisma
model Translation {
  id        Int    @id
  inputText String @map("input_text")
}
```

ตัวอย่างขอข้อมูลด้วย Prisma 7 Client:

```ts
prisma.translation.findUnique({
  where: { id: 10 },
});
```

`prisma.translation` เข้าถึง Model, `findUnique` ค้นหาด้วยค่าที่ไม่ซ้ำ, `where` ระบุเงื่อนไข โดยยังต้องรอ Promise เพื่อรับผล เช่นเดียวกับตัวอย่าง TypeORM

ทั้งสองใช้กับ NestJS/PostgreSQL ได้ PrismaService สามารถลงทะเบียนเป็น provider และใช้ DI ได้เช่นกัน การเลือก TypeORM จึงเป็นเรื่องรูปแบบงานและการเรียน ไม่ใช่ว่า Prisma ใช้ DI ไม่ได้ ก่อนติดตั้งจริงต้องตรวจ version compatibility จาก package ของโปรเจกต์

## ข้อดี ข้อจำกัด และจุดที่มักงง

- ORM ลดงานซ้ำในการอ่านเขียนและแปลงผล แต่ไม่ได้แทน PostgreSQL
- SQL ยังมีอยู่ ต้องอ่านได้เมื่อตรวจคำสั่งซับซ้อนหรือหาสาเหตุที่ช้า
- ORM ไม่ได้รับประกันว่า query เร็วกว่า SQL ที่เขียนเอง
- ใช้ ORM ไม่ได้แปลว่าต้องกระจาย SQL ไปทุก Service หรือห้ามใช้ SQL เอง
- Entity อธิบาย mapping; DataSource ดูแลการเชื่อมต่อ; port เป็นค่าการเชื่อมต่อ ไม่ใช่ mapping ของ column
- NestJS บน Host ใช้ published Host port ส่วน port ภายใน PostgreSQL container อาจเป็นคนละเลข
- ติดตั้ง ORM, เชื่อมต่อสำเร็จ, สร้างตาราง และบันทึกสำเร็จ เป็นหลักฐานคนละอย่าง

## ลองทำเอง

อ่าน object ตัวอย่างแล้วชี้ว่า inputText อยู่ใน memory หรือ PostgreSQL จากนั้นไล่ flow ว่าต้องผ่านใครบ้างจึงจะบันทึกได้ แบบฝึกหัดนี้ฝึกอธิบายจาก code ไม่ต้องสร้างตารางหรือติดตั้ง package

## เช็กตัวเอง

1. Service, Entity, Repository, DataSource และ Driver แบ่งหน้าที่กันอย่างไร?
2. ส่ง SQL ที่ต่อข้อความผู้ใช้แล้วผ่าน ORM เพียงอย่างเดียวปลอดภัยหรือไม่ เพราะอะไร?
3. ถ้าสร้าง object แต่ไม่สั่งบันทึก แล้วโปรแกรมหยุด PostgreSQL จะมีแถวใหม่หรือไม่?

## จำสั้น ๆ

```text
ORM = ช่วยจับคู่ข้อมูลและสร้างคำสั่ง
Object ใน memory = ยังไม่ใช่ข้อมูลที่บันทึกแล้ว
Parameterized Query = แยกคำสั่งออกจากค่าข้อมูล
```

## อ้างอิงทางการ

- [NestJS Database integration](https://docs.nestjs.com/techniques/database)
- [TypeORM Entities](https://typeorm.io/docs/entity/entities/)
- [TypeORM Repository](https://typeorm.io/docs/working-with-entity-manager/working-with-repository/)
- [TypeORM Repository API และ raw query parameters](https://typeorm.io/docs/working-with-entity-manager/repository-api/)
- [Prisma ORM 7](https://www.prisma.io/docs/orm/v7)
