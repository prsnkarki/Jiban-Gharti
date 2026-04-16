/*
   JIVAN MAGAR â€” main.js (inlined)
   Hamburger Â· Infinite Drag Gallery Â· Lightbox Â· Back to Top
   ============================================================ */

'use strict';

const PROJECTS = [
  { title: 'Branding Project 1', tags: 'Branding Â· Design Â· Identity', type: 'BRANDING', image: 'assets/images/designs/BRANDING 1.jpg' },
  { title: 'Branding Project 2', tags: 'Branding Â· Design Â· Identity', type: 'BRANDING', image: 'assets/images/designs/BRANDING 2.jpg' },
  { title: 'Branding Project 3', tags: 'Branding Â· Design Â· Identity', type: 'BRANDING', image: 'assets/images/designs/BRANDING 3.jpg' },
  { title: 'Branding Project 4', tags: 'Branding Â· Design Â· Identity', type: 'BRANDING', image: 'assets/images/designs/BRANDING 4.jpg' },
  { title: 'Logo Design 1', tags: 'Logo Â· Design Â· Vector', type: 'LOGO', image: 'assets/images/designs/LOGO 1.png' },
  { title: 'Logo Design 2', tags: 'Logo Â· Design Â· Vector', type: 'LOGO', image: 'assets/images/designs/LOGO 2.png' },
  { title: 'Logo Design 3', tags: 'Logo Â· Design Â· Vector', type: 'LOGO', image: 'assets/images/designs/LOGO 3.png' },
  { title: 'Mockup Design 1', tags: 'Mockup Â· UI Â· Design', type: 'MOCKUP', image: 'assets/images/designs/mock up.jpg' },
  { title: 'Mockup Design 2', tags: 'Mockup Â· UI Â· Design', type: 'MOCKUP', image: 'assets/images/designs/mock up 2.jpg' },
  { title: 'Poster Design 1', tags: 'Poster Â· Print Â· Design', type: 'POSTER', image: 'assets/images/designs/poster 1.jpg' },
  { title: 'Poster Design 2', tags: 'Poster Â· Print Â· Design', type: 'POSTER', image: 'assets/images/designs/poster 2.jpg' },
  { title: 'Poster Design 3', tags: 'Poster Â· Print Â· Design', type: 'POSTER', image: 'assets/images/designs/POSTER 3.jpg' },
  { title: 'Poster Design 4', tags: 'Poster Â· Print Â· Design', type: 'POSTER', image: 'assets/images/designs/poster 4.jpg' },
  { title: 'Poster Design 5', tags: 'Poster Â· Print Â· Design', type: 'POSTER', image: 'assets/images/designs/POSTER.jpg' },
  { title: 'Thumbnail Design 1', tags: 'Thumbnail Â· Social Â· Design', type: 'THUMBNAIL', image: 'assets/images/designs/thumbnail 1.jpg' },
  { title: 'Thumbnail Design 2', tags: 'Thumbnail Â· Social Â· Design', type: 'THUMBNAIL', image: 'assets/images/designs/thumbnail 2.jpg' },
  { title: 'Thumbnail Design 3', tags: 'Thumbnail Â· Social Â· Design', type: 'THUMBNAIL', image: 'assets/images/designs/thumbnail 3.jpeg' },
  { title: 'Thumbnail Design 4', tags: 'Thumbnail Â· Social Â· Design', type: 'THUMBNAIL', image: 'assets/images/designs/thumbnail 4.jpeg' },
];

const N = PROJECTS.length;
function $(id) { return document.getElementById(id); }
function mod(n, m) { return ((n % m) + m) % m; }

/* â”€â”€ Hamburger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function initBurger() {
  const btn = $('burger'), menu = $('mobMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open'); menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

/* â”€â”€ Lightbox â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function initLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <div class="lb-panel">
      <button class="lb-close" id="lbClose" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="lb-nav lb-nav-prev" id="lbPrev" aria-label="Previous project">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="lb-img-wrap">
        <img id="lbImg" src="" alt="" />
        <div class="lb-img-loader" id="lbLoader"></div>
      </div>
      <button class="lb-nav lb-nav-next" id="lbNext" aria-label="Next project">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  let currentSet = PROJECTS.slice();
  let currentIdx = 0;

  function openLightbox(projects, idx) {
    currentSet = projects;
    currentIdx = idx;
    renderLightbox();
    overlay.classList.add('lb-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('lb-active');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    const p = currentSet[currentIdx];
    const img = $('lbImg');
    const loader = $('lbLoader');

    img.style.opacity     = '0';
    loader.style.display  = 'flex';

    const tmp = new Image();
    tmp.onload = () => {
      img.src = p.image; img.alt = p.title;
      img.style.opacity = '1'; loader.style.display = 'none';
    };
    tmp.onerror = () => {
      // Graceful placeholder â€” blue card with project name
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
        '<rect fill="#0E1024" width="800" height="500"/>' +
        '<text fill="#4D5FFF" font-family="sans-serif" font-size="22" font-weight="bold" ' +
        'x="400" y="250" text-anchor="middle" dominant-baseline="middle">' + p.title + '</text>' +
        '</svg>'
      );
      img.alt = p.title;
      img.style.opacity = '1'; loader.style.display = 'none';
    };
    tmp.src = p.image;
  }

  $('lbClose').addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  $('lbPrev').addEventListener('click', () => { currentIdx = (currentIdx - 1 + currentSet.length) % currentSet.length; renderLightbox(); });
  $('lbNext').addEventListener('click', () => { currentIdx = (currentIdx + 1) % currentSet.length; renderLightbox(); });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('lb-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  { currentIdx = (currentIdx - 1 + currentSet.length) % currentSet.length; renderLightbox(); }
    if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % currentSet.length; renderLightbox(); }
  });

  // Expose for carousel
  window.openProjectLightbox = openLightbox;
})();

/* â”€â”€ 3-Card Carousel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function initCarousel() {
  const stage  = document.getElementById('swStage');
  const prevBtn = document.getElementById('swPrev');
  const nextBtn = document.getElementById('swNext');
  if (!stage) return;

  const ACCENTS = [
    'linear-gradient(135deg, #0d0f22 0%, #1a0a3d 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0a0c1a 0%, #0d1a3d 50%, #071020 100%)',
    'linear-gradient(135deg, #120a24 0%, #0a1a3d 40%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0d1224 0%, #1a1a3d 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0a0c1a 0%, #1a0d2e 50%, #07090f 100%)',
    'linear-gradient(135deg, #0c1020 0%, #0a1530 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #10081e 0%, #0d1a3a 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0a0c1a 0%, #1a1040 50%, #080a14 100%)',
    'linear-gradient(135deg, #0e1228 0%, #0a1a3d 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0a0c24 0%, #1a0a3a 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0c0e22 0%, #0d1a38 50%, #0a0c1a 100%)',
    'linear-gradient(135deg, #0a1020 0%, #1a0d3d 50%, #0a0c1a 100%)',
  ];

  let currentProjects = PROJECTS.slice();
  let activeIdx = 0;

  function makeCard(p, idx) {
    const accent = ACCENTS[idx % ACCENTS.length];
    const card = document.createElement('div');
    card.className = 'sw-c-card';
    card.innerHTML =
      '<div class="sw-c-card-bg">' +
        '<div class="sw-c-card-bg-inner" style="background:' + accent + ';position:relative;height:100%;">' +
          '<img src="' + p.image + '" alt="' + p.title + '" style="width:100%;height:100%;object-fit:contain;position:absolute;top:0;left:0;">' +
        '</div>' +
      '</div>' +
      '<div class="sw-c-preview-btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">' +
          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>' +
          '<circle cx="12" cy="12" r="3"/>' +
        '</svg>' +
        'View' +
      '</div>';
    return card;
  }

  function render() {
    stage.innerHTML = '';
    const len = currentProjects.length;
    if (len === 0) return;

    // Show prev, active, next (wrap around)
    const prevIdx = (activeIdx - 1 + len) % len;
    const nextIdx = (activeIdx + 1) % len;

    const indices = len === 1 ? [activeIdx] : len === 2 ? [prevIdx, activeIdx] : [prevIdx, activeIdx, nextIdx];

    indices.forEach((pi, slot) => {
      const origIdx = PROJECTS.indexOf(currentProjects[pi]);
      const card = makeCard(currentProjects[pi], origIdx >= 0 ? origIdx : pi);
      const isCenter = (len === 1) || (len === 2 && slot === 1) || (len >= 3 && slot === 1);
      if (isCenter) {
        card.classList.add('is-active');
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => window.openProjectLightbox(currentProjects, pi));
      } else {
        card.style.cursor = 'pointer';
        card.addEventListener('click', e => {
          if (e.target.closest('.sw-c-preview-btn')) {
            window.openProjectLightbox(currentProjects, pi);
          } else {
            activeIdx = pi;
            render();
          }
        });
      }
      stage.appendChild(card);
    });
  }

  render();

  prevBtn && prevBtn.addEventListener('click', () => {
    activeIdx = (activeIdx - 1 + currentProjects.length) % currentProjects.length;
    render();
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    activeIdx = (activeIdx + 1) % currentProjects.length;
    render();
  });

  document.querySelectorAll('.sw-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sw-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      currentProjects = filter === 'all' ? PROJECTS.slice() : PROJECTS.filter(p => p.type === filter);
      activeIdx = 0;
      render();
    });
  });
})();


