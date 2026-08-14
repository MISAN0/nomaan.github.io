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
  requestAnimationFrame(() => { $('#hudXpFill').style.width = xp.pct + '%'; });

  const img = $('#avatar');
  img.src = p.avatar;
  img.alt = p.name;
  img.addEventListener('error', () => img.closest('.portrait-frame').classList.add('no-photo'));

  $('#playerStatus').textContent = p.status;
  $('#playerClass').innerHTML = `${esc(p.class)} <span class="dim">/ ${esc(p.subclass)}</span>`;
  $('#playerName').textContent = p.name;
  $('#playerTagline').textContent = p.tagline;

  const hds = data.codex.filter(u => u.grade === 'HD').length;
  const chips = [
    ['Level', xp.level],
    [`GPA (out of ${data.academic.gpaScale})`, data.academic.gpa],
    ['University units passed', data.codex.filter(u => u.grade !== 'IP').length],
    ['High Distinctions', hds],
    ['Graduating', data.academic.graduating],
    ['Based in', p.location]
  ];
  $('#playerChips').innerHTML = chips
    .map(([k, v], i) => `<li style="--i:${i}"><span>${esc(k)}</span><b>${esc(v)}</b></li>`)
    .join('');

  $('#degreeVal').textContent = xp.degreePct + '% complete';
  $('#degreeNote').textContent =
    `${xp.donePts} of ${xp.coursePts} credit points passed · ${data.academic.degreeName}, graduating ${data.academic.graduating}`;
  requestAnimationFrame(() => { $('#degreeFill').style.width = xp.degreePct + '%'; });

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
        <i style="--w:${pct}%"></i>
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
           aria-label="${esc(g.title)} progress"><i style="--w:${pct}%"></i></div>
      <span class="goal-pct">${done} of ${g.steps.length} checkpoints</span>
    </article>`;
  }).join('');
}

/* ---------- Skill tree ---------- */
const LEVEL_WORD = ['Not started', 'Aware', 'Familiar', 'Working', 'Confident', 'Strong'];

function renderSkills(skills) {
  // Legend first — pips mean nothing without it.
  $('#skillLegend').innerHTML = `
    ${[1, 2, 3, 4, 5].map(l => `
      <span class="legend-item">
        <span class="node-pips">${Array.from({ length: 5 }, (_, k) =>
          `<i class="${k < l ? 'on' : ''}"></i>`).join('')}</span>
        ${esc(LEVEL_WORD[l])}
      </span>`).join('')}
    <span class="legend-item legend-locked"><span class="legend-lock">🔒</span> Learning next</span>`;

  const branches = [...new Set(skills.map(s => s.branch))];
  $('#skillTree').innerHTML = branches.map((b, bi) => {
    // Strongest first, so the top of each card is the most useful part.
    const nodes = skills.filter(s => s.branch === b)
      .sort((a, x) => x.level - a.level || a.name.localeCompare(x.name));
    const live = nodes.filter(s => s.level > 0);
    return `
    <div class="branch reveal" style="--i:${bi}" data-branch="${esc(b)}">
      <div class="branch-head">
        <h3 class="branch-name">${esc(b)}</h3>
        <span class="branch-count">${live.length}</span>
      </div>
      <div class="branch-nodes">
        ${nodes.map(s => `
          <div class="node ${s.level === 0 ? 'locked' : ''}"
               title="${esc(s.name)} — ${esc(LEVEL_WORD[s.level])}${s.evidence ? ' · ' + esc(s.evidence) : ''}">
            <span class="node-name">${esc(s.name)}</span>
            ${s.evidence ? `<span class="node-evidence">${esc(s.evidence)}</span>` : ''}
            <span class="node-pips" role="img" aria-label="${esc(LEVEL_WORD[s.level])}, ${s.level} of 5">${
              Array.from({ length: 5 }, (_, k) => `<i class="${k < s.level ? 'on' : ''}"></i>`).join('')
            }</span>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
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
  $('#artifactTally').textContent =
    `${list.length} projects · ${published} on GitHub`;

  $('#artifactList').innerHTML = list.map((a, i) => `
    <article class="artifact reveal r-${esc(a.rarity)}" style="--i:${Math.min(i, 8)}">
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
}

/* ---------- Codex + filters ---------- */
function renderCodex(codex, academic, gradeScale) {
  const passed = codex.filter(u => u.grade !== 'IP');

  /* Summary: the numbers a reader wants before reading 23 rows. */
  const counts = gradeScale
    .map(g => ({ ...g, n: codex.filter(u => u.grade === g.code).length }))
    .filter(g => g.n > 0);

  $('#codexSummary').innerHTML = `
    <div class="cx-stats">
      <div class="cx-stat"><b>${passed.length}</b><span>units passed</span></div>
      <div class="cx-stat"><b>${academic.gpa}</b><span>GPA out of ${academic.gpaScale}</span></div>
      <div class="cx-stat"><b>${Math.round(passed.reduce((t, u) => t + u.mark, 0) / passed.length)}</b><span>average mark</span></div>
    </div>
    <div class="cx-dist" role="img" aria-label="Grade distribution">
      ${counts.map(g => `<span class="cx-seg g-${esc(g.code)}" style="flex:${g.n}" title="${g.n} × ${esc(g.name)}"></span>`).join('')}
    </div>
    <div class="cx-key">
      ${counts.map(g => `
        <span class="cx-key-item">
          <i class="g-${esc(g.code)}"></i>
          <b>${esc(g.code)}</b> ${esc(g.name)}
          <em>${esc(g.range)}</em>
          <span class="cx-key-n">× ${g.n}</span>
        </span>`).join('')}
    </div>`;

  const themes = [...new Set(codex.map(u => u.theme))];
  const filters = [
    { key: 'ALL', label: `All ${codex.length}` },
    ...themes.map(t => ({ key: 't:' + t, label: t })),
    ...gradeScale.filter(g => g.code !== 'IP' && codex.some(u => u.grade === g.code))
      .map(g => ({ key: 'g:' + g.code, label: g.code }))
  ];
  $('#codexFilters').innerHTML = filters
    .map((f, i) => `<button type="button" class="chip ${i === 0 ? 'on' : ''}" data-key="${esc(f.key)}">${esc(f.label)}</button>`)
    .join('');

  const match = (u, key) => {
    if (key === 'ALL') return true;
    const [kind, val] = key.split(':');
    return kind === 'g' ? u.grade === val : u.theme === val;
  };

  const draw = key => {
    const rows = codex.filter(u => match(u, key));
    $('#codexList').innerHTML = rows.map((u, i) => `
      <div class="codex-row reveal g-${esc(u.grade)} t-${esc(u.theme.replace(/\W+/g, '-'))}"
           style="--i:${Math.min(i, 12)}" title="${esc(u.theme)} · ${esc(u.pts)} credit points">
        <span class="codex-code">${esc(u.code)}</span>
        <span class="codex-name">${esc(u.name)}</span>
        <span class="codex-theme">${esc(u.theme)}</span>
        <span class="codex-when">${esc(u.year)} S${esc(u.sem)}</span>
        <span class="codex-mark">${u.grade === 'IP' ? '—' : u.mark}</span>
        <span class="codex-grade">${esc(u.grade)}</span>
      </div>`).join('');
    observeReveals();
  };

  $('#codexFilters').addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $('#codexFilters').querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    draw(btn.dataset.key);
  });

  draw('ALL');
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
    cv.phone ? `<a href="tel:${esc(cv.phone.replace(/\s/g, ''))}">${esc(cv.phone)}</a>` : '',
    `<a href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">${esc(p.links.linkedin.replace('https://', ''))}</a>`,
    `<a href="${esc(p.links.github)}" target="_blank" rel="noopener">${esc(p.links.github.replace('https://', ''))}</a>`,
    `<span>${esc(p.location)}</span>`
  ].filter(Boolean).join('<i aria-hidden="true">·</i>');

  const download = cv.file
    ? `<a class="cv-download" href="${esc(cv.file)}" download>
         <span class="cv-dl-icon" aria-hidden="true">↓</span>
         <span><b>Download CV</b><em>${esc(cv.fileLabel || 'PDF')}</em></span>
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
        ${download}
      </header>

      <div class="cv-avail">
        <span><b>Available</b> ${esc(ac.graduating)}</span>
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

      ${cv.activities && cv.activities.length ? `
      <section class="cv-sec">
        <h2>Activities &amp; Involvement</h2>
        <ul class="cv-list">${cv.activities.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
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
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.35 });
  sections.forEach(s => secObs.observe(s));

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

  plain.addEventListener('click', () => {
    const on = !document.body.classList.contains('plain');
    apply(on);
    localStorage.setItem('cvMode', on ? '1' : '0');
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

/* ---------- Boot ---------- */
(function init() {
  const xp = xpModel(DATA);
  renderSheet(DATA, xp);
  renderRadar(DATA.attributes);
  renderQuests(DATA.quests);
  renderGoals(DATA.goals);
  renderSkills(DATA.skills);
  renderArtifacts(DATA.artifacts);
  renderCodex(DATA.codex, DATA.academic, DATA.gradeScale);
  renderCampaign(DATA.campaign);
  renderAchievements(DATA.achievements);
  renderCV(DATA);
  observeReveals();
  wireChrome();
})();
