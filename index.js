document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobileMenuBtn");
const nav = document.getElementById("mainNav");

if (mobileToggle && nav) {
  mobileToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    mobileToggle.innerHTML = nav.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close menu when clicking a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

  // Form submission
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your request! We will contact you shortly.");
      quoteForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      // close menu on mobile (nice UX)
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Active navigation link highlighting + Header scroll effect (combined)
  const header = document.getElementById("header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  const onScroll = () => {
    // header effect
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 100);
    }

    // active link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // run once on load

  // Swiper init (only if Swiper is loaded + element exists)
  const whySwiperEl = document.querySelector(".whySwiper");
  if (whySwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".whySwiper", {
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".whySwiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".whySwiper .swiper-button-next",
        prevEl: ".whySwiper .swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }
});
