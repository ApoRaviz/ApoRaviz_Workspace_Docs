# Docker Commands

หน้านี้รวมคำสั่ง Docker ที่ใช้จัดการ PostgreSQL local container ผ่าน CMD, PowerShell หรือ Terminal

```text
Terminal → Docker CLI → Docker Engine → Container / Image / Volume
```

## ตรวจ Docker Client และ Engine

```bash
docker --version
docker version
```

- `docker --version` แสดงเวอร์ชันของ Docker CLI แบบสั้น
- `docker version` แสดงทั้ง Client และ Server ถ้า Engine ทำงานอยู่
- `--version` เป็น option ที่ขอเฉพาะหมายเลขเวอร์ชันของ CLI

ถ้า `docker version` มีเฉพาะ Client แล้วตามด้วย connection error ให้เปิด Docker Desktop และรอจน Engine พร้อม

## ดู Container

```bash
docker ps
docker ps -a
docker ps -a --filter name=learning-postgres
```

- `ps` แสดง container ที่กำลังทำงาน
- `-a` หรือ `--all` รวม container ที่หยุดแล้ว
- `--filter name=...` กรองเฉพาะชื่อที่สนใจ

สถานะที่พบบ่อย:

```text
Up         = กำลังทำงาน
Exited (0) = หยุดตามปกติ
```

## สร้าง PostgreSQL ครั้งแรกพร้อม Named Volume

ตัวอย่างนี้ใช้ password สำหรับ local lab เท่านั้น อย่าใช้ค่าตัวอย่างใน production เพราะ password ใน command อาจปรากฏใน command history และ container metadata

```bash
docker run --name learning-postgres -e POSTGRES_USER=app_user -e POSTGRES_PASSWORD=local_only_change_me -e POSTGRES_DB=app_db -p 127.0.0.1:5433:5432 -v learning-postgres-data:/var/lib/postgresql/data -d postgres:17-alpine
```

| Option | หน้าที่ |
|---|---|
| `--name learning-postgres` | ตั้งชื่อ container |
| `-e KEY=value` | ส่ง environment variable เข้า container |
| `-p 127.0.0.1:5433:5432` | ต่อ Host port `5433` ไป Container port `5432` และรับเฉพาะเครื่องนี้ |
| `-v source:destination` | mount volume ต้นทางไปยัง path ใน container |
| `-d` หรือ `--detach` | ให้ container ทำงานเบื้องหลัง |

`POSTGRES_USER`, `POSTGRES_PASSWORD` และ `POSTGRES_DB` ใช้เตรียม PostgreSQL เมื่อ data directory ยังว่าง

## สร้าง Container ใหม่จาก Volume ที่มีข้อมูลแล้ว

ถ้า volume ผ่าน initialization แล้ว สามารถต่อ volume เดิมโดยไม่ส่งค่าเริ่มต้นซ้ำ:

```bash
docker run --name learning-postgres -p 127.0.0.1:5433:5432 -v learning-postgres-data:/var/lib/postgresql/data -d postgres:17-alpine
```

PostgreSQL จะอ่าน users, databases, password hashes และข้อมูลเดิมจาก volume คำสั่งนี้ใช้สำหรับ volume ที่มี PostgreSQL พร้อมแล้ว ไม่ใช่คำสั่งเริ่มจาก volume ว่าง

## Start, Stop และ Remove

```bash
docker stop learning-postgres
docker start learning-postgres
docker rm learning-postgres
```

- `stop` ขอให้ process หลักหยุดอย่างเป็นระเบียบ
- `start` เปิด stopped container เดิม จึงใช้ configuration และ volume mapping เดิม
- `rm` ลบ container ที่หยุดแล้ว แต่ไม่ลบ named volume โดยอัตโนมัติ

`-v` หรือ `--volumes` ของ `docker rm` สั่งลบ anonymous volumes ที่ผูกกับ container แต่ไม่ลบ named volume ที่ตั้งชื่อไว้ ถึงอย่างนั้นไม่ควรเติม destructive option โดยไม่จำเป็น และควรตรวจ named volume หลัง remove เสมอ

## ดู Logs

```bash
docker logs --tail 30 learning-postgres
```

- `logs` แสดง output ของ container
- `--tail 30` แสดงเฉพาะ 30 บรรทัดท้าย

PostgreSQL พร้อมใช้งานเมื่อพบ:

```text
database system is ready to accept connections
```

ถ้าใช้ volume เดิม อาจพบ:

```text
Database directory appears to contain a database; Skipping initialization
```

## เปิด `psql` ภายใน Container

```bash
docker exec -it learning-postgres psql -U app_user -d app_db
```

- `exec` รันคำสั่งใหม่ภายใน container ที่กำลังทำงาน
- `-i` หรือ `--interactive` เปิด input ให้พิมพ์ตอบโต้ได้
- `-t` หรือ `--tty` สร้างหน้าจอ terminal จำลอง
- `-U app_user` ให้ `psql` เชื่อมด้วย PostgreSQL user นี้
- `-d app_db` ให้ `psql` เลือก database นี้

Prompt ช่วยบอกว่าเรากำลังอยู่ที่ไหน:

```text
C:\...>    = Windows CMD
/ #         = shell ภายใน Linux container
app_db=#    = psql เชื่อม database แล้ว
app_db-#    = SQL ยังเขียนไม่จบและกำลังรอบรรทัดต่อไป
```

- `Ctrl+C` ยกเลิก SQL ที่ยังพิมพ์ไม่จบ
- `\q` ออกจาก `psql`
- `exit` ออกจาก shell ของ container

## ตรวจ Port Mapping

```bash
docker port learning-postgres 5432
```

ผลที่จำกัดไว้เฉพาะเครื่องควรเป็น:

```text
127.0.0.1:5433
```

ถ้าเป็น `0.0.0.0:5433` แปลว่าเปิดรับผ่านทุก network interface ของ Host

## ดูและตรวจ Volume

```bash
docker volume ls --filter name=learning-postgres-data
docker volume inspect learning-postgres-data
```

- `volume ls` แสดง volumes
- `--filter name=...` กรองตามชื่อ
- `volume inspect` แสดง metadata และ mountpoint ที่ Docker ใช้ภายใน Linux VM

mountpoint ภายใน Docker ไม่ใช่ตำแหน่งที่ควรเปิดไปแก้ไฟล์ PostgreSQL ด้วยมือ

## ตรวจ Mount ของ Container

```bash
docker inspect --format "{{json .Mounts}}" learning-postgres
```

- `inspect` แสดงข้อมูลละเอียดของ Docker object
- `--format` เลือกเฉพาะข้อมูลตาม template
- `json .Mounts` ที่อยู่ภายในวงเล็บปีกกาคู่ แสดงรายการ mount เป็น JSON เพื่ออ่านชื่อ volume และปลายทางได้ชัดเจน

ค่าที่ควรตรวจ:

```text
Type        = volume
Name        = learning-postgres-data
Destination = /var/lib/postgresql/data
RW          = true
```

## จำสั้น ๆ

```text
ps      = ดู container
logs    = ดูสิ่งที่โปรแกรมรายงาน
exec    = เข้าไปรันคำสั่งใน container
stop    = หยุด
start   = เปิด container เดิม
rm      = ลบ container
volume  = ดูพื้นที่เก็บข้อมูลถาวร
port    = ดูทางเข้าจาก Host ไป Container
```

## แหล่งอ้างอิงทางการ

- [docker container run](https://docs.docker.com/reference/cli/docker/container/run/)
- [docker container exec](https://docs.docker.com/reference/cli/docker/container/exec/)
- [Docker Volumes](https://docs.docker.com/engine/storage/volumes/)
