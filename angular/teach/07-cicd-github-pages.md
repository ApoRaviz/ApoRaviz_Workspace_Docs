# CI/CD และ GitHub Pages

บทเรียนนี้สรุป CI/CD สำหรับ Angular demo ที่ deploy ไป GitHub Pages

## CI/CD คืออะไร

`CI` คือการตรวจ code อัตโนมัติ เช่น install, test, build

```text
push code
-> npm ci
-> npm test
-> npm run build
```

`CD` คือการ deploy หลังผ่านการตรวจ

```text
build ผ่าน
-> upload artifact
-> deploy to GitHub Pages
```

## GitHub Actions

workflow อยู่ใน:

```text
.github/workflows/
```

ไฟล์ที่มักมี:

```text
ci.yml
deploy-pages.yml
```

## npm ci

ใน CI ควรใช้:

```bash
npm ci
```

เพราะ `npm ci`:

- อ่าน dependency จาก `package-lock.json`
- ติดตั้งซ้ำได้ deterministic กว่า
- fail ถ้า `package.json` กับ lockfile ไม่ตรงกัน

## Test ก่อน Deploy

ลำดับที่ดี:

```text
npm ci
-> npm test -- --watch=false
-> npm run build หรือ npm run build:gh-pages
-> deploy
```

ถ้า deploy โดยไม่ test อาจเอา regression ขึ้น demo โดยไม่รู้ตัว

## GitHub Pages base-href

ถ้า repo ชื่อ `ApoRaviz_Mooping` URL จะเป็น:

```text
https://aporaviz.github.io/ApoRaviz_Mooping/
```

Angular ต้อง build ด้วย:

```bash
ng build --configuration production --base-href /ApoRaviz_Mooping/
```

กติกากลาง:

```text
base-href = /Repo_Name/
```

## Artifact

artifact คือ output ที่พร้อม deploy

Angular SSR/static output มักอยู่ที่:

```text
dist/<AngularProjectName>/browser
```

workflow ต้อง upload folder นี้ ไม่ใช่ upload ทั้ง repo

ตัวอย่าง:

```yaml
- name: Upload Pages artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: dist/ApoRaviz_Mooping/browser
```

## .nojekyll

ไฟล์:

```text
public/.nojekyll
```

ใช้บอก GitHub Pages ว่าให้เสิร์ฟ static files ตาม output ของ Angular ไม่ต้องผ่าน Jekyll

## permissions

CI ที่อ่าน code อย่างเดียว:

```yaml
permissions:
  contents: read
```

Deploy GitHub Pages:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Command ที่ควรเรียนรู้

```bash
npm ci
npm test -- --watch=false
npm run build
npm run build:gh-pages
```

ถ้าใช้ GitHub CLI:

```bash
gh workflow list
gh run list
gh run watch
```

หมายเหตุ: `gh` ต้องติดตั้งและ login ก่อน

