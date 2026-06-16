# File Backup Safety

บทนี้สรุป flow ความปลอดภัยของงาน file processing จาก `ApoRaviz_Tools/split-order-txt`: ถ้าทำสำเร็จค่อยย้าย input ไป backup ถ้า fail ให้ input อยู่ที่เดิม

## ภาพจำง่าย ๆ

เหมือนจัดเอกสารหน้าร้าน:

```text
input/  = ถาดเอกสารรอทำ
output/ = ถาดงานที่ทำเสร็จ
backup/ = แฟ้มเก็บต้นฉบับหลังทำสำเร็จ
```

กติกาสำคัญ:

```text
ทำสำเร็จ -> output พร้อม -> ย้ายต้นฉบับไป backup
ทำไม่สำเร็จ -> อย่าย้ายต้นฉบับ
```

## Technical Term

```text
fs = file system API ของ Node.js
mkdir = สร้าง folder
stat = ตรวจว่า file/folder มีอยู่ไหม
rename = ย้ายหรือเปลี่ยนชื่อ file
backup = สำเนาหรือที่เก็บไฟล์ต้นฉบับหลัง process สำเร็จ
sanitize = ทำชื่อไฟล์ให้ปลอดภัยต่อ filesystem
```

## Core Flow

```text
1. หา input file
2. ตรวจ input มีอยู่จริง
3. สร้าง output folder ถ้ายังไม่มี
4. process input
5. เขียน output ให้ครบ
6. ถ้าสำเร็จและเปิด backup ไว้ ให้ย้าย input ไป backup
7. ถ้า error ให้ input อยู่ที่เดิม
```

ตัวอย่างแนวคิด:

```ts
async function processFile(options: Options) {
  await ensureFileExists(options.inputPath);
  await mkdir(options.outputDir, { recursive: true });

  try {
    await splitAndWriteOutputs(options);

    if (options.shouldBackup) {
      await moveToBackup(options.inputPath, options.backupDir);
    }
  } catch (error) {
    // input file ต้องยังอยู่ที่เดิม เพื่อให้แก้แล้วรันใหม่ได้
    throw error;
  }
}
```

## ทำไม backup ต้องหลัง output สำเร็จ

ถ้าย้าย input ก่อน แล้ว process fail:

```text
input หายจากถาดรอทำ
output ไม่ครบ
user ไม่รู้ว่าต้องเอาไฟล์ไหนไปรันใหม่
```

ดังนั้นลำดับที่ปลอดภัยคือ:

```text
validate -> write output -> close files -> backup input
```

## สร้างชื่อ backup ไม่ให้ชนกัน

ควรมี timestamp หรือ suffix:

```text
order.txt
-> order-20260616-153000.txt
```

แนวคิด:

```ts
function createBackupName(fileName: string, timestamp: string) {
  return `${timestamp}-${fileName}`;
}
```

ถ้า filename มาจากข้อมูลภายในไฟล์ ควร sanitize:

```ts
function sanitizeFileName(value: string) {
  return value.replace(/[<>:"/\\|?*]/g, '_');
}
```

## ENOENT คืออะไร

`ENOENT` คือ error ของ filesystem ที่มักแปลว่า:

```text
No such file or directory
```

เจอบ่อยเมื่อ:

- path ผิด
- input file ไม่มีจริง
- folder ยังไม่ถูกสร้าง

ควรเปลี่ยนเป็น message ที่อ่านง่าย เช่น:

```text
ไม่พบไฟล์ input ที่ระบุ กรุณาตรวจ path แล้วรันใหม่
```

## จุดที่มักงง

- backup ไม่ใช่ output แต่เป็นที่เก็บ input ต้นฉบับหลัง process สำเร็จ
- ถ้า fail ไม่ควรย้าย input
- `mkdir({ recursive: true })` ช่วยสร้าง folder ซ้อนกันได้
- `rename()` ใช้ย้ายไฟล์ได้ใน filesystem เดียวกัน
- filename จาก user หรือข้อมูลในไฟล์ต้อง sanitize ก่อนใช้จริง

## Self-check

ลองตอบเอง:

1. ทำไมต้องย้าย input ไป backup หลังเขียน output สำเร็จ
2. ถ้า process fail input ควรอยู่ที่ไหน
3. `ENOENT` มักแปลว่าอะไร
4. ทำไม filename ต้อง sanitize
5. `mkdir({ recursive: true })` ช่วยอะไร

## สรุปจำสั้น ๆ

```text
file processing ที่ดี = output สำเร็จก่อน backup, fail แล้ว input ต้องยังอยู่
```

