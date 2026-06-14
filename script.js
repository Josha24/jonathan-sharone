/* ================= LOADER ================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    document.getElementById("loader").style.transition = "1s ease";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 1000);
  }, 1500);
});

/* ================= OPEN INVITATION ================= */
const openBtn = document.getElementById("openInvite");
const envelopeSection = document.getElementById("envelopeSection");
const hero = document.querySelector(".hero");

openBtn.addEventListener("click", () => {
  hero.style.display = "none";
  envelopeSection.classList.remove("hidden");
});

/* ================= ENVELOPE CLICK ================= */
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation");
const music = document.getElementById("music");

envelope.addEventListener("click", () => {
  envelope.style.transform = "scale(0.8) rotateX(180deg)";
  envelope.style.transition = "1s ease";

  setTimeout(() => {
    envelopeSection.style.display = "none";
    invitation.classList.remove("hidden");

    invitation.classList.add("fade-in");

    // Start music after interaction (browser requirement)
    music.volume = 0.5;
    music.play().catch(() => {
      console.log("Autoplay blocked, user must interact again.");
    });

  }, 1000);
});

/* ================= COUNTDOWN ================= */
const weddingDate = new Date("June 14, 2026 17:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("timer").innerHTML = "💍 C’est le grand jour !";
  }
}, 1000);

/* ================= FLOATING PARTICLES ================= */
const particlesContainer = document.querySelector(".particles");

function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = (Math.random() * 3 + 3) + "s";
  particle.style.opacity = Math.random();

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

setInterval(createParticle, 300);

/* ================= FADE IN SCROLL ================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".card, .verse, .gallery img").forEach(el => {
  observer.observe(el);
});
