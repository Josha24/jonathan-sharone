/* ============================================================
   JONATHAN & SHARONE — script.js
   Loading → Envelope → Main site
   ============================================================ */

/* ── CONFIG ─────────────────────────────────────────────── */
// 🗓️  Set your wedding date here (YYYY, Month-1, Day, Hour, Min)
const WEDDING_DATE = new Date(2026, 06, 16, 15, 0, 0); // Example: 27 Dec 2025, 16:00

/* ── INIT ────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  startLoadingParticles();
  initMainParticles();

  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('fade-out');
    setTimeout(() => {
      ls.style.display = 'none';
      revealEnvelope();
    }, 900);
  }, 3200);

  startCountdown();
  initScrollAnimations();
});

/* ── LOADING PARTICLES ───────────────────────────────────── */
function startLoadingParticles() {
  const container = document.getElementById('loading-particles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      background: rgba(184,151,58,${0.2 + Math.random() * 0.6});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${4 + Math.random() * 6}s ${Math.random() * 4}s infinite ease-in-out alternate;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes floatParticle {
        0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
        100% { transform: translateY(-${30 + Math.random() * 50}px) translateX(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px) scale(1.4); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ── CANVAS PARTICLES ────────────────────────────────────── */
function initMainParticles() {
  const canvas = document.getElementById('main-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD = 'rgba(184,151,58,';
  const particles = Array.from({ length: 55 }, () => createParticle(canvas));

  function createParticle(c) {
    return {
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: 0.5 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.3,
      alpha: 0.1 + Math.random() * 0.55,
      dAlpha: (Math.random() - 0.5) * 0.003,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.dAlpha;

      if (p.alpha <= 0.05 || p.alpha >= 0.7) p.dAlpha *= -1;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── ENVELOPE ────────────────────────────────────────────── */
function revealEnvelope() {
  const sec = document.getElementById('envelope-section');
  sec.classList.remove('hidden');
}

function openEnvelope() {
  const env    = document.getElementById('envelope');
  const btn    = document.getElementById('open-btn');
  const sec    = document.getElementById('envelope-section');
  const site   = document.getElementById('main-site');
  const player = document.getElementById('music-player');

  // Animate envelope open
  env.classList.add('open');
  btn.classList.add('hide');

  // After letter rises, reveal main site
  setTimeout(() => {
    sec.classList.add('exit');
    setTimeout(() => {
      sec.style.display = 'none';
      site.classList.remove('hidden');
      player.classList.remove('hidden');

      // Trigger first visible fade-ins
      requestAnimationFrame(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
          checkVisible(el);
        });
      });

      // Start music
      startMusic();

    }, 900);
  }, 2000);
}

/* ── MUSIC ───────────────────────────────────────────────── */
let musicPlaying = false;
const audio = document.getElementById('bg-music');

function startMusic() {
  if (!audio) return;

  // Load the audio first, then play
  audio.load();
  audio.volume = 0;

  const tryPlay = () => {
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        musicPlaying = true;
        updateMusicIcon();
        fadeAudioIn();
      }).catch(() => {
        // Still blocked — show the button so user can tap it manually
        const player = document.getElementById('music-player');
        if (player) player.classList.remove('hidden');
      });
    }
  };

  // Small delay to let the browser register the click interaction
  setTimeout(tryPlay, 300);
}

function updateMusicIcon() {
  document.getElementById('music-icon-on').style.display = 'block';
  document.getElementById('music-icon-off').style.display = 'none';
}

function fadeAudioIn() {
  const target = 0.45;
  const step   = 0.01;
  const ticker = setInterval(() => {
    if (audio.volume < target - step) {
      audio.volume = Math.min(target, audio.volume + step);
    } else {
      audio.volume = target;
      clearInterval(ticker);
    }
  }, 80);
}

function toggleMusic() {
  const on  = document.getElementById('music-icon-on');
  const off = document.getElementById('music-icon-off');
  if (!audio) return;
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    on.style.display  = 'none';
    off.style.display = 'block';
  } else {
    audio.play();
    musicPlaying = true;
    off.style.display = 'none';
    on.style.display  = 'block';
  }
}

/* ── COUNTDOWN ───────────────────────────────────────────── */
function startCountdown() {
  function update() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML =
        '<span style="font-family:var(--font-display);color:var(--gold);font-size:1.6rem;letter-spacing:0.06em">Aujourd\'hui — Notre Jour Spécial ✦</span>';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    setText('cd-days',  pad(d));
    setText('cd-hours', pad(h));
    setText('cd-mins',  pad(m));
    setText('cd-secs',  pad(s));
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el && el.textContent !== val) el.textContent = val;
  }

  update();
  setInterval(update, 1000);
}

/* ── SCROLL FADE-IN ─────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function checkVisible(el) {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.95) {
    el.classList.add('visible');
  }
}
