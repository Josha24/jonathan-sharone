window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 1200);
});

/* OPEN INVITATION */
const openBtn = document.getElementById("openInvite");
const hero = document.querySelector(".hero");
const envelopeSection = document.getElementById("envelopeSection");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    hero.style.display = "none";
    envelopeSection.classList.remove("hidden");
  });
}

/* ENVELOPE CLICK */
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation");
const music = document.getElementById("music");

if (envelope) {
  envelope.addEventListener("click", () => {
    envelopeSection.style.display = "none";
    invitation.classList.remove("hidden");

    if (music) {
      music.volume = 0.5;
      music.play().catch(() => {});
    }
  });
});

/* COUNTDOWN */
const weddingDate = new Date("June 14, 2026 17:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");

  if (d) d.innerText = days;
  if (h) h.innerText = hours;
  if (m) m.innerText = minutes;
  if (s) s.innerText = seconds;

  if (distance < 0) {
    clearInterval(timer);
    const t = document.getElementById("timer");
    if (t) t.innerHTML = "💍 C’est le grand jour !";
  }
}, 1000);
