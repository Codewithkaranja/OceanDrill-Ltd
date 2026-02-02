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
        
        // Initialize Map
        function initMap() {
            // Coordinates for Mlolongo, Nairobi
            const mlolongo = [-1.3876, 36.9600];
            
            // Create map
            const map = L.map('map').setView(mlolongo, 15);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add custom marker
            const customIcon = L.divIcon({
                html: '<i class="fas fa-water" style="color: #cf2e2e; font-size: 2rem;"></i>',
                iconSize: [30, 30],
                className: 'custom-marker'
            });
            
            // Add marker to map
            L.marker(mlolongo, { icon: customIcon })
                .addTo(map)
                .bindPopup('<b>Ocean Drill Limited</b><br>Dul Dul Business Park Phase 3<br>Mlolongo, Nairobi')
                .openPopup();
        }
        
        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', initMap);
        
        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
                
                // Close other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1000);
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