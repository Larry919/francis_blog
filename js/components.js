const BASE_PATH = (() => {
  const path = window.location.pathname;
  if (path.includes('/papers/')) return '../';
  return '';
})();

function getNavLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const inPapers = currentPage.endsWith('.html') && window.location.pathname.includes('/papers/');
  
  const links = [
    { href: inPapers ? '../index.html' : 'index.html', label: '首页', key: 'index' },
    { href: inPapers ? '../papers.html' : 'papers.html', label: '论文解读', key: 'papers' },
    { href: inPapers ? '../blog.html' : 'blog.html', label: '博客', key: 'blog' },
    { href: inPapers ? '../about.html' : 'about.html', label: '关于我', key: 'about' }
  ];
  
  return links.map(l => `
    <li><a href="${l.href}" class="${isActive(l.key, currentPage) ? 'active' : ''}">${l.label}</a></li>
  `).join('');
}

function isActive(key, currentPage) {
  if (key === 'papers' && (currentPage === 'papers.html' || window.location.pathname.includes('/papers/'))) return true;
  if (key === 'index' && (currentPage === 'index.html' || currentPage === '')) return true;
  if (key === 'blog' && currentPage === 'blog.html') return true;
  if (key === 'about' && currentPage === 'about.html') return true;
  return false;
}

function injectNavbar() {
  const existingNav = document.querySelector('.navbar');
  if (existingNav) return;
  
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="container">
      <a href="${BASE_PATH}index.html" class="nav-logo">Francis</a>
      <ul class="nav-links">
        ${getNavLinks()}
      </ul>
      <button class="nav-mobile-toggle" aria-label="菜单">
        <i data-lucide="menu"></i>
      </button>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}

function injectFooter() {
  const existingFooter = document.querySelector('.footer');
  if (existingFooter) return;
  
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>Francis's Blog</h3>
          <p>探索 AI 前沿，深度解读论文，分享技术思考。<br>致力于让学术知识更加易于理解。</p>
          <div class="footer-social">
            <a href="https://github.com/Larry919" class="social-link" target="_blank" aria-label="GitHub">
              <i data-lucide="github"></i>
            </a>
            <a href="mailto:francis@example.com" class="social-link" aria-label="Email">
              <i data-lucide="mail"></i>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <i data-lucide="twitter"></i>
            </a>
          </div>
        </div>
        <div>
          <h4>快速导航</h4>
          <ul class="footer-links">
            <li><a href="${BASE_PATH}index.html">首页</a></li>
            <li><a href="${BASE_PATH}papers.html">论文解读</a></li>
            <li><a href="${BASE_PATH}blog.html">博客</a></li>
            <li><a href="${BASE_PATH}about.html">关于我</a></li>
          </ul>
        </div>
        <div>
          <h4>研究方向</h4>
          <ul class="footer-links">
            <li><a href="${BASE_PATH}papers.html">自然语言处理</a></li>
            <li><a href="${BASE_PATH}papers.html">计算机视觉</a></li>
            <li><a href="${BASE_PATH}papers.html">生成模型</a></li>
            <li><a href="${BASE_PATH}papers.html">Transformer</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Francis. Built with passion for knowledge sharing.</p>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

function injectReadingProgress() {
  if (document.querySelector('.reading-progress')) return;
  if (!document.querySelector('.paper-detail-page')) return;
  
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.insertBefore(bar, document.body.firstChild);
}

function initCommonInteractions() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
  
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${(window.scrollY / h) * 100}%`;
    });
    
    const sections = document.querySelectorAll('.paper-section');
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (sections.length && tocLinks.length) {
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
          if (window.scrollY >= s.offsetTop - 150) current = s.id;
        });
        tocLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
      });
    }
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.paper-card, .blog-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectReadingProgress();
  injectFooter();
  
  if (window.lucide) {
    lucide.createIcons();
  }
  
  setTimeout(initCommonInteractions, 50);
});
