import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMarkdownRenderer } from 'vitepress';
import config from '../.vitepress/config.mts';

const markdown = await createMarkdownRenderer(process.cwd(), config.markdown, config.base);
const render = (link, page) => markdown.render(`[open](${link})`, { relativePath: page, cleanUrls: true });

test('source file links resolve to the published alias, including nested pages and fragments', () => {
  for (const [source, target] of Object.entries(config.rewrites)) {
    assert.ok(render(`./${source}#section`, 'README.md').includes(`href="${config.base}${target.replace(/\.md$/, '')}#section"`));
    assert.ok(render(`../${source}#section`, 'claude/index.md').includes(`href="${config.base}${target.replace(/\.md$/, '')}#section"`));
  }
});

test('ordinary article, external and same-page links retain their destinations', () => {
  assert.ok(render('./concepts/signal.md', 'angular/index.md').includes('href="./concepts/signal"'));
  assert.ok(render('#section', 'README.md').includes('href="#section"'));
  assert.ok(render('https://example.com/README.md', 'README.md').includes('href="https://example.com/README.md"'));
});

test('a nested README is not confused with the root source alias', () => {
  assert.ok(render('./README.md', 'angular/index.md').includes('href="./README"'));
});
