/*
   JIVAN GHARTI — main.js
   Hamburger · 3-Card Carousel · Lightbox · Back to Top
   ============================================================ */

'use strict';

const PROJECTS = [
  /* ── Brand Identity ── */
  { title: 'Orbit Weave',              tags: 'Logo Design · Brand Mark · Identity',           type: 'Brand Identity',  image: '../DESIGNS/LOGO_1.png'        },
  { title: 'Xtreme Forward',           tags: 'Logo Design · Brand Mark · Color System',       type: 'Brand Identity',  image: '../DESIGNS/LOGO_2.png'        },
  { title: 'Cyber Connectors',         tags: 'Logo Design · Identity · Brand Mark',           type: 'Brand Identity',  image: '../DESIGNS/LOGO_3.png'        },
  { title: 'Pustakari — Nanda',        tags: 'Packaging · Label Design · Mockup',             type: 'Brand Identity',  image: '../DESIGNS/mock_up_2.jpg'     },
  /* ── Print / Poster Design ── */
  { title: 'SHOT — Movie Poster',      tags: 'Poster · Photo Manipulation · Cinematic',       type: 'Print Design',    image: '../DESIGNS/movie_1.jpg'       },
  { title: 'Guardian — Ultimate Warrior', tags: 'Poster · Composite · Fantasy',              type: 'Print Design',    image: '../DESIGNS/poster_1.jpg'      },
  { title: 'Har Har Mahadev',          tags: 'Poster · Photo Manipulation · Spiritual',       type: 'Print Design',    image: '../DESIGNS/poster_2.jpg'      },
  { title: 'Billboard Mockup',         tags: 'Outdoor · Mockup · Print',                     type: 'Print Design',    image: '../DESIGNS/mock_up.jpg'       },
  { title: 'Alien Encounter',          tags: 'Poster · Sci-Fi · Photo Composite',             type: 'Print Design',    image: '../DESIGNS/SM-15.jpg'         },
  /* ── Social Media ── */
  { title: 'School Admission — GLA',   tags: 'Social Media · Educational · Flyer',            type: 'Social Media',    image: '../DESIGNS/school_design.jpg' },
  { title: 'Nepal vs Italy — Match Day', tags: 'Social Media · Sports · ICC T20',            type: 'Social Media',    image: '../DESIGNS/SM-2.jpg'          },
  { title: 'Blaze Optix — Product',    tags: 'Social Media · Product · Brand Post',           type: 'Social Media',    image: '../DESIGNS/SM-4.jpg'          },
  { title: 'Smart Watch — New Arrival', tags: 'Social Media · Product · Typography',          type: 'Social Media',    image: '../DESIGNS/SM-12.jpg'         },
  { title: 'International Labour Day', tags: 'Social Media · Event · Calendar Design',        type: 'Social Media',    image: '../DESIGNS/SM-13.jpg'         },
  /* ── YouTube Thumbnails ── */
  { title: 'Momo Challenge',           tags: 'YouTube Thumbnail · Typography · Fun',          type: 'Motion Graphics', image: '../DESIGNS/thumbnail_1.jpg'   },
  { title: 'Millions? Lost My Mind!',  tags: 'YouTube Thumbnail · Viral · Typography',        type: 'Motion Graphics', image: '../DESIGNS/thumbnail_2.jpg'   },
  { title: 'Wildlife Photography',     tags: 'YouTube Thumbnail · Cinematic · Drama',         type: 'Motion Graphics', image: '../DESIGNS/thumbnail_3.jpeg'  },
  { title: 'PUBG — Lucky Draw',        tags: 'YouTube Thumbnail · Gaming · Esports',          type: 'Motion Graphics', image: '../DESIGNS/thumbnail_4.jpeg'  },
];

function $(id) { return document.getElementById(id); }

/* ── Hamburger ─────────────────────────────────────────────── */
(function initBurger() {
  const btn = $('burger'), menu = $('mobMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

/* ── Back to Top ────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = $('backToTop');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Lightbox ───────────────────────────────────────────────── */
(function initLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <div class="lb-panel">
      <div class="lb-top">
        <div class="lb-meta">
          <span class="lb-type" id="lbType"></span>
          <h2 class="lb-title" id="lbTitle"></h2>
          <p class="lb-tags" id="lbTags"></p>
        </div>
        <button class="lb-close" id="lbClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="lb-img-wrap">
        <img id="lbImg" src="" alt="" />
        <div class="lb-img-loader" id="lbLoader"></div>
      </div>
      <div class="lb-foot">
        <button class="lb-nav lb-nav-prev" id="lbPrev" aria-label="Previous project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Prev</span>
        </button>
        <span class="lb-counter" id="lbCounter"></span>
        <button class="lb-nav lb-nav-next" id="lbNext" aria-label="Next project">
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
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

    $('lbType').textContent    = p.type;
    $('lbTitle').textContent   = p.title;
    $('lbTags').textContent    = p.tags;
    $('lbCounter').textContent = (currentIdx + 1) + ' / ' + currentSet.length;

    img.style.opacity     = '0';
    loader.style.display  = 'flex';

    const tmp = new Image();
    tmp.onload = () => {
      img.src = p.image; img.alt = p.title;
      img.style.opacity = '1'; loader.style.display = 'none';
    };
    tmp.onerror = () => {
      // Graceful placeholder — blue card with project name
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


/* ── 3-Card Carousel ─────────────────────────────────────── */
(function initCarousel() {
  const stage   = $('swStage');
  const prevBtn = $('swPrev');
  const nextBtn = $('swNext');
  if (!stage) return;

  // One gradient per project (18 total)
  const ACCENTS = [
    'linear-gradient(135deg,#0d0f22 0%,#1a0a3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c1a 0%,#0d1a3d 50%,#071020 100%)',
    'linear-gradient(135deg,#120a24 0%,#0a1a3d 40%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0d1224 0%,#1a1a3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c1a 0%,#1a0d2e 50%,#07090f 100%)',
    'linear-gradient(135deg,#0c1020 0%,#0a1530 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#10081e 0%,#0d1a3a 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c1a 0%,#1a1040 50%,#080a14 100%)',
    'linear-gradient(135deg,#0e1228 0%,#0a1a3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c24 0%,#1a0a3a 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0c0e22 0%,#0d1a38 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a1020 0%,#1a0d3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0d0f22 0%,#1a0a3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c1a 0%,#0d1a3d 50%,#071020 100%)',
    'linear-gradient(135deg,#120a24 0%,#0a1a3d 40%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0d1224 0%,#1a1a3d 50%,#0a0c1a 100%)',
    'linear-gradient(135deg,#0a0c1a 0%,#1a0d2e 50%,#07090f 100%)',
    'linear-gradient(135deg,#0c1020 0%,#0a1530 50%,#0a0c1a 100%)',
  ];

  const SHAPES = [
    '<rect x="60" y="80" width="120" height="120" fill="rgba(77,95,255,.15)" rx="4"/><circle cx="200" cy="200" r="60" fill="rgba(27,0,255,.12)"/>',
    '<circle cx="160" cy="140" r="90" fill="rgba(77,95,255,.10)"/><circle cx="160" cy="140" r="30" fill="rgba(77,95,255,.28)"/>',
    '<rect x="40" y="60" width="240" height="160" rx="3" fill="rgba(77,95,255,.08)" stroke="rgba(77,95,255,.2)" stroke-width="1"/><line x1="56" y1="104" x2="264" y2="104" stroke="rgba(77,95,255,.25)" stroke-width="1"/>',
    '<polygon points="160,40 280,240 40,240" fill="rgba(77,95,255,.10)" stroke="rgba(77,95,255,.25)" stroke-width="1"/><circle cx="160" cy="160" r="20" fill="rgba(77,95,255,.35)"/>',
    '<rect x="50" y="70" width="100" height="140" rx="3" fill="rgba(27,0,255,.15)"/><rect x="170" y="100" width="100" height="110" rx="3" fill="rgba(77,95,255,.10)"/>',
    '<rect x="40" y="60" width="240" height="180" rx="3" fill="rgba(77,95,255,.08)" stroke="rgba(77,95,255,.2)" stroke-width="1"/><rect x="52" y="72" width="80" height="60" rx="2" fill="rgba(27,0,255,.20)"/>',
    '<rect x="40" y="50" width="72" height="96" rx="2" fill="rgba(27,0,255,.18)"/><rect x="124" y="50" width="72" height="96" rx="2" fill="rgba(77,95,255,.12)"/><rect x="208" y="50" width="72" height="96" rx="2" fill="rgba(27,0,255,.14)"/>',
    '<circle cx="80" cy="120" r="50" fill="rgba(77,95,255,.10)"/><circle cx="200" cy="100" r="65" fill="rgba(27,0,255,.15)"/><circle cx="150" cy="200" r="40" fill="rgba(77,95,255,.12)"/>',
    '<rect x="60" y="50" width="200" height="200" rx="2" fill="rgba(77,95,255,.08)" stroke="rgba(77,95,255,.2)" stroke-width="1"/><line x1="60" y1="110" x2="260" y2="110" stroke="rgba(77,95,255,.20)" stroke-width="1"/>',
    '<path d="M160 50 L280 250 H40 Z" fill="none" stroke="rgba(77,95,255,.25)" stroke-width="1"/><circle cx="160" cy="185" r="28" fill="rgba(77,95,255,.25)"/>',
    '<rect x="40" y="90" width="240" height="120" rx="3" fill="rgba(77,95,255,.08)" stroke="rgba(77,95,255,.2)" stroke-width="1"/><rect x="52" y="102" width="40" height="40" rx="50%" fill="rgba(27,0,255,.25)"/>',
    '<rect x="40" y="50" width="240" height="200" rx="3" fill="rgba(77,95,255,.08)" stroke="rgba(77,95,255,.2)" stroke-width="1"/><rect x="52" y="62" width="160" height="10" rx="2" fill="rgba(27,0,255,.25)"/>',
    '<rect x="60" y="80" width="120" height="120" fill="rgba(77,95,255,.15)" rx="4"/><circle cx="200" cy="150" r="70" fill="rgba(27,0,255,.10)"/>',
    '<circle cx="120" cy="160" r="80" fill="rgba(77,95,255,.08)"/><circle cx="200" cy="130" r="50" fill="rgba(27,0,255,.18)"/>',
    '<rect x="50" y="50" width="220" height="200" rx="6" fill="rgba(77,95,255,.06)" stroke="rgba(77,95,255,.18)" stroke-width="1"/>',
    '<polygon points="80,220 160,50 240,220" fill="rgba(27,0,255,.14)" stroke="rgba(77,95,255,.22)" stroke-width="1"/>',
    '<circle cx="160" cy="160" r="100" fill="rgba(77,95,255,.07)" stroke="rgba(77,95,255,.15)" stroke-width="1"/><circle cx="160" cy="160" r="50" fill="rgba(27,0,255,.20)"/>',
    '<rect x="40" y="80" width="100" height="160" rx="2" fill="rgba(27,0,255,.15)"/><rect x="160" y="60" width="120" height="180" rx="2" fill="rgba(77,95,255,.10)"/>',
  ];

  let currentProjects = PROJECTS.slice();
  let activeIdx = 0;

  function makeCard(p, origIdx, pi) {
    const accent = ACCENTS[origIdx % ACCENTS.length];
    const shape  = SHAPES[origIdx % SHAPES.length];
    const card   = document.createElement('div');
    card.className = 'sw-c-card';
    card.innerHTML =
      '<div class="sw-c-card-bg">' +
        '<div class="sw-c-card-bg-inner" style="background:' + accent + ';position:relative;height:100%;">' +
          '<img src="' + p.image + '" alt="' + p.title + '" ' +
               'style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;" ' +
               'onerror="this.style.display=\'none\'">' +
          '<svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" ' +
               'style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">' +
               shape +
          '</svg>' +
        '</div>' +
      '</div>' +
      '<div class="sw-c-card-overlay"></div>' +
      '<div class="sw-c-preview-btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
             'stroke-linecap="round" stroke-linejoin="round" width="16" height="16">' +
          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>' +
          '<circle cx="12" cy="12" r="3"/>' +
        '</svg>' +
        '<span>View Full</span>' +
      '</div>' +
      '<div class="sw-c-card-label">' +
        '<div class="sw-c-card-type">' + p.type + '</div>' +
        '<div class="sw-c-card-name">' + p.title + '</div>' +
      '</div>';
    return card;
  }

  function render() {
    stage.innerHTML = '';
    const len = currentProjects.length;
    if (len === 0) return;

    const prevIdx = (activeIdx - 1 + len) % len;
    const nextIdx = (activeIdx + 1) % len;
    const indices =
      len === 1 ? [activeIdx] :
      len === 2 ? [prevIdx, activeIdx] :
                  [prevIdx, activeIdx, nextIdx];

    indices.forEach((pi, slot) => {
      const origIdx = PROJECTS.indexOf(currentProjects[pi]);
      const card    = makeCard(currentProjects[pi], origIdx >= 0 ? origIdx : pi, pi);
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
      const filter  = btn.dataset.filter;
      currentProjects = filter === 'all'
        ? PROJECTS.slice()
        : PROJECTS.filter(p => p.type === filter);
      activeIdx = 0;
      render();
    });
  });

  // Keyboard nav — only when lightbox is closed
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lb-overlay');
    if (lb && lb.classList.contains('lb-active')) return;
    if (e.key === 'ArrowLeft')  { activeIdx = (activeIdx - 1 + currentProjects.length) % currentProjects.length; render(); }
    if (e.key === 'ArrowRight') { activeIdx = (activeIdx + 1) % currentProjects.length; render(); }
  });
})();
