# Docker พื้นฐานสำหรับ Local Development

Docker ช่วยให้เราเปิดโปรแกรมอย่าง PostgreSQL ในสภาพแวดล้อมที่แยกจาก Windows โดยไม่ต้องติดตั้งและจัดการไฟล์ของโปรแกรมนั้นด้วยตัวเองทั้งหมด

## ภาพจำง่าย ๆ

```text
image     = แม่พิมพ์หรือแบบสำหรับสร้างเครื่อง
container = เครื่องที่สร้างจากแบบและกำลังเปิดใช้งานได้
volume    = กล่องเก็บข้อมูลที่แยกออกจากเครื่อง
```

ลบ container แล้วสร้างใหม่ได้ แต่ข้อมูลจะรอดก็ต่อเมื่อเก็บไว้ใน volume หรือพื้นที่ภายนอก container

## ผู้ทำงานแต่ละตัว

| ผู้ทำงาน | หน้าที่ |
|---|---|
| Docker CLI | รับคำสั่งจาก CMD, PowerShell หรือ Terminal |
| Docker Desktop | หน้าจอ GUI สำหรับสั่งและดูสถานะ |
| Docker Engine | ตัวที่สร้างและควบคุม container จริง |
| Image | ต้นแบบที่ใช้สร้าง container |
| Container | instance ที่รันโปรแกรม |
| Volume | พื้นที่เก็บข้อมูลถาวรที่ Docker ดูแล |

Docker CLI และ Docker Desktop ไม่ได้ควบคุม Docker คนละชุด ทั้งสองส่งคำสั่งไปยัง Docker Engine ตัวเดียวกัน

## Image, Container และ Volume ทำงานร่วมกันอย่างไร

```text
postgres:17-alpine image
        ↓ สร้าง
PostgreSQL container
        ↓ mount
PostgreSQL named volume
```

container มีวงจรชีวิตของตัวเอง:

```text
create → running → stopped → removed
```

named volume ยังอยู่ต่อได้แม้ container ถูก remove แล้ว เมื่อนำ volume เดิมไปต่อกับ container ใหม่ โปรแกรมจะเห็นข้อมูลเดิม

## Host Port กับ Container Port

โปรแกรมใน container มี port ของมันเอง ถ้าต้องการให้โปรแกรมบน Windows เชื่อมเข้าไป ต้องทำ port mapping

```text
127.0.0.1:5433 → container:5432
```

- `127.0.0.1:5433` คือทางเข้าฝั่งเครื่องเรา
- `5432` คือ port ที่ PostgreSQL ฟังอยู่ภายใน container
- `127.0.0.1` จำกัดการเชื่อมต่อไว้เฉพาะเครื่องนี้

ถ้าแสดงเป็น `0.0.0.0:5433` แปลว่า Docker เปิดรับผ่าน network interface ทุกตัวของเครื่อง อุปกรณ์อื่นอาจเชื่อมผ่าน IP ในวง LAN ได้หาก firewall และ network อนุญาต

## Named Volume กับ Bind Mount

```text
named volume = Docker เลือกและดูแลตำแหน่งจริงให้
bind mount   = เราเลือกโฟลเดอร์จริงบนเครื่องไปต่อกับ container
```

ข้อมูลฐานข้อมูลเหมาะกับ named volume เพราะ Docker จัดการ path และสิทธิ์ใน Linux VM ให้ ส่วน bind mount เหมาะกับ source code หรือ configuration ที่ต้องเปิดแก้จากเครื่องโดยตรง

บน Docker Desktop for Windows ที่ใช้ WSL2 ข้อมูล Docker อยู่ภายใน virtual disk ของ Linux เช่น `docker_data.vhdx` ไฟล์นี้เป็นดิสก์รวมของ Docker ไม่ใช่ไฟล์ฐานข้อมูลหรือ volume ใด volume หนึ่ง จึงไม่ควรเปิดไปแก้หรือคัดลอกไฟล์ PostgreSQL ภายในด้วยมือขณะที่ Docker ทำงาน

## Standalone กับ Docker Compose

```text
standalone container = สร้างจาก docker run หรือหน้า Run ครั้งเดียว
Docker Compose       = เก็บสูตรของ services, ports, environment และ volumes ไว้ในไฟล์
```

Docker Desktop แสดง Compose File Viewer ให้ application ที่สร้างจาก Compose แต่ standalone container ไม่มีไฟล์สูตรให้แสดง อย่างไรก็ตามยัง Start, Stop, ดู Logs, เปิด Exec และ Delete ผ่าน Docker Desktop ได้เหมือนกัน

## อ่านต่อ

- [Docker Commands](commands.md)
- [Docker Desktop UI](docker-desktop-ui.md)
- [PostgreSQL ครั้งแรกผ่าน Docker](../postgresql/teach/postgresql-first-run-with-docker.md)

## แหล่งอ้างอิงทางการ

- [Docker Volumes](https://docs.docker.com/engine/storage/volumes/)
- [Docker Port Publishing](https://docs.docker.com/engine/network/port-publishing/)
- [Docker Desktop WSL 2](https://docs.docker.com/desktop/features/wsl/)

## จุดที่มักงง

- image ไม่ใช่ container: image เดียวสร้าง container ได้หลายตัว
- volume ไม่ใช่ไฟล์ `.sql`: PostgreSQL เก็บข้อมูลจริงเป็นไฟล์ภายในหลายไฟล์
- Docker Desktop ไม่ใช่ database manager: ใช้ pgAdmin หรือ `psql` จัดการ PostgreSQL
- `0.0.0.0` เป็นความหมายว่าเปิดฟังทุก interface ไม่ใช่ Host ที่ client ควรกรอก
- `127.0.0.1` หมายถึงเครื่องที่กำลังใช้งานค่านั้นอยู่เสมอ

## เช็กตัวเอง

1. image, container และ volume ต่างกันอย่างไร
2. ทำไมลบ container แล้วข้อมูลใน named volume ยังอยู่ได้
3. `127.0.0.1:5433:5432` แบ่งเป็น Host IP, Host port และ Container port อย่างไร

## จำสั้น ๆ

```text
image สร้าง container
container รันโปรแกรม
volume เก็บข้อมูลให้รอดจากการเปลี่ยน container
```
