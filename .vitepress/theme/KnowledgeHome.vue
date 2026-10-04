<script setup lang="ts">
import { withBase } from 'vitepress';

const paths = [
  { number: '01', title: 'เพิ่งเริ่มเรียน', detail: 'เลือกเส้นทางและรู้ว่าควรอ่านอะไรก่อน', link: '/reading-guide' },
  { number: '02', title: 'กำลังหาคำสั่ง', detail: 'เปิดอ้างอิง แล้วกลับไปทำงานต่อ', link: '/commands' },
  { number: '03', title: 'จะเริ่มโปรเจกต์', detail: 'เตรียม stack และ checklist ให้พร้อม', link: '/project-start-here' },
];
const topics = [
  { number: '01', name: 'Frontend', title: 'จากหน้าจอ สู่การโต้ตอบ', description: 'Component, state และ styling ที่ประกอบเป็นแอป', links: [{ name: 'Angular', href: '/angular/' }, { name: 'Tailwind CSS', href: '/angular/tailwind/' }], mark: '</>' },
  { number: '02', name: 'Backend', title: 'เข้าใจระบบเบื้องหลัง', description: 'Request, API และ logic ที่ทำให้ข้อมูลเดินทาง', links: [{ name: 'พื้นฐาน API', href: '/backend/' }, { name: 'Node.js', href: '/nodejs/' }, { name: 'NestJS', href: '/nestjs/' }, { name: 'ASP.NET Core', href: '/aspnet-core/' }], mark: '{ }' },
  { number: '03', name: 'Database', title: 'ออกแบบข้อมูลให้มั่นใจ', description: 'ความสัมพันธ์ ความถูกต้อง และการเข้าถึงข้อมูล', links: [{ name: 'PostgreSQL', href: '/postgresql/' }, { name: 'ORM', href: '/postgresql/teach/orm-and-database-access' }], mark: '[ ]' },
  { number: '04', name: 'Developer tools', title: 'ทำงานอย่างเป็นระบบ', description: 'เก็บประวัติ รันบริการ และดูแลสภาพแวดล้อม', links: [{ name: 'Git', href: '/git/' }, { name: 'Docker', href: '/docker/' }], mark: '>_' },
];
const recall = [
  { name: 'Angular', href: '/angular/memory-aids' },
  { name: 'Backend', href: '/backend/memory-aids' },
  { name: 'PostgreSQL', href: '/postgresql/memory-aids' },
  { name: 'Git', href: '/git/memory-aids' },
];
</script>

<template>
  <div class="knowledge-home">
    <section class="library-hero" aria-labelledby="library-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="brand-dot" aria-hidden="true"></span> APORAVIZ / WORKSPACE LIBRARY</p>
        <h1 id="library-title">เรียนให้เข้าใจ<br><span>กลับมาใช้ได้จริง.</span></h1>
        <p class="hero-description">คลังความรู้ภาษาไทยจากการลงมือทำ<br class="desktop-break"> เชื่อมแนวคิด บทเรียน และเครื่องมือไว้ในที่เดียว</p>
        <div class="hero-actions">
          <a class="library-button primary" :href="withBase('/topics')">สำรวจหัวข้อทั้งหมด <span aria-hidden="true">↗</span></a>
          <a class="library-button secondary" :href="withBase('/reading-guide')">เริ่มตรงไหนดี <span aria-hidden="true">→</span></a>
        </div>
        <p class="hero-note">อ่านตามเรื่องที่สนใจ · ไม่จำเป็นต้องเริ่มจากหน้าแรกทุกครั้ง</p>
      </div>
      <aside class="start-panel" aria-labelledby="start-title">
        <div class="panel-heading"><span class="eyebrow">YOUR NEXT STEP</span><span class="panel-symbol" aria-hidden="true">↗</span></div>
        <h2 id="start-title">วันนี้อยากทำอะไร?</h2>
        <a v-for="path in paths" :key="path.link" class="start-path" :href="withBase(path.link)">
          <span class="path-number">{{ path.number }}</span>
          <span><strong>{{ path.title }}</strong><small>{{ path.detail }}</small></span>
          <span class="path-arrow" aria-hidden="true">→</span>
        </a>
        <div class="panel-foot"><span aria-hidden="true">A_</span> ความรู้กลางของทุกโปรเจกต์ ApoRaviz</div>
      </aside>
    </section>

    <section class="topic-section" aria-labelledby="topic-title">
      <div class="section-heading">
        <div><p class="eyebrow">EXPLORE THE LIBRARY</p><h2 id="topic-title">เลือกเรื่องที่กำลังสนใจ</h2></div>
        <a class="text-link" :href="withBase('/topics')">ดูสารบัญทั้งหมด <span aria-hidden="true">↗</span></a>
      </div>
      <div class="topic-grid">
        <article v-for="topic in topics" :key="topic.name" class="topic-card">
          <div class="topic-card-top"><span class="topic-mark" aria-hidden="true">{{ topic.mark }}</span><span class="topic-number">{{ topic.number }}</span></div>
          <p class="topic-name">{{ topic.name }}</p>
          <h3>{{ topic.title }}</h3>
          <p class="topic-description">{{ topic.description }}</p>
          <div class="topic-links">
            <a v-for="link in topic.links" :key="link.href" :href="withBase(link.href)">{{ link.name }} <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
    </section>

    <section class="recall-strip" aria-labelledby="recall-title">
      <div><p class="eyebrow">QUICK RECALL</p><h2 id="recall-title">เคยเรียนแล้ว แค่อยากทบทวน</h2><p>ภาพจำสั้น ๆ พร้อมลิงก์กลับไปอ่านคำอธิบายเต็ม</p></div>
      <div class="recall-links"><a v-for="item in recall" :key="item.href" :href="withBase(item.href)">{{ item.name }} <span aria-hidden="true">→</span></a></div>
    </section>

    <section class="library-resources" aria-label="เครื่องมือและกติกาเพิ่มเติม">
      <a :href="withBase('/claude/')"><span class="eyebrow">AI TOOLS</span><strong>ใช้ Claude Code ให้คล่อง <span aria-hidden="true">↗</span></strong><span>คำสั่ง · Skill · Plugin · MCP</span></a>
      <a :href="withBase('/vitepress/')"><span class="eyebrow">DOCUMENTATION</span><strong>ดูแลคลังความรู้นี้ <span aria-hidden="true">↗</span></strong><span>เขียนบทความและรันเว็บด้วย VitePress</span></a>
      <a :href="withBase('/workspace-rules')"><span class="eyebrow">WORKSPACE</span><strong>ทำงานบนกติกาเดียวกัน <span aria-hidden="true">↗</span></strong><span>ขอบเขตโปรเจกต์และแหล่งอ้างอิงกลาง</span></a>
    </section>
    <footer class="library-footer"><span>APORAVIZ DOCS</span><p>เรียนรู้จากงานจริง เก็บไว้ใช้ในงานถัดไป</p><a :href="withBase('/reading-guide')">คู่มือการอ่าน <span aria-hidden="true">↑</span></a></footer>
  </div>
</template>
