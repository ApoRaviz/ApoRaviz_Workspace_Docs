# ASP.NET Core Learning Hub

หน้านี้รวมความรู้พื้นฐานสำหรับสร้าง HTTP API ด้วย C#, .NET และ ASP.NET Core

## เริ่มอ่านจากตรงไหน

1. [Foundations & Project Structure](foundations-and-project-structure.md) — แยก C#/.NET/ASP.NET Core, SDK/Runtime/Target Framework, request flow และ File Map
2. [dotnet CLI Commands](commands.md) — สร้าง ตรวจ build และรัน project พร้อมความหมายของ option
3. [Integration Test ด้วย xUnit และ WebApplicationFactory](integration-testing-with-xunit.md) — แยก xUnit/Test SDK/TestServer และตาม flow `dotnet test` ตั้งแต่ project ถึง assertion
4. [Web Service, Web API และ REST](../backend/concepts/web-service-and-web-api.md) — แยกคำที่ชื่อคล้ายกัน
5. [HTTPS, TLS และ Certificate](../backend/concepts/https-tls-certificate.md) — ภาพรวมความเชื่อถือก่อน HTTP request ไปถึง Controller

## ภาพจำสั้น ๆ

```text
C#           = ภาษาที่เราใช้เขียน
.NET         = platform, runtime, libraries และเครื่องมือ
ASP.NET Core = web framework บน .NET
dotnet CLI   = command-line tool สำหรับสร้าง restore build test และ run
```

## ขอบเขตของชุดนี้

ชุดนี้ปูพื้นฐาน controller-based Web API และโครงสร้าง project ก่อน ยังไม่ลง database, authentication หรือ production deployment
