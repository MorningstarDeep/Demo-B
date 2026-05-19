/* =============================================
   SMILECARE DENTAL — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL ----
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMobile = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose?.addEventListener('click', closeMobile);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // ---- COUNTER ANIMATION ----
  const statEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = null;
      const duration = 1600;
      const animate = (ts) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const val = Math.floor((1 - Math.pow(1 - prog, 3)) * target);
        el.textContent = val + suffix;
        if (prog < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => countObserver.observe(el));

  // ---- CALENDLY INTEGRATION ----
  // FREE plan: 1 event type, unlimited bookings, embeddable
  // To activate:
  // 1. Create account at calendly.com (free forever)
  // 2. Set up a "Dental Appointment" event type
  // 3. Replace 'YOUR_CALENDLY_USERNAME' below
  // 4. Uncomment initCalendly()

  function initCalendly(url) {
    const container = document.getElementById('calendly-embed');
    if (!container || !url) return;
    container.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    const widget = document.createElement('div');
    widget.className = 'calendly-inline-widget';
    widget.setAttribute('data-url', url);
    widget.style.minWidth = '320px';
    widget.style.height = '600px';
    container.appendChild(widget);
  }

  // Uncomment and replace URL:
  // initCalendly('https://calendly.com/YOUR_USERNAME/dental-appointment');

});