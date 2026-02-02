// =====================================================
// Ocean Drill - Main JS (SAFE + NO CRASHES)
// - Works even if some elements are missing on a page
// - Uses your header IDs: #mobileMenuBtn + #mainNav
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Mobile Navigation Toggle
  // ---------------------------
  const mobileToggle = document.getElementById("mobileMenuBtn"); // ✅ your HTML
  const nav = document.getElementById("mainNav");                // ✅ your HTML

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      mobileToggle.innerHTML = nav.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link (only inside nav)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // ---------------------------
  // Header scroll effect
  // ---------------------------
  const header = document.querySelector("header"); // works even without id="header"
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 100);

    // Active navigation link highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    let current = "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // run once on load

  // ---------------------------
  // Smooth scrolling for anchor links (SAFE)
  // Won't block WhatsApp links, etc.
  // ---------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return; // ✅ don't block if target isn't on the page

      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // ---------------------------
  // Project Filtering
  // ---------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const filterLinks = document.querySelectorAll(".filter-link");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const matches =
            filterValue === "all" || card.getAttribute("data-category") === filterValue;

          if (matches) {
            card.style.display = "block";
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Filter links in footer
  if (filterLinks.length && filterButtons.length) {
    filterLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const filterValue = link.getAttribute("data-filter");
        filterButtons.forEach((button) => {
          if (button.getAttribute("data-filter") === filterValue) button.click();
        });

        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          window.scrollTo({
            top: projectsSection.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ---------------------------
  // Stats Count Up (Projects stats)
  // ---------------------------
  const statCounters = document.querySelectorAll(".stat-number[data-target]");

  const animateCounter = (counter) => {
    const target = Number(counter.getAttribute("data-target")) || 0;
    const suffix = counter.getAttribute("data-suffix") || "";
    let current = 0;

    const step = Math.max(1, Math.ceil(target / 100));

    const tick = () => {
      current += step;
      if (current < target) {
        counter.textContent = `${current}${suffix}`;
        requestAnimationFrame(tick);
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    };

    tick();
  };

  if (statCounters.length) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    statCounters.forEach((counter) => statsObserver.observe(counter));
  }

  // ---------------------------
  // Project Modal
  // ---------------------------
  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const viewButtons = document.querySelectorAll(".project-view-btn");

  // Project data
  const projects = {
    1: {
      title: "Karen Residential Estate Borehole",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "180m", label: "Depth" },
        { number: "45 days", label: "Duration" },
        { number: "20", label: "Households" },
        { number: "15,000L", label: "Daily Yield" },
      ],
      description:
        "A comprehensive water solution for a luxury residential estate in Karen, Nairobi. The project involved drilling through challenging rock formations to access a reliable water source for the entire estate.",
      challenges:
        "The main challenge was the hard volcanic rock formation that required specialized drilling equipment. Additionally, the location within a residential area required minimal disruption to residents and careful management of noise and dust.",
      solution:
        "We utilized a state-of-the-art rotary drilling rig with down-the-hole hammer technology. The project was completed in phases to minimize disruption, and we implemented a sophisticated water storage and distribution system with backup power supply.",
    },
    2: {
      title: "Mombasa Road Hotel Water System",
      image:
        "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "220m", label: "Depth" },
        { number: "60 days", label: "Duration" },
        { number: "150", label: "Hotel Rooms" },
        { number: "40,000L", label: "Daily Yield" },
      ],
      description:
        "Complete water system solution for a 150-room hotel along Mombasa Road. The system includes borehole drilling, water treatment, storage, and distribution throughout the hotel complex.",
      challenges:
        "Limited space for drilling equipment, high water demand for hotel operations, and the need for continuous water supply without interruption to hotel guests.",
      solution:
        "We designed a compact drilling plan that worked within the limited space. The system includes dual pumps with automatic switching, a 100,000-liter storage tank, and a comprehensive water treatment system to ensure potable water quality.",
    },
    3: {
      title: "Naivasha Flower Farm Irrigation",
      image:
        "https://images.unsplash.com/photo-1620321020508-d909e86b167c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "4", label: "Boreholes" },
        { number: "280m", label: "Avg Depth" },
        { number: "50 acres", label: "Farm Size" },
        { number: "80%", label: "Cost Savings" },
      ],
      description:
        "Agricultural irrigation project for a 50-acre flower farm in Naivasha. The system provides reliable water for year-round flower cultivation.",
      challenges:
        "High water demand for irrigation, fluctuating water table levels, and the need for cost-effective operation in a competitive agricultural market.",
      solution:
        "We drilled four high-yield boreholes strategically located across the farm. Implemented a solar-powered pumping system that significantly reduced operational costs. The system includes automated irrigation controls for efficient water usage.",
    },
    4: {
      title: "Kajiado Boarding School Water Supply",
      image:
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "250m", label: "Depth" },
        { number: "35 days", label: "Duration" },
        { number: "500", label: "Students" },
        { number: "100%", label: "Water Needs" },
      ],
      description:
        "Community water project for a boarding school in Kajiado County, ending years of water shortages and water trucking expenses.",
      challenges:
        "Arid region with deep water table, limited budget for the project, and the need for a reliable system that could be maintained by school staff.",
      solution:
        "Deep drilling to access sustainable aquifers. We implemented a robust but simple system with training for school maintenance staff. The project was completed under budget through efficient planning and community involvement.",
    },
    5: {
      title: "Westlands Office Complex Borehole Repair",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "Rehab", label: "Project Type" },
        { number: "15 days", label: "Duration" },
        { number: "40%", label: "Cost Saving" },
        { number: "100%", label: "Restored" },
      ],
      description:
        "Complete rehabilitation of a non-functional borehole for a commercial office complex in Westlands, Nairobi.",
      challenges:
        "Unknown condition of the existing borehole, potential damage to casing, and the need to work within a busy commercial complex with minimal disruption.",
      solution:
        "Comprehensive assessment using downhole camera inspection. We repaired the casing, cleaned the borehole using high-pressure jetting, and replaced the pump system. The rehabilitation cost 40% less than drilling a new borehole.",
    },
    6: {
      title: "Thika Manufacturing Plant Water Supply",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: [
        { number: "300m", label: "Depth" },
        { number: "50 days", label: "Duration" },
        { number: "50,000L", label: "Daily Yield" },
        { number: "24/7", label: "Operation" },
      ],
      description:
        "High-capacity borehole system for a manufacturing plant in Thika, providing water for production processes and facility operations.",
      challenges:
        "Continuous high-volume water demand for manufacturing processes, water quality requirements for production, and the need for uninterrupted supply.",
      solution:
        "We drilled a deep, high-yield borehole with a powerful pumping system. Implemented a water treatment system tailored to the plant's specific needs and installed backup systems to ensure continuous operation.",
    },
  };

  if (projectModal && modalClose && viewButtons.length) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const projectId = button.getAttribute("data-project");
        const project = projects[projectId];
        if (!project) return;

        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalStats = document.getElementById("modalStats");
        const modalDescription = document.getElementById("modalDescription");
        const modalChallenges = document.getElementById("modalChallenges");
        const modalSolution = document.getElementById("modalSolution");

        if (modalImage) modalImage.src = project.image;
        if (modalTitle) modalTitle.textContent = project.title;

        if (modalStats) {
          modalStats.innerHTML = "";
          project.stats.forEach((stat) => {
            const el = document.createElement("div");
            el.className = "modal-stat";
            el.innerHTML = `
              <div class="modal-stat-number">${stat.number}</div>
              <div class="modal-stat-label">${stat.label}</div>
            `;
            modalStats.appendChild(el);
          });
        }

        if (modalDescription) modalDescription.innerHTML = `<p>${project.description}</p>`;
        if (modalChallenges)
          modalChallenges.innerHTML = `<h4>Challenges</h4><p>${project.challenges}</p>`;
        if (modalSolution)
          modalSolution.innerHTML = `<h4>Our Solution</h4><p>${project.solution}</p>`;

        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    modalClose.addEventListener("click", closeModal);

    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
    if (typeof Swiper === "undefined" || !document.querySelector(".clientsSwiper")) return;

    new Swiper(".clientsSwiper", {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".clientsSwiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      },
    });
});
