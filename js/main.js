document.addEventListener('DOMContentLoaded', function() {
  initNavbarScroll();
  initActiveNav();
  initMobileMenu();
  initScrollAnimations();
  renderPaperCards();
  renderBlogCards();
});

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const inPapers = currentPage.endsWith('.html') && window.location.pathname.includes('/papers/');
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    const isIndex = (currentPage === 'index.html' || currentPage === '') && (href === 'index.html' || href === './index.html');
    const isPapers = (currentPage === 'papers.html' || inPapers) && (href === 'papers.html' || href === '../papers.html');
    const isBlog = currentPage === 'blog.html' && (href === 'blog.html' || href === '../blog.html');
    const isAbout = currentPage === 'about.html' && (href === 'about.html' || href === '../about.html');
    if (isIndex || isPapers || isBlog || isAbout) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.paper-card, .blog-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

function renderPaperCards() {
  const grid = document.getElementById('papers-grid');
  if (!grid || typeof papers === 'undefined') return;
  const papersToShow = grid.dataset.limit ? papers.slice(0, parseInt(grid.dataset.limit)) : papers;
  const inSubdir = window.location.pathname.includes('/papers/');
  const prefix = inSubdir ? '../papers/' : 'papers/';

  grid.innerHTML = papersToShow.map(paper => `
    <article class="paper-card" onclick="window.location.href='${prefix}${paper.htmlFile}'">
      <div class="paper-card-image">
        <img src="${paper.thumbnail}" alt="${paper.title}" loading="lazy">
        <span class="paper-card-venue">${paper.venue} ${paper.year}</span>
      </div>
      <div class="paper-card-content">
        <h3 class="paper-card-title">${paper.title}</h3>
        <p class="paper-card-authors">${paper.authors.slice(0, 3).join(', ')}${paper.authors.length > 3 ? ' et al.' : ''}</p>
        <div class="paper-card-tags">
          ${paper.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function renderBlogCards() {
  const grid = document.getElementById('blog-grid');
  if (!grid || typeof blogPosts === 'undefined') return;
  const postsToShow = grid.dataset.limit ? blogPosts.slice(0, parseInt(grid.dataset.limit)) : blogPosts;

  grid.innerHTML = postsToShow.map(post => `
    <article class="blog-card">
      <div class="blog-card-image">
        <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
      </div>
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span class="blog-card-category">${post.category}</span>
          <span>${post.date}</span>
          <span>${post.readTime} 分钟阅读</span>
        </div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="paper-card-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}
