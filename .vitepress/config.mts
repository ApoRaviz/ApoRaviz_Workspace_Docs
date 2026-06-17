import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ApoRaviz Workspace Docs',
  description: 'Thai-first learning hub for ApoRaviz Angular, Node.js, backend, and project case studies.',
  base: '/ApoRaviz_Workspace_Docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/aporaviz-docs-logo.svg',
    nav: [
      { text: 'Start', link: '/PROJECT_START_HERE' },
      { text: 'VitePress', link: '/vitepress/' },
      { text: 'Angular', link: '/angular/' },
      { text: 'Backend', link: '/backend/' },
      { text: 'Labs', link: '/angular/labs/' },
      { text: 'Commands', link: '/commands' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Rules', link: '/WORKSPACE_RULES' },
    ],
    sidebar: [
      {
        text: 'Start Here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Project Start Here', link: '/PROJECT_START_HERE' },
          { text: 'Workspace Plan', link: '/WORKSPACE_PLAN' },
          { text: 'New Project Guide', link: '/NEW_PROJECT_GUIDE' },
        ],
      },
      {
        text: 'Workspace Rules',
        collapsed: false,
        items: [
          { text: 'Workspace Rules', link: '/WORKSPACE_RULES' },
          { text: 'Teaching Rules', link: '/TEACHING_RULES' },
          { text: 'AI Update Rule', link: '/AI_UPDATE_RULE' },
        ],
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
              { text: 'Computed', link: '/angular/concepts/computed' },
              { text: 'input() And output()', link: '/angular/concepts/input-output' },
              { text: 'inject()', link: '/angular/concepts/inject' },
              { text: 'SSR Browser Guard', link: '/angular/concepts/ssr-browser-guard' },
              { text: 'Hydration', link: '/angular/concepts/hydration' },
              { text: 'ViewEncapsulation', link: '/angular/concepts/view-encapsulation' },
            ],
          },
          {
            text: 'Labs',
            collapsed: false,
            items: [
              { text: 'Lab Index', link: '/angular/labs/' },
              { text: '01 Signal Counter', link: '/angular/labs/01-signal-counter' },
              { text: '02 Computed Total Price', link: '/angular/labs/02-computed-total-price' },
              { text: '03 Basic Form Input', link: '/angular/labs/03-basic-form-input' },
            ],
          },
          {
            text: 'Core Lessons',
            collapsed: true,
            items: [
              { text: 'Lesson Index', link: '/angular/teach/' },
              { text: '01 Reactive State And Signals', link: '/angular/teach/01-reactive-signals' },
              { text: '02 Services And DI', link: '/angular/teach/02-services-dependency-injection' },
              { text: '03 App Config, SSR And Hydration', link: '/angular/teach/03-app-config-ssr-hydration' },
              { text: '04 Browser APIs And SSR Safety', link: '/angular/teach/04-browser-apis-ssr-safety' },
              { text: '05 Component Structure And Data Flow', link: '/angular/teach/05-component-structure-data-flow' },
              { text: '06 Unit Test And Regression Safety', link: '/angular/teach/06-unit-test-regression' },
              { text: '07 CI/CD And GitHub Pages', link: '/angular/teach/07-cicd-github-pages' },
              { text: '08 Tailwind CSS v4', link: '/angular/teach/08-tailwind-css-v4' },
              { text: '09 Angular 22 Baseline', link: '/angular/teach/09-angular-22-baseline' },
              { text: '10 Angular Run Flow And angular.json', link: '/angular/teach/10-angular-run-flow-and-angular-json' },
            ],
          },
          {
            text: 'Reference',
            collapsed: true,
            items: [
              { text: 'Lessons Hub', link: '/angular/lessons/' },
              { text: 'Tailwind CSS', link: '/angular/tailwind/' },
              { text: 'Angular Commands', link: '/angular/commands' },
            ],
          },
        ],
      },
      {
        text: 'Backend Learning',
        collapsed: false,
        items: [
          { text: 'Backend Stack', link: '/backend/' },
          { text: 'Node.js Hub', link: '/nodejs/' },
          { text: 'Node.js Commands', link: '/nodejs/commands' },
          { text: '01 Node.js CLI File Processing', link: '/nodejs/teach/01-cli-file-processing' },
          { text: '02 Node Stream And Backpressure', link: '/nodejs/teach/02-node-stream-backpressure' },
          { text: '03 CLI Arguments And Errors', link: '/nodejs/teach/03-cli-arguments-and-errors' },
          { text: '04 File Backup Safety', link: '/nodejs/teach/04-file-backup-safety' },
          { text: '05 Node Test And Temp Files', link: '/nodejs/teach/05-node-test-temp-files' },
          { text: 'NestJS Hub', link: '/nestjs/' },
          { text: 'LINE OA Webhook', link: '/backend/line-oa-webhook' },
          { text: 'Fastify', link: '/backend/fastify' },
          { text: 'PostgreSQL Hub', link: '/postgresql/' },
        ],
      },
      {
        text: 'Commands',
        collapsed: false,
        items: [
          { text: 'Commands Hub', link: '/commands' },
          { text: 'Angular 22 Commands', link: '/angular/commands' },
          { text: 'Node.js Commands', link: '/nodejs/commands' },
          { text: 'Git Commands', link: '/git/commands' },
          { text: 'VitePress Commands', link: '/vitepress/commands' },
        ],
      },
      {
        text: 'Project Case Studies',
        collapsed: false,
        items: [
          { text: 'Case Studies', link: '/projects/' },
          {
            text: 'MooPing Reward',
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
              { text: '09 Demo Deploy Flow', link: '/projects/mooping/09-mooping-demo-deploy-flow' },
              { text: '10 Real Shop Hybrid Reward', link: '/projects/mooping/10-real-shop-hybrid-reward' },
            ],
          },
          {
            text: 'ApoRaviz Tools',
            collapsed: true,
            items: [
              { text: 'Tools Index', link: '/projects/tools/' },
              { text: '01 Split Order TXT Case Study', link: '/projects/tools/01-split-order-txt-case-study' },
              { text: 'Split Order Requirement Note', link: '/projects/tools/split-order-tool-requirement' },
            ],
          },
        ],
      },
      {
        text: 'Docs Site',
        collapsed: true,
        items: [
          { text: 'VitePress Guide', link: '/vitepress/' },
          { text: 'VitePress Commands', link: '/vitepress/commands' },
          { text: 'README', link: '/README' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs' },
    ],
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    outline: {
      label: 'On this page',
      level: [2, 3],
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    darkModeSwitchLabel: 'Theme',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
  },
});
