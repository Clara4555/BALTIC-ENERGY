// Sustainability Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and functionality
    initSustainabilityPage();
});

function initSustainabilityPage() {
    // Initialize loader (only if it exists)
    initLoader();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize Google Translate
    initGoogleTranslate();
    
    // Initialize monitoring modals
    initMonitoringModals();

    // Initialize environment highlights modals
    initEnvironmentHighlightsModals();
}

// Loader functionality
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Only initialize loader if it exists
    if (!loader) return;
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Remove loader from DOM after fade out
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
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
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
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
    if (!header) return;
    
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
    
    if (!backToTopButton) return;
    
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

// Monitoring Modals functionality
function initMonitoringModals() {
    const modalButtons = document.querySelectorAll('.monitoring-details-btn');
    const modals = document.querySelectorAll('.monitoring-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Open modal when button is clicked
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.monitoring-modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
    
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        
        // Remove active class after transition and hide modal
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    // Ensure modals are hidden on load
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Environment Highlights Modals functionality
function initEnvironmentHighlightsModals() {
    const highlightButtons = document.querySelectorAll('.highlight-details-btn');
    const modals = document.querySelectorAll('.monitoring-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Open modal when button is clicked
    highlightButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.monitoring-modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
    
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        
        // Remove active class after transition and hide modal
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    // Ensure modals are hidden on load
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});