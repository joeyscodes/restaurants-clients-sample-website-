/* ============================================================
   OSTERIA N.3 — Premium Restaurant JavaScript (OPTIMIZED)
   Address: Praia, Cape Verde
   Contact: +238 918 610
   Optimized for Performance & Speed
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADER (Optimized: 1.5s instead of 2s)
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1500);
});

document.body.style.overflow = 'hidden';

/* ============================================================
   2. NAVBAR — scroll behaviour + active link
   ============================================================ */
const navbar = document.querySelector('.navbar');

function handleNavScroll() {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

/* ============================================================
   3. MOBILE MENU
   ============================================================ */
const hamburger    = document.querySelector('.hamburger');
const mobileMenu   = document.querySelector('.mobile-menu');
const mobileLinks  = document.querySelectorAll('.mobile-menu a');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
}

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ============================================================
   4. HERO PARALLAX (Optimized with requestAnimationFrame)
   ============================================================ */
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        heroBg.style.transform = `scale(1) translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   5. PARTICLE CANVAS ANIMATION (DISABLED ON MOBILE)
   ============================================================ */
function initParticles() {
  // Skip on mobile devices for performance
  if (window.innerWidth < 1024) return;

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const PARTICLE_COUNT = 50;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x    = Math.random() * W;
      this.y    = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6
        ? `rgba(232, 93, 4, ${this.opacity})`
        : `rgba(245, 239, 230, ${this.opacity * 0.5})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

initParticles();

/* ============================================================
   6. SCROLL REVEAL (Optimized with requestAnimationFrame)
   ============================================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

/* ============================================================
   7. COUNTER ANIMATION
   ============================================================ */
function animateCounter(el) {
  const target  = parseInt(el.getAttribute('data-target'), 10);
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);

/* ============================================================
   8. MENU FILTER (menu.html)
   ============================================================ */
function initMenuFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const menuCats    = document.querySelectorAll('.menu-category');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCats.forEach(cat => {
        if (filter === 'all' || cat.getAttribute('data-category') === filter) {
          cat.style.display = '';
          cat.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initMenuFilter);

/* ============================================================
   9. RESERVATION FORM — Professional Confirmation Modal
   ============================================================ */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set min date to today
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';

    const formspreeId = form.getAttribute('data-formspree');

    // Collect form data
    const formData = new FormData(form);
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const time = formData.get('time');
    const guests = formData.get('guests');

    if (formspreeId && formspreeId !== 'YOUR_FORMSPREE_ID') {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method:  'POST',
          body:    formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          showFormSuccess(form, submitBtn, { firstName, lastName, date, time, guests });
        } else {
          showFormError(submitBtn, originalText);
        }
      } catch {
        showFormError(submitBtn, originalText);
      }
    } else {
      // Demo mode
      setTimeout(() => showFormSuccess(form, submitBtn, { firstName, lastName, date, time, guests }), 1000);
    }
  });
}

function showFormSuccess(form, btn, reservationData) {
  // Create professional confirmation modal
  const modal = document.createElement('div');
  modal.className = 'confirmation-modal';
  
  const formattedDate = new Date(reservationData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">✅</div>
      <h3 class="modal-title">Reservation Confirmed!</h3>
      <p class="modal-message">
        Thank you for choosing Osteria N.3, ${reservationData.firstName}.<br>
        We're excited to welcome you!
      </p>
      
      <div class="modal-details">
        <div class="detail-item">
          <span class="detail-label">Name:</span>
          <span class="detail-value">${reservationData.firstName} ${reservationData.lastName}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Time:</span>
          <span class="detail-value">${reservationData.time}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Party Size:</span>
          <span class="detail-value">${reservationData.guests} Guest${reservationData.guests > 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <p class="modal-message" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        A confirmation email has been sent to you. We'll contact you shortly to confirm your booking.
      </p>
      
      <div class="modal-buttons">
        <a href="index.html" class="modal-primary">Back to Home</a>
        <button class="modal-secondary" onclick="location.reload()">Make Another</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Hide form
  form.style.display = 'none';
}

function showFormError(btn, originalText) {
  btn.textContent = 'Try Again';
  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.background = '#c0392b';
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initReservationForm);

/* ============================================================
   10. HERO TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
  const el = document.querySelector('.hero-typewriter');
  if (!el) return;

  const words    = el.getAttribute('data-words').split('|');
  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let isPausing  = false;

  function type() {
    const word = words[wordIndex];

    if (!isDeleting) {
      el.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) {
        isPausing = true;
        setTimeout(() => { isPausing = false; isDeleting = true; }, 2000);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
      }
    }

    if (!isPausing) {
      setTimeout(type, isDeleting ? 60 : 110);
    }
  }

  type();
}

document.addEventListener('DOMContentLoaded', initTypewriter);

/* ============================================================
   11. SMOOTH SCROLL for anchor links
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 20 : 80;
      window.scrollTo({
        top:      target.offsetTop - offset,
        behavior: 'smooth',
      });
    });
  });
});

/* ============================================================
   12. GALLERY LIGHTBOX (if gallery page)
   ============================================================ */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-strip-item, [data-lightbox]');
  if (!galleryItems.length) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div class="lb-overlay"></div>
    <div class="lb-content">
      <button class="lb-close">✕</button>
      <button class="lb-prev">‹</button>
      <img class="lb-img" src="" alt="Gallery" />
      <button class="lb-next">›</button>
    </div>
  `;

  const lbStyles = `
    #lightbox { position:fixed; inset:0; z-index:9998; display:none; align-items:center; justify-content:center; }
    #lightbox.open { display:flex; }
    .lb-overlay { position:absolute; inset:0; background:rgba(10,31,15,0.95); cursor:pointer; }
    .lb-content { position:relative; z-index:1; max-width:90vw; max-height:90vh; }
    .lb-img { max-width:90vw; max-height:85vh; object-fit:contain; border-radius:8px; display:block; }
    .lb-close,.lb-prev,.lb-next { position:absolute; background:rgba(232,93,4,0.9); border:none; color:#fff;
      width:44px; height:44px; border-radius:50%; font-size:1.2rem; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
    .lb-close:hover,.lb-prev:hover,.lb-next:hover { background:var(--orange-light); }
    .lb-close { top:-20px; right:-20px; }
    .lb-prev { top:50%; left:-55px; transform:translateY(-50%); font-size:1.8rem; }
    .lb-next { top:50%; right:-55px; transform:translateY(-50%); font-size:1.8rem; }
    @media(max-width:600px){ .lb-prev{left:-40px} .lb-next{right:-40px} }
  `;

  const styleTag = document.createElement('style');
  styleTag.textContent = lbStyles;
  document.head.appendChild(styleTag);
  document.body.appendChild(lb);

  const lbImg    = lb.querySelector('.lb-img');
  const lbClose  = lb.querySelector('.lb-close');
  const lbPrev   = lb.querySelector('.lb-prev');
  const lbNext   = lb.querySelector('.lb-next');
  const lbOvr    = lb.querySelector('.lb-overlay');

  let imgs      = [];
  let currentIdx = 0;

  galleryItems.forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) imgs.push(img.src);

    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      currentIdx = i;
      openLightbox();
    });
  });

  function openLightbox() {
    lbImg.src = imgs[currentIdx];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lbOvr.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + imgs.length) % imgs.length;
    lbImg.src  = imgs[currentIdx];
  });

  lbNext.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % imgs.length;
    lbImg.src  = imgs[currentIdx];
  });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { currentIdx = (currentIdx - 1 + imgs.length) % imgs.length; lbImg.src = imgs[currentIdx]; }
    if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % imgs.length; lbImg.src = imgs[currentIdx]; }
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);

/* ============================================================
   13. STICKY HEADER — shrink on scroll
   ============================================================ */
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (navbar) {
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  }
  lastScrollY = currentScrollY;
}, { passive: true });

if (navbar) {
  navbar.style.transition = 'transform 0.4s ease, background 0.4s ease, height 0.4s ease, box-shadow 0.4s ease';
}

/* ============================================================
   14. IMAGE LAZY LOADING (Optimized)
   ============================================================ */
function initLazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img  = entry.target;
        img.src    = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.style.opacity = '0';
        img.onload = () => {
          img.style.transition = 'opacity 0.5s ease';
          img.style.opacity    = '1';
        };
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoad);

/* ============================================================
   15. TOOLTIP — show on hover
   ============================================================ */
function initTooltips() {
  const els = document.querySelectorAll('[data-tooltip]');
  els.forEach(el => {
    el.style.position = 'relative';

    const tip = document.createElement('span');
    tip.className = 'tooltip-tip';
    tip.textContent = el.getAttribute('data-tooltip');

    const tipStyles = `
      .tooltip-tip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: var(--orange);
        color: #fff;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 1px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 100;
      }
      .tooltip-tip::after {
        content: '';
        position: absolute;
        top: 100%; left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--orange);
      }
    `;

    if (!document.querySelector('#tooltip-styles')) {
      const s = document.createElement('style');
      s.id    = 'tooltip-styles';
      s.textContent = tipStyles;
      document.head.appendChild(s);
    }

    el.appendChild(tip);
    el.addEventListener('mouseenter', () => tip.style.opacity = '1');
    el.addEventListener('mouseleave', () => tip.style.opacity = '0');
  });
}

document.addEventListener('DOMContentLoaded', initTooltips);

/* ============================================================
   16. CURSOR GLOW EFFECT (Desktop only - DISABLED ON MOBILE)
   ============================================================ */
function initCursorGlow() {
  // Skip on mobile/touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    top: -300px; left: -300px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.top  = e.clientY + 'px';
    glow.style.left = e.clientX + 'px';
  });
}

initCursorGlow();

/* ============================================================
   17. MENU CARD TILT (Subtle 3D hover - DISABLED ON MOBILE)
   ============================================================ */
function initCardTilt() {
  // Skip on mobile
  if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.menu-card, .team-card, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) *  5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });
}

document.addEventListener('DOMContentLoaded', initCardTilt);

/* ============================================================
   18. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '⬆';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(232,93,4,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.style.opacity    = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity    = '0';
      btn.style.visibility = 'hidden';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-4px) scale(1.1)');
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
}

initBackToTop();

/* ============================================================
   19. OPENING HOURS LIVE INDICATOR
   ============================================================ */
function initOpenStatus() {
  const indicator = document.querySelectorAll('.open-status');
  if (!indicator.length) return;

  const now   = new Date();
  const day   = now.getDay();
  const hour  = now.getHours();
  const min   = now.getMinutes();
  const time  = hour + min / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5) {
    isOpen = (time >= 12 && time < 15) || (time >= 19 && time < 23);
  } else if (day === 6) {
    isOpen = time >= 12 && time < 23;
  }

  indicator.forEach(el => {
    el.textContent = isOpen ? 'Open Now' : 'Closed';
    el.style.color = isOpen ? '#4caf50' : '#e85d04';
    if (isOpen) {
      el.style.animation = 'pulse-dot 2s infinite';
    }
  });
}

document.addEventListener('DOMContentLoaded', initOpenStatus);

/* ============================================================
   20. INIT ALL ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initMenuFilter();
  initReservationForm();
  initTypewriter();
  initLightbox();
  initLazyLoad();
  initTooltips();
  initCardTilt();
  initOpenStatus();

  const heroBgEl = document.querySelector('.hero-bg');
  if (heroBgEl) setTimeout(() => heroBgEl.classList.add('loaded'), 100);

  console.log('%c🍽️ Osteria N.3 — Website Loaded Optimized', 'color:#e85d04; font-size:14px; font-weight:bold;');
});
