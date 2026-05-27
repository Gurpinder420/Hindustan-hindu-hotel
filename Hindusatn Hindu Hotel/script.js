/* =============================================
   HINDUSTAN HINDU HOTEL - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar Scroll ---- */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- Mobile Menu ---- */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active Nav Link ---- */
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Hero Background Load ---- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* ---- Hero Particles ---- */
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
      heroParticles.appendChild(p);
    }
  }

  /* ---- Counter Animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        const target = parseInt(entry.target.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.round(current).toLocaleString();
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ---- AOS-like Scroll Animations ---- */
  const animatedElements = document.querySelectorAll('[data-anim]');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('anim-in');
        }, parseInt(delay));
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    const anim = el.dataset.anim;
    if (anim === 'up')    el.style.transform = 'translateY(40px)';
    if (anim === 'left')  el.style.transform = 'translateX(-40px)';
    if (anim === 'right') el.style.transform = 'translateX(40px)';
    if (anim === 'scale') el.style.transform = 'scale(0.85)';
    animObserver.observe(el);
  });

  // Inject reset class
  const style = document.createElement('style');
  style.textContent = `.anim-in { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);

  /* ---- Menu Tabs ---- */
/* ---- Menu Tabs ---- */
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  if (menuTabBtns.length) {
    menuTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        
        // 1. Reset active classes on all tab buttons
        menuTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 2. Handle item visibility based on the target selection
        if (target === 'all') {
          // Show ALL categories at once
          menuCategories.forEach(cat => {
            cat.classList.add('active');
            // Force re-trigger of scroll animation tracking for the freshly exposed cards
            cat.querySelectorAll('[data-anim]').forEach(el => {
              el.classList.add('anim-in'); 
            });
          });
        } else {
          // Hide everything, then show only the specific targeted category
          menuCategories.forEach(c => c.classList.remove('active'));
          const targetCat = document.querySelector('#' + target);
          if (targetCat) {
            targetCat.classList.add('active');
          }
        }
      });
    });
  }

  /* ---- Gallery Filter ---- */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        masonryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            item.style.animation = 'scaleIn 0.4s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryImgs = document.querySelectorAll('.masonry-item img, .gp-item img');

  if (lightbox) {
    galleryImgs.forEach(img => {
      img.parentElement.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(fi => fi.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Horizontal Drag-to-Scroll (Category rows) ---- */
  const scrollContainers = document.querySelectorAll('.category-scroll');
  scrollContainers.forEach(container => {
    let isDown = false, startX, scrollLeft;

    container.addEventListener('mousedown', e => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => { isDown = false; container.style.cursor = 'grab'; });
    container.addEventListener('mouseup',    () => { isDown = false; container.style.cursor = 'grab'; });
    container.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX) * 2;
    });
    container.style.cursor = 'grab';
  });

  /* ---- Card hover z-index fix ---- */
  document.querySelectorAll('.dish-card, .menu-item-card, .signature-card').forEach(card => {
    card.addEventListener('mouseenter', function () { this.style.zIndex = '10'; });
    card.addEventListener('mouseleave', function () { this.style.zIndex = ''; });
  });

  /* ---- Contact Form (success feedback) ---- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22a722, #28c928)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  /* ---- Scroll-to-top button ---- */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.opacity      = window.scrollY > 500 ? '1' : '0';
      scrollTopBtn.style.pointerEvents = window.scrollY > 500 ? 'all' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Typewriter effect (.hero-typewriter) ---- */
  const typeEl = document.querySelector('.hero-typewriter');
  if (typeEl) {
    const words = ['Authentic Flavors', 'Rich Heritage', 'Royal Experience', 'Timeless Recipes'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      typeEl.textContent = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let delay = isDeleting ? 60 : 100;
      if (!isDeleting && charIndex === currentWord.length) {
        delay = 2200; isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    type();
  }

  /* ---- Lazy-load images (data-src) ---- */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          imgObserver.unobserve(e.target);
        }
      });
    });
    lazyImgs.forEach(img => imgObserver.observe(img));
  } else {
    lazyImgs.forEach(img => { img.src = img.dataset.src; });
  }

  /* ---- Navbar logo slow-spin on scroll ---- */
  const navLogoIcon = document.querySelector('.nav-logo-icon');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (navLogoIcon) {
          const rotation = (window.scrollY / 10) % 360;
          navLogoIcon.style.transform = `rotate(${rotation}deg)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

});