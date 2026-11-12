const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const links = [...document.querySelectorAll('.nav__link')];
function closeMenu() {
  menu.classList.remove('show');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('show');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
links.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('show')) {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const themeButton = document.getElementById('theme-button');
function applyTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.firstElementChild.className = dark ? 'bx bx-sun' : 'bx bx-moon';
}
try { applyTheme(localStorage.getItem('portfolio-theme') === 'dark'); } catch { /* Storage can be unavailable. */ }
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-mode');
  applyTheme(dark);
  try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch { /* Theme still works for this visit. */ }
});
let scheduled = false;
function updateNavigation() {
  const current = [...document.querySelectorAll('main section[id]')].reverse().find(section => section.getBoundingClientRect().top <= 160);
  links.forEach(link => {
    const active = link.hash === `#${current?.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
