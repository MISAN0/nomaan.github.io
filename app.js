/* ============================================================
   Renders the page from DATA (data.js). No framework, no build
   beyond the prerender. Two halves on purpose:
   - render*: pure data-to-DOM, run at build time under jsdom so the
     page has a body without JavaScript
   - wire*:   listeners, URL handling, tooltips; browser only (wire.js)
   The recruiter document is rendered by cv.js.
   ============================================================ */

const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const slug = s => String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const ext = href => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';

const LEVEL_WORD = ['Next to learn', 'Aware', 'Familiar', 'Working', 'Confident', 'Strong'];
const pips = n => `<span class="pips" role="img" aria-label="${esc(LEVEL_WORD[n])}, ${n} of 5">${
  Array.from({ length: 5 }, (_, k) => `<i class="${k < n ? 'on' : ''}"></i>`).join('')}</span>`;

/* Progress is computed from ticked checkpoints, never typed in. */
const progress = steps => {
  const done = steps.filter(s => s.done).length;
  return { done, total: steps.length, pct: Math.round((done / steps.length) * 100) };
};

/* ---------- Hero ---------- */
function renderHero(data) {
  const p = data.person;
  const img = $('#avatar');
  img.src = p.avatar;
  img.alt = `Portrait of ${p.name}`;
  $('#heroEyebrow').textContent = p.eyebrow;
  $('#heroName').textContent = p.name;
  $('#heroHook').textContent = p.hook;
  $('#heroIntro').textContent = p.intro;
  $('#heroAvail').textContent = p.available;
  $('#heroSeeking').textContent = p.seeking;
  $('#heroActions').innerHTML = `
    <a class="btn btn-primary" href="${esc(data.cv.file)}" download>Download CV</a>
    <a class="btn" href="/cv/" data-view-link>Recruiter view</a>`;
}

/* ---------- Projects ---------- */
function codeLine(pr) {
  if (pr.code === 'public' && pr.repo) {
    return `<a class="plink" href="${esc(pr.repo)}"${ext(pr.repo)}>Read the code on GitHub ↗</a>`;
  }
  if (pr.code === 'writeup') return `<span class="pnote">Written work, available on request</span>`;
  return '';
}

const stackLine = pr => `<p class="stack">${pr.stack.map(esc).join(' · ')}</p>`;

function renderProjects(data) {
  const list = data.projects;
  const pub = list.filter(pr => pr.code === 'public' && pr.repo).length;
  $('#projectsSub').textContent =
    `${list.length} projects. Source is public where it is linked (${pub} so far); the rest is going up one repository at a time.`;

  /* Filter by category, not type: every project has a different type, so
     a type filter would be a button per card. */
  const cats = [...new Set(list.map(pr => pr.cat))];
  const count = c => list.filter(pr => pr.cat === c).length;
  $('#projectFilters').innerHTML = `
    <button type="button" class="filter on" data-cat="all" aria-pressed="true">All <b>${list.length}</b></button>
    ${cats.map(c => `<button type="button" class="filter" data-cat="${slug(c)}" aria-pressed="false">${esc(c)} <b>${count(c)}</b></button>`).join('')}`;

  $('#projectFeatured').innerHTML = list.filter(pr => pr.featured).map(pr => `
    <article class="pfeat${pr.image ? ' has-image' : ''}" id="p-${pr.id}" data-cat="${slug(pr.cat)}">
      <div class="pfeat-body">
        <p class="ptype">${esc(pr.type)}</p>
        <h3>${esc(pr.name)}</h3>
        <p class="pmeta">${esc(pr.year)} · ${esc(pr.team)}</p>
        <p class="pblurb">${esc(pr.blurb)}</p>
        ${pr.story ? `<dl class="story">${pr.story.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : ''}
        ${pr.highlights ? `<ul class="points">${pr.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        ${stackLine(pr)}
        ${codeLine(pr)}
      </div>
      ${pr.image ? `
      <figure class="pshot">
        <img src="${esc(pr.image.src)}" width="${pr.image.w}" height="${pr.image.h}" alt="${esc(pr.image.alt)}" loading="lazy" decoding="async">
      </figure>` : ''}
    </article>`).join('');

  /* The rest as one-line rows that open, so thirteen projects are not a
     wall of equal cards. */
  $('#projectRows').innerHTML = list.filter(pr => !pr.featured).map(pr => `
    <details class="prow" id="p-${pr.id}" data-cat="${slug(pr.cat)}">
      <summary>
        <span class="prow-name">${esc(pr.name)}</span>
        <span class="prow-type">${esc(pr.type)}</span>
        <span class="prow-year">${esc(pr.year)}</span>
      </summary>
      <div class="prow-body">
        <p class="pblurb">${esc(pr.blurb)}</p>
        <ul class="points">${pr.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
        ${stackLine(pr)}
        ${codeLine(pr)}
      </div>
    </details>`).join('');
}

/* ---------- Skills ---------- */
function unitName(code, units) {
  const u = units.find(x => x.code === code);
  return u ? `${code}: ${u.name}` : code;
}
const expandEvidence = (ev, units) => String(ev).split('·').map(c => unitName(c.trim(), units)).join(' · ');

/* A skill is linked to every project whose stack names it (or one of its
   `aka` names), so the evidence points at real work, not only at units. */
function projectsUsing(skill, projects) {
  const names = new Set();
  [skill.name, ...(skill.aka || [])].forEach(n => {
    names.add(n.toLowerCase());
    n.split(/\s*(?:&|\/)\s*/).forEach(t => t && names.add(t.trim().toLowerCase()));
  });
  return projects.filter(pr => pr.stack.some(s => names.has(s.toLowerCase())));
}

function branchOrder(skills, meta) {
  const used = [...new Set(skills.map(s => s.branch))];
  const listed = meta.filter(b => used.includes(b.name));
  return [...listed, ...used.filter(u => !listed.some(b => b.name === u)).map(name => ({ name }))];
}

function renderSkills(data) {
  const { skills, units, projects } = data;
  $('#skillLegend').innerHTML = [1, 2, 3, 4, 5]
    .map(l => `<span class="legend-item">${pips(l)} ${esc(LEVEL_WORD[l])}</span>`).join('');

  $('#skillTree').innerHTML = branchOrder(skills, data.skillBranches).map(b => {
    const nodes = skills.filter(s => s.branch === b.name)
      .sort((a, x) => x.level - a.level || a.name.localeCompare(x.name));
    const live = nodes.filter(s => s.level > 0);
    return `
    <details class="branch"${b.open ? ' open' : ''}>
      <summary class="branch-head">
        <span class="branch-label">${esc(b.name)}</span>
        <span class="branch-count">${live.length} skills</span>
      </summary>
      ${b.note ? `<p class="branch-note">${esc(b.note)}</p>` : ''}
      <div class="nodes">
        ${nodes.map(s => {
          const full = s.level ? expandEvidence(s.evidence, units) : '';
          const used = projectsUsing(s, projects);
          /* Button and detail are siblings: the detail holds links, and a
             link inside a button is invalid nested interactive content. */
          return `
          <div class="node${s.level ? '' : ' next'}">
            <button type="button" class="node-head" aria-expanded="false"
                    data-tip="${esc(LEVEL_WORD[s.level])}${full ? ' · ' + esc(full) : ''}">
              <span class="node-name">${esc(s.name)}</span>
              <span class="node-level">${esc(LEVEL_WORD[s.level])}</span>
              ${s.level ? `<span class="node-ev">${esc(s.evidence)}</span>` : ''}
              ${pips(s.level)}
            </button>
            <div class="node-detail" hidden="until-found"><p>${
              s.level ? `Evidence: ${esc(full)}.` : 'Not started yet.'
            }${used.length ? ` Used in ${used.map(pr => `<a href="#p-${pr.id}">${esc(pr.name)}</a>`).join(', ')}.` : ''}</p></div>
          </div>`;
        }).join('')}
      </div>
    </details>`;
  }).join('');

  const cited = new Set();
  skills.forEach(s => String(s.evidence).split('·').forEach(c => cited.add(c.trim())));
  const key = units.filter(u => cited.has(u.code)).sort((a, b) => a.code.localeCompare(b.code));
  $('#unitKey').innerHTML = `
    <details class="unit-key">
      <summary>What the unit codes mean <span>${key.length} units</span></summary>
      <div class="unit-key-grid">
        ${key.map(u => `<div><code>${esc(u.code)}</code><span>${esc(u.name)}</span></div>`).join('')}
      </div>
    </details>`;
}

/* ---------- Now / Next ---------- */
function renderNow(data) {
  $('#nowList').innerHTML = data.now.map(n => {
    const pr = progress(n.steps);
    return `
    <article class="now-item">
      <div class="now-top">
        <h3>${esc(n.title)}</h3>
        <span class="now-meta">${esc(n.kind)} · ${esc(n.target)}</span>
      </div>
      <p class="now-why">${esc(n.why)}</p>
      <div class="bar" role="progressbar" aria-valuenow="${pr.pct}" aria-valuemin="0" aria-valuemax="100"
           aria-label="${esc(n.title)}: ${pr.done} of ${pr.total} checkpoints"><i style="width:${pr.pct}%"></i></div>
      <details class="steps">
        <summary>${pr.done} of ${pr.total} checkpoints</summary>
        <ul>${n.steps.map(s => `<li class="${s.done ? 'done' : ''}">${esc(s.label)}</li>`).join('')}</ul>
      </details>
    </article>`;
  }).join('');

  $('#nextList').innerHTML = `<h3 class="next-title">Next</h3>` + data.next.map(n => `
    <div class="next-item">
      <span class="next-when">${esc(n.when)}</span>
      <p class="next-name">${esc(n.title)}</p>
      <p class="next-why">${esc(n.why)}</p>
    </div>`).join('');
}

/* ---------- Work and study ---------- */
function renderWork(data) {
  $('#workList').innerHTML = `<h3 class="col-title">Work</h3>` + data.work.map(j => `
    <article class="job">
      <p class="job-period">${esc(j.period)}${j.current ? ' <span class="now-pill">Now</span>' : ''}</p>
      <div>
        <h4>${esc(j.role)}</h4>
        <p class="job-org">${esc(j.org)}</p>
        <ul>${j.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>
    </article>`).join('');

  const e = data.education;
  const done = data.units.filter(u => u.done).reduce((s, u) => s + u.pts, 0);
  $('#eduBlock').innerHTML = `
    <h3 class="col-title">Study</h3>
    <article class="edu-card">
      <p class="job-period">${esc(e.period)}</p>
      <h4>${esc(e.degree)}</h4>
      <p class="job-org">${esc(e.school)} · Hobart</p>
      <ul>
        <li>Coursework complete: ${done} of ${e.coursePoints} credit points (${esc(e.completed)})</li>
        <li>Graduating ${esc(e.graduating)}</li>
        ${e.lines.map(l => `<li>${esc(l)}</li>`).join('')}
      </ul>
    </article>`;
}

/* ---------- Contact + footer ---------- */
function renderContact(data) {
  const p = data.person, l = p.links;
  $('#contactSub').textContent =
    `${p.available.replace(/ · /g, ', ')}. If you have a role in ICT, or a question about anything on this page, I would like to hear from you.`;
  $('#contactLinks').innerHTML = `
    <div class="contact-row">
      <span class="contact-label">Email</span>
      <a href="mailto:${esc(l.email)}">${esc(l.email)}</a>
      <span class="copy-wrap">
        <button type="button" class="copy-btn" data-copy="${esc(l.email)}">Copy</button>
        <span class="copy-tip" role="status"></span>
      </span>
    </div>
    <div class="contact-row">
      <span class="contact-label">LinkedIn</span>
      <a href="${esc(l.linkedin)}"${ext(l.linkedin)}>${esc(l.linkedin.replace('https://', ''))}</a>
    </div>
    <div class="contact-row">
      <span class="contact-label">GitHub</span>
      <a href="${esc(l.github)}"${ext(l.github)}>${esc(l.github.replace('https://', ''))}</a>
    </div>
    <p class="contact-cta"><a class="btn btn-primary" href="${esc(data.cv.file)}" download>Download CV</a></p>`;

  $('#siteFoot').innerHTML = `
    <span>© 2026 ${esc(p.name)} · ${esc(p.location)}</span>
    <span>Last updated ${esc(data.meta.updated)} · Built from one data file ·
      <a href="${esc(data.meta.source)}"${ext(data.meta.source)}>View source ↗</a></span>`;
}

/* ============================================================
   Boot. renderAll is what the prerender runs; it needs renderCV from
   cv.js, which loads after this file, so the browser boot waits for
   DOMContentLoaded.
   ============================================================ */
function renderAll(data) {
  renderHero(data);
  renderProjects(data);
  renderSkills(data);
  renderNow(data);
  renderWork(data);
  renderContact(data);
  renderCV(data);
}
if (typeof window !== 'undefined') window.renderAll = renderAll;

if (typeof PRERENDER_ONLY === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    renderAll(DATA);
    const applyFilter = wireFilters();
    wireSkills();
    wireCopy();
    wireView();
    wireNav();
    wireTooltips();
    followHash(applyFilter);
    addEventListener('hashchange', () => followHash(applyFilter));
  });
}
