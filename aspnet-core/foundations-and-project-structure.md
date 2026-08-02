# C#, .NET และ ASP.NET Core: Foundations & Project Structure

## ภาพจำก่อน

นึกถึงการเปิดร้านอาหาร:

```text
C#                 = ภาษาที่ทีมครัวใช้สื่อสารและเขียนสูตร
.NET SDK            = ชุดเครื่องมือสร้างร้านและประกอบเมนู
.NET Runtime        = เครื่องจักรที่ใช้เปิดร้านและรันงานที่สร้างแล้ว
ASP.NET Core        = ระบบหน้าร้านสำหรับรับ request และส่ง response
Controller          = จุดรับ order ตาม route
Model               = รูปร่างข้อมูลที่ส่งต่อหรือส่งกลับ
```

สิ่งเหล่านี้เกี่ยวกัน แต่ไม่ใช่สิ่งเดียวกัน

## C#, .NET และ ASP.NET Core ต่างกันอย่างไร

| คำ | คืออะไร | ตัวอย่างหน้าที่ |
|---|---|---|
| C# | programming language | เขียน class, method, property และเงื่อนไข |
| .NET | development platform | ให้ runtime, base libraries, SDK และ tooling |
| ASP.NET Core | web framework บน .NET | routing, middleware, controller, model binding และ HTTP response |
| `dotnet` | CLI ของ .NET | `new`, `restore`, `build`, `test`, `run` |

การเลือก `.NET 10.0` ในหน้า Framework ของ Visual Studio หมายถึง project จะ target `net10.0` โดย Visual Studio ต้องมี SDK ที่รองรับติดตั้งอยู่จึงสร้างและ build ได้

## SDK, Runtime และ Target Framework

สามคำนี้ตอบคนละคำถาม:

```text
SDK              = เครื่องนี้ใช้อะไรสร้าง/build/test project
Runtime          = เครื่องนี้มีอะไรสำหรับรัน application
Target Framework = project ถูกออกแบบให้ใช้ API/runtime contract รุ่นใด
```

project ที่ target `net10.0` ต้องใช้ SDK ที่รองรับ `net10.0` เพื่อ build แต่เลข patch ไม่จำเป็นต้องตรงกันทุกหลัก เช่น SDK `10.0.302` สามารถ build target `net10.0` ได้ ส่วนเครื่อง production ต้องมี runtime ที่เข้ากันได้ หรือ publish แบบ self-contained ซึ่งรวม runtime ไปกับ application

## `global.json` ทำหน้าที่อะไร

`global.json` ช่วยเลือก .NET SDK สำหรับ directory tree หนึ่ง:

```json
{
  "sdk": {
    "version": "10.0.302",
    "rollForward": "latestPatch"
  }
}
```

สำหรับคำสั่ง CLI ทั่วไป ตัว `dotnet` entry point เริ่มค้น `global.json` จาก current working directory แล้วย้อนขึ้นไปยัง parent directory ส่วน MSBuild SDK resolver ตอน build เริ่มจาก directory ของ solution หรือ project ตามสิ่งที่กำลัง build

กรณีสำคัญ: ถ้า current working directory อยู่นอก directory tree ของ `global.json` การสั่ง `dotnet build path/to/App.csproj` อาจเลือก SDK ไปแล้วก่อนถึงขั้น resolve project ทำให้ pin ถูกข้ามได้ แม้ `.csproj` จะอยู่ใต้ `global.json` ก็ตาม วิธีใช้งานที่ชัดและย้ายเครื่องได้คือ `cd` เข้า directory tree ที่มี `global.json`, ตรวจ `dotnet --version`, แล้วจึง build/run project จากตรงนั้น

`latestPatch` เลือก patch สูงสุดที่ติดตั้งซึ่งอยู่ใน major/minor/feature band เดียวกันและมี version ไม่น้อยกว่าที่ระบุ ถ้าไม่พบจะ fail; ไม่ได้อัปเกรดข้าม feature band หรือ major version

## NuGet restore ไม่ได้แปลว่าย้อนโค้ด

คำว่า restore ในบริบท NuGet หมายถึง:

```text
อ่าน project และ package references
-> คำนวณ dependency graph
-> ใช้ package cache หรือดาวน์โหลด package ที่ขาด
-> สร้างข้อมูลใน obj/ ที่ build ต้องใช้
```

จึงคล้ายส่วนหนึ่งของ `npm install` มากกว่าคำสั่ง Git restore และไม่ได้ย้อน source code ไปยังเวอร์ชันก่อนหน้า

แม้ `.csproj` จะไม่มี `<PackageReference>` ที่เขียนเอง Web SDK ก็ยังต้อง resolve framework references และสร้าง restore artifacts ให้พร้อม build

## Request flow ของ controller-based Web API

```text
client ส่ง HTTP request
-> Kestrel รับ connection
-> middleware pipeline ทำงานตามลำดับ
-> routing หา Controller/Action ที่ตรงกัน
-> Action คืน C# object
-> ASP.NET Core serialize object เป็น JSON
-> ส่ง HTTP response กลับ client
```

การ return object จาก Controller ไม่ได้แปลว่า C# object เป็น JSON อยู่แล้ว JSON เกิดภายหลังเมื่อ ASP.NET Core เลือก output formatter และ serialize response ตาม HTTP pipeline

## อ่าน `Program.cs`

controller-based template มักมีโครงแบบนี้:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

| บรรทัด | ความหมาย |
|---|---|
| `CreateBuilder(args)` | เตรียม configuration, logging, dependency container และ host |
| `AddControllers()` | ลงทะเบียน services ที่ controller-based API ต้องใช้ |
| `Build()` | ประกอบ application จาก configuration/services ที่เตรียมไว้ |
| `UseHttpsRedirection()` | เพิ่ม middleware ที่ redirect HTTP ไป HTTPS เมื่อรู้ HTTPS port |
| `UseAuthorization()` | เพิ่ม authorization middleware; ไม่ได้สร้าง policy/authentication ให้เองทั้งหมด |
| `MapControllers()` | นำ attribute routes ใน Controllers มาเป็น endpoints |
| `Run()` | เริ่ม host และรอรับ request จน application ถูกสั่งปิด |

ลำดับ middleware มีผลต่อ behavior เพราะ request เดินจากบนลงล่าง และ response เดินย้อนกลับผ่าน middleware ที่เรียก `next`

## Controller และ attributes

```csharp
[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Product> Get()
    {
        return products;
    }
}
```

- `[ApiController]` เปิด behavior ที่เหมาะกับ HTTP API เช่น automatic model-validation response บางกรณี
- `[Route("[controller]")]` ใช้ชื่อ Controller ตัดคำว่า `Controller` เป็น route token; `ProductsController` จึงได้ `/products`
- `[HttpGet]` ผูก action กับ HTTP GET
- `ControllerBase` มีความสามารถพื้นฐานของ API controller โดยไม่มี view support แบบ MVC controller เต็ม
- `IEnumerable<Product>` คือผลลัพธ์เป็นลำดับของ `Product`; `<Product>` ระบุชนิดสมาชิก ไม่ใช่ runtime value

## Generic แบบย่อ

Generic ใช้ type เป็นช่องว่างที่สัมพันธ์กัน:

```csharp
T Keep<T>(T value)
{
    return value;
}
```

เมื่อเรียก `Keep<int>(42)`, `T` ถูกแทนด้วย `int` สำหรับการเรียกนั้น จึงบังคับทั้ง parameter และ return type ให้สัมพันธ์กัน

Generic ไม่ควรถูกใช้เพียงเพื่อทำให้ code ดูยืดหยุ่น ข้อเสียเมื่อใช้เกินจำเป็นคือ signature อ่านยากขึ้น, error message ซับซ้อนขึ้น, constraint อาจต้องเพิ่ม และบางกรณี concrete type หรือ overload ธรรมดาสื่อ intent ได้ชัดกว่า

## Property, computed property, nullable และ LINQ

```csharp
public DateOnly Date { get; set; }
public int TemperatureC { get; set; }
public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
public string? Summary { get; set; }
```

- `{ get; set; }` คือ property ที่อ่านและเขียนได้
- `=>` ตรง property คือค่าที่คำนวณตอนอ่าน ไม่มี storage แยกของตัวเอง
- `string?` ยอมให้ค่าเป็น `null` เมื่อ nullable reference types เปิดอยู่
- LINQ เช่น `.Select(...)` แปลงสมาชิกแต่ละตัวใน sequence; `.ToArray()` materialize ผลเป็น array

## File Map

### ภาพรวมเป็นต้นไม้

```text
backend-dotnet/
├─ global.json
└─ src/
   └─ MyApi/
      ├─ MyApi.csproj
      ├─ Program.cs
      ├─ Controllers/
      ├─ ExampleModel.cs
      ├─ appsettings.json
      ├─ appsettings.Development.json
      ├─ Properties/
      │  └─ launchSettings.json
      ├─ MyApi.http
      ├─ obj/
      └─ bin/
```

### ไฟล์/โฟลเดอร์ → หน้าที่

| ไฟล์/โฟลเดอร์ | หน้าที่ |
|---|---|
| `global.json` | เลือก SDK สำหรับพื้นที่ใต้ตำแหน่งที่วางไฟล์ |
| `.csproj` | นิยามว่า project สร้างอย่างไร ใช้ SDK ใดและ target Framework ใด |
| `Program.cs` | จุดเริ่มต้นและจุดประกอบ ASP.NET Core application |
| `Controllers/` | รับ HTTP request ผ่าน Controller/Action และ attribute routing |
| model `.cs` | class หรือ record ที่นิยามรูปร่างข้อมูล |
| `appsettings*.json` | configuration ของ application โดยไฟล์ตาม environment สามารถ override ค่าฐานได้ |
| `Properties/launchSettings.json` | local launch profiles สำหรับ tooling เช่น URL และ environment ตอน `dotnet run` |
| `.http` | ตัวอย่าง HTTP requests สำหรับ editor; ไม่ถูกเรียกอัตโนมัติเมื่อ application รัน |
| `obj/` | restore/build intermediate artifacts สร้างใหม่ได้ ไม่ใช่ source of truth |
| `bin/` | build output เช่น DLL สร้างใหม่ได้ ไม่ใช่ source of truth |

`.http` file ลบได้ถ้าไม่ใช้ แต่การลบต้องเป็นการตัดตัวอย่าง request ออก ไม่ได้เปลี่ยน route ใน application

## Configuration layering

ค่า configuration มักถูกรวมหลายแหล่ง ตัวอย่างลำดับที่พบบ่อย:

```text
appsettings.json
-> appsettings.{Environment}.json override
-> environment variables override
-> command-line arguments override
```

`launchSettings.json` ใช้กับ local tooling และไม่ได้ถูก publish เป็น production configuration source โดยตรง ส่วน `AllowedHosts` เกี่ยวกับ Host header filtering ไม่ใช่ CORS allow-list

## ตอน `dotnet run` เริ่มจากไฟล์ไหนก่อน

คำตอบสั้นคือ **เริ่มที่ `global.json`/`.csproj` ในชั้นเครื่องมือ แล้วเริ่ม code application ที่ `Program.cs`** แต่ระบบไม่ได้เปิด source files ตามลำดับตรง ๆ ทุกครั้ง ต้องแยกสองช่วง

### ช่วงที่ 1: `dotnet` เตรียม project และ process

```text
1. dotnet entry point เลือก SDK โดยใช้ global.json ที่เข้า scope
2. อ่าน .csproj เพื่อรู้ Web SDK, Target Framework และวิธี build/run project
3. อ่าน launchSettings.json ของ profile ที่เลือก เพื่อเตรียม URL/environment variables
4. ถ้าไม่ได้ใช้ --no-build: restore/build และ compile source .cs เป็น assembly
5. ถ้าใช้ --no-build: ข้าม build/restore แล้วใช้ assembly เดิมใน bin/
6. เปิด process ของ application
```

`launchSettings.json` จึงถูก tooling ใช้ **ก่อน** application เริ่ม แต่ไม่ใช่ entry point ของ C# code

### ช่วงที่ 2: application startup

```text
1. runtime เข้า compiler-generated Main จาก top-level statements ใน Program.cs
2. CreateBuilder(args) เตรียม host, logging, DI และโหลด configuration
3. appsettings.json เป็นค่าฐาน
4. appsettings.{Environment}.json override ตาม environment
5. environment variables และ command-line configuration override ตามลำดับ provider
6. AddControllers() ลงทะเบียนความสามารถของ Controller ใน DI/services
7. Build() ประกอบ WebApplication
8. Use... และ MapControllers() ประกอบ request pipeline/endpoints ตามลำดับ code
9. Run() เริ่ม Kestrel และรอ request
```

template สมัยใหม่ไม่เขียน `static Main()` ให้เห็น เพราะ C# top-level statements ใน `Program.cs` ถูก compiler สร้างเป็น entry-point method ให้

### ตอน request แรกมาถึง

```text
Kestrel
-> middleware ตามลำดับใน Program.cs
-> routing/endpoint ที่ MapControllers() เตรียมไว้
-> สร้าง/resolve Controller และ dependency ที่ต้องใช้
-> เรียก Action ที่ route ตรงกัน
-> serialize ผลเป็น HTTP response เช่น JSON
```

ดังนั้นตอน server เริ่ม `AddControllers()` และ `MapControllers()` ยังไม่ได้เรียก action เช่น `Get()`; action จะทำงานเมื่อมี request ที่ตรง route เท่านั้น

## จุดที่มักงง

- SDK ไม่ใช่ .NET ทั้งหมด แต่เป็นชุดเครื่องมือสำหรับพัฒนา
- Target Framework ไม่ใช่เลข SDK ที่บังคับให้ตรง patch ทุกหลัก
- NuGet restore ไม่ได้ย้อน source code
- return C# object ไม่ใช่ return JSON โดยตรง; framework serialize ภายหลัง
- `launchSettings.json` ไม่ใช่ configuration หลักของ production
- `bin/` และ `obj/` เป็น generated output ควร ignore ใน Git
- Middleware อาจตอบ response ก่อนถึง Controller ได้ เช่น HTTPS redirect

## สรุปจำสั้น ๆ

```text
SDK สร้าง -> Runtime รัน -> Target Framework กำหนด contract
Program.cs ประกอบ app -> middleware เดินตามลำดับ -> Controller คืน object -> framework แปลงเป็น JSON
source/config ต้องเก็บ -> bin/obj สร้างใหม่ได้
```

## อ้างอิงทางการ

- [.NET `global.json` overview](https://learn.microsoft.com/dotnet/core/tools/global-json)
- [`dotnet restore`](https://learn.microsoft.com/dotnet/core/tools/dotnet-restore)
- [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run)
- [C# top-level statements](https://learn.microsoft.com/dotnet/csharp/fundamentals/program-structure/top-level-statements)
- [ASP.NET Core fundamentals](https://learn.microsoft.com/aspnet/core/fundamentals/)
