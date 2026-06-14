// ===============================
// 1. ENVELOPE / OPEN INVITATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("#openInvitation");
  const invitationSection = document.querySelector("#invitation");

  if (openBtn && invitationSection) {
    openBtn.addEventListener("click", () => {
      // Smooth scroll to the invitation section after a short delay
      setTimeout(() => {
        invitationSection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  }
});


// ===============================
// 2. COUNTDOWN TIMER (16 JULY 2026)
// ===============================
(function initCountdown() {
  const cdDays    = document.getElementById("cd-days");
  const cdHours   = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");
  const timerEl   = document.getElementById("timer");

  if (!timerEl) return;

  // Use UTC midnight on the wedding date to avoid timezone drift
  const weddingDate = new Date("2026-07-16T00:00:00").getTime();

  function tick() {
    const now      = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
      timerEl.innerHTML = '<p class="countdown-ended">Today is the big day 💍</p>';
      return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent    = String(days).padStart(2, "0");
    cdHours.textContent   = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  tick(); // run immediately so there's no 1-second blank
  setInterval(tick, 1000);
})();


// ===============================
// 3. BACKGROUND MUSIC CONTROL
// ===============================
(function initMusic() {
  const music    = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn"); // matches id in HTML

  if (!music || !musicBtn) return;

  // Sync button label to actual audio state (handles browser autoplay blocks)
  function syncLabel() {
    musicBtn.setAttribute("aria-label", music.paused ? "Play background music" : "Pause background music");
    musicBtn.textContent = music.paused ? "🎵" : "⏸";
  }

  music.addEventListener("play",  syncLabel);
  music.addEventListener("pause", syncLabel);
  music.addEventListener("ended", syncLabel);

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {
        // Autoplay blocked — button still updates on next user interaction
      });
    } else {
      music.pause();
    }
  });
})();


// ===============================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===============================
// 5. FADE-IN ON SCROLL
// ===============================
(function initFadeIn() {
  // Guard: skip if IntersectionObserver not supported
  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    document.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // stop watching once revealed
      }
    });
  }, { threshold: 0.15 });

  // CSS class is .fade-in, toggled class is .visible — matches style.css exactly
  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
})();


// ===============================
// 6. FLOATING GOLD PARTICLES
// ===============================
(function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  // Respect reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const MAX_PARTICLES = 18; // cap to avoid DOM bloat
  let   activeCount   = 0;

  function createParticle() {
    if (activeCount >= MAX_PARTICLES) return;
    activeCount++;

    const particle = document.createElement("div");
    particle.classList.add("particle");

    const duration = 4 + Math.random() * 5; // 4–9s
    particle.style.left              = Math.random() * 100 + "vw";
    particle.style.animationDuration = duration + "s";
    particle.style.width             = (5 + Math.random() * 6) + "px";
    particle.style.height            = particle.style.width;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
      activeCount--;
    }, duration * 1000);
  }

  setInterval(createParticle, 500);
})();


// ===============================
// 7. PREVENT RIGHT-CLICK
// ===============================
document.addEventListener("contextmenu", e => e.preventDefault());
