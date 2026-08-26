/* ============================================================
   PRERENDER
   Bakes the rendered content into index.html so the page has a body
   without JavaScript.

   Why this exists: every content container in index.html shipped empty
   and was filled by app.js at runtime. One blocked script, one JS
   error, or one crawler that does not execute JavaScript, and the page
   showed a recruiter nothing at all — on a site whose entire job is
   supporting a live job application.

   It runs the real renderers from app.js under jsdom rather than
   duplicating the templates, so there is only ever one copy of the
   markup and this cannot drift from what the browser produces.

   Run it after editing data.js:   npm run prerender
   ============================================================ */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM } from 'jsdom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = p => readFileSync(join(root, p), 'utf8');

const dom = new JSDOM(file('index.html'), { runScripts: 'outside-only' });
const { window } = dom;

/* jsdom has no layout engine, so the browser-only APIs the interactive
   layer touches are stubbed. renderAll never calls these; they exist
   because evaluating app.js defines functions that reference them. */
window.IntersectionObserver = class {
  observe() {} unobserve() {} disconnect() {}
};
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.requestAnimationFrame = cb => cb(0);

/* One eval, not three: `const DATA = ...` is a lexical binding scoped to
   its own eval call, so separate calls cannot see each other's consts. */
window.eval([
  'var PRERENDER_ONLY = true;',
  file('data.js'),
  file('app.js'),
  'renderAll(DATA);'
].join('\n;\n'));

const doc = window.document;

/* The rAF shim fires immediately, so the two bars that get their fill
   from script end up with a baked-in transform. Left in place the
   browser would paint them already full and skip the entrance
   animation, so the transform is stripped and the --p custom property
   carries the value instead: JS animates from zero, the noscript rule
   in index.html renders the same fill statically. */
['#hudXpFill', '#degreeFill'].forEach(sel => {
  doc.querySelector(sel)?.style.removeProperty('transform');
});

/* The newline this script writes after </html> is parsed back into
   <body> as a text node on the next run and would accumulate one blank
   line per build. Drop trailing whitespace nodes so the output is
   byte-stable and a rebuild with no data change is an empty diff. */
while (doc.body.lastChild?.nodeType === 3 && !doc.body.lastChild.textContent.trim()) {
  doc.body.lastChild.remove();
}

/* The radar is drawn from measured geometry in the browser; under jsdom
   it still produces correct SVG because the maths is pure. Sanity-check
   that something actually rendered before overwriting the file. */
const filled = ['#questList', '#skillTree', '#artifactList', '#campaignList', '#cvDoc']
  .map(sel => [sel, (doc.querySelector(sel)?.children.length) ?? 0]);
const empty = filled.filter(([, n]) => n === 0);
if (empty.length) {
  console.error('Prerender produced empty containers, refusing to write:', empty.map(([s]) => s).join(', '));
  process.exit(1);
}

writeFileSync(join(root, 'index.html'), '<!DOCTYPE html>\n' + doc.documentElement.outerHTML + '\n');

const bytes = Buffer.byteLength(doc.documentElement.outerHTML);
console.log('Prerendered index.html');
filled.forEach(([sel, n]) => console.log(`  ${sel.padEnd(15)} ${n} children`));
console.log(`  ${String(Math.round(bytes / 1024)).padStart(14)} KB`);
