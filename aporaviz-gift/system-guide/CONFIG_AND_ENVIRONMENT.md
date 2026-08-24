# Config and Environment

## Config Loading Paths

### API runtime

`AppModule` ใช้ `ConfigModule.forRoot({isGlobal:true, envFilePath:['../../.env','.env'], validate:validateEnvironment})` ที่ `apps/api/src/app.module.ts:17`

เมื่อ npm workspace รันจาก `apps/api`, path แรกชี้ root repo `.env`; pathสองคือ `apps/api/.env`. Zod ใน `environment.ts` parse/default/validate ก่อน app bootstrap

### Prisma CLI

`apps/api/prisma.config.ts` import `dotenv/config`, เลือก `DIRECT_URL ?? DATABASE_URL ?? localDatabaseUrl`. ใช้กับ generate/migrate/studio ไม่ใช่ runtime `PrismaService`

### Seed

`apps/api/prisma/seed.ts` โหลด root `.env` แบบ explicit แล้วต้องมี `DATABASE_URL`

### Angular

Angular ไม่อ่าน root `.env`. Build ใช้ TypeScript files:

- development: `environment.development.ts` → `http://localhost:3000/v1`
- production: `environment.ts` → `/api/v1`
- replacementกำหนดใน `angular.json`

## Environment Variable Inventory

| Variable | Public/Secret | Consumer จริง | ใช้ทำอะไร | ไม่มี/ผิดแล้วเกิดอะไร |
|---|---|---|---|---|
| `NODE_ENV` | public config | `validateEnvironment()` | schema mode; production guards | default development; productionบังคับ DB explicit/mock false |
| `PORT` | public config | API `main.ts`; SSR `server.ts` อ่าน process envแยก | listen port API/SSR | API default 3000; SSR default 4000 |
| `WEB_ORIGIN` | public config | API `bootstrap()` CORS | origin browserที่อนุญาต | default localhost:4200; originอื่นถูก browser CORS block |
| `API_BASE_URL` | public config | ถูก validate/testใน API config แต่ application runtimeไม่อ่าน | documented API URL | ปัจจุบันเปลี่ยนค่านี้ไม่เปลี่ยน Angular URL — `Possibly unused` runtime config |
| `DATABASE_URL` | **secret** | PrismaService, LifecycleService pool, seed, CLI fallback | DB connection | runtime/seedต่อ DBไม่ได้; productionต้องตั้ง explicit |
| `DIRECT_URL` | **secret** | Prisma CLI configเท่านั้น | direct migration connectionสำหรับ pooled providers | optional; CLI fallback DATABASE_URL/local |
| `PAYMENT_PROVIDER` | public config | `PaymentsService.shouldReconcileOpn()` | เปิด cron reconciliationเฉพาะ opn | default mock; ไม่ได้ disable Opn checkout endpoint |
| `ALLOW_MOCK_PAYMENT` | public feature flag | mock purchase/renew + production validator | เปิด mock charges | false → 403 mock; production true → startup fail |
| `CLOUDINARY_CLOUD_NAME` | public identifier | CloudinaryService | config account/upload URL | ชุด credentialsไม่ครบ → upload signature 503; signed URLs null |
| `CLOUDINARY_API_KEY` | public credential | CloudinaryService + upload response | identify Cloudinary account | ชุดไม่ครบ → Cloudinary unavailable |
| `CLOUDINARY_API_SECRET` | **secret** | CloudinaryService server-only | sign/admin API | ห้าม browser; ไม่มี → upload unavailable |
| `OPN_PUBLIC_KEY` | public test key | OpnService | create PromptPay source | prefixไม่ใช่ test/ไม่มี → 503 |
| `OPN_SECRET_KEY` | **secret** | OpnService | create/read charge | prefixไม่ใช่ test/ไม่มี → 503 |
| `OPN_WEBHOOK_SECRET` | **secret** | PaymentsService | HMAC webhook; comma-separated rotation | ไม่มี → webhook 503; ผิด → 403 |

ห้ามใส่ค่าจริงของ `DATABASE_URL`, `DIRECT_URL`, Cloudinary secret, Opn secret/webhook secret ใน docs, browser bundle หรือ Git

## Other Configuration Files

| File | Purpose |
|---|---|
| `.nvmrc` / root `package.json.engines` | Node/npm baseline |
| `compose.yaml` | PostgreSQL 17 local, port 5432, named volume, healthcheck |
| `apps/api/prisma.config.ts` | Prisma schema/migration/seed/datasource |
| `apps/api/prisma/schema.prisma` | DB models/generator |
| `apps/web/angular.json` | build/SSR/assets/styles/environment replacement/budgets |
| `apps/web/src/server.ts` | SSR port + CSP/security headers |
| `playwright.config.ts` | mock API + Angular dev server + desktop/mobile projects |
| `packages/contracts/package.json` | ESM/CJS/types outputsผ่าน tsup |

## CORS

API accepts methods GET/POST/PATCH/PUT/DELETE/OPTIONS และ headers Content-Type/Authorization/Idempotency-Key จาก originเดียว. Cloudinary direct uploadมี CORS policyของ provider ไม่ได้กำหนดใน repo

## CSP

SSR header ใน `apps/web/src/server.ts:15-20`:

- default/script self
- images self/data/Cloudinary/Omise
- styles self + unsafe-inline + Google Fonts
- fonts Google
- connect self + HTTPS + local API
- deny framing; nosniff; strict referrer

Development `ng serve` อาจไม่ได้ผ่าน custom production Express headerทุกกรณี; behaviorของ Angular CLI dev serverไม่ควรถูกถือเป็น production CSP proof

## Docker PostgreSQL

`compose.yaml` ตั้ง database/user/password local เป็น `aporaviz_gift`, map `5432:5432`, persist named volume และ healthcheck. ค่าเหล่านี้เป็น local defaults ไม่ใช่ production secret strategy

## Production Gaps

- `/api/v1` ของ Angular production ต้องมี reverse proxy/hosting route; ไม่มี configใน repo → `Unable to determine from current source code`
- TLS, secret manager, Cloudinary/Opn account provisioning, deployment, DB backup/restore → `Unable to determine from current source code`
