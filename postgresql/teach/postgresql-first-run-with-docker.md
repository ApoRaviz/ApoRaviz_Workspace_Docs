# PostgreSQL ครั้งแรกผ่าน Docker

บทนี้ปูพื้นว่า database และ PostgreSQL อยู่ตรงไหนในระบบ แล้วพารัน PostgreSQL ผ่าน Docker โดยแยกหน้าที่ของ image, container, volume, port, `psql` และ pgAdmin

## เรียนเรื่องนี้เพื่ออะไร

Angular แสดงหน้าจอและ NestJS รับ request แต่ข้อมูลที่ต้องอยู่ข้ามการปิดโปรแกรมต้องมีที่เก็บระยะยาว

```text
ผู้ใช้
→ Angular
→ NestJS
→ PostgreSQL
→ response กลับทางเดิม
```

Angular ไม่ควรเชื่อม PostgreSQL โดยตรง เพราะจะต้องเปิด credential และสิทธิ์ฐานข้อมูลให้ browser เห็น NestJS จึงเป็นผู้ตรวจ input และ business rule ก่อนคุยกับ database

## ภาพจำ Database

Database คือที่เก็บข้อมูลที่มีระบบช่วยค้นหา แก้ไข และควบคุมความถูกต้อง ไม่ใช่เพียงไฟล์ข้อความหนึ่งไฟล์

Relational database จัดข้อมูลเป็นตารางและเชื่อมความสัมพันธ์ระหว่างตาราง:

```text
table  = ตารางหนึ่งเรื่อง
row    = ข้อมูลหนึ่งรายการ
column = คุณสมบัติหนึ่งช่องของทุกรายการ
```

ตัวอย่าง:

| id | message |
|---:|---|
| 1 | Hello |

- `messages` คือ table
- แถว `1, Hello` คือ row
- `id` และ `message` คือ columns

PostgreSQL คือโปรแกรม relational database ที่ทำหน้าที่เป็น database server: เปิดรอ connection, ตรวจ user/password, รับ SQL แล้วอ่านหรือเขียน data files

```text
Client เช่น NestJS, pgAdmin, psql
→ PostgreSQL server
→ PostgreSQL data files
```

data files ของ PostgreSQL เป็นไฟล์ภายในหลายไฟล์ ไม่ใช่ไฟล์ `.sql` หนึ่งไฟล์ ส่วน `.sql` มักเป็นข้อความคำสั่งหรือ logical dump ที่มนุษย์อ่านได้

## Docker ช่วยตรงไหน

Docker ช่วยเปิด PostgreSQL ใน Linux container โดยไม่ต้องติดตั้ง PostgreSQL server ลง Windows โดยตรง

```text
postgres:17-alpine image = ต้นแบบ
PostgreSQL container     = server ที่เปิดทำงาน
named volume             = พื้นที่เก็บ data files ให้รอดจากการเปลี่ยน container
```

อ่านพื้นฐานเพิ่มที่ [Docker พื้นฐานสำหรับ Local Development](../../docker/)

## สร้าง PostgreSQL ครั้งแรก

ตัวอย่าง local lab:

```bash
docker run --name learning-postgres -e POSTGRES_USER=app_user -e POSTGRES_PASSWORD=local_only_change_me -e POSTGRES_DB=app_db -p 127.0.0.1:5433:5432 -v learning-postgres-data:/var/lib/postgresql/data -d postgres:17-alpine
```

ค่าหลักทำหน้าที่ดังนี้:

```text
POSTGRES_USER     = สร้าง PostgreSQL user/role ครั้งแรก
POSTGRES_PASSWORD = ตั้ง password ครั้งแรก
POSTGRES_DB       = สร้าง database ครั้งแรก
```

ค่าเหล่านี้ใช้เมื่อ data directory ยังว่าง ถ้า named volume มี PostgreSQL อยู่แล้ว entrypoint จะข้าม initialization และใช้ users, databases, password hashes และข้อมูลเดิม

คำสั่งพร้อมคำอธิบาย options อยู่ที่ [Docker Commands](../../docker/commands.md)

## Port Mapping

```text
pgAdmin บน Windows
→ 127.0.0.1:5433
→ Docker ส่งต่อ
→ PostgreSQL ใน container:5432
```

`inet_server_port()` คืน `5432` เพราะ SQL ทำงานภายใน PostgreSQL ส่วน pgAdmin ใช้ Host port `5433` เพื่อเดินทางเข้า container

## ตรวจว่า PostgreSQL พร้อม

```bash
docker logs --tail 30 learning-postgres
```

ข้อความสำคัญ:

```text
database system is ready to accept connections
```

ถ้าใช้ volume เดิม:

```text
Database directory appears to contain a database; Skipping initialization
```

log นี้พิสูจน์ว่า PostgreSQL เปิดสำเร็จและพบ data directory เดิม แต่ยังไม่พิสูจน์ว่า row ที่ต้องการอยู่ครบ ต้อง query ต่อ

## เชื่อมด้วย `psql`

`psql` คือ command-line client ของ PostgreSQL:

```bash
docker exec -it learning-postgres psql -U app_user -d app_db
```

เมื่อเชื่อมสำเร็จ:

```text
app_db=#
```

ตรวจ database และ user:

```sql
SELECT current_database(), current_user;
```

ชื่อ database และ user ตั้งให้เหมือนกันได้ แต่เป็นคนละ object:

```text
database = กล่องรวม tables และข้อมูล
user     = ตัวตนที่ใช้ login และถือสิทธิ์
```

## เชื่อมด้วย pgAdmin

pgAdmin เป็น GUI สำหรับจัดการ PostgreSQL คล้ายบทบาทที่ SQL Server Management Studio มีต่อ SQL Server

ตัวอย่างค่า connection:

```text
Host:                 127.0.0.1
Port:                 5433
Maintenance database: app_db
Username:             app_user
Password:             password ที่ PostgreSQL รู้จัก
```

pgAdmin หนึ่งโปรแกรมลงทะเบียน connection ได้หลาย server และหนึ่ง server มีหลาย database ได้ แต่ Query Tool หนึ่งหน้าต่างเชื่อมกับ database หนึ่งตัวในขณะนั้น

```text
Host และ Host port = มาจากตำแหน่งและ port mapping ของ container
Database/user/password = มาจากข้อมูล PostgreSQL ใน volume
```

## พิสูจน์ว่า Volume เก็บข้อมูล

การ query หลัง `INSERT` ทันทีพิสูจน์เพียงว่าเขียนและอ่านได้ การพิสูจน์ persistence ต้องเปลี่ยน container แต่คง volume

```text
1. สร้างตารางทดลองและ INSERT ข้อมูล
2. Stop container
3. ตรวจ mount ว่าใช้ named volume ที่ต้องการ
4. Remove container โดยไม่ลบ named volume
5. สร้าง container ใหม่และ mount volume เดิม
6. Query row เดิมอีกครั้ง
7. ลบตารางทดลองเมื่อจบ
```

ตัวอย่างตารางทดลอง:

```sql
CREATE TABLE public.volume_probe (
  message text
);

INSERT INTO public.volume_probe (message)
VALUES ('data survives container recreation');

SELECT message
FROM public.volume_probe;
```

ถ้า container ใหม่อ่าน row เดิมได้ จึงสรุปได้ว่าข้อมูลรอดจากการ remove/recreate เพราะ named volume

ล้างของทดลอง:

```sql
DROP TABLE public.volume_probe;
```

`DROP TABLE` ลบทั้งโครงสร้างและข้อมูล จึงต้องตรวจชื่อตารางให้ตรงก่อนรัน

## เปลี่ยน Password ของ PostgreSQL User

password ของ database ที่มีข้อมูลแล้วต้องเปลี่ยนภายใน PostgreSQL ไม่ใช่แก้ `POSTGRES_PASSWORD` แล้วหวังให้ initialization ทำซ้ำ

PostgreSQL เรียกบัญชีผู้ใช้ว่า role:

```sql
ALTER ROLE app_user WITH PASSWORD 'new-local-password';
```

หลังเปลี่ยนแล้ว connection เดิมยังทำงานต่อเพราะผ่านการยืนยันตัวตนไปก่อนหน้า ต้อง disconnect แล้ว reconnect ด้วย password ใหม่เพื่อพิสูจน์ผล

ถ้า pgAdmin จำ password เก่า ให้ใช้ **Clear Saved Password** แล้วกรอกค่าใหม่ตอน Connect Server การล้างค่านี้ลบเพียงสำเนาที่ pgAdmin จำ ไม่ได้เปลี่ยน password ใน PostgreSQL

password ตัวอย่างเหมาะกับ local lab เท่านั้น production ต้องใช้วิธีจัดการ secret และ password ที่แข็งแรงกว่า

## Docker Desktop อยู่ตรงไหน

Docker Desktop ใช้ดูและควบคุม container, image, volume, logs และ terminal ส่วน pgAdmin ใช้ดูและเปลี่ยน database objects

```text
Docker Desktop = จัดการกล่องที่รัน PostgreSQL
pgAdmin        = จัดการข้อมูลภายใน PostgreSQL
```

อ่านขั้นตอน UI ที่ [Docker Desktop UI](../../docker/docker-desktop-ui.md)

## สิ่งที่หลักฐานแต่ละอย่างพิสูจน์

| หลักฐาน | พิสูจน์อะไร |
|---|---|
| `docker version` มี Server | Docker Engine ตอบสนอง |
| container เป็น `Up` | process หลักยังทำงาน |
| ready log | PostgreSQL พร้อมรับ connection |
| `docker port` | Host IP/port ถูก map ไป container อย่างไร |
| `SELECT current_database(), current_user` | session อยู่ database ใดและ login เป็นใคร |
| row รอดหลัง remove/recreate | named volume เก็บข้อมูลข้าม container |
| reconnect หลัง `ALTER ROLE` | password ใหม่ใช้ยืนยันตัวตนได้จริง |

หลักฐานหนึ่งอย่างไม่ควรถูกขยายความเกินขอบเขต เช่น ready log ไม่ได้พิสูจน์ว่า schema หรือ row ทุกตัวถูกต้อง

## จุดที่มักงง

- container name, database name และ username เป็นคนละสิ่ง แม้ตั้งชื่อเหมือนกันได้
- volume หนึ่งของ PostgreSQL เก็บทั้ง users, databases, configuration และ data files ของ server ชุดนั้น ไม่ได้เท่ากับ database เดียวเสมอไป
- เปลี่ยน Host port ไม่ทำให้ข้อมูลใน volume เปลี่ยน
- เปลี่ยน `POSTGRES_PASSWORD` หลัง initialization ไม่เปลี่ยน password จริงของ role เดิม
- `127.0.0.1` บนเครื่องอื่นหมายถึงเครื่องอื่นนั้นเอง ไม่ได้ชี้กลับมาหาเครื่องเรา
- อย่าให้ PostgreSQL สอง container ใช้ data directory เดียวกันพร้อมกัน

## เช็กตัวเอง

1. Angular, NestJS และ PostgreSQL แบ่งหน้าที่กันอย่างไร
2. ทำไม user และ database ยังอยู่หลังลบ container แล้วต่อ named volume เดิม
3. ทำไมเปลี่ยน password แล้วต้อง disconnect/reconnect เพื่อพิสูจน์ผล

## จำสั้น ๆ

```text
Angular → NestJS → PostgreSQL
image สร้าง container; volume เก็บข้อมูล
Host 5433 → Container 5432
volume มีข้อมูลแล้ว → ข้าม initialization
password จริงของ role → เปลี่ยนด้วย ALTER ROLE
```

## แหล่งอ้างอิงทางการ

- [PostgreSQL Official Image](https://hub.docker.com/_/postgres)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin — Connect to Server](https://www.pgadmin.org/docs/pgadmin4/latest/connect_to_server.html)
