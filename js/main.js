document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  initReadingProgress();
  renderPaperCards();
  renderBlogCards();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.paper-card, .blog-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
  
  const sections = document.querySelectorAll('.paper-section');
  const tocLinks = document.querySelectorAll('.toc-list a');
  
  if (sections.length && tocLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

function renderPaperCards() {
  const grid = document.getElementById('papers-grid');
  if (!grid || typeof papers === 'undefined') return;
  
  const papersToShow = grid.dataset.limit ? papers.slice(0, parseInt(grid.dataset.limit)) : papers;
  
  grid.innerHTML = papersToShow.map(paper => `
    <article class="paper-card" onclick="window.location.href='paper-detail.html?id=${paper.id}'">
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

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderPaperDetail() {
  const paperId = getUrlParam('id');
  if (!paperId || typeof papers === 'undefined') return;
  
  const paper = papers.find(p => p.id === paperId);
  if (!paper) {
    document.getElementById('paper-content').innerHTML = '<p>论文未找到</p>';
    return;
  }
  
  document.title = `${paper.title} - ${siteConfig.author}`;
  
  const headerHtml = `
    <div class="paper-detail-header">
      <span class="paper-detail-venue-badge">${paper.venue} ${paper.year}</span>
      <h1 class="paper-detail-title">${paper.title}</h1>
      <p class="paper-detail-authors">${paper.authors.join(', ')}</p>
      <div class="paper-card-tags">
        ${paper.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="paper-detail-links" style="margin-top: 24px;">
        <a href="${paper.pdfLink}" target="_blank" class="btn btn-primary">
          <i data-lucide="file-text"></i> 查看论文
        </a>
        ${paper.codeLink ? `
          <a href="${paper.codeLink}" target="_blank" class="btn btn-secondary">
            <i data-lucide="github"></i> 代码
          </a>
        ` : ''}
      </div>
    </div>
  `;
  
  const tocHtml = `
    <div class="paper-toc">
      <h4>目录导航</h4>
      <ul class="toc-list">
        <li><a href="#abstract">摘要</a></li>
        <li><a href="#contributions">核心贡献</a></li>
        ${paper.keyFigures.map((fig, i) => `<li><a href="#figure-${i + 1}">图 ${i + 1}</a></li>`).join('')}
        ${paper.methods.map((m, i) => `<li><a href="#method-${i + 1}">${m.section}</a></li>`).join('')}
      </ul>
    </div>
  `;
  
  const contentHtml = `
    <section id="abstract" class="paper-section">
      <h2><span class="section-number">01</span> 摘要</h2>
      <div class="abstract-box">
        <p>${paper.abstract}</p>
      </div>
    </section>
    
    <section id="contributions" class="paper-section">
      <h2><span class="section-number">02</span> 核心贡献</h2>
      <ul class="contributions-list">
        ${paper.contributions.map((c, i) => `
          <li>
            <span class="contribution-number">${i + 1}</span>
            <span>${c}</span>
          </li>
        `).join('')}
      </ul>
    </section>
    
    <section class="paper-section">
      <h2><span class="section-number">03</span> 关键图表解读</h2>
      ${paper.keyFigures.map((fig, i) => `
        <div id="figure-${i + 1}" class="figure-card">
          <div class="figure-card-image">
            <img src="${fig.imagePath}" alt="${fig.caption}" loading="lazy">
          </div>
          <div class="figure-card-caption">${fig.caption}</div>
          <div class="figure-card-explanation">
            <h4><i data-lucide="lightbulb"></i> 解读</h4>
            <p>${fig.explanation}</p>
          </div>
        </div>
      `).join('')}
    </section>
    
    <section class="paper-section">
      <h2><span class="section-number">04</span> 方法详解</h2>
      ${paper.methods.map((m, i) => `
        <div id="method-${i + 1}" class="method-card">
          <h3>${m.section}</h3>
          <p>${m.content}</p>
        </div>
      `).join('')}
    </section>
  `;
  
  const headerEl = document.getElementById('paper-header');
  const tocEl = document.getElementById('paper-toc');
  const contentEl = document.getElementById('paper-content');
  
  if (headerEl) headerEl.innerHTML = headerHtml;
  if (tocEl) tocEl.innerHTML = tocHtml;
  if (contentEl) contentEl.innerHTML = contentHtml;
  
  if (window.lucide) {
    lucide.createIcons();
  }
}
