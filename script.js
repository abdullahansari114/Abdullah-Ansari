// ================= TYPING ANIMATION =================
const texts = [
    "Full Stack Developer In Progress",
    "Software Engineer In Progress",
    "Website Developer",
    "Android & iOS Developer",
    "Web Designer",
    "UI/UX Designer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typingElement = document.getElementById('typingText');
    
    if (!typingElement) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ================= THEME CONTROLS =================
function toggleThemePanel() {
    const panel = document.getElementById('themePanel');
    panel.classList.toggle('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    if (document.body.classList.contains('light-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme-mode', 'light');
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme-mode', 'dark');
    }
}

// Color theme switcher
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        
        // Remove active class from all buttons
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        
        // Add active to clicked button
        this.classList.add('active');
        
        // Set theme color
        document.body.setAttribute('data-theme', color);
        
        // Save to localStorage
        localStorage.setItem('theme-color', color);
    });
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme-mode');
    const savedColor = localStorage.getItem('theme-color');
    
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        document.querySelector('.moon-icon').style.display = 'none';
        document.querySelector('.sun-icon').style.display = 'block';
    }
    
    if (savedColor) {
        document.body.setAttribute('data-theme', savedColor);
        document.querySelector(`[data-color="${savedColor}"]`)?.classList.add('active');
    }
});

// ================= DOWNLOAD CV =================
document.getElementById('downloadCV')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('CV download feature - Add your CV file link here!');
    // window.location.href = 'path/to/your/cv.pdf';
});

// ================= PROFILE IMAGE HANDLER =================
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    const placeholder = document.querySelector('.image-placeholder');

    if (profileImg) {
        const showImage = () => {
            profileImg.style.display = 'block';
            placeholder.style.display = 'none';
        };

        // agar image already loaded hai
        if (profileImg.complete && profileImg.naturalWidth !== 0) {
            showImage();
        } else {
            profileImg.addEventListener('load', showImage);
            profileImg.addEventListener('error', function() {
                profileImg.style.display = 'none';
                placeholder.style.display = 'flex';
            });
        }
    }
});

// ================= CUSTOM CURSOR =================
const cursor = document.querySelector('.cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .project-card, .stat-card, .skill-category, .color-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
}

// ================= PARTICLES =================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ================= MOBILE MENU =================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// Close theme panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('themePanel');
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    
    if (panel && toggleBtn) {
        if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
            panel.classList.remove('active');
        }
    }
});

// ================= SCROLL ANIMATIONS =================
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .skill-category, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================= ACTIVE NAV LINK =================
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ================= COUNTER ANIMATION =================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement) {
                const number = parseInt(numberElement.textContent.replace(/\D/g, ''));
                if (number) animateCounter(numberElement, number);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));

// ================= PAGE TRANSITION WITH NO BACK HISTORY =================
const transition = document.querySelector('.page-transition');
let isTransitioning = false;

// MAIN SOLUTION: Clear all history on page load
window.addEventListener('load', () => {
    // Replace current state to clear previous history
    if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.href);
    }
});

// Handle navigation links with transition
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (isTransitioning) return;
            isTransitioning = true;
            
            transition.classList.add('active');
            
            setTimeout(() => {
                // Use location.replace() to not add to history
                window.location.replace(href);
            }, 900);
        });
    }
});

// Prevent back navigation - force user to exit website
window.addEventListener('popstate', function(e) {
    window.history.go(1);
});

// ================= SKILL BARS ANIMATION =================
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                }, 100);
            });
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe skills bars section
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-bars-section');
    if (skillsSection) {
        skillBarsObserver.observe(skillsSection);
    }
});

// ================= TIMELINE ANIMATION =================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
});
