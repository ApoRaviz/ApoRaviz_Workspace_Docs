# Claude Code — คู่มือคำสั่งและความสามารถ (ฉบับละเอียด)

หน้านี้คือคู่มือที่ Claude เขียนอธิบายตัวเอง สำหรับเปิดอ่านเวลาทำงานกับ AI ใน workspace `ApoRaviz`

> รายการ built-in/skill ดึงจาก **docs ทางการ** (<https://code.claude.com/docs/en/commands>) — ของจริงในเครื่องคุณดูได้โดย **พิมพ์ `/` ในช่องแชท** แล้วเลื่อนเมนู (ต่างกันได้ตามเวอร์ชัน/plugin)

## ภาพจำ — มี 3 ชั้น อย่าสับสน

```text
slash command (/xxx) = "คุณ" พิมพ์เอง สั่งตัวโปรแกรม Claude Code
skill                = ความสามารถเฉพาะทาง Claude เรียกได้ (คุณพิมพ์ /ชื่อ เรียกเองก็ได้)
tool                 = ความสามารถพื้นฐานของ Claude เช่น อ่าน/แก้ไฟล์ รัน command
```

**เข้าใจผิดบ่อยสุด:** สแลชคอมมานด์ Claude กดเองไม่ได้ — คุณเป็นคนพิมพ์ ⭐ = ที่ได้ใช้บ่อยในงานจริง

---

# หมวด A — Built-in Slash Commands (คุณพิมพ์)

## A1. จัดการ Context & Session

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/clear [name]` | เริ่มบทสนทนาใหม่ context ว่าง — ใช้เมื่อขึ้นงานใหม่ที่ไม่เกี่ยวของเดิม |
| ⭐ `/compact [instructions]` | บีบอัดบทสนทนา เก็บบริบทสำคัญ — ใช้เมื่อ context ใกล้เต็มแต่ทำงานเดิมต่อ |
| ⭐ `/context [all]` | โชว์การใช้ context เป็นตารางสี — ดูก่อนตัดสินใจว่าจะ `/compact` ไหม |
| ⭐ `/rewind` | ย้อน **code + บทสนทนา** กลับไป checkpoint — undo ระดับ session |
| `/resume` | กลับเข้าบทสนทนาเก่าที่ค้างไว้ |
| `/branch [name]` | แตกบทสนทนาเป็นสายใหม่ ณ จุดปัจจุบัน |
| `/background [prompt]` | ปลดเซสชันไปรันเป็น background agent คืน terminal ให้ว่าง |
| `/tasks` | ดู background task ที่กำลังรันในเซสชัน |
| `/export [filename]` | export บทสนทนาเป็น text |
| `/copy [N]` | copy คำตอบล่าสุดของ Claude ไป clipboard |
| `/exit` | ออกจาก CLI |

## A2. โปรเจกต์ / Memory / ตั้งค่า

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/init` | สำรวจ repo แล้วสร้าง `CLAUDE.md` เป็นแผนที่โปรเจกต์ — ทำตอนเริ่ม repo ใหม่ |
| ⭐ `/memory` | แก้ `CLAUDE.md` + จัดการ auto-memory — เพิ่ม/ลบสิ่งที่ Claude จำ |
| ⭐ `/permissions` | ตั้ง allow/ask/deny ของ tool — ลดการถาม permission ซ้ำ |
| `/config [key=value]` | เปิด Settings หรือ set ค่า |
| `/hooks` | ดู hook ที่ผูกกับ event ของ tool (automation "ทุกครั้งที่ X ทำ Y") |
| `/add-dir <path>` | เพิ่มโฟลเดอร์ให้ Claude เข้าถึงไฟล์ในเซสชันนี้ |
| `/cd <path>` | ย้าย working directory ของเซสชัน |
| `/keybindings` | เปิดไฟล์คีย์ลัด |

## A3. โมเดล & ประสิทธิภาพ

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/model [model]` | สลับโมเดล + ตั้ง default — งานหนักใช้ Opus, งานเบาสลับรุ่นเบา |
| ⭐ `/usage` (alias `/cost`) | ดู token + ค่าใช้จ่ายเซสชันนี้ |
| `/fast [on\|off]` | เปิด/ปิด fast mode (Opus output เร็วขึ้น) |
| `/advisor [model\|off]` | เปิด/ปิดตัวช่วยความเห็นจากโมเดลที่สอง |
| `/heapdump` | เขียน heap snapshot ไว้ diagnose ปัญหา memory สูง |

## A4. โค้ด & ตรวจสอบ

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/diff` | เปิด diff viewer ดูการแก้ที่ยังไม่ commit |
| ⭐ `/security-review` | ตรวจช่องโหว่ความปลอดภัยของ diff — ตรงกับ Phase 1.6 (Auth) |

## A5. โฟกัส / ช่วยเล็ก ๆ

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| `/focus` | โชว์เฉพาะคำตอบสุดท้าย ซ่อนขั้นตอนกลาง |
| `/goal [condition\|clear]` | ตั้งเป้าให้ Claude ทำจนกว่าจะถึงเงื่อนไข |
| `/btw <question>` | ถามแทรกสั้น ๆ โดยไม่เพิ่มเข้าบทสนทนาหลัก |
| `/color [color]` | เปลี่ยนสี prompt bar |

## A6. บัญชี & การเชื่อมต่อ

| Command | ทำอะไร |
|---|---|
| `/login` `/logout` | เข้า/ออกบัญชี Anthropic |
| `/mcp` | จัดการ MCP server (เชื่อมเครื่องมือ/ข้อมูลภายนอก) |
| `/ide` | จัดการการเชื่อม IDE + ดูสถานะ |
| `/install-github-app` | ติดตั้ง Claude GitHub App ให้ repo |
| `/install-slack-app` | ติดตั้ง Claude Slack app |
| `/desktop` `/mobile` `/remote-control` `/teleport` | ย้าย/ต่อเซสชันข้ามอุปกรณ์ (desktop app / มือถือ / เครื่องอื่น / ดึง web session ลง terminal) |
| `/chrome` | ตั้งค่า Claude ใน Chrome |
| `/passes` | แชร์สิทธิ์ใช้ Claude Code ฟรี 1 สัปดาห์ให้เพื่อน |

## A7. ช่วยเหลือ & Feedback

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/help` | แสดงคำสั่งทั้งหมด — เช็คอันนี้ก่อนเสมอ |
| `/feedback [report]` | ส่ง feedback / รายงานบั๊ก / แชร์บทสนทนา (แทน `/bug` เดิม) |
| `/agents` | จัดการ subagent |

---

# หมวด B — Bundled Skills (Claude เรียกได้)

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| ⭐ `/code-review [low..max\|ultra] [--fix] [--comment]` | รีวิว diff หา bug + จุดปรับ — ก่อน commit/push (`ultra` = multi-agent cloud) |
| ⭐ `/loop [interval] [prompt]` | รัน prompt ซ้ำเป็นรอบ — poll สถานะ, เฝ้า CI |
| `/claude-api [migrate]` | อ้างอิง/อัปเกรด code ที่เรียก Claude API — Phase 2 |
| `/dataviz [request]` | แนวทางทำ chart/dashboard ให้สวยและถูกหลัก |
| `/debug [description]` | เปิด debug logging + ไล่แก้ปัญหา CLI |
| `/doctor` | ตรวจ + ซ่อมการติดตั้ง Claude Code |
| `/batch <instruction>` | สั่งแก้ครั้งใหญ่ทั่ว codebase แบบขนาน |
| `/fewer-permission-prompts` | สแกน transcript แล้วเพิ่ม allowlist ลด prompt ถาม |
| `/design-sync [hint]` / `/design-login` | แปลง/อัปโหลด React design system ไป Claude Design |

# หมวด C — Bundled Workflows (multi-agent)

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| `/deep-research <question>` | กระจายค้นเว็บหลายทาง cross-check แล้วสรุปพร้อมอ้างอิง |
| `/autofix-pr [prompt]` | เปิด web session เฝ้า PR แล้ว push fix เมื่อ CI fail |

---

# หมวด D — Skills เพิ่มเฉพาะ workspace นี้

นอกจาก bundled ด้านบน repo/`.claude/` ของเรายังมี skill พิเศษที่เห็นในเซสชัน:

| Command | ทำอะไร / เหมาะกับ |
|---|---|
| `/verify` | รันแอปจริงเพื่อยืนยันว่า fix/feature ได้ผลตามตั้งใจ |
| `/run` | เปิด/รันแอปของโปรเจกต์เพื่อดูผลจริง |
| `/review` | รีวิว GitHub PR (ต่างจาก `/code-review` ที่รีวิว diff ในเครื่อง) |
| `/simplify` | เกลา code ที่แก้ให้กระชับ/ใช้ซ้ำได้ (ไม่ล่า bug) |
| `/schedule` | ตั้ง cloud agent รันตาม cron |
| `/update-config` | แก้ `settings.json` (permission, hook, env var) |
| `/keybindings-help` | ช่วยปรับคีย์ลัด |
| `/init` `/security-review` `/artifact-design` | (ทับกับ built-in/bundled — ใช้ได้เหมือนกัน) |

> ชุด skill ต่างกันได้ตามโปรเจกต์ — พิมพ์ `/` เพื่อดูของจริงในเครื่องคุณ

---

# หมวด E — Tools (ความสามารถพื้นฐานของผม)

สิ่งที่ผมเลือกใช้เองตามงาน ไม่ต้องมีคำสั่ง:

| ความสามารถ | ทำอะไร | เหมาะกับ |
|---|---|---|
| อ่าน/ค้นไฟล์ | เปิดไฟล์, ค้น keyword ทั่ว repo | สำรวจ code ก่อนแก้ |
| แก้/สร้างไฟล์ | แก้เฉพาะจุด หรือเขียนไฟล์ใหม่ | ลงมือแก้จริง |
| รัน command | `git`, `npm`, build, test | verify, build, ตรวจสถานะจริง |
| เว็บ | ค้น/เปิดหน้าเว็บ | หาข้อมูลล่าสุด, อ่าน docs (หน้านี้ก็ดึงมาแบบนี้) |
| subagent | แตกงานย่อยให้ agent อื่น | ค้นกว้าง ๆ หลายจุดพร้อมกัน |
| memory | จำ preference ข้ามเซสชัน | เช่น "review ผ่าน = stamp เลย" |
| artifact | ทำหน้าเว็บ/รายงานให้เปิดดู | สรุปงานแบบ visual |

---

# หมวด F — ผมทำงานยังไง (ศึกษาตัวเอง)

- **เลือก tool เอง:** อ่านไฟล์ก่อนแก้เสมอ, งานที่ไม่พึ่งกันยิงหลาย tool พร้อมกันให้เร็ว
- **รีวิว Learning Loop (กติกา 2.4):** ผม **ไม่ได้ใช้ `/review`** — อ่าน draft ของ Codex + verify กับ repo จริง (รัน git/build) + เทียบ TEACHING_RULES แล้วตัดสินผ่าน/ไม่ผ่าน
- **ขออนุญาตก่อนงานย้อนยาก/ออกนอก:** push, ลบไฟล์, ส่งข้อมูลออก — ยืนยันก่อนเสมอ
- **บทบาทในโปรเจกต์:** ผม = Designer/Reviewer, Codex = Hands-on Tutor; ใน `_docs` ผม = Reviewer/QA
- **ข้อจำกัด:** สั่งสแลชคอมมานด์ให้ตัวเองไม่ได้ (เช่นพิมพ์ `/help` เอง), ไม่รัน `/code-review ultra` เอง (บิลแยก), เห็นแค่ใน repo/เครื่องนี้ + เว็บที่ค้น

---

# หมวด G — เช็คของจริงเอง

```text
พิมพ์ /   = เมนู auto-complete โชว์คำสั่งที่ใช้ได้จริงในเครื่องคุณ (แม่นสุด)
/help    = แสดงคำสั่งทั้งหมด
/agents  = ดู subagent ที่มี
```

เอกสารทางการ: <https://code.claude.com/docs/en/commands>

---

# หมวด H — ตัวอย่างจริง (พิมพ์ → เกิดอะไร)

ตัวอย่างของคำสั่งที่ได้ใช้บ่อย เพื่อเห็นภาพว่าพิมพ์แล้วเกิดอะไร:

```text
คุณพิมพ์:  /model opus
เกิดอะไร:   สลับไปใช้ Opus + ตั้งเป็น default ของเซสชัน แล้วแจ้งว่าโมเดลไหนใช้อยู่
เหมาะตอน:  งาน design/review ซับซ้อน

คุณพิมพ์:  /context
เกิดอะไร:   โชว์ตารางสีว่า context ถูกใช้ไปเท่าไหร่ เหลือเท่าไหร่
เหมาะตอน:  แชทเริ่มยาว อยากรู้ว่าใกล้เต็มยัง

คุณพิมพ์:  /compact เก็บเรื่อง review roadmap ไว้
เกิดอะไร:   Claude สรุปบทสนทนาเก่าให้สั้น โดยเน้นเก็บเรื่องที่คุณสั่ง แล้วทำงานต่อ
เหมาะตอน:  context ใกล้เต็มแต่ยังทำงานเดิม

คุณพิมพ์:  /clear
เกิดอะไร:   ล้างบทสนทนา เริ่มใหม่จากศูนย์ (ของเก่าหายจาก context)
เหมาะตอน:  ขึ้นงานใหม่ที่ไม่เกี่ยวของเดิม

คุณพิมพ์:  /rewind
เกิดอะไร:   ย้อน code + บทสนทนากลับไป checkpoint ก่อนหน้า
เหมาะตอน:  ลองแล้วไม่เวิร์ค อยากถอยกลับจุดที่ยังดีอยู่

คุณพิมพ์:  /diff
เกิดอะไร:   เปิดหน้าต่างดู diff ของไฟล์ที่ยังไม่ commit
เหมาะตอน:  อยากรีวิวสิ่งที่แก้ก่อน commit

คุณพิมพ์:  /code-review high
เกิดอะไร:   Claude ตรวจ diff ปัจจุบันเชิงลึก รายงาน bug + จุดที่ควรปรับ
เหมาะตอน:  ก่อน commit/push งานสำคัญ

คุณพิมพ์:  /usage   (หรือ /cost)
เกิดอะไร:   โชว์ว่าเซสชันนี้ใช้ token/ค่าใช้จ่ายไปเท่าไหร่
เหมาะตอน:  อยากคุมต้นทุน

คุณพิมพ์:  /memory
เกิดอะไร:   เปิดให้เลือกไฟล์ memory/CLAUDE.md มาแก้ว่าจะให้ Claude จำอะไร
เหมาะตอน:  อยากเพิ่ม/แก้กติกาการทำงานถาวร

คุณพิมพ์:  /init
เกิดอะไร:   Claude สำรวจ repo ทั้งหมด แล้วเขียน CLAUDE.md อธิบายโครงโปรเจกต์
เหมาะตอน:  เพิ่งเปิด repo ใหม่

คุณพิมพ์:  /loop 5m /code-review
เกิดอะไร:   รัน /code-review ซ้ำทุก 5 นาที จนกว่าจะสั่งหยุด
เหมาะตอน:  เฝ้างานที่เปลี่ยนเรื่อย ๆ เช่น CI

คุณพิมพ์:  /   (สแลชเดี่ยว)
เกิดอะไร:   เมนู auto-complete เด้งโชว์คำสั่งทั้งหมดที่ใช้ได้จริงในเครื่องคุณ
เหมาะตอน:  ไม่แน่ใจว่ามีคำสั่งอะไร — ดูอันนี้ก่อนเสมอ
```

---

## จำสั้น ๆ

```text
/xxx  = คุณสั่งโปรแกรม (context, model, review, integration ฯลฯ)
skill = Claude เรียกความสามารถเฉพาะทาง (/code-review, /loop, /verify ...)
tool  = Claude อ่าน/แก้/รัน/ค้นเอง
ดูของจริงด้วยการพิมพ์ / เสมอ
```
