const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const profileScene = document.getElementById("profileScene");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Subtle 3D profile effect on desktop.
if (profileScene && window.matchMedia("(pointer:fine)").matches) {
  profileScene.addEventListener("mousemove", (e) => {
    const r = profileScene.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    profileScene.style.transform =
      `perspective(900px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
  });
  profileScene.addEventListener("mouseleave", () => {
    profileScene.style.transform = "";
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 5, 4) * 60}ms`;
  observer.observe(el);
});

const projectData = {
  sitanggap: {
    kicker: "AI / COMPUTER VISION",
    title: "SiTANGGAP",
    description: "Platform AI untuk membantu deteksi stroke melalui analisis berbasis suara dan wajah. Project ini menggabungkan pemrosesan audio dan computer vision dalam sebuah aplikasi web.",
    tech: ["Python", "Flask", "Whisper", "MediaPipe"],
    note: "Project ditampilkan sebagai featured work. Detail demo dan repository dapat ditambahkan setelah link publik siap."
  },
  lunova: {
    kicker: "AI / LUNG HISTOPATHOLOGY",
    title: "LUNOVA",
    description: "Platform AI untuk membantu klasifikasi citra histopatologi paru ke dalam tiga kelas: Normal, LUAD (Adenocarcinoma), dan LUSC (Squamous Cell Carcinoma). Menggunakan Swin Transformer Tiny, Intel® OpenVINO™ untuk optimized CPU inference, dan Grad-CAM untuk visualisasi area citra yang berkontribusi terhadap prediksi.",
    tech: ["Python", "PyTorch", "Swin Transformer", "OpenVINO", "Grad-CAM", "Flask", "JavaScript"],
    note: "Sistem juga memiliki Clinical Support dan Analysis History untuk membantu interpretasi serta pengelolaan hasil analisis."
  }
};

const modal = document.getElementById("projectModal");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalNote = document.getElementById("modalNote");

document.querySelectorAll(".project-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const data = projectData[btn.dataset.project];
    if (!data) return;
    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");
    modalNote.textContent = data.note;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
