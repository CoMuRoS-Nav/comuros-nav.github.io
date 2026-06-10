document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

document.querySelectorAll('.content-section, .feature-card, .video-item, .team-member, .stat-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.clientHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

document.querySelectorAll('.code-block').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.className = 'copy-button';
    copyButton.style.cssText = 'position:absolute;top:12px;right:12px;background:#3182ce;color:white;border:none;padding:0.5rem 1rem;border-radius:6px;cursor:pointer;font-size:0.8rem;font-weight:500;transition:all 0.3s ease;opacity:0.9;';
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
    copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code') || codeBlock;
        navigator.clipboard.writeText(code.textContent || code.innerText).then(function() {
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#38a169';
            setTimeout(function() { copyButton.textContent = 'Copy'; copyButton.style.background = '#3182ce'; }, 2000);
        });
    });
});

function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = 'display:none;background:none;border:none;font-size:1.5rem;color:#3182ce;cursor:pointer;padding:0.5rem;';
    navContainer.appendChild(mobileMenuBtn);
    const style = document.createElement('style');
    style.textContent = '@media (max-width: 768px) { .nav-links.mobile-open { display: flex !important; position: absolute; top: 100%; left: 0; right: 0; background: rgba(255,255,255,0.98); backdrop-filter: blur(10px); flex-direction: column; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; gap: 1rem; } }';
    document.head.appendChild(style);
    mobileMenuBtn.addEventListener('click', function() { navLinks.classList.toggle('mobile-open'); });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() { navLinks.classList.remove('mobile-open'); });
    });
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) navLinks.classList.remove('mobile-open');
    });
}
createMobileMenu();

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollBtn);
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) scrollBtn.classList.add('visible');
        else scrollBtn.classList.remove('visible');
    });
    scrollBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}
createScrollToTopButton();

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

console.log('CoMuRoS-Nav website loaded successfully!');

function copyEmail(el) {
    const email = el.querySelector('.email-text').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const feedback = el.parentElement.querySelector('.copy-feedback');
        const btn = el.querySelector('.copy-icon-btn');
        btn.textContent = '✓ Copied';
        feedback.classList.add('show');
        setTimeout(() => { btn.textContent = '⎘ Copy'; feedback.classList.remove('show'); }, 2000);
    });
}

function copyAuthorEmail(el) {
    const email = el.querySelector('span').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const btn = el.querySelector('.email-copy-mini');
        btn.textContent = '✓ Done';
        btn.style.background = '#059669';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.background = ''; }, 2000);
    });
}

function showComingSoon(btn) {
  // Avoid duplicate toasts
  if (document.getElementById('coming-soon-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'coming-soon-toast';
  toast.textContent = 'Coming Soon!';
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#1d4ed8',
    color: 'white',
    padding: '0.75rem 1.75rem',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}