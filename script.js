// ============================
// Select Elements
// ============================
const revealElements = document.querySelectorAll(".reveal");
const themeToggle = document.getElementById("theme-toggle");
const typingText = document.getElementById("typing-text");


// ============================
// Reveal on Scroll (Improved)
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

// Run on load + scroll
window.addEventListener("DOMContentLoaded", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);


// ============================
// Theme Toggle (with memory)
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
// Typing Effect (Improved)
// ============================
const words = [
  "Aspiring Data Scientist",
  "Python Developer",
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
      setTimeout(typeEffect, 1200); // pause before deleting
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

// Start typing
typeEffect();
