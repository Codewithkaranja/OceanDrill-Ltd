   // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.innerHTML = nav.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}
const counters = document.querySelectorAll(".about-stat-number");

const countUp = (counter) => {
  const target = +counter.getAttribute("data-target");
  const hasPlus = counter.textContent.includes("+");
  let count = 0;

  const speed = target > 100 ? 20 : 40; // adjust smoothness

  const updateCount = () => {
    const increment = Math.ceil(target / 100);
    count += increment;

    if (count < target) {
      counter.textContent = count + (hasPlus ? "+" : "");
      requestAnimationFrame(updateCount);
    } else {
      counter.textContent = target + (hasPlus ? "+" : "");
    }
  };

  updateCount();
};

// Trigger only when visible
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // run once
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));

        
        // Header scroll effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Active navigation link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });