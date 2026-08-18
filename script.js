document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.insetInlineEnd = '1.5rem';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.border = '1px solid #D9EAFB';
      navLinks.style.borderRadius = '12px';
      navLinks.style.padding = '1rem 1.5rem';
      navLinks.style.boxShadow = '0 10px 30px -12px rgba(10,37,64,.18)';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Terminal typing animation (signature hero element) ---------- */
  const cmdEl = document.getElementById('typedCmd');
  const cursorEl = document.getElementById('typedCursor');
  const responseEl = document.getElementById('terminalResponse');
  const command = 'curl https://karam.dev/api/whoami';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeCommand(text, el, speed = 42) {
    return new Promise(resolve => {
      if (prefersReducedMotion) { el.textContent = text; resolve(); return; }
      let i = 0;
      const tick = () => {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  async function runTerminal() {
    if (!cmdEl) return;
    await typeCommand(command, cmdEl);
    if (cursorEl) cursorEl.style.animationPlayState = 'paused';
    await new Promise(r => setTimeout(r, 300));
    if (responseEl) responseEl.hidden = false;
  }

  // Trigger once the hero scrolls into view (or immediately if already visible)
  const heroTerminal = document.querySelector('.hero-terminal');
  if (heroTerminal && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runTerminal();
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(heroTerminal);
  } else {
    runTerminal();
  }

  /* ---------- Skills data → segmented bars ---------- */
  const skills = [
    { name: 'HTML',       cat: 'Front-End', level: 5 },
    { name: 'CSS',        cat: 'Front-End', level: 5 },
    { name: 'JavaScript', cat: 'Front-End', level: 4 },
    { name: 'TypeScript', cat: 'Front-End', level: 4 },
    { name: 'PHP',        cat: 'Back-End',  level: 4 },
    { name: 'Node.js',    cat: 'Back-End',  level: 4 },
    { name: 'Python',     cat: 'Back-End',  level: 4 },
    { name: 'Ruby',       cat: 'Back-End',  level: 3 },
    { name: 'Java',       cat: 'Back-End',  level: 3 },
    { name: 'C++',        cat: 'Systems',   level: 4 },
  ];

  const stackGrid = document.getElementById('stackGrid');
  if (stackGrid) {
    stackGrid.innerHTML = skills.map(s => `
      <div class="skill-card">
        <div class="skill-top">
          <span class="skill-name">${s.name}</span>
          <span class="skill-cat">${s.cat}</span>
        </div>
        <div class="skill-bar" role="img" aria-label="${s.name} proficiency ${s.level} out of 5">
          ${Array.from({ length: 5 }, (_, i) =>
            `<span class="skill-seg${i < s.level ? ' filled' : ''}"></span>`
          ).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ---------- Languages data → dot indicators ---------- */
  const languages = [
    { name: 'العربية', level: 5, tag: 'اللغة الأم' },
    { name: 'English', level: 3, tag: 'Professional' },
    { name: '日本語 Japanese', level: 2, tag: 'قيد التعلّم' },
  ];

  const langGrid = document.getElementById('langGrid');
  if (langGrid) {
    langGrid.innerHTML = languages.map(l => `
      <div class="lang-card">
        <div class="lang-top">
          <span class="lang-name">${l.name}</span>
          <span class="lang-level">${l.tag}</span>
        </div>
        <div class="lang-dots" role="img" aria-label="${l.name} level ${l.level} out of 5">
          ${Array.from({ length: 5 }, (_, i) =>
            `<span class="lang-dot${i < l.level ? ' on' : ''}"></span>`
          ).join('')}
        </div>
      </div>
    `).join('');
  }

});
