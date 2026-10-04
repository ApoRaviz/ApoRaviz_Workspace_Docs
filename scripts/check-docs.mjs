import { existsSync, globSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import config from '../.vitepress/config.mts';

// Check the generated site: Markdown checks alone miss sidebar links and fragments.
const output = resolve('.vitepress/dist');
const base = config.base;
const origin = 'https://docs.invalid';
const files = globSync('**/*.html', { cwd: output });
if (!files.length) throw new Error('Run npm run docs:build before checking links.');
const pages = new Map(files.map(file => {
  const html = readFileSync(join(output, file), 'utf8');
  return [file.replaceAll('\\', '/'), {
    html,
    ids: new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(match => decode(match[1]))),
  }];
}));
const errors = new Set();
let checked = 0;

function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function check(href, source, sourceUrl) {
  const url = new URL(decode(href), sourceUrl);
  if (url.origin !== origin) return;
  checked++;
  if (!url.pathname.startsWith(base)) {
    errors.add(`${source}: escapes site base: ${href}`);
    return;
  }
  const relative = decodeURIComponent(url.pathname.slice(base.length));
  const candidates = relative.endsWith('/') || !relative
    ? [relative + 'index.html']
    : [relative, relative + '.html', relative + '/index.html'];
  const file = candidates.find(candidate => existsSync(join(output, candidate)) && pages.has(candidate))
    ?? candidates.find(candidate => existsSync(join(output, candidate)));
  if (!file) errors.add(`${source}: missing destination: ${href}`);
  else if (url.hash && pages.has(file) && !pages.get(file).ids.has(decodeURIComponent(url.hash.slice(1)))) {
    errors.add(`${source}: missing fragment: ${href}`);
  }
}

for (const [file, { html }] of pages) {
  const route = file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    check(href, file, origin + base + route);
  }
}

function checkNavigation(items) {
  for (const item of items) {
    if (item.link) check(base + item.link.replace(/^\//, ''), 'navigation', origin + base);
    if (item.items) checkNavigation(item.items);
  }
}
checkNavigation(config.themeConfig.nav);
for (const items of Object.values(config.themeConfig.sidebar)) checkNavigation(items);

if (errors.size) {
  console.error([...errors].join('\n'));
  console.error(`${errors.size} errors across ${pages.size} pages and ${checked} internal links.`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${pages.size} pages and ${checked} internal links; destinations and fragments resolve.`);
}
