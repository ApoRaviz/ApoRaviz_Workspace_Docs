# CLI Arguments and Errors

บทนี้สรุปวิธีคิดของ Node.js CLI จาก `ApoRaviz_Tools/split-order-txt`: รับ argument จาก terminal, แปลงเป็น options, เรียก core logic, แล้วรายงาน error ให้คนใช้เข้าใจ

## ภาพจำง่าย ๆ

CLI เหมือนพนักงานรับใบงานหน้าเคาน์เตอร์:

```text
terminal argument = ใบงานที่ user ยื่นมา
parser            = คนอ่านใบงาน
options           = รายละเอียดงานที่ส่งให้ระบบทำ
core logic        = คนทำงานจริง
```

## Technical Term

```text
CLI = Command Line Interface
argument = ค่าที่ส่งมากับคำสั่ง
flag = option ที่ขึ้นต้นด้วย -- เช่น --output
process.argv = array argument ที่ Node.js ได้รับ
exitCode = รหัสจบโปรแกรม 0 คือสำเร็จ ไม่ใช่ 0 คือมีปัญหา
custom error = Error class เฉพาะของโปรแกรม
```

## process.argv คืออะไร

ตัวอย่างคำสั่ง:

```bash
npm run start -- input/order.txt --output output --no-backup
```

ใน Node.js เรามักอ่าน argument แบบนี้:

```ts
const args = process.argv.slice(2);
```

เพราะสองตัวแรกมักเป็น path ของ node และ path ของ script

```text
process.argv[0] = node
process.argv[1] = script file
process.argv[2] = argument ตัวแรกของ user
```

## แปลง args เป็น options

ตัวอย่างแนวคิด:

```ts
interface CliOptions {
  inputPath?: string;
  outputDir: string;
  backupDir: string;
  shouldBackup: boolean;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    outputDir: 'output',
    backupDir: 'backup',
    shouldBackup: true,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--no-backup') {
      options.shouldBackup = false;
      continue;
    }

    if (arg === '--output') {
      options.outputDir = args[index + 1];
      index += 1;
      continue;
    }

    if (!options.inputPath) {
      options.inputPath = arg;
    }
  }

  return options;
}
```

แนวคิดสำคัญ:

- ตั้ง default ก่อน
- อ่าน flag ทีละตัว
- flag ที่ต้องมีค่าต่อท้าย เช่น `--output output` ต้องขยับ index
- argument ที่ไม่ใช่ flag อาจเป็น input path

## Error ที่คนใช้เข้าใจ

ควรแยก error ที่เราคาดไว้กับ error ที่ไม่คาดไว้

```ts
class SplitOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SplitOrderError';
  }
}
```

ใน `main()`:

```ts
try {
  await runCli();
} catch (error) {
  if (error instanceof SplitOrderError) {
    console.error(error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
```

ข้อดี:

- error ที่ user แก้เองได้ แสดงข้อความอ่านง่าย
- error แปลก ๆ ยัง throw ออกมาให้ debug ได้
- ใช้ `process.exitCode = 1` เพื่อบอกว่าโปรแกรมจบแบบไม่สำเร็จ

## แยก CLI ออกจาก core logic

โครงที่ดี:

```text
index.ts       = รับ args, แสดง message, ตั้ง exitCode
splitter.ts    = ทำ business logic
parser.ts      = parse line
writer.ts      = เขียน output/backup
```

เหตุผล:

- core logic test ง่าย
- อนาคต NestJS service เรียก logic เดิมได้
- UI หรือ backend ไม่ต้องรู้ว่า CLI args หน้าตาเป็นอย่างไร

## จุดที่มักงง

- `npm run start -- input.txt` ต้องมี `--` เพื่อส่ง argument เข้า script
- `process.exitCode = 1` ต่างจาก `process.exit(1)` ตรงที่ไม่บังคับตัด process ทันที
- ไม่ควรให้ core logic อ่าน `process.argv` เอง
- error message ควรบอก user ว่าแก้ตรงไหน ไม่ใช่โชว์ stack trace อย่างเดียว

## Self-check

ลองตอบเอง:

1. ทำไมต้องใช้ `process.argv.slice(2)`
2. `--output output` ต่างจาก `--no-backup` อย่างไร
3. ทำไม core logic ไม่ควรอ่าน CLI args เอง
4. custom error ช่วยอะไร
5. `exitCode = 1` หมายความว่าอะไร

## สรุปจำสั้น ๆ

```text
CLI layer = รับคำสั่งจากคน
core layer = ทำงานจริง
แยกกันไว้ จะ test ง่าย และย้ายไป NestJS ได้ง่าย
```
