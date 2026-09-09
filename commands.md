# Commands Hub

หน้านี้เป็นสารบัญ command ที่ต้องเรียนรู้ใน workspace `ApoRaviz`

แยกอ่านตามเครื่องมือ:

- [Angular Commands](angular/commands.md)
- [Node.js Commands](nodejs/commands.md)
- [Docker Commands](docker/commands.md)
- [dotnet CLI Commands](aspnet-core/commands.md)
- [Git Commands](git/commands.md)
- [VitePress Commands](vitepress/commands.md)

## ควรอ่านลำดับไหน

ถ้าเริ่มจากศูนย์:

```text
1. Git Commands
2. VitePress Commands
3. Angular Commands
4. Node.js Commands
5. Docker Commands (เมื่อเริ่มใช้ container)
6. dotnet CLI Commands (เมื่อทำ C#/.NET backend)
```

เหตุผล:

- Git ใช้บันทึกและ push งานทุก repo
- VitePress ใช้ดูแล `ApoRaviz_Workspace_Docs`
- Angular ใช้สร้างและดูแล frontend app
- Node.js ใช้รัน CLI, file processing, tooling และ backend runtime
- Docker ใช้สร้างและจัดการ image, container, volume และ port mapping
- dotnet CLI ใช้สร้าง restore build test และ run .NET projects

## จำสั้น ๆ

```text
Git = จัดการ version และ push ขึ้น GitHub
VitePress = build Markdown ให้เป็นเว็บ docs
Angular = build app และ demo จริง
Node.js = run CLI, file processing, and backend tooling
Docker = run isolated services and persist data in volumes
dotnet = create, restore, build, test, and run .NET projects
```

