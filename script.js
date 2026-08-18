// =========================================================
// Karam Khsara — Portfolio interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavScrollState();
  initMobileNav();
  initSmoothAnchors();
  initScrollReveal();
  initActiveNavLink();
  initLanguageDots();
  initEmailCopy();
  initFooterYear();
});

/* ---- Nav background on scroll ---- */
function initNavScrollState() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const update = () => {
    if (window.scrollY > 24) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---- Mobile menu toggle ---- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Smooth scroll for in-page anchors ---- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---- Reveal-on-scroll for elements with .reveal ---- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---- Highlight active nav link based on section in view ---- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---- Fill language proficiency dots when their card enters view ---- */
function initLanguageDots() {
  const dotGroups = document.querySelectorAll('.dots');
  if (!dotGroups.length) return;

  const fill = (group) => {
    const level = parseInt(group.getAttribute('data-level'), 10) || 0;
    const dots = group.querySelectorAll('i');
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-filled', index < level);
    });
    group.classList.add('in-view');
  };

  if (!('IntersectionObserver' in window)) {
    dotGroups.forEach(fill);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  dotGroups.forEach((group) => observer.observe(group));
}

/* ---- Copy email to clipboard with a small toast confirmation ---- */
function initEmailCopy() {
  const emailCard = document.getElementById('emailCard');
  const toast = document.getElementById('toast');
  if (!emailCard || !toast) return;

  emailCard.addEventListener('click', (event) => {
    const email = emailCard.getAttribute('data-email');
    if (!email || !navigator.clipboard) return; // fall back to default mailto behaviour

    event.preventDefault();
    navigator.clipboard
      .writeText(email)
      .then(() => showToast(toast))
      .catch(() => {
        window.location.href = `mailto:${email}`;
      });
  });
}

function showToast(toast) {
  toast.classList.add('is-visible');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2200);
}

/* ---- Footer year ---- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
