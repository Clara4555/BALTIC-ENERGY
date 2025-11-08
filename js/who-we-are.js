// Who We Are Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize interactive elements
    initInteractiveElements();
});

// Animation initialization
function initAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stats element, animate the numbers
                if (entry.target.classList.contains('stat-number') || 
                    entry.target.classList.contains('safety-stat') ||
                    entry.target.classList.contains('production-stat')) {
                    animateNumbers(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        // Back to top button
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .value-card, .product-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Image hover effects
    const images = document.querySelectorAll('.intro-image, .facility-image, .project-image');
    images.forEach(image => {
        const img = image.querySelector('img');
        
        image.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            img.style.transform = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(4px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Number animation for statistics
function animateNumbers(element) {
    // Check if this element has already been animated
    if (element.hasAttribute('data-animated')) return;
    
    element.setAttribute('data-animated', 'true');
    
    // If it's a stat number with data-count attribute
    if (element.hasAttribute('data-count')) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
}

// Google Translate functionality
document.addEventListener('DOMContentLoaded', function() {
    const translateToggle = document.querySelector('.translate-toggle');
    const headerControls = document.querySelector('.header-controls');
    
    if (translateToggle) {
        translateToggle.addEventListener('click', function() {
            headerControls.classList.toggle('open');
            const isExpanded = headerControls.classList.contains('open');
            this.setAttribute('aria-expanded', isExpanded);
            document.getElementById('google_translate_element').setAttribute('aria-hidden', !isExpanded);
        });
        
        // Close translator when clicking outside
        document.addEventListener('click', function(event) {
            if (!headerControls.contains(event.target) && headerControls.classList.contains('open')) {
                headerControls.classList.remove('open');
                translateToggle.setAttribute('aria-expanded', 'false');
                document.getElementById('google_translate_element').setAttribute('aria-hidden', 'true');
            }
        });
    }
});

// Loader functionality
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});