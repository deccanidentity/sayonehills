// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 800);
});

// ===== AOS INIT =====
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
      navbar?.classList.remove('transparent');
    } else {
      navbar?.classList.remove('scrolled');
      navbar?.classList.add('transparent');
    }
    // Back to top
    const btn = document.querySelector('.back-to-top');
    if (btn) btn.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ===== HERO SWIPER =====
  new Swiper('.hero-slider', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1200,
    pagination: { el: '.hero-pagination', clickable: true }
  });

  // ===== TESTIMONIAL SWIPER =====
  new Swiper('.testimonial-slider', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    speed: 800,
    spaceBetween: 30,
    centeredSlides: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // ===== GALLERY SWIPER =====
  new Swiper('.gallery-slider', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 700,
    spaceBetween: 15,
    breakpoints: {
      320: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 }
    }
  });

  // ===== ANIMATED COUNTERS =====
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      }
    };
    update();
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ===== DARK/LIGHT MODE =====
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (themeIcon) themeIcon.className = saved === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeIcon) themeIcon.className = next === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  });

  // ===== BACK TO TOP =====
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== SMOOTH SCROLL NAV =====
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse?.classList.contains('show')) {
          bootstrap.Collapse.getInstance(navCollapse)?.hide();
        }
      }
      // Update active
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== ACTIVE NAV ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-link[href^="#"]').forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  });

  // ===== DESTINATION FILTERS =====
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.package-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn .5s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ===== NEWSLETTER POPUP =====
  setTimeout(() => {
    const popup = document.getElementById('newsletterModal');
    if (popup && !sessionStorage.getItem('newsletter_shown')) {
      new bootstrap.Modal(popup).show();
      sessionStorage.setItem('newsletter_shown', '1');
    }
  }, 15000);

  // ===== HOVER TILT EFFECT =====
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ===== RIPPLE EFFECT =====
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - this.offsetLeft - d / 2}px;top:${e.clientY - this.offsetTop - d / 2}px;position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);transform:scale(0);animation:rippleAnim .6s linear`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ===== CUSTOM CURSOR =====

  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  if (cursor && cursorDot) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .clickable, .tilt-card, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // ===== SCROLL PROGRESS =====
  const progress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressWidth = (window.scrollY / totalHeight) * 100;
    if (progress) progress.style.width = progressWidth + '%';
  });

  // ===== QUICK VIEW MODAL =====
  const quickViewModal = document.getElementById('quickViewModal');
  if (quickViewModal) {
    document.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.package-card');
        const img = card.querySelector('img').src;
        const title = card.querySelector('h4').textContent;
        const price = card.querySelector('.package-price').firstChild.textContent;
        const loc = card.querySelector('.bi-geo-alt').nextSibling.textContent;
        const duration = card.querySelector('.bi-clock').nextSibling.textContent;
        const badge = card.querySelector('.package-badge').textContent;

        document.getElementById('qvImg').src = img;
        document.getElementById('qvTitle').textContent = title;
        document.getElementById('qvPrice').textContent = price;
        document.getElementById('qvLoc').textContent = loc;
        document.getElementById('qvDuration').textContent = duration;
        document.getElementById('qvBadge').textContent = badge;
        
        new bootstrap.Modal(quickViewModal).show();
      });
    });
  }

  // ===== LIVE BOOKING TOAST =====
  const names = ['Amit', 'Sarah', 'James', 'Priya', 'Michael', 'Elena', 'Raj', 'Yuki'];
  const locations = ['Mumbai', 'London', 'New York', 'Dubai', 'Sydney', 'Paris', 'Singapore'];
  const packages = ['Maldives Luxury', 'Europe Explorer', 'Bali Honeymoon', 'Dubai Experience', 'Kashmir Adventure'];

  const showToast = () => {
    const toastEl = document.querySelector('#bookingToast .toast');
    if (toastEl) {
      const name = names[Math.floor(Math.random() * names.length)];
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const pkg = packages[Math.floor(Math.random() * packages.length)];
      
      document.getElementById('toastUser').textContent = name;
      document.getElementById('toastLocation').textContent = loc;
      
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
    }
  };

  setTimeout(() => {
    showToast();
    setInterval(showToast, 25000);
  }, 10000);

  // ===== CARD LIGHT TRACKING =====
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--x', `${x}%`);
      card.style.setProperty('--y', `${y}%`);
    });
  });

  // ===== MULTI-STEP BOOKING MODAL =====
  const bookingModal = document.getElementById('bookingModal');
  if (bookingModal) {
    let currentStep = 1;
    const totalSteps = 4;
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const steps = document.querySelectorAll('.booking-step');
    const stepIndicators = document.querySelectorAll('.step-item');

    const updateModal = () => {
      steps.forEach((s, i) => s.style.display = (i + 1 === currentStep) ? 'block' : 'none');
      stepIndicators.forEach((ind, i) => ind.classList.toggle('active', i + 1 <= currentStep));
      
      prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
      if (currentStep === totalSteps) {
        nextBtn.innerHTML = 'Complete Booking <i class="bi bi-check-circle ms-2"></i>';
        nextBtn.classList.replace('btn-primary-custom', 'btn-success');
      } else {
        nextBtn.innerHTML = 'Next Step <i class="bi bi-arrow-right ms-2"></i>';
        nextBtn.classList.replace('btn-success', 'btn-primary-custom');
      }
    };

    nextBtn?.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateModal();
      } else {
        // Handle completion
        nextBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        setTimeout(() => {
          bootstrap.Modal.getInstance(bookingModal)?.hide();
          alert('Booking request sent successfully! We will contact you soon.');
          // Reset
          currentStep = 1;
          updateModal();
        }, 2000);
      }
    });

    prevBtn?.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateModal();
      }
    });
  }

  // ===== CURRENCY SWITCHER =====
  const currencyOptions = document.querySelectorAll('.currency-option');
  const activeCurrencySpan = document.getElementById('activeCurrency');
  
  currencyOptions.forEach(opt => {
    opt.addEventListener('click', function() {
      const currency = this.dataset.currency;
      const symbol = this.dataset.symbol;
      
      currencyOptions.forEach(o => o.classList.remove('active'));
      this.classList.add('active');
      activeCurrencySpan.innerHTML = `${currency} (${symbol})`;
      
      // Update all prices (Simulation)
      const exchangeRates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094 };
      const rate = exchangeRates[currency];
      
      document.querySelectorAll('.package-price, .price, #qvPrice').forEach(priceEl => {
        const originalText = priceEl.getAttribute('data-original-price') || priceEl.textContent;
        if (!priceEl.getAttribute('data-original-price')) {
          priceEl.setAttribute('data-original-price', originalText);
        }
        
        // Extract numeric value
        const num = parseFloat(originalText.replace(/[^\d.]/g, ''));
        if (!isNaN(num)) {
          const converted = (num * rate).toFixed(0);
          const formatted = new Intl.NumberFormat().format(converted);
          
          if (priceEl.id === 'qvPrice') {
            priceEl.innerHTML = `${symbol}${formatted}`;
          } else if (priceEl.querySelector('small')) {
            const small = priceEl.querySelector('small').outerHTML;
            priceEl.innerHTML = `${symbol}${formatted}${small}`;
          } else {
            priceEl.innerHTML = `From ${symbol}${formatted}`;
          }
        }
      });
    });
  });

  // ===== DYNAMIC TYPING EFFECT =====
  const typingTarget = document.querySelector('.hero h1 span');
  if (typingTarget) {
    const phrases = ['Sayonehills Holidays', 'Your Dream Destination', 'Your Trusted Travel Partner'];
    let i = 0;
    let j = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentPhrase = phrases[i];
      if (isDeleting) {
        typingTarget.textContent = currentPhrase.substring(0, j - 1);
        j--;
      } else {
        typingTarget.textContent = currentPhrase.substring(0, j + 1);
        j++;
      }
      
      if (!isDeleting && j === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    };
    // Start typing after loader
    setTimeout(type, 1500);
  }

  // ===== MAGNETIC BUTTONS =====
  document.querySelectorAll('.btn-primary-custom, .btn-book').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ===== INITIALIZE TOOLTIPS =====
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // ===== PARALLAX =====
  window.addEventListener('scroll', () => {
    const parallax = document.querySelectorAll('.floating-element');
    parallax.forEach(el => {
      const speed = 0.05;
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  });
});

// Ripple keyframe injection
const style = document.createElement('style');
style.textContent = '@keyframes rippleAnim{to{transform:scale(4);opacity:0}}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
