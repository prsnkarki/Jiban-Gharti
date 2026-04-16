/* ══════════════════════════════════════════
   HAMBURGER
══════════════════════════════════════════ */
const btn  = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
const bars = btn.querySelectorAll('span');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  bars[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)'  : '';
  bars[1].style.opacity   = open ? '0' : '1';
  bars[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
});
document.querySelectorAll('.navbar__mobile a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '1';
    bars[2].style.transform = '';
  });
});

/* ══════════════════════════════════════════
   NAVBAR SCROLL SHADOW
══════════════════════════════════════════ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 2px 24px rgba(0,0,0,0.45)' : 'none';
}, { passive: true });

/* ══════════════════════════════════════════
   UNIFIED INTERSECTION OBSERVER ENGINE
══════════════════════════════════════════ */
document.body.classList.add('js-animated');

// ── General .reveal elements ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('in-view');
      revealObs.unobserve(el.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Stats ──
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.stat-item').forEach(el => statObs.observe(el));

// ── Timeline — animate whole group when wrapper enters view ──
const timeline = document.getElementById('timeline');
if (timeline) {
  const tlObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      timeline.classList.add('in-view');
      tlObs.disconnect();
    }
  }, { threshold: 0.15 });
  tlObs.observe(timeline);
}

// ── Skill bars — animate fill on scroll ──
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      // Animate the fill bar
      const fill = e.target.querySelector('.skill-fill');
      if (fill) setTimeout(() => fill.classList.add('animate'), 80);
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-item').forEach(el => skillObs.observe(el));

// ── Tool pills ──
const pillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.tool-pill').forEach(p => p.classList.add('in-view'));
      pillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const toolsGrid = document.getElementById('toolsGrid');
if (toolsGrid) pillObs.observe(toolsGrid.parentElement);

// ── Resume tool cards ──
const toolCardObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.resume-tool-card').forEach(c => c.classList.add('in-view'));
      toolCardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.resume-tools-grid').forEach(g => toolCardObs.observe(g));

// ── Education entries ──
const eduObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      eduObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.edu-entry').forEach(el => eduObs.observe(el));

// ── Value nodes (hub diagram) — hover-driven connectors ──
const vnodeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      vnodeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.vnode').forEach(el => vnodeObs.observe(el));

/* Dynamic SVG connector lines — measures actual card positions */
function drawConnectors() {
  const svg = document.getElementById('connectorSvg');
  const connArea = document.getElementById('valConnectors');
  const hub = document.getElementById('valHub');
  if (!svg || !connArea || !hub) return;

  const areaRect = connArea.getBoundingClientRect();
  const hubRect  = hub.getBoundingClientRect();

  // Hub center relative to connector area
  const hx = hubRect.left + hubRect.width  / 2 - areaRect.left;
  const hy = hubRect.top  + hubRect.height / 2 - areaRect.top;

  const leftCards  = ['vn1','vn2','vn3'];
  const rightCards = ['vn4','vn5','vn6'];

  // Clear old drawn elements (keep defs)
  svg.querySelectorAll('line, circle, ellipse').forEach(el => el.remove());

  const ns = 'http://www.w3.org/2000/svg';

  // Glow ellipse behind hub
  const glow = document.createElementNS(ns,'ellipse');
  glow.setAttribute('cx', hx); glow.setAttribute('cy', hy);
  glow.setAttribute('rx', 60); glow.setAttribute('ry', 60);
  glow.setAttribute('fill','url(#hubGlow)');
  svg.appendChild(glow);

  function addLine(x1,y1,x2,y2) {
    const l = document.createElementNS(ns,'line');
    l.setAttribute('x1',x1); l.setAttribute('y1',y1);
    l.setAttribute('x2',x2); l.setAttribute('y2',y2);
    l.setAttribute('stroke','rgba(229,25,58,0.28)');
    l.setAttribute('stroke-width','1');
    l.setAttribute('stroke-dasharray','5 4');
    svg.appendChild(l);
  }
  function addDot(cx,cy) {
    const c = document.createElementNS(ns,'circle');
    c.setAttribute('cx',cx); c.setAttribute('cy',cy);
    c.setAttribute('r','3.5'); c.setAttribute('fill','#e5193a');
    c.setAttribute('opacity','0.9');
    svg.appendChild(c);
  }
  function addHubDot(cx,cy) {
    const c = document.createElementNS(ns,'circle');
    c.setAttribute('cx',cx); c.setAttribute('cy',cy);
    c.setAttribute('r','2.5'); c.setAttribute('fill','rgba(229,25,58,0.6)');
    svg.appendChild(c);
  }

  leftCards.forEach(id => {
    const card = document.querySelector('#'+id+' .vnode-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const cy = r.top + r.height / 2 - areaRect.top;
    const ex = r.right - areaRect.left;
    addLine(ex, cy, hx, hy);
  });

  rightCards.forEach(id => {
    const card = document.querySelector('#'+id+' .vnode-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const cy = r.top + r.height / 2 - areaRect.top;
    const ex = r.left - areaRect.left;
    addLine(hx, hy, ex, cy);
  });
}

// Draw after layout settles, and on resize
window.addEventListener('load', () => { setTimeout(drawConnectors, 100); });
window.addEventListener('resize', drawConnectors);
setTimeout(drawConnectors, 600);
setTimeout(drawConnectors, 1200);

// ── Value cards (old system) ──
const valObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      valObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.value-card').forEach(el => valObs.observe(el));

// ── FAQ items ──
const faqObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      faqObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.faq-item').forEach(el => faqObs.observe(el));

/* ══════════════════════════════════════════
   RESUME TABS
══════════════════════════════════════════ */
const resumeSectionSwitcher = () => {
  document.querySelectorAll('.resume-panel-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const target = chip.dataset.tab;
      document.querySelectorAll('.resume-panel-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.querySelectorAll('.resume-panel-section').forEach(section => section.classList.remove('active'));
      const panel = document.getElementById(target);
      if (!panel) return;
      panel.classList.add('active');
      panel.querySelectorAll('.resume-tool-card, .edu-entry, .bio-panel').forEach(el => {
        el.classList.remove('in-view');
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in-view')));
      });
    });
  });
};
resumeSectionSwitcher();

document.querySelectorAll('.resume-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.resume-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(target);
    panel.classList.add('active');
    // Re-trigger animations for newly visible panel content
    panel.querySelectorAll('.resume-tool-card').forEach(c => {
      c.classList.remove('in-view');
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in-view')));
    });
    panel.querySelectorAll('.edu-entry').forEach(c => {
      c.classList.remove('in-view');
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in-view')));
    });
  });
});

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      const ans = i.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = null;
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      const ans = item.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});