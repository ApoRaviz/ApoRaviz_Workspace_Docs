import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ApoRaviz Workspace Docs',
  description: 'Thai-first, topic-organized learning hub for ApoRaviz Angular, Node.js, backend, and tooling.',
  base: '/ApoRaviz_Workspace_Docs/',
  cleanUrls: true,
  rewrites: {
    'AGENTS.md': 'agents.md',
    'CLAUDE.md': 'claude-guide.md',
    'README.md': 'readme.md',
    'PROJECT_START_HERE.md': 'project-start-here.md',
    'WORKSPACE_PLAN.md': 'workspace-plan.md',
    'NEW_PROJECT_GUIDE.md': 'new-project-guide.md',
    'WORKSPACE_RULES.md': 'workspace-rules.md',
    'TEACHING_RULES.md': 'teaching-rules.md',
    'AI_UPDATE_RULE.md': 'ai-update-rule.md',
  },
  lastUpdated: true,
  srcExclude: ['templates/project-bootstrap/*.template.md'],
  themeConfig: {
    logo: '/aporaviz-docs-logo.svg',
    nav: [
      { text: 'Start Here', link: '/project-start-here' },
      {
        text: 'Learning',
        items: [
          { text: 'Angular', link: '/angular/' },
          { text: 'Backend', link: '/backend/' },
          { text: 'Database', link: '/postgresql/' },
          { text: 'Git', link: '/git/' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Commands', link: '/commands' },
          { text: 'VitePress Guide', link: '/vitepress/' },
        ],
      },
      {
        text: 'Workspace',
        items: [
          { text: 'Workspace Rules', link: '/workspace-rules' },
          { text: 'New Project Guide', link: '/new-project-guide' },
          { text: 'Version Baseline', link: '/baseline' },
          { text: 'Claude Code', link: '/claude/' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Start a Project',
        items: [
          { text: 'Project Start Here', link: '/project-start-here' },
          { text: 'New Project Guide', link: '/new-project-guide' },
          { text: 'Workspace Baseline', link: '/baseline' },
        ],
      },
      {
        text: 'How We Work',
        collapsed: true,
        items: [
          { text: 'Workspace Rules', link: '/workspace-rules' },
          { text: 'Teaching Rules', link: '/teaching-rules' },
          { text: 'AI Update Rule', link: '/ai-update-rule' },
          { text: 'Workspace Plan', link: '/workspace-plan' },
          { text: 'Claude Code', link: '/claude/' },
          { text: 'Claude Extensions (Skill/Plugin/MCP)', link: '/claude/extensions' },
        ],
      },
      {
        text: 'Angular',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/angular/' },
          { text: 'Quick Recall', link: '/angular/memory-aids' },
          {
            text: 'Core Concepts',
            collapsed: true,
            items: [
              { text: 'All Core Concepts', link: '/angular/concepts/' },
              { text: 'TypeScript', link: '/angular/concepts/typescript' },
              { text: 'Environment Files', link: '/angular/concepts/environment-files' },
              { text: 'Signal', link: '/angular/concepts/signal' },
              { text: 'Computed', link: '/angular/concepts/computed' },
              { text: 'Form Input Data Flow', link: '/angular/concepts/form-input-data-flow' },
              { text: 'input() and output()', link: '/angular/concepts/input-output' },
              { text: 'inject()', link: '/angular/concepts/inject' },
              { text: 'SSR Browser Guard', link: '/angular/concepts/ssr-browser-guard' },
              { text: 'Hydration', link: '/angular/concepts/hydration' },
              { text: 'ViewEncapsulation', link: '/angular/concepts/view-encapsulation' },
              { text: 'Wireframe', link: '/angular/concepts/wireframe' },
            ],
          },
          {
            text: 'Learning Guides',
            collapsed: true,
            items: [
              { text: 'All Learning Guides', link: '/angular/teach/' },
              { text: '1 Angular 22 Baseline', link: '/angular/teach/angular-22-baseline' },
              { text: '2 TypeScript in Angular', link: '/angular/teach/typescript-in-angular' },
              { text: '3 Angular Run Flow and angular.json', link: '/angular/teach/angular-run-flow-and-angular-json' },
              { text: '4 Angular Config Files', link: '/angular/teach/angular-config-files' },
              { text: '5 Component Structure and Data Flow', link: '/angular/teach/component-structure-data-flow' },
              { text: '6 Reactive State and Signals', link: '/angular/teach/reactive-signals' },
              { text: '7 Services and DI', link: '/angular/teach/services-dependency-injection' },
              { text: '8 App Config, SSR and Hydration', link: '/angular/teach/app-config-ssr-hydration' },
              { text: '9 Browser APIs and SSR Safety', link: '/angular/teach/browser-apis-ssr-safety' },
              { text: '10 Tailwind CSS v4', link: '/angular/teach/tailwind-css-v4' },
              { text: '11 Unit Test and Regression Safety', link: '/angular/teach/unit-test-regression' },
              { text: '12 CI/CD and GitHub Pages', link: '/angular/teach/cicd-github-pages' },
            ],
          },
          {
            text: 'Reference',
            collapsed: true,
            items: [
              { text: 'Tailwind CSS', link: '/angular/tailwind/' },
              { text: 'Angular Commands', link: '/angular/commands' },
            ],
          },
        ],
      },
      {
        text: 'Backend',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/backend/' },
          { text: 'Quick Recall', link: '/backend/memory-aids' },
          {
            text: 'Core Concepts',
            collapsed: true,
            items: [
              { text: 'All Core Concepts', link: '/backend/concepts/' },
              { text: 'API Contract', link: '/backend/concepts/api-contract' },
              { text: 'Privilege Escalation', link: '/backend/concepts/privilege-escalation' },
              { text: 'Sequence Diagram', link: '/backend/concepts/sequence-diagram' },
              { text: 'Race Condition', link: '/backend/concepts/race-condition' },
              { text: 'Monorepo', link: '/backend/concepts/monorepo' },
            ],
          },
          {
            text: 'Node.js',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nodejs/' },
              { text: 'Commands', link: '/nodejs/commands' },
              {
                text: 'Core Concepts',
                collapsed: true,
                items: [
                  { text: 'All Core Concepts', link: '/nodejs/concepts/' },
                  { text: 'Environment Variable', link: '/nodejs/concepts/environment-variable' },
                  { text: '.env File', link: '/nodejs/concepts/dotenv-file' },
                  { text: 'Secret', link: '/nodejs/concepts/secret' },
                ],
              },
              {
                text: 'Learning Guides',
                collapsed: true,
                items: [
                  { text: '01 CLI File Processing', link: '/nodejs/teach/01-cli-file-processing' },
                  { text: '02 Streams and Backpressure', link: '/nodejs/teach/02-node-stream-backpressure' },
                  { text: '03 CLI Arguments and Errors', link: '/nodejs/teach/03-cli-arguments-and-errors' },
                  { text: '04 File Backup Safety', link: '/nodejs/teach/04-file-backup-safety' },
                  { text: '05 Test and Temp Files', link: '/nodejs/teach/05-node-test-temp-files' },
                  { text: '06 Node and npm Version Check', link: '/nodejs/teach/06-node-npm-version-check' },
                ],
              },
            ],
          },
          {
            text: 'NestJS',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nestjs/' },
              { text: 'Commands', link: '/nestjs/commands' },
              { text: 'All Core Concepts', link: '/nestjs/concepts/' },
              { text: 'Module', link: '/nestjs/concepts/module' },
              { text: 'Controller', link: '/nestjs/concepts/controller' },
              { text: 'Nest CLI & Project Structure', link: '/nestjs/nest-cli-project-structure' },
            ],
          },
          {
            text: 'Integrations',
            collapsed: true,
            items: [
              { text: 'Fastify', link: '/backend/fastify' },
              { text: 'LINE OA Webhook', link: '/backend/line-oa-webhook' },
            ],
          },
        ],
      },
      {
        text: 'Database',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/postgresql/' },
          { text: 'Quick Recall', link: '/postgresql/memory-aids' },
          {
            text: 'Core Concepts',
            collapsed: true,
            items: [
              { text: 'All Core Concepts', link: '/postgresql/concepts/' },
              { text: 'Primary Key', link: '/postgresql/concepts/primary-key' },
              { text: 'Foreign Key', link: '/postgresql/concepts/foreign-key' },
              { text: 'Unique Constraint', link: '/postgresql/concepts/unique-constraint' },
              { text: 'Index', link: '/postgresql/concepts/database-index' },
              { text: 'Check Constraint', link: '/postgresql/concepts/check-constraint' },
              { text: 'Database Transaction', link: '/postgresql/concepts/database-transaction' },
            ],
          },
        ],
      },
      {
        text: 'Git',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/git/' },
          { text: 'Quick Recall', link: '/git/memory-aids' },
          { text: 'Commands', link: '/git/commands' },
          {
            text: 'Foundations',
            collapsed: true,
            items: [
              { text: 'All Core Concepts', link: '/git/concepts/' },
              { text: 'Git Repository', link: '/git/concepts/git-repository' },
              { text: '.gitignore', link: '/git/concepts/gitignore' },
              { text: 'Working Tree', link: '/git/concepts/working-tree' },
              { text: 'Staging Area', link: '/git/concepts/staging-area' },
            ],
          },
          {
            text: 'Daily Workflow',
            collapsed: true,
            items: [
              { text: 'Commit', link: '/git/concepts/commit' },
              { text: 'Commit Message Convention', link: '/git/concepts/commit-message-convention' },
              { text: 'HEAD', link: '/git/concepts/head' },
              { text: 'Branch', link: '/git/concepts/branch' },
            ],
          },
          {
            text: 'Collaboration',
            collapsed: true,
            items: [
              { text: 'Remote', link: '/git/concepts/remote' },
              { text: 'Merge', link: '/git/concepts/merge' },
              { text: 'Merge Conflict', link: '/git/concepts/merge-conflict' },
              { text: 'Cherry-pick', link: '/git/concepts/cherry-pick' },
            ],
          },
          {
            text: 'Recovery',
            collapsed: true,
            items: [
              { text: 'Undo in Git', link: '/git/concepts/undo-in-git' },
              { text: 'Reflog', link: '/git/concepts/reflog' },
              { text: 'Stash', link: '/git/concepts/stash' },
            ],
          },
        ],
      },
      {
        text: 'Commands & Docs Site',
        collapsed: true,
        items: [
          { text: 'All Commands', link: '/commands' },
          { text: 'Angular Commands', link: '/angular/commands' },
          { text: 'Node.js Commands', link: '/nodejs/commands' },
          { text: 'Git Commands', link: '/git/commands' },
          { text: 'VitePress Guide', link: '/vitepress/' },
          { text: 'VitePress Commands', link: '/vitepress/commands' },
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
