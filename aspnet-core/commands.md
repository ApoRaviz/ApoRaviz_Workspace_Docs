# dotnet CLI Commands

ตัวอย่างใช้ path กลางเพื่อให้ย้ายเครื่องหรือเปลี่ยนชื่อ project ได้ง่าย

## ตรวจ SDK และ Runtime

```powershell
dotnet --version
dotnet --list-sdks
dotnet --list-runtimes
```

- `--version` แสดง SDK ที่ CLI เลือกใช้ใน current directory
- `--list-sdks` แสดง SDK ทั้งหมดที่ติดตั้ง
- `--list-runtimes` แสดง runtime ทั้งหมดที่ติดตั้ง

ผลของ `dotnet --version` อาจเปลี่ยนเมื่อย้าย directory เพราะ CLI ค้น `global.json` จาก current directory ย้อนขึ้นไปยัง parent

การส่ง `--project path/to/App.csproj` ไม่ได้รับประกันว่า `dotnet` entry point จะเลือก `global.json` ที่เป็น ancestor ของ project หาก current working directory อยู่นอก scope นั้น วิธีที่ปลอดภัยคือ `cd` เข้า directory tree ที่มี `global.json` ก่อน แล้วจึงตรวจ `dotnet --version` และรันคำสั่งอื่น

## สร้าง `global.json` แบบตรวจแผนก่อน

```powershell
dotnet new globaljson --output dotnet-workspace --sdk-version 10.0.302 --roll-forward latestPatch --dry-run
```

- `new globaljson` เลือก template สำหรับสร้าง `global.json`
- `--output dotnet-workspace` กำหนด directory ปลายทาง ตัวอย่างนี้ใช้ชื่อกลางซึ่งเปลี่ยนให้ตรง workspace จริงได้
- `--sdk-version 10.0.302` เขียน SDK version ตัวอย่างลงไฟล์ งานจริงต้องเลือก stable SDK ที่ติดตั้งและทีมรองรับ
- `--roll-forward latestPatch` เลือก patch สูงสุดที่ติดตั้งใน major/minor/feature band เดียวกันและไม่ต่ำกว่า version ที่ระบุ; ถ้าไม่มี version ที่เข้าเงื่อนไขจะ fail
- `--dry-run` แสดง file actions แต่ยังไม่เขียนไฟล์

เมื่อตรวจ output แล้ว จึงรันคำสั่งเดิมโดยเอา `--dry-run` ออกเพื่อสร้างจริง

## สร้าง controller-based Web API

ตรวจแผนก่อน:

```powershell
dotnet new webapi --output src/MyApi --name MyApi --framework net10.0 --use-controllers --auth None --no-openapi --dry-run
```

- `new webapi` เลือก ASP.NET Core Web API template
- `--output src/MyApi` กำหนด directory ที่จะสร้างไฟล์
- `--name MyApi` กำหนดชื่อ project/assembly และ namespace เริ่มต้น
- `--framework net10.0` กำหนด Target Framework ไม่ใช่ตัวกระตุ้น first-run setup
- `--use-controllers` เลือก controller-based API แทน Minimal API
- `--auth None` ไม่เพิ่ม authentication scaffold
- `--no-openapi` ไม่เพิ่ม OpenAPI/Swagger integration จาก template
- `--dry-run` แสดงแผนโดยไม่เขียนไฟล์

first-run banner, telemetry notice หรือ development certificate setup อาจปรากฏเมื่อใช้ `dotnet` CLI ครั้งแรกบนเครื่อง ไม่ได้เกิดจาก `--framework net10.0` โดยเฉพาะ

สร้างจริงด้วยคำสั่งเดิมโดยเอา `--dry-run` ออก หลังสร้าง template จะรัน NuGet restore เป็น post-creation action ตามปกติ

## Build

```powershell
dotnet build src/MyApi/MyApi.csproj
```

`build` จะ restore โดยอัตโนมัติเมื่อจำเป็น, compile project และเขียนผลลัพธ์ลง `bin/<Configuration>/<TargetFramework>/`

ถ้าต้องการข้าม restore เพราะเพิ่ง restore และต้องการตรวจแยกขั้นจริง ๆ จึงค่อยใช้ `--no-restore`; อย่าเติม option นี้โดยไม่รู้ว่า dependency พร้อมแล้ว

## Run ด้วย launch profile

```powershell
dotnet run --project src/MyApi/MyApi.csproj --launch-profile https --no-build
```

- `--project` ระบุ `.csproj` ที่จะรันเมื่อ current directory ไม่ใช่ project directory
- `--launch-profile https` เลือก profile ชื่อ `https` จาก `Properties/launchSettings.json`
- `--no-build` ข้าม build ก่อน run จึงควรใช้เมื่อ build ล่าสุดผ่านและ source ไม่เปลี่ยน

หยุด server ด้วย `Ctrl+C` และรอข้อความ `Application is shutting down...`

## ยิง HTTP request ด้วย curl

```powershell
curl.exe -i -H "Accept: application/json" http://localhost:5000/example
```

- `-i` แสดง response headers พร้อม body
- `-H "Accept: application/json"` เพิ่ม request header บอก media type ที่ client ต้องการรับ

ตาม redirect:

```powershell
curl.exe -i -L -H "Accept: application/json" http://localhost:5000/example
```

- `-L` ให้ curl ตามค่า `Location` ของ redirect จึงอาจเห็นทั้ง 307 response และ 200 response ถัดไป

ตัวเลือก `-k` หรือ `--insecure` ปิดการตรวจสอบ certificate ของ curl ใช้ได้เฉพาะการวินิจฉัย local ที่เข้าใจความเสี่ยง ไม่ใช่วิธีแก้ certificate หมดอายุหรือไม่น่าเชื่อถือใน production

อ่านเพิ่ม: [HTTPS, TLS และ Certificate](../backend/concepts/https-tls-certificate.md)

อ้างอิงทางการ: [.NET CLI overview](https://learn.microsoft.com/dotnet/core/tools/), [`global.json`](https://learn.microsoft.com/dotnet/core/tools/global-json), [`dotnet restore`](https://learn.microsoft.com/dotnet/core/tools/dotnet-restore)
