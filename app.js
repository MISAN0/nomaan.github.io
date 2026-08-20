/* ============================================================
   Renders the whole site from DATA (data.js).
   No build step, no dependencies.
   ============================================================ */

const $ = sel => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- XP model ----------
   Total XP = unit grades + artifacts + campaign entries.
   Level curve: level n starts at (n*10)^2 XP, so levels get
   steadily more expensive instead of arriving every unit.      */
const unitXp = u => u.grade === 'IP' ? 0 : (u.mark ?? GRADE_XP[u.grade] ?? 0);

function xpModel(data) {
  const unitTotal = data.codex.reduce((sum, u) => sum + unitXp(u), 0);
  const artifactXp = data.artifacts.length * 60;
  const campaignXp = data.campaign.length * 80;
  const total = unitTotal + artifactXp + campaignXp;

  const level = Math.max(1, Math.floor(Math.sqrt(total) / 10));
  const floorXp = Math.pow(level * 10, 2);
  const nextXp = Math.pow((level + 1) * 10, 2);
  const pct = Math.min(100, ((total - floorXp) / (nextXp - floorXp)) * 100);

  // Degree progress straight from credit points on the record.
  const donePts = data.codex.filter(u => u.grade !== 'IP').reduce((s, u) => s + (u.pts ?? 0), 0);
  const coursePts = data.academic.coursePoints;
  const degreePct = Math.round((donePts / coursePts) * 1000) / 10;

  return { total, level, floorXp, nextXp, pct, unitTotal, donePts, coursePts, degreePct };
}

/* ---------- HUD + character sheet ---------- */
function renderSheet(data, xp) {
  const p = data.player;

  $('#hudLevel').textContent = xp.level;
  $('#hudXpText').textContent = `${xp.total} / ${xp.nextXp} XP`;
  requestAnimationFrame(() => { $('#hudXpFill').style.transform = `scaleX(${xp.pct / 100})`; });

  const img = $('#avatar');
  img.src = p.avatar;
  img.alt = p.name;
  img.addEventListener('error', () => img.closest('.portrait-frame').classList.add('no-photo'));

  $('#playerStatus').textContent = p.status;
  $('#playerClass').innerHTML = `${esc(p.class)} <span class="dim">/ ${esc(p.subclass)}</span>`;
  $('#playerName').textContent = p.name;
  $('#playerTagline').textContent = p.tagline;

  const chips = [
    ['Level', xp.level],
    ['University units passed', data.codex.filter(u => u.grade !== 'IP').length],
    ['Graduating', data.academic.graduating],
    ['Based in', p.location]
  ];
  $('#playerChips').innerHTML = chips
    .map(([k, v], i) => `<li style="--i:${i}"><span>${esc(k)}</span><b>${esc(v)}</b></li>`)
    .join('');

  $('#degreeVal').textContent = xp.degreePct + '% complete';
  $('#degreeNote').textContent =
    `${xp.donePts} of ${xp.coursePts} credit points passed · ${data.academic.degreeName}, graduating ${data.academic.graduating}`;
  requestAnimationFrame(() => { $('#degreeFill').style.transform = `scaleX(${xp.degreePct / 100})`; });

  $('#ghLink').href = p.links.github;
  $('#liLink').href = p.links.linkedin;

  $('#statList').innerHTML = data.attributes.map((a, i) => `
    <li style="--i:${i}">
      <span class="stat-key">${esc(a.key)}</span>
      <span class="stat-label">${esc(a.label)}</span>
      <span class="stat-num">${a.value}<em>/10</em></span>
      <span class="stat-bar"><i style="--w:${a.value * 10}%"></i></span>
      <span class="stat-desc">${esc(a.desc)}</span>
    </li>`).join('');

  /* Email renders only once it is set, so the card never shows an empty
     row or a mailto: link that goes nowhere. */
  const contacts = [
    p.links.email ? {
      label: 'Email', value: p.links.email, href: 'mailto:' + p.links.email
    } : null,
    { label: 'LinkedIn', value: p.links.linkedin.replace('https://', ''), href: p.links.linkedin },
    { label: 'GitHub', value: p.links.github.replace('https://', ''), href: p.links.github }
  ].filter(Boolean);

  $('#contactLinks').innerHTML = contacts.map(c => `
    <a class="contact-link" href="${esc(c.href)}"${c.href.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener"'}>
      <span>${esc(c.label)}</span><b>${esc(c.value)}</b>
    </a>`).join('');

  $('#contactFacts').innerHTML = [
    ['Open to', p.status.replace(/^Open to /, '')],
    ['Based in', p.location],
    ['Graduating', data.academic.graduating]
  ].map(([k, v]) => `<div class="fact"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');

  $('#footHint').textContent = `${p.location} · Last updated ${data.meta.updated}`;
}

/* ---------- Radar chart ---------- */
function renderRadar(attrs) {
  const svg = $('#radar');
  // Wider than tall so the outer key labels have room either side.
  const cx = 130, cy = 108, R = 76, n = attrs.length;
  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  let out = '';

  for (let ring = 1; ring <= 4; ring++) {
    const r = (R * ring) / 4;
    const pts = attrs.map((_, i) => pt(i, r).join(',')).join(' ');
    out += `<polygon points="${pts}" class="radar-ring"/>`;
  }
  attrs.forEach((_, i) => {
    const [x, y] = pt(i, R);
    out += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="radar-spoke"/>`;
  });

  const shape = attrs.map((a, i) => pt(i, (R * a.value) / 10).join(',')).join(' ');
  out += `<polygon points="${shape}" class="radar-shape"/>`;
  attrs.forEach((a, i) => {
    const [x, y] = pt(i, (R * a.value) / 10);
    out += `<circle cx="${x}" cy="${y}" r="3" class="radar-dot"/>`;
  });
  attrs.forEach((a, i) => {
    const [x, y] = pt(i, R + 20);
    out += `<text x="${x}" y="${y}" class="radar-label" text-anchor="middle" dominant-baseline="middle">${esc(a.key)}</text>`;
  });

  svg.innerHTML = out;
}

/* ---------- Quests ---------- */
const QUEST_STATE = {
  active: '◈ In progress',
  queued: '◇ Queued',
  paused: '❚❚ Paused',
  done:   '✔ Complete'
};

/* Progress comes from the objectives, so the bar can never disagree with
   the checklist printed directly above it. */
function questProgress(q) {
  if (!q.objectives || !q.objectives.length) return q.progress ?? 0;
  const done = q.objectives.filter(o => o.done).length;
  return Math.round((done / q.objectives.length) * 100);
}

function renderQuests(quests) {
  const count = s => quests.filter(q => q.status === s).length;
  const tally = [
    [count('active'), 'active'],
    [count('queued'), 'queued'],
    [count('done'), 'complete']
  ].filter(([n]) => n > 0).map(([n, label]) => `${n} ${label}`).join(' · ');
  $('#questTally').textContent = tally;

  $('#questList').innerHTML = quests.map((q, i) => {
    const pct = questProgress(q);
    const done = (q.objectives || []).filter(o => o.done).length;
    const total = (q.objectives || []).length;
    return `
    <article class="quest reveal is-${esc(q.status)}" style="--i:${i}">
      <div class="quest-top">
        <span class="quest-state">${QUEST_STATE[q.status] || q.status}</span>
        <span class="quest-due">${esc(q.due)}</span>
      </div>

      <div class="quest-head">
        <h3 class="quest-title">${esc(q.title)}</h3>
        ${q.rank ? `<span class="quest-rank" title="Difficulty rank">${esc(q.rank)}</span>` : ''}
      </div>
      <p class="quest-role">${esc(q.role)}</p>
      <p class="quest-blurb">${esc(q.blurb)}</p>

      ${total ? `
      <ul class="quest-objectives">
        ${q.objectives.map(o => `<li class="${o.done ? 'done' : ''}"><i></i>${esc(o.label)}</li>`).join('')}
      </ul>` : ''}

      <div class="quest-tags">${q.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>

      <div class="quest-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
           aria-label="${esc(q.title)} progress">
        <i style="--p:${pct / 100}"></i>
      </div>
      <div class="quest-foot">
        <span>${total ? `${done} of ${total} objectives` : 'In progress'}</span>
        <b>${pct}%</b>
      </div>
      <div class="quest-meta">
        <span class="quest-next">Next: ${esc(q.next)}</span>
        ${q.reward ? `<span class="quest-reward">+${q.reward} XP</span>` : ''}
      </div>
    </article>`;
  }).join('');
}

/* ---------- Goals ---------- */
function renderGoals(goals) {
  const allSteps = goals.reduce((n, g) => n + g.steps.length, 0);
  const allDone = goals.reduce((n, g) => n + g.steps.filter(s => s.done).length, 0);
  $('#goalTally').textContent = `${allDone} of ${allSteps} checkpoints cleared`;

  $('#goalList').innerHTML = goals.map((g, i) => {
    const done = g.steps.filter(s => s.done).length;
    const pct = Math.round((done / g.steps.length) * 100);
    const state = pct === 100 ? 'is-done' : done > 0 ? 'is-started' : 'is-open';
    return `
    <article class="goal reveal ${state}" style="--i:${i}">
      <div class="goal-top">
        <span class="goal-horizon">${esc(g.horizon)}</span>
        <span class="goal-target">${esc(g.target)}</span>
      </div>

      <h3 class="goal-title">${esc(g.title)}</h3>
      <p class="goal-why">${esc(g.why)}</p>
      <p class="goal-detail">${esc(g.detail)}</p>

      <ol class="goal-steps">
        ${g.steps.map(s => `<li class="${s.done ? 'done' : ''}"><i></i>${esc(s.label)}</li>`).join('')}
      </ol>

      <div class="goal-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
           aria-label="${esc(g.title)} progress"><i style="--p:${pct / 100}"></i></div>
      <span class="goal-pct">${done} of ${g.steps.length} checkpoints</span>
    </article>`;
  }).join('');
}

/* ---------- Skill tree ---------- */
const LEVEL_WORD = ['Not started', 'Aware', 'Familiar', 'Working', 'Confident', 'Strong'];

/* Evidence is written as unit codes to stay compact. Expand them to
   "KIT213 — Operating Systems" for the tooltip and the key below the
   tree, so a reader is never left guessing what a code means. */
function expandEvidence(evidence, codex) {
  return String(evidence).split('·').map(part => {
    const code = part.trim();
    const unit = codex.find(u => u.code === code);
    return unit ? `${code} — ${unit.name}` : code;
  }).join(' · ');
}

/* Branch order and the one-line note come from DATA.skillBranches.
   Any branch used in `skills` but missing from that list still renders,
   at the end, so adding a skill can never make it disappear. */
function branchOrder(skills, meta) {
  const used = [...new Set(skills.map(s => s.branch))];
  const listed = (meta || []).filter(b => used.includes(b.name));
  const rest = used.filter(u => !listed.some(b => b.name === u)).map(name => ({ name }));
  return [...listed, ...rest];
}

function renderSkills(skills, codex, meta) {
  // Legend first — pips mean nothing without it.
  $('#skillLegend').innerHTML = `
    ${[1, 2, 3, 4, 5].map(l => `
      <span class="legend-item">
        <span class="node-pips">${Array.from({ length: 5 }, (_, k) =>
          `<i class="${k < l ? 'on' : ''}"></i>`).join('')}</span>
        ${esc(LEVEL_WORD[l])}
      </span>`).join('')}
    <span class="legend-item legend-locked"><span class="legend-lock">🔒</span> Learning next</span>`;

  const branches = branchOrder(skills, meta);
  $('#skillTree').innerHTML = branches.map((b, bi) => {
    // Strongest first, so the top of each card is the most useful part.
    const nodes = skills.filter(s => s.branch === b.name)
      .sort((a, x) => x.level - a.level || a.name.localeCompare(x.name));
    const live = nodes.filter(s => s.level > 0);
    const next = nodes.filter(s => s.level === 0);
    const strong = live.filter(s => s.level >= 4).length;

    /* A <details> rather than a div: eight branches of nine skills is a
       wall of text on arrival, and the browser gives us open/close,
       keyboard support and find-in-page for free. */
    return `
    <details class="branch reveal" style="--i:${bi}" data-branch="${esc(b.name)}"${b.open ? ' open' : ''}>
      <summary class="branch-head">
        <h3 class="branch-name">${esc(b.name)}</h3>
        <span class="branch-count" title="${live.length} skills, ${strong} at Confident or above">
          ${live.length}${strong ? ` · ${strong} strong` : ''}
        </span>
        <span class="branch-chev" aria-hidden="true"></span>
      </summary>
      ${b.note ? `<p class="branch-note">${esc(b.note)}</p>` : ''}
      <div class="branch-nodes">
        ${nodes.map(s => `
          <div class="node ${s.level === 0 ? 'locked' : ''}"
               data-tip="${esc(LEVEL_WORD[s.level])}${
                 s.evidence ? ' · ' + esc(expandEvidence(s.evidence, codex)) : ''}">
            <span class="node-name">${esc(s.name)}</span>
            <span class="node-level">${esc(LEVEL_WORD[s.level])}</span>
            ${s.evidence ? `<span class="node-evidence">${esc(s.evidence)}</span>` : ''}
            <span class="node-pips" role="img" aria-label="${esc(LEVEL_WORD[s.level])}, ${s.level} of 5">${
              Array.from({ length: 5 }, (_, k) => `<i class="${k < s.level ? 'on' : ''}"></i>`).join('')
            }</span>
          </div>`).join('')}
      </div>
      ${next.length ? `<p class="branch-next">Learning next: ${next.map(s => esc(s.name)).join(', ')}</p>` : ''}
    </details>`;
  }).join('');

  /* One control for all eight, because opening them one at a time to
     read the whole tree is eight clicks. */
  const treeEl = $('#skillTree');
  const toggle = el('button', 'tree-toggle');
  const sync = () => {
    const anyClosed = [...treeEl.querySelectorAll('.branch')].some(d => !d.open);
    toggle.textContent = anyClosed ? 'Expand all branches' : 'Collapse all branches';
    toggle.dataset.action = anyClosed ? 'open' : 'close';
  };
  toggle.addEventListener('click', () => {
    const open = toggle.dataset.action === 'open';
    treeEl.querySelectorAll('.branch').forEach(d => { d.open = open; });
    sync();
  });
  treeEl.addEventListener('toggle', sync, true);
  sync();
  treeEl.before(toggle);

  /* Collapsed by default, so the codes can be looked up without the key
     taking any room on the page. */
  const used = new Set();
  skills.forEach(s => String(s.evidence || '').split('·')
    .forEach(c => used.add(c.trim())));
  const units = codex.filter(u => used.has(u.code))
    .sort((a, b) => a.code.localeCompare(b.code));

  $('#unitKey').innerHTML = `
    <details class="unit-key">
      <summary>What the unit codes mean <span>${units.length} units</span></summary>
      <div class="unit-key-grid">
        ${units.map(u => `
          <div class="unit-key-row">
            <code>${esc(u.code)}</code><span>${esc(u.name)}</span>
          </div>`).join('')}
      </div>
    </details>`;
}

/* ---------- Artifacts ---------- */
/* Footer of an artifact card: a real link once the repo exists, an
   honest placeholder until then. Never a dead link. */
function artifactCode(a) {
  if (a.code === 'published' && a.repo) {
    return `<a class="artifact-link" href="${esc(a.repo)}" target="_blank" rel="noopener">Inspect the code ↗</a>`;
  }
  if (a.code === 'writeup') {
    return `<span class="artifact-note">Written work — available on request</span>`;
  }
  return `<span class="artifact-note">Code being prepared for GitHub</span>`;
}

function renderArtifacts(list) {
  const published = list.filter(a => a.code === 'published' && a.repo).length;
  const tally = $('#artifactTally');
  const baseTally = `${list.length} projects · ${published} on GitHub`;
  tally.textContent = baseTally;

  /* Filter by category rather than by `type`: every project has a
     different type, so a type filter would be eleven buttons that each
     match one card. Categories stay useful as the list grows. */
  const cats = [...new Set(list.map(a => a.cat).filter(Boolean))];
  const count = c => list.filter(a => a.cat === c).length;
  $('#artifactFilters').innerHTML = cats.length ? `
    <button class="filter on" data-cat="all">All <b>${list.length}</b></button>
    ${cats.map(c => `<button class="filter" data-cat="${esc(c)}">${esc(c)} <b>${count(c)}</b></button>`).join('')}` : '';

  $('#artifactList').innerHTML = list.map((a, i) => `
    <article class="artifact reveal r-${esc(a.rarity)}" style="--i:${Math.min(i, 8)}" data-cat="${esc(a.cat || '')}">
      <div class="artifact-top">
        <span class="rarity">${esc(a.rarity)}</span>
        <span class="artifact-type">${esc(a.type)}</span>
      </div>

      <h3 class="artifact-name">${esc(a.name)}</h3>
      <p class="artifact-meta">${esc(a.year)} · ${esc(a.team)}</p>
      <p class="artifact-blurb">${esc(a.blurb)}</p>

      ${a.highlights && a.highlights.length ? `
        <ul class="artifact-points">
          ${a.highlights.map(h => `<li>${esc(h)}</li>`).join('')}
        </ul>` : ''}

      <div class="artifact-stats">${a.stats.map(s => `<code>${esc(s)}</code>`).join('')}</div>
      <div class="artifact-foot">${artifactCode(a)}</div>
    </article>`).join('');

  const filters = $('#artifactFilters');
  const cards = [...$('#artifactList').children];
  filters.addEventListener('click', e => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const cat = btn.dataset.cat;
    filters.querySelectorAll('.filter').forEach(b => b.classList.toggle('on', b === btn));

    let shown = 0;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.hidden = !match;
      // A hidden card never intersects, so the scroll observer would
      // leave it at opacity 0 when the filter brings it back.
      if (match) { shown++; card.classList.add('in'); }
    });
    tally.textContent = cat === 'all' ? baseTally : `Showing ${shown} of ${list.length} projects`;
  });
}

/* ---------- Campaign ---------- */
function renderCampaign(list) {
  $('#campaignList').innerHTML = list.map((c, i) => `
    <article class="camp reveal k-${esc(c.kind)}" style="--i:${i}">
      <div class="camp-side">
        <span class="camp-period">${esc(c.period)}</span>
        ${c.current ? '<span class="camp-now">Now</span>' : ''}
      </div>
      <div class="camp-body">
        <h3 class="camp-title">${esc(c.title)}</h3>
        <p class="camp-org">${esc(c.org)}</p>
        <ul class="camp-lines">${c.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        ${c.tags && c.tags.length
          ? `<div class="camp-tags">${c.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`
          : ''}
      </div>
    </article>`).join('');
}

/* ---------- Achievements ---------- */
function renderAchievements(list) {
  const byTier = t => list.filter(a => a.tier === t).length;
  $('#achTally').textContent =
    `${byTier('gold')} gold · ${byTier('silver')} silver · ${byTier('bronze')} bronze`;

  $('#achievementList').innerHTML = list.map((a, i) => `
    <div class="ach reveal t-${esc(a.tier)}" style="--i:${Math.min(i, 8)}">
      <div class="ach-top">
        <span class="ach-icon">${esc(a.icon)}</span>
        <span class="ach-when">${esc(a.when)}</span>
      </div>
      <span class="ach-name">${esc(a.name)}</span>
      <span class="ach-desc">${esc(a.desc)}</span>
      <span class="ach-proof">${esc(a.proof)}</span>
    </div>`).join('');
}

/* ============================================================
   CV MODE
   A separate document for a hiring audience, built from the same
   data. Not a restyle of the game page: different sections,
   different order, different language.
   ============================================================ */
function renderCV(data) {
  const p = data.player, cv = data.cv, ac = data.academic;

  /* --- Contact line: only what is actually set --- */
  const contact = [
    p.links.email ? `<a href="mailto:${esc(p.links.email)}">${esc(p.links.email)}</a>` : '',
    `<a href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">${esc(p.links.linkedin.replace('https://', ''))}</a>`,
    `<a href="${esc(p.links.github)}" target="_blank" rel="noopener">${esc(p.links.github.replace('https://', ''))}</a>`,
    `<span>${esc(p.location)}</span>`
  ].filter(Boolean).join('<i aria-hidden="true">·</i>');

  /* The download sits in the top bar beside the view toggle, so it is
     reachable from anywhere on the page rather than only at the top. */
  document.getElementById('hudDownload').innerHTML = cv.file
    ? `<a class="hud-dl" href="${esc(cv.file)}" download>
         <span aria-hidden="true">↓</span> Download CV
       </a>`
    : '';

  /* --- Technical skills, grouped, from the skill tree --- */
  const branches = [...new Set(data.skills.map(s => s.branch))];
  const skillGroups = branches.map(b => ({
    name: b,
    items: data.skills.filter(s => s.branch === b && s.level >= 3)
      .sort((a, x) => x.level - a.level).map(s => s.name)
  })).filter(g => g.items.length);

  const certs = data.quests.filter(q => /certification/i.test(q.role));
  const projects = data.artifacts.filter(a => a.rarity !== 'rare').slice(0, 5);

  document.getElementById('cvDoc').innerHTML = `
    <article class="cv-paper">

      <header class="cv-head">
        <div class="cv-head-main">
          <h1 class="cv-name">${esc(p.name)}</h1>
          <p class="cv-headline">${esc(cv.headline)}</p>
          <p class="cv-contact">${contact}</p>
        </div>
      </header>

      <div class="cv-avail">
        <span><b>Graduating</b> ${esc(ac.graduating)}</span>
        <span><b>Seeking</b> ${esc(p.status.replace(/^Open to /, ''))}</span>
        <span><b>Location</b> ${esc(p.location)}</span>
      </div>

      <section class="cv-sec">
        <h2>Professional Summary</h2>
        <p class="cv-summary">${esc(cv.summary)}</p>
      </section>

      <section class="cv-sec">
        <h2>Selected Achievements</h2>
        <ul class="cv-list cv-list-tight">
          ${cv.highlights.map(h => `<li>${esc(h)}</li>`).join('')}
        </ul>
      </section>

      <section class="cv-sec">
        <h2>Technical Skills</h2>
        <div class="cv-skills">
          ${skillGroups.map(g => `
            <div class="cv-skill-group">
              <h3>${esc(g.name)}</h3>
              <p>${g.items.map(esc).join(' · ')}</p>
            </div>`).join('')}
        </div>
        <div class="cv-skill-group cv-soft">
          <h3>Professional Skills</h3>
          <p>${cv.softSkills.map(esc).join(' · ')}</p>
        </div>
      </section>

      <section class="cv-sec">
        <h2>Selected Projects</h2>
        ${projects.map(a => `
          <div class="cv-proj">
            <div class="cv-role-head">
              <h3>${esc(a.name)} <span class="cv-org">— ${esc(a.type)}</span></h3>
              <span class="cv-dates">${esc(a.year)}</span>
            </div>
            <p>${esc(a.blurb)}</p>
            <p class="cv-tech"><b>Technologies:</b> ${a.stats.map(esc).join(', ')}</p>
          </div>`).join('')}
      </section>

      <section class="cv-sec">
        <h2>Education</h2>
        <div class="cv-role">
          <div class="cv-role-head">
            <h3>Bachelor of Information and Communication Technology<span class="cv-org"> — University of Tasmania</span></h3>
            <span class="cv-dates">2023 – ${esc(ac.graduating)}</span>
          </div>
          <p class="cv-loc">Hobart, Tasmania · Double major: Computer Science and Cyber Security</p>
          <p class="cv-course"><b>Relevant coursework:</b> ${cv.coursework.map(esc).join(', ')}</p>
        </div>
      </section>

      <section class="cv-sec">
        <h2>Certifications</h2>
        <ul class="cv-list cv-list-tight">
          ${certs.map(c => `<li><b>${esc(c.title)}</b> — in progress, targeting ${esc(c.due)}</li>`).join('')}
        </ul>
      </section>

      <section class="cv-sec">
        <h2>Professional Experience</h2>
        ${cv.experience.map(e => `
          <div class="cv-role">
            <div class="cv-role-head">
              <h3>${esc(e.role)} <span class="cv-org">— ${esc(e.org)}</span></h3>
              <span class="cv-dates">${esc(e.period)}</span>
            </div>
            <p class="cv-loc">${esc(e.location)}</p>
            <ul class="cv-list">${e.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
          </div>`).join('')}
      </section>

      ${cv.activities && cv.activities.length ? `
      <section class="cv-sec">
        <h2>Activities &amp; Involvement</h2>
        <ul class="cv-list">${cv.activities.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      </section>` : ''}

      ${cv.references && cv.references.length ? `
      <section class="cv-sec">
        <h2>References</h2>
        <div class="cv-refs">
          ${cv.references.map(r => `
            <div class="cv-ref">
              <b>${esc(r.name)}</b>
              <span>${esc(r.role)}</span>
              <em>${esc(r.org)}</em>
            </div>`).join('')}
        </div>
        <p class="cv-ref-note">Contact details available on request.</p>
      </section>` : ''}

      <section class="cv-sec cv-sec-keywords">
        <h2>Technical Keywords</h2>
        <p class="cv-keywords">${cv.keywords.map(esc).join(' · ')}</p>
      </section>

      <footer class="cv-foot">
        <span>${esc(p.name)} · ${esc(p.location)}</span>
        <span>Last updated ${esc(data.meta.updated)}</span>
      </footer>
    </article>`;
}

/* ============================================================
   TOOLTIPS
   Native title= waits about a second, cannot be styled, and never
   appears on touch. This is the same idea done properly: a delay
   before the first one so passing the cursor over a card does not
   trigger it, then no delay and no animation while moving between
   neighbours — which is what makes a row of them feel instant.
   ============================================================ */
function initTooltips() {
  const tip = el('div', 'tip');
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.appendChild(tip);

  let showTimer, hideTimer, active = null, warm = false, warmTimer;

  const place = target => {
    const r = target.getBoundingClientRect();
    tip.style.transform = 'none';           // measure unrotated
    const t = tip.getBoundingClientRect();
    const margin = 8;
    let left = r.left + r.width / 2 - t.width / 2;
    left = Math.max(10, Math.min(left, window.innerWidth - t.width - 10));

    // Above by default; below when there is no room up top.
    const above = r.top > t.height + margin + 10;
    const top = above ? r.top - t.height - margin : r.bottom + margin;
    tip.classList.toggle('below', !above);

    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(top)}px`;
    // Point the scale origin at the trigger, not the tooltip's centre.
    const originX = Math.round(r.left + r.width / 2 - left);
    tip.style.setProperty('--tip-origin-x', `${originX}px`);
  };

  const show = target => {
    tip.textContent = target.dataset.tip;
    tip.hidden = false;
    place(target);
    // Warm: skip the entrance so neighbours feel immediate.
    tip.classList.toggle('instant', warm);
    requestAnimationFrame(() => tip.classList.add('on'));
    active = target;
    warm = true;
    clearTimeout(warmTimer);
  };

  const hide = () => {
    clearTimeout(showTimer);
    tip.classList.remove('on');
    active = null;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { tip.hidden = true; }, 140);
    // Stay warm briefly, so moving to the next node is instant.
    clearTimeout(warmTimer);
    warmTimer = setTimeout(() => { warm = false; }, 400);
  };

  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;      // touch has the unit key instead
    const target = e.target.closest('[data-tip]');
    if (!target || target === active) return;
    clearTimeout(showTimer);
    showTimer = setTimeout(() => show(target), warm ? 0 : 380);
  });

  document.addEventListener('pointerout', e => {
    const target = e.target.closest('[data-tip]');
    if (target && !target.contains(e.relatedTarget)) hide();
  });

  window.addEventListener('scroll', () => { if (active) hide(); }, { passive: true });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
}

/* ---------- Scroll reveal ---------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }
  document.querySelectorAll('.reveal:not(.in)').forEach(n => revealObserver.observe(n));
}

/* ---------- Nav: active section + mobile menu + CV mode ---------- */
function wireChrome() {
  const links = [...document.querySelectorAll('.hud-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  /* Position-based, not IntersectionObserver with a ratio threshold:
     the skill tree is several screens tall, so it could never show 35%
     of itself at once and its nav link never lit up. The active section
     is simply the last one whose top has passed under the HUD. */
  let ticking = false;
  const markActive = () => {
    ticking = false;
    const line = 140;                       // just below the HUD
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) current = s;
    }
    // At the very bottom the last section wins, however short it is.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + current.id));
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(markActive);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  markActive();

  const burger = $('#burger'), nav = $('#hudNav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  const plain = $('#plainToggle');
  const label = on => { plain.textContent = on ? 'Interactive view' : 'Recruiter view'; };

  const apply = on => {
    document.body.classList.toggle('plain', on);
    plain.setAttribute('aria-pressed', on);
    label(on);
  };

  const saved = localStorage.getItem('cvMode') === '1';
  apply(saved);

  /* The two views are the same person seen two ways, so the swap gets a
     short cross-fade rather than a hard cut. */
  plain.addEventListener('click', () => {
    const on = !document.body.classList.contains('plain');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const swap = () => {
      apply(on);
      localStorage.setItem('cvMode', on ? '1' : '0');
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.body.classList.remove('view-out');
      document.body.classList.add('view-in');
      setTimeout(() => document.body.classList.remove('view-in'), 260);
    };

    if (reduce) return swap();
    document.body.classList.add('view-out');
    setTimeout(swap, 120);
  });
}

/* ---------- Boot ---------- */
(function init() {
  const xp = xpModel(DATA);
  renderSheet(DATA, xp);
  renderRadar(DATA.attributes);
  renderQuests(DATA.quests);
  renderGoals(DATA.goals);
  renderSkills(DATA.skills, DATA.codex, DATA.skillBranches);
  renderArtifacts(DATA.artifacts);
  renderCampaign(DATA.campaign);
  renderAchievements(DATA.achievements);
  renderCV(DATA);
  observeReveals();
  wireChrome();
  initTooltips();
})();
