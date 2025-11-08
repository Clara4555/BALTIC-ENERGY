// Refining Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and functionality
    initRefiningPage();
});

function initRefiningPage() {
   
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize progress bars
    initProgressBars();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize Google Translate
    initGoogleTranslate();
}


// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If element has data-count attribute, start counter
                if (entry.target.classList.contains('stat-number') && entry.target.getAttribute('data-count')) {
                    animateCounter(entry.target);
                }
                
                // If element has progress bars, animate them
                if (entry.target.classList.contains('progress-fill')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stat-number, .progress-fill');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function initCounters() {
    // Counters will be triggered by scroll animation
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Progress bar animation
function initProgressBars() {
    // Progress bars will be triggered by scroll animation
}

function animateProgressBar(element) {
    const width = element.getAttribute('data-width');
    element.style.width = width + '%';
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Handle dropdown menus on mobile
        const dropdownItems = document.querySelectorAll('.has-dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            
            // Hide header on scroll down, show on scroll up
            if (window.scrollY > lastScrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('hidden');
        }
        
        lastScrollY = window.scrollY;
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Google Translate functionality
function initGoogleTranslate() {
    const translateToggle = document.querySelector('.translate-toggle');
    const googleWidget = document.getElementById('google_translate_element');
    const headerControls = document.querySelector('.header-controls');
    
    if (translateToggle && googleWidget) {
        translateToggle.addEventListener('click', () => {
            const isExpanded = translateToggle.getAttribute('aria-expanded') === 'true';
            
            translateToggle.setAttribute('aria-expanded', !isExpanded);
            googleWidget.setAttribute('aria-hidden', isExpanded);
            headerControls.classList.toggle('open');
            
            // Trigger Google Translate widget display
            if (!isExpanded) {
                // Small delay to ensure the widget container is visible
                setTimeout(() => {
                    const googleCombo = googleWidget.querySelector('.goog-te-combo');
                    if (googleCombo) {
                        googleCombo.focus();
                    }
                }, 100);
            }
        });
        
        // Close translator when clicking outside
        document.addEventListener('click', (e) => {
            if (!headerControls.contains(e.target) && headerControls.classList.contains('open')) {
                translateToggle.setAttribute('aria-expanded', 'false');
                googleWidget.setAttribute('aria-hidden', 'true');
                headerControls.classList.remove('open');
            }
        });
    }
    
    // Style Google Translate dropdown
    const styleGoogleTranslate = () => {
        // Wait for Google Translate to load
        const checkForGoogleTranslate = setInterval(() => {
            const googleFrame = document.querySelector('.goog-te-banner-frame');
            if (googleFrame) {
                clearInterval(checkForGoogleTranslate);
                
                // Hide the top banner
                googleFrame.style.display = 'none';
                
                // Style the dropdown
                const googleCombo = document.querySelector('.goog-te-combo');
                if (googleCombo) {
                    googleCombo.style.cssText = `
                        width: 100%;
                        padding: 8px 12px;
                        border-radius: var(--radius-md);
                        border: 1px solid var(--border);
                        background: white;
                        color: var(--text-primary);
                        font-family: var(--font-primary);
                    `;
                }
            }
        }, 100);
    };
    
    // Run styling function
    styleGoogleTranslate();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});