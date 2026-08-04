# ASP.NET Core Integration Test ด้วย xUnit และ WebApplicationFactory

## เรียนเรื่องนี้เพื่อแก้อาการงงอะไร

การเรียก API ด้วย `curl` พิสูจน์ behavior ได้ในรอบที่ลอง แต่คนต้องเปิด server และตรวจผลเองทุกครั้ง Integration test ทำขั้นตอนเดิมให้ทำซ้ำได้อัตโนมัติ:

```text
เปิด application สำหรับทดสอบ
-> ส่ง HTTP request
-> รอ response
-> ตรวจ status code และ JSON body
-> ปิด application
```

บทนี้ใช้:

- xUnit เป็น test framework
- `Microsoft.NET.Test.Sdk` เชื่อม test project กับระบบทดสอบของ .NET
- `Microsoft.AspNetCore.Mvc.Testing` ให้ `WebApplicationFactory<TEntryPoint>` และ TestServer
- `HttpClient` ส่ง request เข้า TestServer โดยไม่ต้องเปิด port จริง

## ภาพจำก่อน

นึกถึงห้องตรวจรถ:

```text
API project                    = รถที่ต้องตรวจ
ProjectReference               = เอกสารที่ทำให้ห้องตรวจรู้จักรถ
WebApplicationFactory<Program> = ชุดประกอบรถให้อยู่ในสภาพพร้อมทดสอบ
TestServer                     = สนามทดสอบปิดภายในอาคาร
HttpClient                     = คนขับที่ส่งคำสั่ง HTTP
xUnit                          = กรรมการที่เรียก test และตัดสิน PASS/FAIL
```

`ProjectReference` เพียงอย่างเดียวทำให้ test project อ้างอิง public type ของ API ได้ แต่ยังไม่สร้าง application, TestServer หรือ `HttpClient`

## Unit test, integration test และ E2E

| ระดับ | ตรวจอะไร | ตัวอย่าง |
|---|---|---|
| Unit test | หน่วยเล็กโดยแยกจากระบบรอบข้าง | เรียก service method แล้วตรวจค่าที่คืน |
| Integration test | หลายส่วนทำงานร่วมกัน | เปิด ASP.NET Core app ใน TestServer แล้วยิง Controller ผ่าน HTTP |
| Full E2E | ระบบจริงตั้งแต่ผู้ใช้ถึงบริการปลายทาง | browser เปิด frontend ซึ่งเรียก backend/database จริงตาม environment |

`WebApplicationFactory` test มักเรียกว่า integration test หรือ functional test แม้จะยิง HTTP เพราะมันรันใน process ของ test และไม่พิสูจน์ production port, reverse proxy, certificate หรือ deployment จริง

## File Map ของ test project

```text
dotnet-workspace/
├─ global.json
├─ src/
│  └─ MyApi/
│     ├─ MyApi.csproj
│     └─ Program.cs
└─ tests/
   └─ MyApi.Tests/
      ├─ MyApi.Tests.csproj
      ├─ HealthEndpointTests.cs
      ├─ obj/
      └─ bin/
```

| ไฟล์/โฟลเดอร์ | หน้าที่ |
|---|---|
| `global.json` | เลือก SDK เมื่อ current directory อยู่ใน scope |
| API `.csproj` | นิยาม application ที่ถูกทดสอบ หรือ System Under Test (SUT) |
| `Program.cs` | entry point และจุดประกอบ services/middleware/endpoints |
| Test `.csproj` | นิยาม test framework, testing packages และ ProjectReference |
| `*Tests.cs` | test source ที่มี `[Fact]` หรือ `[Theory]` |
| `obj/` | restore/build intermediate artifacts เช่น `project.assets.json` |
| `bin/` | assembly และ runtime files ที่พร้อมให้ test runner โหลด |

## Dependency สามชั้นที่ชื่อคล้ายกัน

```xml
<PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" Version="10.0.10" />
<ProjectReference Include="../../src/MyApi/MyApi.csproj" />
```

```csharp
using Microsoft.AspNetCore.Mvc.Testing;
```

- `PackageReference` เพิ่ม external dependency จาก NuGet
- `ProjectReference` ทำให้ test project อ้างอิง API project และกำหนด build order `API -> Test`
- `using` ไม่ติดตั้ง dependency แต่ช่วยเรียกชื่อ type ใน namespace ได้สั้นลง

ทิศของ `ProjectReference` เป็นทางเดียว:

```text
Test project -> API project
API project  -X-> Test project
```

## ทำไม test ต้องเห็น `Program`

ASP.NET Core template สมัยใหม่ใช้ top-level statements จึงไม่เห็น `class Program` ใน source:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Run();
```

C# compiler สร้าง entry-point `Program` ให้อยู่เบื้องหลัง แต่ test project ต้องเข้าถึง type นี้เพื่อใช้เป็นเครื่องหมายบอกว่า factory ต้องเปิด application ใด:

```csharp
WebApplicationFactory<Program>
```

วิธีหนึ่งที่เอกสาร ASP.NET Core แนะนำคือเพิ่มใต้ `app.Run()`:

```csharp
public partial class Program
{
}
```

`public` เปิดให้ test project เห็น ส่วน `partial` รวม declaration นี้กับ `Program` ที่เกิดจาก top-level statements ไม่ได้สร้าง application ตัวที่สอง

## xUnit fixture คืออะไร

fixture คือ object หรือสภาพแวดล้อมที่ต้องเตรียมให้ test ใช้ เช่น test server, database หรือ application factory

```csharp
public class HealthEndpointTests
    : IClassFixture<WebApplicationFactory<Program>>
```

เครื่องหมาย `:` ตามด้วย interface หมายถึง class นี้ implement interface นั้น ส่วน Generic type argument บอกว่า fixture คือ `WebApplicationFactory<Program>`

xUnit ใช้ constructor เป็นช่องทางส่ง fixture reference:

```csharp
private readonly WebApplicationFactory<Program> _factory;

public HealthEndpointTests(WebApplicationFactory<Program> factory)
{
    _factory = factory;
}
```

ก่อนเข้า constructor body parameter `factory` ได้รับ reference แล้ว บรรทัด `_factory = factory` เพียงเก็บ reference เดิมลง field เพื่อให้ test methods ใช้ได้ ไม่ได้สร้าง factory ใหม่

โดยทั่วไป xUnit สร้าง test class instance ใหม่สำหรับแต่ละ test แต่ `IClassFixture<T>` instance เดียวถูกใช้ร่วมกันระหว่าง tests ใน class แล้วถูก dispose เมื่อ tests ใน class เสร็จ

## Tiny example

```csharp
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

public class HealthEndpointTests
    : IClassFixture<WebApplicationFactory<Program>>
{
    private record class HealthResponse(string Status);

    private readonly WebApplicationFactory<Program> _factory;

    public HealthEndpointTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetHealth_ReturnsOkResponse()
    {
        var client = _factory.CreateClient(
            new WebApplicationFactoryClientOptions
            {
                BaseAddress = new Uri("https://localhost"),
            });

        var response = await client.GetAsync("/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<HealthResponse>();

        Assert.NotNull(body);
        Assert.Equal("ok", body.Status);
    }
}
```

`BaseAddress` เป็น HTTPS เพื่อไม่ให้ `UseHttpsRedirection()` พยายาม redirect หรือเตือนเรื่อง HTTPS port ระหว่าง test แต่ request ยังวิ่งผ่าน in-memory handler ไป TestServer ไม่ได้ตรวจ certificate หรือเปิด `localhost` ผ่าน network จริง

## ตอน `dotnet test` เริ่มอ่านจากไฟล์ไหน

คำตอบสั้นคือ **เริ่มจากชั้น tooling ก่อน แล้วจึงเข้า code ของ test และ application** ไม่ได้เปิด `.cs` ทุกไฟล์ตามลำดับชื่อ

### ช่วงที่ 1: เลือก SDK และอ่าน test project

สมมติรันจาก directory tree ของ `global.json`:

```powershell
dotnet test tests/MyApi.Tests/MyApi.Tests.csproj
```

ลำดับเชิงแนวคิด:

```text
1. dotnet entry point เริ่มจาก current working directory
2. ค้น global.json จาก current directory ย้อนขึ้น parent เพื่อเลือก SDK
3. อ่าน test .csproj ที่ระบุใน command
4. อ่าน TargetFramework, PackageReference, Using และ ProjectReference
5. restore dependency graph เมื่อจำเป็น แล้วบันทึกข้อมูลกลางไว้ใน obj/project.assets.json
```

test `.csproj` จึงเป็น project entry ของคำสั่งนี้ ส่วน `global.json` ถูกใช้ก่อนเพื่อเลือกเครื่องมือที่จะอ่านและ build project

### ช่วงที่ 2: Build ตาม dependency graph

```text
6. พบ ProjectReference จาก Test -> API
7. อ่าน API .csproj และ compile API source รวม Program.cs เป็น API assembly
8. compile test source เช่น HealthEndpointTests.cs เป็น test assembly
9. เขียน assemblies/dependency files ที่ต้องใช้ลง bin/<Configuration>/<TargetFramework>/
```

API ถูก build ก่อน test เพราะเป็น dependency ไม่ใช่เพราะชื่อโฟลเดอร์ `src` มาก่อน `tests`

### ช่วงที่ 3: Test platform และ xUnit discovery

```text
10. Microsoft.NET.Test.Sdk เริ่ม test platform
11. xunit.runner.visualstudio adapter โหลด test assembly
12. xUnit discover test metadata เช่น [Fact] และ [Theory]
13. test ที่ถูก skip/filter จะไม่เข้าสู่ test body
```

xUnit discover จาก compiled assembly ไม่ได้กลับมาอ่าน `HealthEndpointTests.cs` แบบ interpreter การเห็นชื่อ method ใน detailed logger มาจาก metadata ที่ compiler ใส่ไว้ใน assembly

### ช่วงที่ 4: สร้าง fixture และ test class

สำหรับ test ที่ใช้ `IClassFixture<WebApplicationFactory<Program>>`:

```text
14. xUnit เห็น fixture type WebApplicationFactory<Program>
15. xUnit สร้าง factory instance
16. xUnit สร้าง HealthEndpointTests instance
17. ส่ง factory reference เข้า constructor
18. constructor เก็บ reference ลง _factory
19. xUnit เรียก method ที่มี [Fact]
```

`Program` ใน Generic ไม่ใช่ runtime value แต่เป็น type ที่ช่วย factory หา entry-point assembly ของ SUT

### ช่วงที่ 5: เริ่ม ASP.NET Core application ใน TestServer

เมื่อ test เรียก:

```csharp
_factory.CreateClient(...)
```

จึงเกิด application startup:

```text
20. WebApplicationFactory bootstrap application จาก Program entry point
21. CreateBuilder(args) เตรียม host, configuration, logging และ DI
22. AddControllers() ลงทะเบียน controller services
23. Build() ประกอบ WebApplication
24. Use... และ MapControllers() ประกอบ pipeline/endpoints
25. TestServer พร้อมรับ request และ factory คืน HttpClient
```

`dotnet test` ไม่ใช้ `launchSettings.json` เพื่อเปิด Kestrel profile ตาม `dotnet run`, ไม่จอง port จาก `applicationUrl` และไม่ต้องใช้ development certificate

### ช่วงที่ 6: Request และ assertion

```text
26. GetAsync("/health") สร้างและส่ง HTTP request
27. HttpClient handler ส่ง request เข้า TestServer ใน process
28. middleware/routing หา Controller และ Action ที่ตรงกัน
29. Action คืน C# object
30. ASP.NET Core serialize object เป็น JSON response
31. await นำ HttpResponseMessage ที่เสร็จแล้วมาใส่ response
32. assertion ตรวจ status code
33. ReadFromJsonAsync<HealthResponse>() แปลง JSON เป็น record instance
34. assertion ตรวจ body.Status
35. Task ของ test เสร็จ แล้ว xUnit ตัดสิน PASS/FAIL
36. เมื่อ class fixture หมดอายุ factory ปิด application/TestServer และ dispose resource
```

สรุปเส้นทางไฟล์และ runtime:

```text
global.json
-> Test.csproj
-> API.csproj ผ่าน ProjectReference
-> compile API/Test assemblies
-> xUnit discover [Fact] จาก test assembly
-> fixture/constructor
-> Program entry point ผ่าน WebApplicationFactory
-> TestServer
-> Controller
-> response/assertion
```

## `async`, `Task` และ `await` ใน test

`HttpClient.GetAsync()` คืน `Task<HttpResponseMessage>` เพราะ response ยังไม่พร้อมทันที:

```csharp
var response = await client.GetAsync("/health");
```

`await` รอแบบไม่ block thread ตามรูปแบบ synchronous ตรง ๆ แล้วนำ `HttpResponseMessage` ที่เสร็จมาให้ตัวแปร `response` ส่วน test method คืน `Task` เพื่อให้ xUnit รอจน test และ assertions ทำงานเสร็จ

## record ไม่ใช่ field

```csharp
private record class HealthResponse(string Status);
```

บรรทัดนี้ประกาศ nested type แต่ยังไม่สร้าง instance ต่างจาก:

```csharp
private string _data = "ok";
```

ซึ่งประกาศ field และกำหนดค่า การสร้าง `HealthResponse` instance ใน test เกิดจาก JSON deserializer:

```csharp
ReadFromJsonAsync<HealthResponse>()
```

JSON web defaults จับ `status` กับ C# property `Status` แบบไม่สนตัวพิมพ์เล็ก/ใหญ่

## `[Fact]`, `[Theory]` และจำนวน test

- `[Fact]` ทำเครื่องหมาย method ที่เป็น test case เดี่ยว
- `[Theory]` ใช้ test logic เดียวกับข้อมูลหลายชุด แต่ละข้อมูลอาจกลายเป็นคนละ test case
- `dotnet test` ที่ไม่มี filter จะรันทุก test case ที่ discover ได้ใน project เป้าหมาย
- `[Fact(Skip = "เหตุผล")]` ถูก discover แต่รายงานเป็น skipped
- อย่าพึ่งลำดับระหว่าง test cases; แต่ละ test ควรเตรียมเงื่อนไขและตรวจผลของตัวเอง

## Negative control

การเห็น test PASS อย่างเดียวอาจยังไม่พิสูจน์ว่า assertion ที่ต้องการถูกเรียก Negative control คือทำให้เงื่อนไขที่ test ต้องจับผิดชั่วคราว เช่นให้ API คืน `status = "down"` ขณะที่ test ยังคาด `"ok"`

ผลที่ต้องเห็น:

```text
Expected: "ok"
Actual:   "down"
```

จากนั้นต้องคืน source ให้ถูกต้องและรัน green test ซ้ำ ห้ามทิ้ง repository ไว้ในสถานะที่ test ตั้งใจ fail

## จุดที่มักงง

- `IClassFixture<T>` บอก xUnit ให้เตรียม fixture แต่ไม่ได้เติม field ให้อัตโนมัติ ต้องรับทาง constructor และ assign reference
- `WebApplicationFactory` มาจาก NuGet package `Microsoft.AspNetCore.Mvc.Testing` ไม่ได้มาจาก xUnit
- `using` ไม่ได้ติดตั้ง package
- `ProjectReference` เป็นทางเดียวจาก test ไป API
- `CreateClient()` ยังไม่ใช่ HTTP request; request เริ่มเมื่อเรียก `GetAsync()`, `PostAsync()` หรือ method ส่ง request อื่น
- Integration test ผ่านไม่ได้แปลว่า production port, reverse proxy, TLS certificate หรือ deployment ผ่าน
- test ที่ตรวจแค่ `200` ยังไม่รับประกันว่า JSON body ถูกต้อง

## เช็กตัวเอง

1. เพราะเหตุใด `ProjectReference` อย่างเดียวยังยิง HTTP test ไม่ได้
2. `public partial class Program` ช่วย `WebApplicationFactory<Program>` อย่างไร
3. fixture instance เข้า `_factory` ผ่านลำดับใด
4. `CreateClient()` กับ `GetAsync()` เริ่มงานคนละส่วนอย่างไร
5. `record HealthResponse` เป็น type หรือ instance และ instance ถูกสร้างตอนไหน
6. เพราะเหตุใด `dotnet test` จึงไม่อ่าน `launchSettings.json` เพื่อเปิด port แบบ `dotnet run`

## สรุปจำสั้น ๆ

```text
ProjectReference = Test รู้จัก API
Mvc.Testing       = Factory + TestServer
IClassFixture     = xUnit เตรียมของใช้ร่วมใน test class
constructor       = ช่องรับ fixture reference
CreateClient      = เปิด app สำหรับ test และสร้าง client
GetAsync          = ส่ง request
ReadFromJsonAsync = แปลง JSON เป็น C# object
dotnet test       = SDK/project/build -> discovery -> fixture -> Program -> request -> assertion
```

## อ้างอิงทางการ

- [Integration tests in ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/integration-tests)
- [Unit testing C# with xUnit and dotnet test](https://learn.microsoft.com/dotnet/core/testing/unit-testing-csharp-with-xunit)
- [dotnet test](https://learn.microsoft.com/dotnet/core/tools/dotnet-test)
