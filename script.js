// ─── Mobile nav toggle ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');

navToggle.addEventListener('click', () => {
  const isOpen = navDrawer.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navDrawer.setAttribute('aria-hidden', !isOpen);
});

navDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
  });
});

document.addEventListener('click', e => {
  if (navDrawer.classList.contains('open') &&
      !navDrawer.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navDrawer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
  }
});

// ─── Dot navigation: click to scroll to a section ───────────
const dots = document.querySelectorAll('.dot');
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─── Scroll reveal — IntersectionObserver ───────────────────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal, .fact').forEach(el => revealObserver.observe(el));

// ─── Active section highlight (nav links + dots) ────────────
const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

function setActive(id) {
  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  dots.forEach(dot =>
    dot.classList.toggle('active', dot.dataset.target === id));
}

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  },
  { threshold: 0.5 }
);
sections.forEach(s => navObserver.observe(s));

// ─── Photo fallback: show placeholder if photo.jpg missing ──
const heroPhoto = document.getElementById('heroPhoto');
const heroFigure = document.getElementById('heroFigure');
if (heroPhoto && heroFigure) {
  heroPhoto.addEventListener('error', () => heroFigure.classList.add('no-photo'));
  if (heroPhoto.complete && heroPhoto.naturalWidth === 0) heroFigure.classList.add('no-photo');
}
