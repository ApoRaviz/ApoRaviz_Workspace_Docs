import { defineConfig } from 'vitepress';
import { sidebar } from './navigation.mts';

const rewrites: Record<string, string> = {
  'AGENTS.md': 'agents.md',
  'CLAUDE.md': 'claude-guide.md',
  'README.md': 'readme.md',
  'PROJECT_START_HERE.md': 'project-start-here.md',
  'WORKSPACE_PLAN.md': 'workspace-plan.md',
  'NEW_PROJECT_GUIDE.md': 'new-project-guide.md',
  'WORKSPACE_RULES.md': 'workspace-rules.md',
  'TEACHING_RULES.md': 'teaching-rules.md',
  'AI_UPDATE_RULE.md': 'ai-update-rule.md',
};

export default defineConfig({
  lang: 'th-TH',
  title: 'ApoRaviz Workspace Docs',
  description: 'คลังความรู้ภาษาไทยสำหรับ Angular, Node.js, Backend, Database และเครื่องมือพัฒนา',
  base: '/ApoRaviz_Workspace_Docs/',
  cleanUrls: true,
  rewrites,
  markdown: {
    config(md) {
      const renderLink = md.renderer.rules.link_open!;
      md.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
        const token = tokens[index];
        const href = token.attrGet('href');
        // Keep Markdown links usable on GitHub while publishing the configured routes.
        if (href && !href.startsWith('#') && env.relativePath) {
          const origin = 'https://docs.invalid';
          const url = new URL(href, `${origin}/${env.relativePath}`);
          const target = url.origin === origin && rewrites[decodeURIComponent(url.pathname.slice(1))];
          if (target) token.attrSet('href', `/${target}${url.search}${url.hash}`);
        }
        return renderLink(tokens, index, options, env, renderer);
      };
    },
  },
  lastUpdated: true,
  srcExclude: ['templates/project-bootstrap/*.template.md', 'docs/superpowers/**', 'tmp/**'],
  themeConfig: {
    logo: '/aporaviz-docs-logo.svg',
    siteTitle: 'ApoRaviz Docs',
    nav: [
      { text: 'เริ่มเรียน', link: '/reading-guide' },
      { text: 'หัวข้อทั้งหมด', link: '/topics' },
      { text: 'คำสั่ง', link: '/commands' },
      { text: 'Workspace', items: [
        { text: 'เริ่มโปรเจกต์', link: '/project-start-here' },
        { text: 'กติกา Workspace', link: '/workspace-rules' },
        { text: 'Version Baseline', link: '/baseline' },
        { text: 'ดูแลเว็บเอกสาร', link: '/vitepress/' },
        { text: 'Claude Code', link: '/claude/' },
      ] },
    ],
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'ค้นหา', buttonAriaLabel: 'ค้นหาในคลังความรู้' },
          modal: {
            noResultsText: 'ไม่พบผลลัพธ์สำหรับ',
            resetButtonTitle: 'ล้างคำค้น',
            displayDetails: 'แสดงรายละเอียด',
            backButtonTitle: 'กลับ',
            footer: { selectText: 'เลือก', navigateText: 'เลื่อน', closeText: 'ปิด' },
          },
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs/edit/main/:path',
      text: 'เสนอแก้ไขหน้านี้บน GitHub',
    },
    lastUpdated: { text: 'ปรับปรุงล่าสุด' },
    outline: { label: 'ในหน้านี้', level: [2, 3] },
    docFooter: { prev: 'ก่อนหน้า', next: 'ถัดไป' },
    darkModeSwitchLabel: 'เปลี่ยนธีม',
    sidebarMenuLabel: 'สารบัญหัวข้อ',
    returnToTopLabel: 'กลับด้านบน',
    langMenuLabel: 'เปลี่ยนภาษา',
  },
});
