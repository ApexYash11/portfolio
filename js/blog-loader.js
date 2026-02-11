/**
 * Blog Loader - Fetches and renders blog posts from data/blogs.json
 */

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('blogs-container');
    if (!container) return;

    try {
        const response = await fetch('./data/blogs.json');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        
        const blogs = await response.json();
        
        // Clear loader
        container.innerHTML = '';

        if (blogs.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #9ca3af;">No blog posts found.</p>';
            return;
        }

        blogs.forEach(blog => {
            const article = document.createElement('article');
            article.id = blog.id;
            article.className = 'blog-card-large reveal-text';
            
            article.innerHTML = `
                <a href="${blog.link}">
                    <div class="blog-image">
                        <img src="${blog.image}" alt="${blog.title}" loading="lazy">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="far fa-calendar"></i> ${blog.date}</span>
                            <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                        <span class="read-more">Read Full Article <i class="fas fa-arrow-right" style="margin-left: 0.5rem; font-size: 0.8rem;"></i></span>
                    </div>
                </a>
            `;
            container.appendChild(article);
        });

        // Add "Coming Soon" card
        const comingSoon = document.createElement('article');
        comingSoon.className = 'blog-card-large coming-soon-card reveal-text';
        comingSoon.style.cssText = 'min-height: 450px; display: flex; align-items: center; justify-content: center; background: #0a0a0a; border: 1px dashed rgba(255,255,255,0.1);';
        comingSoon.innerHTML = `
            <div class="blog-meta" style="margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem; color: #4a9eff; font-weight: 600;">
                <i class="far fa-calendar"></i> Coming Soon
            </div>
        `;
        container.appendChild(comingSoon);

        // Re-trigger scroll reveal for new elements
        if (typeof window.triggerReveal === 'function') {
            window.triggerReveal();
        } else {
            // Fallback: manually add active class if observer not available
            document.querySelectorAll('.reveal-text').forEach(el => el.classList.add('active'));
        }

    } catch (error) {
        console.error('Error loading blogs:', error);
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #ef4444;">
                <p><i class="fas fa-exclamation-circle"></i> Failed to load articles.</p>
                <button onclick="location.reload()" style="margin-top: 1rem; background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Retry</button>
            </div>
        `;
    }
});
