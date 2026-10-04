import type { DefaultTheme } from 'vitepress';

// Keep the library switcher visible without repeating unrelated lesson trees.
const library: DefaultTheme.SidebarItem = {
  text: 'ห้องสมุดความรู้',
  items: [
    { text: 'เลือกหัวข้อ', link: '/topics' },
    { text: 'เริ่มเรียนอย่างไร', link: '/reading-guide' },
    { text: 'ค้นคำสั่ง', link: '/commands' }
  ]
};

export const sidebar: DefaultTheme.Sidebar = {
  "/angular/": [library,
    {
      text: 'Angular',
      items: [
        { text: 'ภาพรวม', link: '/angular/' },
        { text: 'ทบทวนเร็ว', link: '/angular/memory-aids' },
        {
          text: 'เข้าใจแนวคิด',
          collapsed: true,
          items: [
            { text: 'แนวคิดทั้งหมด', link: '/angular/concepts/' },
            { text: 'TypeScript', link: '/angular/concepts/typescript' },
            { text: 'TypeScript Generic', link: '/angular/concepts/typescript-generics' },
            { text: 'HttpClient', link: '/angular/concepts/http-client' },
            { text: 'Observable', link: '/angular/concepts/observable' },
            { text: 'Environment Files', link: '/angular/concepts/environment-files' },
            { text: 'Data Binding', link: '/angular/concepts/data-binding' },
            { text: 'Change Detection', link: '/angular/concepts/change-detection' },
            { text: 'Signal', link: '/angular/concepts/signal' },
            { text: 'Computed', link: '/angular/concepts/computed' },
            { text: 'Form Input Data Flow', link: '/angular/concepts/form-input-data-flow' },
            { text: 'input() and output()', link: '/angular/concepts/input-output' },
            { text: 'inject()', link: '/angular/concepts/inject' },
            { text: 'SSR Browser Guard', link: '/angular/concepts/ssr-browser-guard' },
            { text: 'Hydration', link: '/angular/concepts/hydration' },
            { text: 'ViewEncapsulation', link: '/angular/concepts/view-encapsulation' },
            { text: 'Wireframe', link: '/angular/concepts/wireframe' }
          ]
        },
        {
          text: 'บทเรียนลงมือทำ',
          collapsed: true,
          items: [
            { text: 'บทเรียนทั้งหมด', link: '/angular/teach/' },
            { text: 'Angular 22 Baseline', link: '/angular/teach/angular-22-baseline' },
            { text: 'TypeScript in Angular', link: '/angular/teach/typescript-in-angular' },
            {
              text: 'Angular Run Flow and angular.json',
              link: '/angular/teach/angular-run-flow-and-angular-json'
            },
            { text: 'Angular Config Files', link: '/angular/teach/angular-config-files' },
            { text: 'Component Structure and Data Flow', link: '/angular/teach/component-structure-data-flow' },
            { text: 'Reactive State and Signals', link: '/angular/teach/reactive-signals' },
            { text: 'Services and DI', link: '/angular/teach/services-dependency-injection' },
            { text: 'HttpClient and HTTP Unit Test', link: '/angular/teach/http-client-and-http-testing' },
            {
              text: 'Data Binding, UI State and Component Test',
              link: '/angular/teach/data-binding-ui-state-and-component-testing'
            },
            { text: 'App Config, SSR and Hydration', link: '/angular/teach/app-config-ssr-hydration' },
            { text: 'Browser APIs and SSR Safety', link: '/angular/teach/browser-apis-ssr-safety' },
            { text: 'Tailwind CSS v4', link: '/angular/teach/tailwind-css-v4' },
            { text: 'Unit Test and Regression Safety', link: '/angular/teach/unit-test-regression' },
            { text: 'CI/CD and GitHub Pages', link: '/angular/teach/cicd-github-pages' }
          ]
        },
        {
          text: 'เปิดอ้างอิง',
          collapsed: true,
          items: [
            { text: 'Tailwind CSS', link: '/angular/tailwind/' },
            { text: 'Angular Commands', link: '/angular/commands' }
          ]
        }
      ]
    }
  ],
  "/backend/": [library,
    {
      text: 'Backend',
      items: [
        { text: 'ภาพรวม', link: '/backend/' },
        { text: 'ทบทวนเร็ว', link: '/backend/memory-aids' },
        {
          text: 'เข้าใจแนวคิด',
          collapsed: true,
          items: [
            { text: 'แนวคิดทั้งหมด', link: '/backend/concepts/' },
            { text: 'API Contract', link: '/backend/concepts/api-contract' },
            { text: 'CORS', link: '/backend/concepts/cors' },
            { text: 'Privilege Escalation', link: '/backend/concepts/privilege-escalation' },
            { text: 'Sequence Diagram', link: '/backend/concepts/sequence-diagram' },
            { text: 'Race Condition', link: '/backend/concepts/race-condition' },
            { text: 'Monorepo', link: '/backend/concepts/monorepo' },
            { text: 'Web Service, Web API และ REST', link: '/backend/concepts/web-service-and-web-api' },
            { text: 'HTTPS, TLS & Certificate', link: '/backend/concepts/https-tls-certificate' }
          ]
        },
        {
          text: 'Integrations',
          collapsed: true,
          items: [
            { text: 'Fastify', link: '/backend/fastify' },
            { text: 'LINE OA Webhook', link: '/backend/line-oa-webhook' }
          ]
        },
        {
          text: 'เลือก Framework',
          items: [
            { text: 'Node.js', link: '/nodejs/' },
            { text: 'NestJS', link: '/nestjs/' },
            { text: 'ASP.NET Core', link: '/aspnet-core/' }
          ]
        }
      ]
    }
  ],
  "/nodejs/": [library,
    {
      text: 'Node.js',
      items: [
        { text: 'ภาพรวม', link: '/nodejs/' },
        { text: 'คำสั่ง', link: '/nodejs/commands' },
        {
          text: 'เข้าใจแนวคิด',
          collapsed: true,
          items: [
            { text: 'แนวคิดทั้งหมด', link: '/nodejs/concepts/' },
            { text: 'Environment Variable', link: '/nodejs/concepts/environment-variable' },
            { text: '.env File', link: '/nodejs/concepts/dotenv-file' },
            { text: 'Secret', link: '/nodejs/concepts/secret' }
          ]
        },
        {
          text: 'บทเรียนลงมือทำ',
          collapsed: true,
          items: [
            { text: 'Node and npm Version Check', link: '/nodejs/teach/06-node-npm-version-check' },
            { text: 'CLI File Processing', link: '/nodejs/teach/01-cli-file-processing' },
            { text: 'CLI Arguments and Errors', link: '/nodejs/teach/03-cli-arguments-and-errors' },
            { text: 'Streams and Backpressure', link: '/nodejs/teach/02-node-stream-backpressure' },
            { text: 'File Backup Safety', link: '/nodejs/teach/04-file-backup-safety' },
            { text: 'Test and Temp Files', link: '/nodejs/teach/05-node-test-temp-files' }
          ]
        }
      ]
    }
  ],
  "/nestjs/": [library,
    {
      text: 'NestJS',
      items: [
        { text: 'ภาพรวม', link: '/nestjs/' },
        { text: 'Nest CLI & Project Structure', link: '/nestjs/nest-cli-project-structure' },
        {
          text: 'ประกอบ API',
          items: [
            { text: 'Module', link: '/nestjs/concepts/module' },
            { text: 'Controller', link: '/nestjs/concepts/controller' },
            { text: 'Service', link: '/nestjs/concepts/service' },
            { text: 'Dependency Injection', link: '/nestjs/concepts/dependency-injection' }
          ]
        },
        {
          text: 'Request Pipeline',
          items: [
            { text: 'Middleware & Request Pipeline', link: '/nestjs/concepts/middleware-and-request-pipeline' },
            { text: 'Exception Filter', link: '/nestjs/concepts/exception-filter' },
            { text: 'CORS Configuration & Testing', link: '/nestjs/concepts/cors-configuration-and-testing' }
          ]
        },
        {
          text: 'Testing',
          items: [
            { text: 'Unit Test with Jest', link: '/nestjs/concepts/unit-test' },
            { text: 'Backend E2E Test', link: '/nestjs/concepts/backend-e2e-test' }
          ]
        },
        { text: 'แนวคิดทั้งหมด', link: '/nestjs/concepts/' },
        { text: 'คำสั่ง', link: '/nestjs/commands' }
      ]
    }
  ],
  "/aspnet-core/": [library,
    {
      text: 'ASP.NET Core',
      items: [
        { text: 'ภาพรวม', link: '/aspnet-core/' },
        { text: 'คำสั่ง', link: '/aspnet-core/commands' },
        { text: 'Foundations & Project Structure', link: '/aspnet-core/foundations-and-project-structure' },
        { text: 'Integration Test with xUnit', link: '/aspnet-core/integration-testing-with-xunit' }
      ]
    }
  ],
  "/postgresql/": [library,
    {
      text: 'PostgreSQL',
      items: [
        { text: 'ภาพรวม', link: '/postgresql/' },
        { text: 'ทบทวนเร็ว', link: '/postgresql/memory-aids' },
        {
          text: 'บทเรียนลงมือทำ',
          collapsed: true,
          items: [
            {
              text: 'PostgreSQL ครั้งแรกผ่าน Docker',
              link: '/postgresql/teach/postgresql-first-run-with-docker'
            },
            { text: 'ORM และการเข้าถึงฐานข้อมูล', link: '/postgresql/teach/orm-and-database-access' }
          ]
        },
        {
          text: 'เข้าใจแนวคิด',
          collapsed: true,
          items: [
            { text: 'แนวคิดทั้งหมด', link: '/postgresql/concepts/' },
            { text: 'Primary Key', link: '/postgresql/concepts/primary-key' },
            { text: 'Foreign Key', link: '/postgresql/concepts/foreign-key' },
            { text: 'Unique Constraint', link: '/postgresql/concepts/unique-constraint' },
            { text: 'Index', link: '/postgresql/concepts/database-index' },
            { text: 'Check Constraint', link: '/postgresql/concepts/check-constraint' },
            { text: 'Database Transaction', link: '/postgresql/concepts/database-transaction' },
            { text: 'Advisory Lock', link: '/postgresql/concepts/advisory-lock' }
          ]
        }
      ]
    }
  ],
  "/docker/": [library,
    {
      text: 'Docker',
      items: [
        { text: 'ภาพรวม', link: '/docker/' },
        { text: 'คำสั่ง', link: '/docker/commands' },
        { text: 'Docker Desktop UI', link: '/docker/docker-desktop-ui' }
      ]
    }
  ],
  "/git/": [library,
    {
      text: 'Git',
      items: [
        { text: 'ภาพรวม', link: '/git/' },
        { text: 'ทบทวนเร็ว', link: '/git/memory-aids' },
        { text: 'คำสั่ง', link: '/git/commands' },
        {
          text: 'Foundations',
          collapsed: true,
          items: [
            { text: 'แนวคิดทั้งหมด', link: '/git/concepts/' },
            { text: 'Git Repository', link: '/git/concepts/git-repository' },
            { text: '.gitignore', link: '/git/concepts/gitignore' },
            { text: 'Working Tree', link: '/git/concepts/working-tree' },
            { text: 'Staging Area', link: '/git/concepts/staging-area' }
          ]
        },
        {
          text: 'Daily Workflow',
          collapsed: true,
          items: [
            { text: 'Commit', link: '/git/concepts/commit' },
            { text: 'Commit Message Convention', link: '/git/concepts/commit-message-convention' },
            { text: 'HEAD', link: '/git/concepts/head' },
            { text: 'Branch', link: '/git/concepts/branch' }
          ]
        },
        {
          text: 'Collaboration',
          collapsed: true,
          items: [
            { text: 'Remote', link: '/git/concepts/remote' },
            { text: 'Merge', link: '/git/concepts/merge' },
            { text: 'Merge Conflict', link: '/git/concepts/merge-conflict' },
            { text: 'Cherry-pick', link: '/git/concepts/cherry-pick' }
          ]
        },
        {
          text: 'Recovery',
          collapsed: true,
          items: [
            { text: 'Undo in Git', link: '/git/concepts/undo-in-git' },
            { text: 'Reflog', link: '/git/concepts/reflog' },
            { text: 'Stash', link: '/git/concepts/stash' }
          ]
        }
      ]
    }
  ],
  "/claude/": [library,
    {
      text: 'Claude Code',
      items: [ { text: 'ภาพรวม', link: '/claude/' }, { text: 'Skill / Plugin / MCP', link: '/claude/extensions' } ]
    }
  ],
  "/vitepress/": [library,
    {
      text: 'ดูแลเว็บเอกสาร',
      items: [
        { text: 'VitePress Guide', link: '/vitepress/' },
        { text: 'VitePress Commands', link: '/vitepress/commands' }
      ]
    }
  ],
  "/": [library,
    {
      text: 'เริ่มโปรเจกต์',
      items: [
        { text: 'Project Start Here', link: '/project-start-here' },
        { text: 'New Project Guide', link: '/new-project-guide' },
        { text: 'Workspace Baseline', link: '/baseline' }
      ]
    },
    {
      text: 'กติกาและการดูแล',
      collapsed: true,
      items: [
        { text: 'Workspace Rules', link: '/workspace-rules' },
        { text: 'Teaching Rules', link: '/teaching-rules' },
        { text: 'AI Update Rule', link: '/ai-update-rule' },
        { text: 'Workspace Plan', link: '/workspace-plan' }
      ]
    }
  ],
};
