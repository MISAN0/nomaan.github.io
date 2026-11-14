/* ============================================================
   PRERENDER
   Bakes the rendered page into index.html so it reads without
   JavaScript, then writes the same document at /cv/ with the recruiter
   view switched on, and a sitemap.

   It runs the real renderers from app.js and cv.js under jsdom rather
   than duplicating the templates, so the static copy cannot drift from
   what the browser draws. Output is byte-stable: a rebuild with no data
   change is an empty diff.

   Run after editing data.js:   npm run prerender
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM } from 'jsdom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = p => readFileSync(join(root, p), 'utf8');

const dom = new JSDOM(file('index.html'), { runScripts: 'outside-only' });
const { window } = dom;
const doc = window.document;

/* One eval, not several: `const DATA` is a lexical binding scoped to its
   own eval call, so separate calls cannot see each other's consts. */
window.eval(['var PRERENDER_ONLY = true;', file('data.js'), file('app.js'), file('cv.js'),
  'renderAll(DATA); window.__DATA = DATA;'].join('\n;\n'));

/* Trailing whitespace after </body> is parsed back into the body on the
   next run and would grow by a line per build. */
while (doc.body.lastChild?.nodeType === 3 && !doc.body.lastChild.textContent.trim()) {
  doc.body.lastChild.remove();
}

const containers = ['#projectFeatured', '#projectRows', '#skillTree', '#nowList', '#workList', '#cvDoc'];
const empty = containers.filter(sel => !(doc.querySelector(sel)?.children.length));
if (empty.length) {
  console.error('Prerender produced empty containers, refusing to write:', empty.join(', '));
  process.exit(1);
}

const html = () => '<!DOCTYPE html>\n' + doc.documentElement.outerHTML + '\n';
writeFileSync(join(root, 'index.html'), html());

/* /cv/: the same document with the recruiter view on, so a CV link in an
   application opens straight onto it, with or without JavaScript. The
   main page is restored afterwards because `doc` is reused. */
const DATA = window.__DATA;
const site = DATA.meta.site;
const set = (sel, attr, val) => doc.querySelector(sel)?.setAttribute(attr, val);
doc.body.classList.add('plain');
doc.title = 'Mir Salman Nomaan · CV';
set('link[rel="canonical"]', 'href', `${site}/cv/`);
set('meta[property="og:url"]', 'content', `${site}/cv/`);
set('meta[property="og:title"]', 'content', 'Mir Salman Nomaan · CV');
const toggle = doc.querySelector('#viewToggle');
toggle.textContent = 'Full record';
toggle.setAttribute('href', '/');
mkdirSync(join(root, 'cv'), { recursive: true });
writeFileSync(join(root, 'cv', 'index.html'), html());

/* Sitemap dated from the data, not the clock, so it stays byte-stable. */
const updated = new Date(DATA.meta.updated + ' UTC').toISOString().slice(0, 10);
writeFileSync(join(root, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>${updated}</lastmod></url>
  <url><loc>${site}/cv/</loc><lastmod>${updated}</lastmod></url>
</urlset>
`);

console.log('Prerendered index.html, cv/index.html, sitemap.xml');
containers.forEach(sel => console.log(`  ${sel.padEnd(18)} ${doc.querySelector(sel).children.length} children`));
console.log(`  ${String(Math.round(Buffer.byteLength(html()) / 1024)).padStart(17)} KB`);
