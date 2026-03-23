// ============================
// Select Elements
// ============================
const revealElements = document.querySelectorAll(".reveal");
const themeToggle = document.getElementById("theme-toggle");
const typingText = document.getElementById("typing-text");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("section[id]");
const progressBar = document.getElementById("scroll-progress-bar");
const progressText = document.getElementById("scroll-percentage");

// ============================
// Reveal on Scroll
// ============================
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const visiblePoint = 120;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - visiblePoint) {
      element.classList.add("active");
    }
  });
}

// ============================
// Active Menu Highlight
// ============================
function setActiveNavLink() {
  const scrollY = window.scrollY;
  const headerOffset = 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerOffset;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// ============================
// Smooth Scroll for Nav Clicks
// ============================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");

      const headerOffset = 100;
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ============================
// Scroll Progress Indicator
// ============================
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const roundedPercent = Math.min(100, Math.max(0, Math.round(scrollPercent)));

  if (progressBar) {
    progressBar.style.width = `${scrollPercent}%`;
  }

  if (progressText) {
    progressText.textContent = `${roundedPercent}%`;
  }
}

// ============================
// Initial Load + Scroll Events
// ============================
window.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  setActiveNavLink();
  updateScrollProgress();
});

window.addEventListener("scroll", () => {
  revealOnScroll();
  setActiveNavLink();
  updateScrollProgress();
});

// ============================
// Theme Toggle with Memory
// ============================
if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLightMode ? "☀️" : "🌙";

    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  });
}

// ============================
// Typing Effect
// ============================
const words = [
  "Aspiring Data Scientist",
  "Python Learner",
  "Data Analyst",
  "Machine Learning Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;

    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();

/* =========================
   PROFILE IMAGE GLOW RING
========================= */

const card = document.querySelector(".profile-image-wrapper");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 20;
  const rotateX = -(y / rect.height - 0.5) * 20;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0) rotateY(0)";
});
