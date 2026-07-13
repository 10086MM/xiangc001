const LOGO_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 19h20L12 2zm0 4.5l6.5 12.5H5.5L12 6.5z"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollAnimations();
  setActiveNav();
  injectLogo();
});

function injectLogo() {
  document.querySelectorAll('.logo-icon').forEach(el => {
    el.innerHTML = LOGO_SVG;
  });
}

function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function renderSpots(container, limit) {
  if (!container || !window.HUAIROU_DATA) return;
  const spots = limit ? HUAIROU_DATA.spots.slice(0, limit) : HUAIROU_DATA.spots;

  container.innerHTML = spots.map(spot => `
    <article class="card fade-in">
      <div class="card-image">
        <img src="${spot.image}" alt="${spot.name}" loading="lazy">
        <span class="card-badge">${spot.category}</span>
      </div>
      <div class="card-body">
        <h3>${spot.name}</h3>
        <p>${spot.description}</p>
        <span class="card-link">${spot.location} →</span>
      </div>
    </article>
  `).join('');

  initScrollAnimations();
}
