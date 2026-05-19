/* =============================================
   PEARL DENTAL — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL ----
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', closeMobile);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

  function closeMobile() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // ---- SMOOTH ACTIVE NAV LINKS ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
    });
  });

  // ---- MARQUEE DUPLICATION (for seamless loop) ----
  const track = document.querySelector('.marquee-track');
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  }

  // ---- GALLERY LIGHTBOX (simple) ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(44,31,20,0.95);z-index:9999;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;';
      overlay.appendChild(bigImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // ---- CALENDLY INTEGRATION ----
  // To activate Calendly booking:
  // 1. Replace 'YOUR_CALENDLY_USERNAME' below with actual Calendly link
  // 2. Uncomment the initCalendly() call
  // Free Calendly plan supports 1 event type + website embed

  function initCalendly(url) {
    const container = document.getElementById('calendly-embed');
    if (!container || !url) return;
    container.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    const div = document.createElement('div');
    div.className = 'calendly-inline-widget';
    div.setAttribute('data-url', url);
    div.style.minWidth = '320px';
    div.style.height = '630px';
    container.appendChild(div);
  }

  // Uncomment below and replace URL to activate:
  // initCalendly('https://calendly.com/YOUR_USERNAME/appointment');

  // ---- COUNTER ANIMATION ----
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1800;
        const step = timestamp => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

});