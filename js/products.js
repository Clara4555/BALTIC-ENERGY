// Products & Services Page JavaScript

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
                    entry.target.classList.contains('stat-value') ||
                    entry.target.classList.contains('project-number')) {
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
    const cards = document.querySelectorAll('.service-card, .benefit-card, .specialized-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('service-card') || this.classList.contains('benefit-card')) {
                this.style.transform = 'translateY(-10px)';
            } else {
                this.style.transform = 'translateY(-5px)';
            }
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Image hover effects
    const images = document.querySelectorAll('.production-image, .refining-image, .project-image');
    images.forEach(image => {
        const img = image.querySelector('img');
        
        image.addEventListener('mouseenter', function() {
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            if (img) {
                img.style.transform = '';
            }
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
    
    // Service card progress bar animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('::before');
            if (progressBar) {
                progressBar.style.left = '0';
            }
        });
    });
}

// Number animation for statistics
function animateNumbers(element) {
    // Check if this element has already been animated
    if (element.hasAttribute('data-animated')) return;
    
    element.setAttribute('data-animated', 'true');
    
    // Handle different number formats
    let target;
    const text = element.textContent.trim();
    
    if (text.includes('M')) {
        // Handle million numbers (e.g., "87.4M")
        target = parseFloat(text.replace('M', '')) * 1000000;
    } else if (text.includes('%')) {
        // Handle percentage numbers (e.g., "14.9%")
        target = parseFloat(text.replace('%', ''));
    } else if (text.includes('B')) {
        // Handle billion numbers (e.g., "$45B")
        target = parseFloat(text.replace('$', '').replace('B', '')) * 1000000000;
    } else if (text.includes('+')) {
        // Handle numbers with plus (e.g., "35,000+")
        target = parseInt(text.replace(',', '').replace('+', ''));
    } else {
        // Regular numbers
        target = parseInt(text.replace(',', ''));
    }
    
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            clearInterval(timer);
            current = target;
            element.textContent = originalText; // Restore original formatting
        } else {
            // Format number based on type
            if (originalText.includes('M')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('B')) {
                element.textContent = '$' + (current / 1000000000).toFixed(0) + 'B';
            } else if (originalText.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }
    }, 16);
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