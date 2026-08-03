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

  $('#contactLinks').innerHTML = `
    <a class="contact-link" href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">
      <span>LinkedIn</span><b>${esc(p.links.linkedin.replace('https://', ''))}</b></a>
    <a class="contact-link" href="${esc(p.links.github)}" target="_blank" rel="noopener">
      <span>GitHub</span><b>${esc(p.links.github.replace('https://', ''))}</b></a>`;
  $('#footHint').textContent = p.location;
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
function renderQuests(quests) {
  $('#questList').innerHTML = quests.map((q, i) => `
    <article class="quest reveal is-${esc(q.status)}" style="--i:${i}">
      <div class="quest-top">
        <span class="quest-state">${q.status === 'active' ? '◈ In progress' : q.status === 'done' ? '✔ Complete' : '❚❚ Paused'}</span>
        <span class="quest-due">${esc(q.due)}</span>
      </div>
      <h3 class="quest-title">${esc(q.title)}</h3>
      <p class="quest-role">${esc(q.role)}</p>
      <p class="quest-blurb">${esc(q.blurb)}</p>
      <div class="quest-tags">${q.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="quest-bar" role="progressbar" aria-valuenow="${q.progress}" aria-valuemin="0" aria-valuemax="100">
        <i style="--w:${q.progress}%"></i>
      </div>
      <div class="quest-foot"><span>Next: ${esc(q.next)}</span><b>${q.progress}%</b></div>
    </article>`).join('');
}

/* ---------- Goals ---------- */
function renderGoals(goals) {
  $('#goalList').innerHTML = goals.map((g, i) => {
    const done = g.steps.filter(s => s.done).length;
    const pct = Math.round((done / g.steps.length) * 100);
    return `
    <article class="goal reveal" style="--i:${i}">
      <div class="goal-head">
        <h3 class="goal-title">${esc(g.title)}</h3>
        <span class="goal-target">${esc(g.target)}</span>
      </div>
      <p class="goal-detail">${esc(g.detail)}</p>
      <ol class="goal-steps">
        ${g.steps.map(s => `<li class="${s.done ? 'done' : ''}"><i></i>${esc(s.label)}</li>`).join('')}
      </ol>
      <div class="goal-bar"><i style="--w:${pct}%"></i></div>
      <span class="goal-pct">${done}/${g.steps.length} checkpoints</span>
    </article>`;
  }).join('');
}

/* ---------- Skill tree ---------- */
function renderSkills(skills) {
  const branches = [...new Set(skills.map(s => s.branch))];
  $('#skillTree').innerHTML = branches.map((b, bi) => {
    const nodes = skills.filter(s => s.branch === b).sort((a, x) => a.tier - x.tier);
    return `
    <div class="branch reveal" style="--i:${bi}" data-branch="${esc(b)}">
      <h3 class="branch-name">${esc(b)}</h3>
      <div class="branch-nodes">
        ${nodes.map(s => `
          <button class="node ${s.level === 0 ? 'locked' : ''}" type="button"
                  aria-label="${esc(s.name)}, level ${s.level} of 5">
            <span class="node-name">${esc(s.name)}</span>
            <span class="node-pips">${
              Array.from({ length: 5 }, (_, k) => `<i class="${k < s.level ? 'on' : ''}"></i>`).join('')
            }</span>
            <span class="node-tier">T${s.tier}</span>
          </button>`).join('')}
      </div>
    </div>`;
  }).join('');
}

/* ---------- Artifacts ---------- */
function renderArtifacts(list) {
  $('#artifactList').innerHTML = list.map((a, i) => `
    <article class="artifact reveal r-${esc(a.rarity)}" style="--i:${i}">
      <div class="artifact-top">
        <span class="rarity">${esc(a.rarity)}</span>
        <span class="artifact-type">${esc(a.type)}</span>
      </div>
      <h3 class="artifact-name">${esc(a.name)}</h3>
      <p class="artifact-blurb">${esc(a.blurb)}</p>
      <div class="artifact-stats">${a.stats.map(s => `<code>${esc(s)}</code>`).join('')}</div>
      ${a.link ? `<a class="artifact-link" href="${esc(a.link)}" target="_blank" rel="noopener">Inspect ↗</a>` : ''}
    </article>`).join('');
}

/* ---------- Codex + filters ---------- */
function renderCodex(codex) {
  const grades = [...new Set(codex.map(u => u.grade))];
  const years = [...new Set(codex.map(u => u.year))].sort();
  const filters = [
    { key: 'ALL', label: 'All' },
    ...grades.map(g => ({ key: 'g:' + g, label: g })),
    ...years.map(y => ({ key: 'y:' + y, label: y }))
  ];
  $('#codexFilters').innerHTML = filters
    .map((f, i) => `<button type="button" class="chip ${i === 0 ? 'on' : ''}" data-key="${esc(f.key)}">${esc(f.label)}</button>`)
    .join('');

  const match = (u, key) => {
    if (key === 'ALL') return true;
    const [kind, val] = key.split(':');
    return kind === 'g' ? u.grade === val : String(u.year) === val;
  };

  const draw = key => {
    const rows = codex.filter(u => match(u, key));
    $('#codexList').innerHTML = rows.map((u, i) => `
      <div class="codex-row reveal g-${esc(u.grade)}" style="--i:${Math.min(i, 12)}">
        <span class="codex-code">${esc(u.code)}</span>
        <span class="codex-name">${esc(u.name)}</span>
        <span class="codex-when">${esc(u.year)} S${esc(u.sem)}</span>
        <span class="codex-xp">${u.grade === 'IP' ? 'enrolled' : '+' + unitXp(u) + ' XP'}</span>
        <span class="codex-mark">${u.mark ?? '—'}</span>
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
      <div class="camp-period">${esc(c.period)}</div>
      <div class="camp-body">
        <h3 class="camp-title">${esc(c.title)}</h3>
        <p class="camp-org">${esc(c.org)}</p>
        <ul class="camp-lines">${c.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>
    </article>`).join('');
}

/* ---------- Achievements ---------- */
function renderAchievements(list) {
  $('#achievementList').innerHTML = list.map((a, i) => `
    <div class="ach reveal ${a.unlocked ? 'on' : ''}" style="--i:${i}">
      <span class="ach-icon">${esc(a.icon)}</span>
      <span class="ach-name">${esc(a.name)}</span>
      <span class="ach-desc">${esc(a.desc)}</span>
      <span class="ach-state">${a.unlocked ? 'Unlocked' : 'Locked'}</span>
    </div>`).join('');
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
  const saved = localStorage.getItem('cvMode') === '1';
  if (saved) document.body.classList.add('plain');
  plain.setAttribute('aria-pressed', saved);
  plain.addEventListener('click', () => {
    const on = document.body.classList.toggle('plain');
    plain.setAttribute('aria-pressed', on);
    localStorage.setItem('cvMode', on ? '1' : '0');
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
  renderCodex(DATA.codex);
  renderCampaign(DATA.campaign);
  renderAchievements(DATA.achievements);
  observeReveals();
  wireChrome();
})();
