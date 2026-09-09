# Docker Desktop UI

Docker Desktop เป็นหน้าจอ GUI ที่ช่วยสั่ง Docker Engine ตัวเดียวกับที่ Docker CLI ใช้

```text
Docker Desktop ─┐
                ├→ Docker Engine
Docker CLI ─────┘
```

การสั่งผ่าน UI หรือ command จึงเห็น container, image และ volume ชุดเดียวกัน

## File Map ของหน้าจอหลัก

| หน้า | ใช้ทำอะไร |
|---|---|
| Containers | ดูสถานะ, Start, Stop, Delete, Logs และ Exec |
| Images | ดู image ที่มีในเครื่องและสร้าง container ใหม่ |
| Volumes | ดู named volume, ขนาด, ไฟล์ภายใน และ container ที่ใช้งาน |
| Builds | ดูประวัติและผลของ image build |

## สร้าง Container จาก Image

1. เปิดหน้า **Images** แล้วเลือกแท็บ **Local**
2. หา image และ tag ที่ต้องการ เช่น `postgres:17-alpine`
3. กด **Run**
4. เปิด **Optional settings**
5. ตรวจชื่อ container, port, volumes และ environment variables
6. กด **Run** เมื่อค่าครบ

ถ้าไม่ระบุชื่อ Docker จะสร้างชื่อสุ่มให้ การตั้งชื่อเองช่วยให้ใช้คำสั่งและหา container ได้ง่าย

## ช่อง Volumes และปุ่ม `...`

หน้า Run อาจใช้ชื่อช่องต้นทางว่า **Host path** และมีปุ่ม `...`

```text
ปุ่ม ...          = เลือกโฟลเดอร์จริงบน Host เพื่อทำ bind mount
พิมพ์ชื่อ volume = ต่อ Docker named volume ที่มีอยู่
```

ตัวอย่าง named volume:

```text
Host path:      learning-postgres-data
Container path: /var/lib/postgresql/data
```

ถ้าไม่ทราบชื่อ named volume ให้เปิดหน้า **Volumes**, ค้นหาชื่อ แล้วนำชื่อมากรอกเอง อย่าเปิดไฟล์ virtual disk ของ Docker แล้วเลือกเป็น Host path

## ต้นทางเปลี่ยนได้ แต่ปลายทางขึ้นกับโปรแกรม

```text
volume-a → /var/lib/postgresql/data
volume-b → /var/lib/postgresql/data
```

สำหรับ PostgreSQL 17 ปลายทางยังเป็น `/var/lib/postgresql/data` เพราะเป็นตำแหน่งที่ PostgreSQL คาดว่าจะพบข้อมูล การเปลี่ยน volume ต้นทางจึงเหมือนเปลี่ยนชุดข้อมูลที่นำมาใช้

ถ้านำ volume ไป mount ที่ path อื่น PostgreSQL จะไม่ใช้ข้อมูลตรงนั้นโดยอัตโนมัติ เว้นแต่เปลี่ยน configuration ของ data directory เพิ่มเติม

## Host Port และข้อจำกัดของหน้า Run

บางรุ่นของ Docker Desktop มีเฉพาะช่อง **Host port** และไม่มีช่อง **Host IP**

ถ้าใส่เพียง:

```text
Host port: 5433
```

ผลปริยายอาจเป็น:

```text
0.0.0.0:5433 → container:5432
```

นั่นหมายถึงเปิดรับผ่านทุก network interface ของเครื่อง ถ้าต้องการจำกัดไว้เฉพาะเครื่องและ UI ไม่มีช่อง Host IP ให้สร้างผ่าน CLI หรือ Compose ด้วย:

```text
127.0.0.1:5433 → container:5432
```

อย่ากรอก `127.0.0.1:5433` ในช่องที่รับเฉพาะตัวเลข เพราะ UI อาจตัดเครื่องหมายจนกลายเป็นเลข port ที่ไม่ถูกต้อง

## Start, Stop และ Delete

หน้า **Containers** มี action หลัก:

- **Start** เปิด stopped container เดิม โดย configuration และ volume mapping ยังเหมือนเดิม
- **Stop** ขอให้ process หยุดอย่างเป็นระเบียบ
- **Delete** ลบ container

ก่อน Delete ให้ตรวจข้อความยืนยันเสมอ ถ้าต้องเก็บข้อมูล อย่าเลือกตัวเลือกที่ลบ named volume

ข้อความว่า anonymous volumes จะถูกลบไม่ได้หมายความว่า named volume ที่ตั้งชื่อไว้จะถูกลบด้วย แต่ควรตรวจหน้า Volumes หลังลบก่อนสร้าง container ใหม่

## Logs

เลือก container แล้วเปิดหน้า **Logs** เพื่อดู output ของโปรแกรม

สำหรับ PostgreSQL ให้มองหาบรรทัด:

```text
database system is ready to accept connections
```

ถ้าต่อ volume ที่มีข้อมูลอยู่แล้ว อาจเห็น:

```text
Database directory appears to contain a database; Skipping initialization
```

สองข้อความนี้บอกว่า server พร้อมและกำลังใช้ data directory เดิม แต่การพิสูจน์ว่าข้อมูลสำคัญอยู่ครบต้อง query ข้อมูลจริงอีกครั้ง

## Exec หรือ Terminal

หน้า **Exec** เปิด shell ภายใน container เช่น:

```text
/ #
```

จากนั้นใช้โปรแกรมที่ติดมากับ image ได้ เช่น PostgreSQL image มี `psql`:

```bash
psql -U app_user -d app_db
```

Docker Desktop Exec เปิด shell ก่อน ส่วน `docker exec -it ... psql ...` จาก CMD เรียก `psql` โดยตรง ทั้งสองวิธีเข้าถึง container เดียวกัน

## Compose File Viewer กับ Standalone Container

container ที่สร้างจาก Compose มีไฟล์สูตร เช่น `compose.yaml` Docker Desktop จึงแสดง **Compose File Viewer** และจัด container เป็นกลุ่มตาม Compose application

standalone container สร้างจาก `docker run` หรือปุ่ม Run โดยตรง จึงไม่มี Compose file ให้แสดงและปรากฏเป็นแถวเดี่ยว

```text
มี Compose File Viewer = Docker รู้ไฟล์สูตรที่ใช้สร้างกลุ่มนี้
ไม่มี Viewer           = เป็น standalone ไม่ได้แปลว่าจัดการไม่ได้
```

ค่าใน Compose เช่น `POSTGRES_PASSWORD` เป็นค่า initialization ไม่ใช่หน้าจอเปลี่ยน password ของ PostgreSQL ที่มีข้อมูลแล้ว การเปลี่ยน password จริงต้องทำผ่าน SQL เช่น `ALTER ROLE`

## Docker Desktop กับ pgAdmin แบ่งหน้าที่กันอย่างไร

```text
Docker Desktop = ดูแล container, image, volume, port และ logs
pgAdmin        = ดูแล database, role/user, password, table และ query
```

การไม่มี View Config ไม่ได้ทำให้ PostgreSQL จัดการไม่ได้ ใช้หน้า Inspect ดู container metadata และใช้ pgAdmin หรือ `psql` จัดการฐานข้อมูลจริง

## จุดที่มักงง

- จุดเขียวที่ volume มักหมายถึงกำลังถูก container ใช้งาน จุดโปร่งหมายถึงยังอยู่แต่ไม่ได้ใช้งาน
- `Host path` อาจรับชื่อ named volume ได้ แต่ปุ่ม `...` ใช้เลือกโฟลเดอร์บน Host
- Docker Desktop แสดง port mapping แต่ SQL `inet_server_port()` แสดง port ที่ PostgreSQL ฟังภายใน container
- pgAdmin ที่เครื่องอื่นต้องใช้ LAN IP ของเครื่อง server ไม่ใช่ `127.0.0.1` ของเครื่องตัวเอง

## เช็กตัวเอง

1. หน้า Images, Containers และ Volumes มีหน้าที่ต่างกันอย่างไร
2. ทำไมปุ่ม `...` จึงไม่ใช่วิธีค้นหา named volume
3. เมื่อหน้า Run ไม่มี Host IP ควรทำอย่างไรถ้าต้องการ bind เฉพาะ `127.0.0.1`

## จำสั้น ๆ

```text
Docker Desktop = หน้าจอสั่ง Docker Engine
ปุ่ม ... = หาโฟลเดอร์ Host
named volume = พิมพ์ชื่อที่ Docker ดูแล
ค่าละเอียดที่ UI ไม่มี = ใช้ CLI หรือ Compose
```

## แหล่งอ้างอิงทางการ

- [Docker Desktop Images](https://docs.docker.com/desktop/use-desktop/images/)
- [Docker Desktop Containers](https://docs.docker.com/desktop/use-desktop/container/)
- [Docker Desktop Volumes](https://docs.docker.com/desktop/use-desktop/volumes/)
