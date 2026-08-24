# Unknown or Unused Code

## วิธีตรวจ

ตรวจ declarations/imports/referencesด้วย `rg` ทั่ว `apps`, `packages`, `e2e` และอ่าน call sitesจริง รวม framework configuration (`angular.json`, Nest modules/decorators, Prisma config) ก่อนจัดสถานะ

คำสถานะ:

- **Used** — พบ caller/runtime/config/type dependencyจริง
- **Possibly unused** — มี declaration/dataแต่ไม่พบ consumer runtimeครบถ้วน
- **Unused** — พบ definition/importเดียวและไม่มี referenceอื่นใน repo
- **Unable to determine** — caller/deploymentอยู่นอก sourceหรือ framework consumptionพิสูจน์จาก repoได้ไม่ครบ

## Findings

| File / Symbol | References ที่พบ | Status | ความหมาย |
|---|---|---|---|
| `apps/api/src/gifts/gifts.service.ts` import `packageCatalog` | พบเฉพาะ importบรรทัด 14 ในไฟล์; backendจริงอ่าน `GiftPackage` row | **Unused** | unused import; ไม่กระทบ runtime |
| `GiftsService.findAuthorizedGift()` | พบเฉพาะ definitionที่ `gifts.service.ts:246`; ไม่มี controller/service caller/test | **Unused** | helperถูกสร้างไว้แต่ current flowใช้ `findGiftWithMedia`/direct queries + `assertToken` |
| env `API_BASE_URL` ใน API `environmentSchema` | `.env.example`, validatorและ test; ไม่มี `ConfigService.get('API_BASE_URL')`; Angularใช้ TS environmentคนละระบบ | **Possibly unused** | เปลี่ยน root envค่านี้ไม่เปลี่ยน frontend URLหรือ API behavior |
| `UploadSignature.cloudName` response | backendใช้ cloudName configและคืน field; frontend interfaceรับแต่ `uploadToCloudinary()`ไม่อ่าน field | **Possibly unused** | upload URL encode cloud nameอยู่แล้ว; fieldอาจมีไว้ diagnostics/future SDK |
| `Gift.packageSnapshot` | เขียนใน `PaymentsService.completePayment()`; schema/migration/tests; ไม่พบ runtime read | **Possibly unused** | audit/future immutable package displayมีข้อมูล แต่ renewalใช้ current package row |
| `Gift.publishedAt` | เขียนตอน purchase; schema/migration; ไม่พบ query/response read | **Possibly unused** | audit timestampเท่านั้นใน MVP |
| `GiftMedia.cloudinaryAssetId` | เขียนตอน confirm; schema; ไม่พบ read/delete (deleteใช้ public ID) | **Possibly unused** | provider identityเก็บไว้แต่ยังไม่ใช้ |
| `GiftMedia.format` | เขียน actual formatตอน confirm; ไม่พบ consumerหลังจากนั้น | **Possibly unused** | metadata/auditเท่านั้น |
| `PaymentEvent.processedAt` | DB default/schema; ไม่พบ query | **Possibly unused** | audit timestamp |
| SSR example REST comment `apps/web/src/server.ts:23-33` | comment scaffold ไม่มี route implementation | **Possibly unused** | template comment ไม่ใช่ executable code |
| production Angular `apiBaseUrl='/api/v1'` | `GiftApiService`ใช้จริง แต่ไม่มี reverse-proxy routeใน `server.ts`/repo | **Unable to determine** | ต้องมี hosting/proxyภายนอก; production topologyอยู่นอก repo |
| `server.ts::reqHandler` | ไม่มี direct TS caller; `angular.json` ชี้ `ssr.entry=src/server.ts` และ Angular SSR convention export handler | **Used** | framework entry point ไม่ใช่ dead code |
| `main.server.ts` default `bootstrap` | referencedผ่าน `angular.json.server` | **Used** | framework entry point |
| empty class `App` | importedทั้ง `main.ts`/`main.server.ts` และเป็น root component | **Used** | classไม่ต้องมี fieldsเพราะ templateเป็น router outlet |
| status arraysใน contracts | แต่ละ arrayถูกใช้ derive exported union type; schemas/catalogใช้ related keys | **Used** | compile-time/runtime contract primitives |
| `maxPackageImages` | media order Zod max + tests | **Used** | derived ไม่ hardcode 10 |
| `DIRECT_URL` | `prisma.config.ts` ใช้ CLI; runtime PrismaServiceไม่ใช้ | **Used (CLI only)** | ไม่ควรลบเพียงเพราะไม่มี ConfigService caller |
| `PAYMENT_PROVIDER` | `shouldReconcileOpn()` ใช้ gate cron; checkout endpointยังเรียกได้ตรง | **Used, narrow scope** | เป็น reconciliation flag ไม่ใช่ global provider router |
| `SeoService` | Builder/Public `ngOnInit()` | **Used** | dynamic title/meta |
| `GiftApiService.getPayment()` | Builder resume/poll + Public renewal poll | **Used** | ไม่ใช่ dead endpoint |
| lifecycle public cron methods | เรียกผ่าน `@Cron` metadata; testsบางส่วนเรียกตรง | **Used** | framework-scheduled callers |
| private service methodsเช่น `completePayment`, `verifyWebhook`, `withLock` | พบ callersภายใน classและ testsผ่าน cast | **Used** | private orchestration |

## Reachability / UI Gaps ที่ไม่ใช่ Dead Code

### Success stateไม่มี route

`BuilderPage`แสดง successด้วย internal signal ไม่ใช่ `/success`. เป็น designปัจจุบัน ไม่ใช่ unused component. แต่ refreshหลัง paidไม่มี code reconstruct success/public URL จึงเข้าหน้า designของ non-editable gift

### Renewal pendingไม่ resume

`PublicGiftPage`มี polling/cancelใช้จริง แต่ pending renewal payment IDไม่เก็บ localStorage. หลัง refreshไม่มี callerเริ่ม pollรายการเดิม. Codeไม่ได้ unused แต่ flow recoveryไม่ครบ

### Opn endpointไม่ถูก PAYMENT_PROVIDER gate

`PAYMENT_PROVIDER`ใช้เฉพาะ reconciliation. Frontendแสดง PromptPay buttonเสมอและ endpointตรวจ test keysเอง. นี่เป็น behaviorจริง ไม่ใช่ unused envทั้งหมด

### Template semantic keys

`layoutKey/stylePackKey/decorationPackKey/configVersion` ถูก validate/snapshot/return. Runtimeมี layoutเดียวและ PublicGiftPageใช้ tokensเป็นหลัก; ไม่มี dynamic renderer switchตาม layout/style pack. สถานะ **Used as data contract, partially used for rendering**

## Not Implemented (ยืนยันจาก routes/models/search)

รายการนี้ไม่ใช่ unused codeเพราะไม่มี implementationให้ใช้:

- Login/JWT/session/user/role/permission guard
- dashboard/search/admin
- email delivery/password-protected gift
- card payment/live Opn
- video/MP4 export
- user-triggered delete entire gift
- production deployment/reverse proxy

## TODO / Placeholder Search

ไม่พบ executable `TODO`/`FIXME` ใน application source. พบเพียง generated-style example commentใน SSR serverและ HTML input placeholder attributesซึ่งเป็น UX text ไม่ใช่ unfinished code

## Caveat

Static reference searchมองไม่เห็น callersที่เกิดจาก decorators/framework metadataโดยตรง จึงตรวจ Module/route/Cron/build configประกอบเสมอ. External hosting consumerของ `reqHandler` และ reverse proxyไม่สามารถพิสูจน์เกิน sourceปัจจุบัน
