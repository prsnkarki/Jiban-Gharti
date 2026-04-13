/* ── Hamburger menu ── */
// Mark JS as active immediately — prevents reveal elements staying invisible
document.documentElement.classList.add('js-ready');

const btn  = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
const bars = btn.querySelectorAll('span');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  bars[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)'  : '';
  bars[1].style.opacity   = open ? '0' : '1';
  bars[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      // Match by #id or by index.html for home
      const id = e.target.id;
      const active = document.querySelector(
        `.navbar__links a[href="#${id}"], .navbar__links a[href="index.html"]${id === 'home' ? '' : '__never'}`
      );
      // Simpler: find by href ending
      navLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (id === 'home' && (href === 'index.html' || href === '#' || href === '#home')) {
          a.classList.add('active');
        } else if (href === `#${id}`) {
          a.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const staggerParent = entry.target.closest('.reveal-stagger');
      if (staggerParent) {
        const siblings = Array.from(staggerParent.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.09) + 's';
      }
      entry.target.classList.add('in-view');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── Navbar shadow on scroll ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 2px 24px rgba(0,0,0,0.45)'
    : 'none';
}, { passive: true });

/* ── Smooth close mobile menu on link click ── */
document.querySelectorAll('.navbar__mobile a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '1';
    bars[2].style.transform = '';
  });
});

/* ── Contact Form Handling ── */
const contactForm = document.querySelector('.contact-form-wrap form');
const submitButton = document.querySelector('.form-submit');
const submitText = submitButton.innerHTML;

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Show loading state
  submitButton.innerHTML = '<svg style="width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;animation:spin 1s linear infinite;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416"><animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="31.416;0"/></circle></svg> Sending...';
  submitButton.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success
      submitButton.innerHTML = '<svg style="width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Sent Successfully!';
      submitButton.style.background = '#10b981';
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.innerHTML = submitText;
        submitButton.style.background = '';
        submitButton.disabled = false;
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    // Error
    submitButton.innerHTML = '<svg style="width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Failed to Send';
    submitButton.style.background = '#ef4444';

    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.innerHTML = submitText;
      submitButton.style.background = '';
      submitButton.disabled = false;
    }, 3000);
  }
});

/* ── Add spin animation for loading ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
