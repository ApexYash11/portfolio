/**
 * Blog Logic - Specific to blog articles
 * Includes: TOC Scroll-Spy, TOC Auto-scroll, and Copy Code Buttons
 */

document.addEventListener('DOMContentLoaded', () => {
    // toc-scrollspy-logic
    const tocLinks = document.querySelectorAll('.toc-link');
    const NAVBAR_HEIGHT = 100;
    
    if (tocLinks.length > 0) {
        const headingMap = new Map();
        tocLinks.forEach(link => {
            const id = link.getAttribute('href').substring(1);
            const heading = document.getElementById(id);
            if (heading) headingMap.set(heading, link);
        });

        const observerOptions = {
            root: null,
            rootMargin: `-${NAVBAR_HEIGHT + 20}px 0px -60% 0px`,
            threshold: 0
        };

        let currentActive = null;

        const observer = new IntersectionObserver((entries) => {
            const visibleHeadings = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
            if (visibleHeadings.length === 0) return;

            const topHeading = visibleHeadings.reduce((highest, heading) => {
                return heading.getBoundingClientRect().top < highest.getBoundingClientRect().top ? heading : highest;
            });

            const tocLink = headingMap.get(topHeading);
            if (tocLink && tocLink !== currentActive) {
                tocLinks.forEach(link => link.classList.remove('active'));
                tocLink.classList.add('active');
                currentActive = tocLink;
                
                const tocContainer = document.querySelector('.toc-sticky');
                if (tocContainer) {
                    const linkRect = tocLink.getBoundingClientRect();
                    const containerRect = tocContainer.getBoundingClientRect();
                    if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
                        tocLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                }
            }
        }, observerOptions);

        headingMap.forEach((link, heading) => observer.observe(heading));
        
        // toc-click-smooth-scroll
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }

    // copy-code-logic
    const codeBlocks = document.querySelectorAll('pre code, pre');
    codeBlocks.forEach((block) => {
        if (block.closest('.code-block-wrapper') || block.classList.contains('mermaid')) return;
        const codeElement = block.tagName === 'CODE' ? block : block.querySelector('code') || block;
        const preElement = codeElement.closest('pre') || codeElement;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        preElement.parentNode.insertBefore(wrapper, preElement);
        wrapper.appendChild(preElement);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeElement.textContent);
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => copyButton.innerHTML = '<i class="far fa-copy"></i> Copy', 2000);
            } catch (err) {
                copyButton.innerHTML = '<i class="fas fa-times"></i> Failed';
            }
        });
        wrapper.appendChild(copyButton);
    });
});
