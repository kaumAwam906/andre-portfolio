const profile = document.getElementById("profile");
const profileWrap = document.getElementById("profileWrap");

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 850 || !profile) return;
  const rect = profileWrap.getBoundingClientRect();
  const x = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 18;
  const y = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 18;
  profile.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.04)`;
});

document.addEventListener("mouseleave", () => {
  if (profile) profile.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
reveals.forEach(el => observer.observe(el));

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modal.classList.add("show");
  });
});
modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("show");
});

// Lightweight particle background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({length: Math.min(90, Math.floor(window.innerWidth / 14))}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.7 + .3,
    s: Math.random() * .45 + .08
  }));
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#38bdf8";
  particles.forEach(p => {
    ctx.globalAlpha = .35;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.s;
    if (p.y > canvas.height) p.y = -3;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
resize();
animate();
window.addEventListener("resize", resize);
