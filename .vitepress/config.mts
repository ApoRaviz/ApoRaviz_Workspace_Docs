import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ApoRaviz Workspace Docs',
  description: 'Thai-first learning hub for ApoRaviz Angular, Tailwind CSS, and project case studies.',
  base: '/ApoRaviz_Workspace_Docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/aporaviz-docs-logo.svg',
    nav: [
      { text: 'Start', link: '/PROJECT_START_HERE' },
      { text: 'VitePress', link: '/vitepress/' },
      { text: 'Angular', link: '/angular/' },
      { text: 'Labs', link: '/angular/labs/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Rules', link: '/WORKSPACE_RULES' }
    ],
    sidebar: [
      {
        text: 'Start Here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Project Start Here', link: '/PROJECT_START_HERE' },
          { text: 'New Project Guide', link: '/NEW_PROJECT_GUIDE' },
          { text: 'VitePress Guide', link: '/vitepress/' },
          { text: 'Workspace Rules', link: '/WORKSPACE_RULES' },
          { text: 'Teaching Rules', link: '/TEACHING_RULES' },
          { text: 'AI Update Rule', link: '/AI_UPDATE_RULE' }
        ]
      },
      {
        text: 'Angular Learning',
        items: [
          { text: 'Angular Hub', link: '/angular/' },
          { text: 'Concepts', link: '/angular/concepts/' },
          { text: 'Signal Concept', link: '/angular/concepts/signal' },
          { text: 'Lessons', link: '/angular/lessons/' },
          { text: 'Labs', link: '/angular/labs/' },
          { text: 'Signal Counter Lab', link: '/angular/labs/01-signal-counter' },
          { text: 'Tailwind CSS', link: '/angular/tailwind/' },
          { text: 'Commands', link: '/angular/commands' }
        ]
      },
      {
        text: 'Project Case Studies',
        items: [
          { text: 'Case Studies', link: '/projects/' },
          { text: 'MooPing', link: '/projects/mooping/' }
        ]
      },
      {
        text: 'Git',
        items: [{ text: 'Git Commands', link: '/git/commands' }]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs/edit/main/:path',
      text: 'แก้หน้านี้บน GitHub'
    },
    lastUpdated: {
      text: 'อัปเดตล่าสุด'
    },
    outline: {
      label: 'หัวข้อในหน้านี้',
      level: [2, 3]
    },
    docFooter: {
      prev: 'ก่อนหน้า',
      next: 'ถัดไป'
    },
    darkModeSwitchLabel: 'ธีม',
    sidebarMenuLabel: 'เมนู',
    returnToTopLabel: 'กลับขึ้นบน',
    langMenuLabel: 'เปลี่ยนภาษา'
  }
});
