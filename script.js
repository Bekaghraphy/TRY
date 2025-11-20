// Ken Burns Slideshow
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

// غيّر الرقم على حسب السرعة اللي تحبها
if (slides.length > 1) {
  setInterval(showNextSlide, 8000); // 8 ثواني لكل صورة
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

// Active link on scroll + smooth scroll
function setActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  let currentId = "";

  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveLink);

// Reveal sections on scroll
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Once visible, stop observing
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach(el => observer.observe(el));

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Fake form submit (front-end only)
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    formStatus.textContent = "Thanks for your message. I’ll reply as soon as I can.";
    contactForm.reset();
  });
}
