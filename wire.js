/* ============================================================
   Browser-only wiring: listeners, URL handling, tooltips. Never runs
   at build time. Uses $ from app.js; app.js calls these on boot.
   ============================================================ */

/* Filters write the URL, so a filtered view can be linked:
   /#projects/security */
function wireFilters() {
  const bar = $('#projectFilters');
  const items = [...document.querySelectorAll('.pfeat, .prow')];
  const apply = cat => {
    if (!bar.querySelector(`[data-cat="${cat}"]`)) cat = 'all';
    bar.querySelectorAll('.filter').forEach(b => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    items.forEach(it => { it.hidden = cat !== 'all' && it.dataset.cat !== cat; });
    $('#rowsTitle').hidden = !document.querySelector('.prow:not([hidden])');
    $('#projectFeatured').hidden = !document.querySelector('.pfeat:not([hidden])');
  };
  bar.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    apply(b.dataset.cat);
    history.replaceState(null, '', b.dataset.cat === 'all' ? '#projects' : `#projects/${b.dataset.cat}`);
  });
  return apply;
}

function wireSkills() {
  const tree = $('#skillTree'), toggle = $('#treeToggle');
  const sync = () => {
    const anyClosed = [...tree.querySelectorAll('.branch')].some(d => !d.open);
    toggle.textContent = anyClosed ? 'Expand all' : 'Collapse all';
  };
  toggle.addEventListener('click', () => {
    const open = toggle.textContent === 'Expand all';
    tree.querySelectorAll('.branch').forEach(d => { d.open = open; });
    sync();
  });
  tree.addEventListener('toggle', sync, true);
  sync();

  /* One skill open at a time; a link inside an open skill navigates. */
  const setOpen = (node, open) => {
    node.classList.toggle('open', open);
    node.querySelector('.node-head').setAttribute('aria-expanded', String(open));
    const detail = node.querySelector('.node-detail');
    if (open) detail.removeAttribute('hidden'); else detail.setAttribute('hidden', 'until-found');
  };
  tree.addEventListener('click', e => {
    const head = e.target.closest('.node-head');
    if (!head) return;
    const node = head.parentElement, opening = !node.classList.contains('open');
    tree.querySelectorAll('.node.open').forEach(n => setOpen(n, false));
    setOpen(node, opening);
  });
  /* The browser reveals a hidden="until-found" panel when find-in-page
     or a text-fragment link lands in it; keep the button state in step. */
  tree.addEventListener('beforematch', e => {
    const node = e.target.closest('.node');
    if (node) setOpen(node, true);
  });
}

function wireCopy() {
  const timers = new WeakMap();
  /* One bubble serves sighted and screen-reader users, for both
     outcomes. The button is never disabled: copying is repeatable, and
     disabling would drop keyboard focus. */
  const report = (button, ok) => {
    const tip = button.nextElementSibling;
    clearTimeout(timers.get(button));
    button.removeAttribute('data-copied'); button.removeAttribute('data-failed');
    tip.textContent = '';
    button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
    // A short timer, not an animation frame: frames do not fire in a hidden tab.
    setTimeout(() => { tip.textContent = ok ? 'Copied' : 'Copy failed'; }, 30);
    timers.set(button, setTimeout(() => {
      button.removeAttribute('data-copied'); button.removeAttribute('data-failed');
      tip.textContent = '';
    }, 2000));
  };
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); report(b, true); }
    catch { report(b, false); }
  });
}

/* Hash handling: filtered project links, deep links to a project row,
   and the section ids the old layout used. */
const LEGACY = { quests: 'now', goals: 'now', artifacts: 'projects', campaign: 'work' };
function followHash(applyFilter) {
  let h = decodeURIComponent(location.hash.slice(1));
  if (!h) return;
  if (LEGACY[h]) { h = LEGACY[h]; history.replaceState(null, '', '#' + h); }
  if (h.startsWith('projects/')) { applyFilter(h.split('/')[1]); h = 'projects'; }
  const target = document.getElementById(h);
  if (!target) return;
  if (target.tagName === 'DETAILS') target.open = true;
  target.scrollIntoView();
}

/* The recruiter view lives at /cv/ so it can be linked from an
   application. The toggle is a real link: without script it navigates
   to the prerendered /cv/ page, with script it swaps in place. */
const isCvUrl = () => /^\/cv\/?$/.test(location.pathname) ||
  new URLSearchParams(location.search).get('view') === 'cv';

function wireView() {
  const toggle = $('#viewToggle'), offer = $('#cvOffer');
  const apply = on => {
    document.body.classList.toggle('plain', on);
    toggle.textContent = on ? 'Full record' : 'Recruiter view';
    toggle.href = on ? '/' : '/cv/';
    document.title = on ? 'Mir Salman Nomaan · CV' : 'Mir Salman Nomaan';
  };
  const go = on => {
    localStorage.setItem('cvOffer', '1');
    if (offer) offer.hidden = true;
    const swap = () => {
      history.pushState(null, '', on ? '/cv/' : '/');
      apply(on);
      window.scrollTo(0, 0);
      document.body.classList.remove('view-out');
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
    document.body.classList.add('view-out');
    setTimeout(swap, 120);
  };

  apply(isCvUrl());
  document.addEventListener('click', e => {
    const a = e.target.closest('#viewToggle, [data-view-link], [data-offer="yes"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    go(a.id === 'viewToggle' ? !document.body.classList.contains('plain') : true);
  });
  window.addEventListener('popstate', () => apply(isCvUrl()));

  /* First visit only: offer the CV to the reader it was written for. */
  if (offer && !isCvUrl() && !localStorage.getItem('cvOffer')) {
    offer.hidden = false;
    offer.querySelector('[data-offer="no"]').addEventListener('click', () => {
      localStorage.setItem('cvOffer', '1'); offer.hidden = true;
    });
  }
}

/* Nav: the active section is the last one whose top has passed under the
   bar. Position-based, because tall sections never show a set ratio. */
function wireNav() {
  const links = [...document.querySelectorAll('.hud-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  let ticking = false;
  const mark = () => {
    ticking = false;
    let cur = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= 120) cur = s;
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) cur = sections[sections.length - 1];
    /* aria-current, not a class: the active section is state a screen
       reader should hear, and the CSS styles from the same attribute. */
    links.forEach(l => {
      if (cur && l.getAttribute('href') === '#' + cur.id) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(mark); } }, { passive: true });
  mark();

  const burger = $('#burger'), nav = $('#hudNav');
  burger.addEventListener('click', () => burger.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });
}

/* Tooltips on skills for mouse users: a delay before the first, then
   instant while moving between neighbours. Touch uses tap-to-open. */
function wireTooltips() {
  const tip = document.createElement('div');
  tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
  document.body.appendChild(tip);
  let timer, pending = null, active = null, warm = false, warmTimer;
  const show = t => {
    pending = null;
    if (t.closest('.node')?.classList.contains('open')) return;
    tip.textContent = t.dataset.tip; tip.hidden = false;
    const r = t.getBoundingClientRect(), w = tip.getBoundingClientRect();
    const left = Math.max(10, Math.min(r.left + r.width / 2 - w.width / 2, innerWidth - w.width - 10));
    const above = r.top > w.height + 18;
    tip.classList.toggle('below', !above);
    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(above ? r.top - w.height - 8 : r.bottom + 8)}px`;
    tip.classList.toggle('instant', warm);
    requestAnimationFrame(() => tip.classList.add('on'));
    active = t; warm = true; clearTimeout(warmTimer);
  };
  const hide = () => {
    clearTimeout(timer); tip.classList.remove('on'); active = null;
    setTimeout(() => { if (!active) tip.hidden = true; }, 140);
    clearTimeout(warmTimer); warmTimer = setTimeout(() => { warm = false; }, 400);
  };
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const t = e.target.closest('[data-tip]');
    if (!t || t === active || t === pending) return;
    clearTimeout(timer); pending = t;
    timer = setTimeout(() => show(t), warm ? 0 : 380);
  });
  document.addEventListener('pointerout', e => {
    const t = e.target.closest('[data-tip]');
    if (t && !t.contains(e.relatedTarget)) { pending = null; hide(); }
  });
  addEventListener('scroll', () => { if (active) hide(); }, { passive: true });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
}
