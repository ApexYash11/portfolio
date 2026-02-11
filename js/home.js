/**
 * Home Logic - Specific to index.html
 * Includes: Preloader, Typewriter, Parallax, Nav Indicator, Filter, and Modals
 */

// preloader-logic (Optimized for 60fps)
window.addEventListener('load', () => {
    if (window.__preloaderRan) return;
    window.__preloaderRan = true;

    const preloader = document.querySelector('.preloader');
    const countElement = document.querySelector('.count');
    if (!preloader || !countElement) return;

    let count = 0;
    let lastTime = 0;
    function animateCounter(currentTime) {
        if (currentTime - lastTime >= 10) {
            if (count < 100) {
                count++;
                countElement.textContent = count;
            }
            lastTime = currentTime;
        }
        if (count < 100) {
            requestAnimationFrame(animateCounter);
        } else {
            preloader.classList.add('hide');
        }
    }
    requestAnimationFrame(animateCounter);
});

// parallax-logic (Optimized with RAF)
let scrolling = false;
window.addEventListener('scroll', () => { scrolling = true; }, { passive: true });

function updateParallax() {
    if (scrolling) {
        const scrolled = window.scrollY;
        const parallaxImages = document.querySelectorAll('.hero-image img, .about-image img');
        parallaxImages.forEach(img => {
            const speed = 0.1;
            img.style.translate = `0 ${scrolled * speed}px`;
        });
        scrolling = false;
    }
    requestAnimationFrame(updateParallax);
}
requestAnimationFrame(updateParallax);

// typewriter-logic
const typewriterElement = document.getElementById('typewriter-text');
const cursorElement = document.querySelector('.typewriter-cursor');
const roles = ["AI/ML Engineer", "Backend Guy", "ML Developer", "LLM / LLMOps Guy"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) charIndex--;
    else charIndex++;

    if (typewriterElement) {
        typewriterElement.textContent = currentRole.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

if (typewriterElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    type();
} else if (typewriterElement) {
    typewriterElement.textContent = roles[0];
}

// home-nav-indicator-logic
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');

function updateNavIndicator(activeLink) {
    if (!activeLink || !navIndicator || window.innerWidth <= 768) return;
    const parent = activeLink.parentElement;
    navIndicator.style.width = `${parent.offsetWidth}px`;
    navIndicator.style.transform = `translateX(${parent.offsetLeft}px)`;
    navIndicator.classList.add('visible');
}

// project-modal-logic
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const viewProjectBtns = document.querySelectorAll('.btn-view-project');

if (modal && viewProjectBtns.length) {
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.project-item');
            if (!projectItem) return;
            document.getElementById('modal-title').textContent = projectItem.dataset.title;
            document.getElementById('modal-tagline').textContent = projectItem.dataset.tagline;
            document.getElementById('modal-desc').textContent = projectItem.dataset.description;
            document.getElementById('modal-img').src = projectItem.dataset.image;
            document.getElementById('modal-github').href = projectItem.dataset.github;
            
            const techContainer = document.getElementById('modal-tech');
            techContainer.innerHTML = '';
            projectItem.dataset.tech?.split(',').forEach(tech => {
                const span = document.createElement('span');
                span.className = 'tech-badge';
                span.textContent = tech.trim();
                techContainer.appendChild(span);
            });

            const featuresContainer = document.getElementById('modal-features');
            featuresContainer.innerHTML = '';
            projectItem.dataset.features?.split(',').forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.trim();
                featuresContainer.appendChild(li);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closemodalFn = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModal?.addEventListener('click', closemodalFn);
    modal.addEventListener('click', (e) => { if (e.target === modal) closemodalFn(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closemodalFn(); });
}

// skills-filtering-logic
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fadeIn 0.5s ease forwards, float-card 6s ease-in-out infinite';
            } else {
                card.classList.add('hide');
                card.style.animation = 'none';
            }
        });
    });
});

// home-scrollspy-logic (nav indicator)
const sections = document.querySelectorAll('section[id], header[id]');
if (sections.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                navLinks.forEach(l => l.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    updateNavIndicator(correspondingLink);
                }
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
}

// init indicator
window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) updateNavIndicator(activeLink);
});

window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) updateNavIndicator(activeLink);
});
