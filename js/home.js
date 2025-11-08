// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeNavigation();
    initializeHeroSlider();
    initializeBackToTop();
    initializeScrollAnimations();
    initializeStatsCounter();
    initializeGoogleTranslate();
    initializeTranslateToggle();
});

// Navigation Initialization (merged & fixed)
function initializeNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');

    let lastScrollY = window.scrollY;
    let ticking = false;

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown toggles (arrow-only) - merged functionality
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    dropdownArrows.forEach(arrow => {
        arrow.setAttribute('tabindex', '0');
        arrow.setAttribute('aria-expanded', 'false');

        const clickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parentItem = this.closest('.has-dropdown');
            if (!parentItem) return;

            const isActive = parentItem.classList.toggle('active');
            this.setAttribute('aria-expanded', String(isActive));

            // Close other dropdowns
            navItems.forEach(otherItem => {
                if (otherItem !== parentItem) {
                    otherItem.classList.remove('active');
                    const otherArrow = otherItem.querySelector('.dropdown-arrow');
                    if (otherArrow) otherArrow.setAttribute('aria-expanded', 'false');
                }
            });
        };

        arrow.addEventListener('click', clickHandler);
        arrow.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                clickHandler.call(this, e);
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu) return;
        
        // Close dropdowns
        if (!e.target.closest('.nav-item.has-dropdown')) {
            navItems.forEach(item => {
                item.classList.remove('active');
                const arrow = item.querySelector('.dropdown-arrow');
                if (arrow) arrow.setAttribute('aria-expanded', 'false');
            });
        }
        
        // Close mobile menu when clicking outside
        if (window.innerWidth <= 768 && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.nav-toggle')) {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });

    // Navbar scroll behavior
    function updateNavbar() {
        const scrolled = window.scrollY > 100;

        if (scrolled) {
            header.classList.add('scrolled');

            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            navbar.classList.remove('hidden');
        }

        lastScrollY = window.scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}

// Loader Initialization
function initializeLoader() {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');
    
    if (loader && progress) {
        let progressValue = 0;
        const progressInterval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(progressInterval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 300);
            }
            progress.style.width = `${progressValue}%`;
        }, 100);
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Hero Slider Initialization
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    function startInterval() { slideInterval = setInterval(nextSlide, 5000); }
    function resetInterval() { clearInterval(slideInterval); startInterval(); }

    if (slides.length > 1) {
        startInterval();
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
            hero.addEventListener('mouseleave', startInterval);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(element => observer.observe(element));
}

// Stats Counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                let raw = statNumber.getAttribute('data-count') || statNumber.textContent || '0';
                raw = String(raw).trim();

                let suffix = '';
                if (raw.endsWith('%')) { suffix = '%'; raw = raw.slice(0, -1).trim(); }

                const cleaned = raw.replace(/[^0-9.,+-]/g, '').replace(/\+/g, '');
                const numeric = parseFloat(cleaned.replace(/,/g, ''));
                const target = Number.isFinite(numeric) ? numeric : 0;
                const decimals = cleaned.includes('.') ? (cleaned.split('.')[1] || '').length : 0;

                const duration = 2000;
                const fps = 60;
                const totalFrames = Math.max(1, Math.round(duration / (1000 / fps)));
                let frame = 0;

                function formatValue(val) {
                    if (decimals > 0) return Number(val).toFixed(decimals) + suffix;
                    return Math.floor(val).toLocaleString() + suffix;
                }

                const start = 0;
                const diff = target - start;

                const timer = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    const eased = 1 - Math.pow(1 - progress, 3);
                    let current = start + diff * eased;

                    if (frame >= totalFrames) {
                        current = target;
                        clearInterval(timer);
                    }

                    statNumber.textContent = formatValue(current);
                }, 1000 / fps);

                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// Google Translate
function initializeGoogleTranslate() { console.log('Google Translate initialized'); }

// Translator toggle
function initializeTranslateToggle() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    const toggle = headerControls.querySelector('.translate-toggle');
    const widget = document.getElementById('google_translate_element');
    if (!toggle || !widget) return;

    widget.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = headerControls.classList.toggle('open');
        widget.setAttribute('aria-hidden', String(!isOpen));
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function(e) {
        if (!headerControls.contains(e.target) && headerControls.classList.contains('open')) {
            headerControls.classList.remove('open');
            widget.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && headerControls.classList.contains('open')) {
            headerControls.classList.remove('open');
            widget.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Handle images loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() { this.classList.add('loaded'); });
    img.addEventListener('error', function() { this.classList.add('error'); console.warn('Image failed to load:', this.src); });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Export functions
window.KBEC = {
    initializeLoader,
    initializeNavigation,
    initializeHeroSlider,
    initializeBackToTop,
    initializeScrollAnimations,
    initializeStatsCounter,
    initializeGoogleTranslate
};