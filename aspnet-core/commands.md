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

## สร้าง API Controller

ตรวจแผนก่อน:

```powershell
dotnet new apicontroller --name HealthController --output src/MyApi/Controllers --project src/MyApi/MyApi.csproj --dry-run
```

- `new apicontroller` เลือก template สำหรับ API Controller
- `--name HealthController` กำหนดชื่อ class/ไฟล์
- `--output src/MyApi/Controllers` กำหนด directory ปลายทาง และสร้าง subfolder ที่ยังไม่มีให้ได้
- `--project src/MyApi/MyApi.csproj` ให้ template engine ใช้ project นี้เป็น context; ไม่รับประกันว่า namespace ที่ generator เลือกจะตรงกับ project เสมอ จึงต้องเปิดไฟล์ตรวจ
- `--dry-run` แสดง file actions โดยยังไม่เขียนไฟล์

สร้างจริงด้วยคำสั่งเดิมโดยเอา `--dry-run` ออก แล้วตรวจอย่างน้อย:

```text
namespace ตรงกับ project หรือยัง
[Route(...)] ได้ path ที่ต้องการหรือยัง
มี [HttpGet]/[HttpPost] action จริงหรือยัง
using ที่ generator ใส่มามีตัวใดไม่ถูกใช้หรือ implicit อยู่แล้ว
```

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

## สร้าง xUnit test project

ตรวจแผนก่อน:

```powershell
dotnet new xunit --output tests/MyApi.Tests --name MyApi.Tests --framework net10.0 --dry-run
```

- `new xunit` เลือก xUnit test project template
- `--output tests/MyApi.Tests` กำหนด directory ปลายทาง
- `--name MyApi.Tests` กำหนดชื่อ project/assembly และ namespace เริ่มต้น
- `--framework net10.0` กำหนด Target Framework ให้เข้ากับ application ที่ต้องทดสอบ
- `--dry-run` แสดงไฟล์และ post-creation actions ที่จะเกิดโดยยังไม่เขียนไฟล์

ไฟล์เริ่มต้นที่คาดหวัง:

```text
tests/MyApi.Tests/
├─ MyApi.Tests.csproj
└─ UnitTest1.cs
```

สร้างจริงด้วยคำสั่งเดิมโดยเอา `--dry-run` ออก template จะ restore test packages ให้ตามปกติ

## เพิ่ม ProjectReference จาก test ไป API

```powershell
dotnet reference add src/MyApi/MyApi.csproj --project tests/MyApi.Tests/MyApi.Tests.csproj
```

- `reference add` เพิ่ม project-to-project reference
- path แรกคือ project ที่ test ต้องการอ้างอิง หรือ API project
- `--project tests/MyApi.Tests/MyApi.Tests.csproj` ระบุ project ที่จะถูกแก้ หรือ test project

ทิศของ reference คือ:

```text
tests/MyApi.Tests -> src/MyApi
```

คำสั่งนี้ไม่มี `--dry-run` ให้เปิด test `.csproj` ตรวจ `<ProjectReference>` หลังรัน

## เพิ่ม ASP.NET Core testing package

ตัวอย่างสำหรับ project ที่ target `net10.0`:

```powershell
dotnet package add Microsoft.AspNetCore.Mvc.Testing --version 10.0.10 --project tests/MyApi.Tests/MyApi.Tests.csproj
```

- `package add` เพิ่ม NuGet PackageReference
- `Microsoft.AspNetCore.Mvc.Testing` ให้ `WebApplicationFactory<TEntryPoint>` และ TestServer integration
- `--version 10.0.10` pin package version ตัวอย่างที่ target `net10.0`; งานจริงต้องเลือก stable version ที่เข้ากับ Target Framework และ patch policy ของทีม
- `--project tests/MyApi.Tests/MyApi.Tests.csproj` ระบุ test project ที่จะถูกแก้

คำสั่งนี้ไม่มี `--dry-run` และ restore โดยปกติเพื่อตรวจ compatibility หากต้องการข้าม restore ต้องใช้ `--no-restore` แต่ไม่ควรใช้จนกว่าจะเข้าใจว่ากำลังข้าม compatibility/restore check อะไร

หลังรันให้ตรวจ:

```xml
<PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" Version="10.0.10" />
```

## ดูตำแหน่ง NuGet global packages cache

```powershell
dotnet nuget locals global-packages --list
```

- `nuget locals` จัดการหรือแสดงตำแหน่ง local NuGet caches
- `global-packages` เลือก cache ที่เก็บ packages ใช้ร่วมกันบนเครื่อง
- `--list` แสดงตำแหน่งโดยไม่ลบ cache

source of truth ว่า project ต้องการ package ใดอยู่ใน `.csproj` ส่วนไฟล์ package จริงมักอยู่ใน global cache และ dependency graph ที่ restore คำนวณแล้วอยู่ใน `obj/project.assets.json`

## รัน xUnit tests

```powershell
dotnet test tests/MyApi.Tests/MyApi.Tests.csproj
```

`test` จะ restore เมื่อจำเป็น, build referenced projects ตาม dependency graph, build test assembly, discover tests แล้วรัน test cases

แสดงชื่อ test ที่ผ่านด้วย detailed console logger:

```powershell
dotnet test tests/MyApi.Tests/MyApi.Tests.csproj --logger "console;verbosity=detailed"
```

- `--logger` เลือกตัวรายงานผล test
- `console` รายงานบน terminal
- `verbosity=detailed` แสดงรายละเอียดเพิ่ม เช่นชื่อ fully qualified test ที่ PASS

บางชุดของ SDK, test adapter และ detailed console logger อาจพิมพ์ infrastructure/host log ซ้ำในหน้าจอ ข้อความซ้ำอย่างเดียวไม่ได้แปลว่า test รันสองครั้ง ให้ยึดบรรทัด `Passed ...` และ `Total tests` เป็นหลัก

แสดงรายชื่อ test ที่ discover ได้โดยไม่รัน test body:

```powershell
dotnet test tests/MyApi.Tests/MyApi.Tests.csproj --list-tests
```

- `--list-tests` build/discover แล้วแสดงรายชื่อ test; ไม่ส่ง HTTP request หรือเรียก assertion ใน test body

เมื่อไม่ใส่ filter, xUnit จะรัน `[Fact]` และ test cases จาก `[Theory]` ที่ discover ได้ทั้งหมดใน test project เป้าหมาย ยกเว้นรายการที่ถูก skip

อ่าน flow ตั้งแต่ `global.json` ถึง assertion ที่ [ASP.NET Core Integration Test ด้วย xUnit และ WebApplicationFactory](integration-testing-with-xunit.md)

อ้างอิงทางการ: [.NET CLI overview](https://learn.microsoft.com/dotnet/core/tools/), [`global.json`](https://learn.microsoft.com/dotnet/core/tools/global-json), [`dotnet restore`](https://learn.microsoft.com/dotnet/core/tools/dotnet-restore)
