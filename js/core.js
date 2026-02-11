/**
 * Core Logic - Shared across all pages of the portfolio
 * Includes: Navigation, Theme Toggle, Scroll Reveal, and Performance Utils
 */

// mobile-menu-logic
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links-container');
const navOverlay = document.querySelector('.nav-overlay');
const navLinksAll = document.querySelectorAll('.nav-link');

function closeMobileMenu() {
    navToggle?.classList.remove('active');
    navLinksContainer?.classList.remove('active');
    navOverlay?.classList.remove('active');
    if (!document.querySelector('.modal.active')) {
        document.body.style.overflow = '';
    }
}

function openMobileMenu() {
    navToggle?.classList.add('active');
    navLinksContainer?.classList.add('active');
    navOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

navToggle?.addEventListener('click', () => {
    if (navToggle.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

navOverlay?.addEventListener('click', closeMobileMenu);

navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});

// theme-toggle-logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

if (themeToggleBtn && themeIcon) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// scroll-reveal-logic
let revealObserver;

function triggerReveal() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-img');
    if (revealObserver) {
        revealElements.forEach(el => revealObserver.observe(el));
    }
}

// Expose globally
window.triggerReveal = triggerReveal;

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-img');
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    triggerReveal();
});

// marquee-logic
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    const content = marqueeContent.innerHTML;
    marqueeContent.innerHTML = content + content;
}

// smooth-scroll-logic
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('nav-link')) return;
            const href = this.getAttribute('href');
            if (!href) return;
            const isHash = href.startsWith('#');
            const isSamePage = (this.hostname === window.location.hostname) &&
                             (this.pathname.replace(/^\//, '') === window.location.pathname.replace(/^\//, ''));

            if (!isHash && !isSamePage) return;
            const targetId = this.hash;
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                 e.preventDefault();
                 targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 history.pushState(null, null, targetId);
            }
        });
    });
});
