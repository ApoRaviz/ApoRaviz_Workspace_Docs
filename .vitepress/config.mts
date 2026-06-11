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
      { text: 'Commands', link: '/commands' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Rules', link: '/WORKSPACE_RULES' }
    ],
    sidebar: [
      {
        text: 'Start Here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Project Start Here', link: '/PROJECT_START_HERE' },
          { text: 'Workspace Plan', link: '/WORKSPACE_PLAN' },
          { text: 'New Project Guide', link: '/NEW_PROJECT_GUIDE' }
        ]
      },
      {
        text: 'Workspace Rules',
        collapsed: false,
        items: [
          { text: 'Workspace Rules', link: '/WORKSPACE_RULES' },
          { text: 'Teaching Rules', link: '/TEACHING_RULES' },
          { text: 'AI Update Rule', link: '/AI_UPDATE_RULE' }
        ]
      },
      {
        text: 'Angular Learning',
        collapsed: false,
        items: [
          { text: 'Angular Hub', link: '/angular/' },
          {
            text: 'Concepts',
            collapsed: false,
            items: [
              { text: 'Concept Index', link: '/angular/concepts/' },
              { text: 'Signal', link: '/angular/concepts/signal' },
              { text: 'Computed', link: '/angular/concepts/computed' }
            ]
          },
          {
            text: 'Labs',
            collapsed: false,
            items: [
              { text: 'Lab Index', link: '/angular/labs/' },
              { text: '01 Signal Counter', link: '/angular/labs/01-signal-counter' },
              { text: '02 Computed Total Price', link: '/angular/labs/02-computed-total-price' },
              { text: '03 Basic Form Input', link: '/angular/labs/03-basic-form-input' }
            ]
          },
          {
            text: 'Core Lessons',
            collapsed: true,
            items: [
              { text: 'Lesson Index', link: '/angular/teach/' },
              { text: '01 Reactive State และ Signals', link: '/angular/teach/01-reactive-signals' },
              { text: '02 Services และ DI', link: '/angular/teach/02-services-dependency-injection' },
              { text: '03 App Config, SSR และ Hydration', link: '/angular/teach/03-app-config-ssr-hydration' },
              { text: '04 Browser APIs และ SSR Safety', link: '/angular/teach/04-browser-apis-ssr-safety' },
              { text: '05 Component Structure และ Data Flow', link: '/angular/teach/05-component-structure-data-flow' },
              { text: '06 Unit Test และ Regression Safety', link: '/angular/teach/06-unit-test-regression' },
              { text: '07 CI/CD และ GitHub Pages', link: '/angular/teach/07-cicd-github-pages' },
              { text: '08 Tailwind CSS v4', link: '/angular/teach/08-tailwind-css-v4' },
              { text: '09 Angular 22 จาก Angular 21', link: '/angular/teach/09-angular-22-from-21' }
            ]
          },
          {
            text: 'Reference',
            collapsed: true,
            items: [
              { text: 'Lessons Hub', link: '/angular/lessons/' },
              { text: 'Tailwind CSS', link: '/angular/tailwind/' }
            ]
          }
        ]
      },
      {
        text: 'Commands',
        collapsed: false,
        items: [
          { text: 'Commands Hub', link: '/commands' },
          { text: 'Angular 22 Commands', link: '/angular/commands' },
          { text: 'Git Commands', link: '/git/commands' },
          { text: 'VitePress Commands', link: '/vitepress/commands' }
        ]
      },
      {
        text: 'Project Case Studies',
        collapsed: false,
        items: [
          { text: 'Case Studies', link: '/projects/' },
          {
            text: 'MooPing Loyalty',
            collapsed: true,
            items: [
              { text: 'MooPing Index', link: '/projects/mooping/' },
              { text: '01 Project Idea', link: '/projects/mooping/01-project-idea' },
              { text: '02 Screen Structure', link: '/projects/mooping/02-mooping-screen-structure' },
              { text: '03 Loyalty Logic', link: '/projects/mooping/03-loyalty-logic' },
              { text: '04 LINE OA Concept', link: '/projects/mooping/04-line-oa-concept' },
              { text: '05 Portfolio Case Study', link: '/projects/mooping/05-portfolio-case-study' },
              { text: '06 POS Correction Flow', link: '/projects/mooping/06-pos-correction-flow' },
              { text: '07 Saved Rewards', link: '/projects/mooping/07-saved-rewards' },
              { text: '08 Demo Refactor', link: '/projects/mooping/08-mooping-demo-refactor' },
              { text: '09 Demo Deploy Flow', link: '/projects/mooping/09-mooping-demo-deploy-flow' }
            ]
          }
        ]
      },
      {
        text: 'Docs Site',
        collapsed: true,
        items: [
          { text: 'VitePress Guide', link: '/vitepress/' },
          { text: 'VitePress Commands', link: '/vitepress/commands' },
          { text: 'README', link: '/README' }
        ]
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
