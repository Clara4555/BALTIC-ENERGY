// General site JavaScript (shared utilities)
// Contains a lightweight parallax initializer used by multiple pages.
(function () {
    'use strict';

    function initParallax() {
        // look for common hero selectors used across pages
        const hero = document.querySelector('.about-hero, .hero, .contact-hero, .products-hero, .energy-hero, .page-hero');

        if (!hero) return;

        // Use passive listeners where supported to improve scroll performance
        const onScroll = function () {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop || 0;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        };

        // Initial position
        onScroll();

        // Add listener (passive if possible)
        try {
            window.addEventListener('scroll', onScroll, { passive: true });
        } catch (e) {
            // older browsers
            window.addEventListener('scroll', onScroll);
        }
    }

    // Auto-init on load so pages don't need to call this explicitly
    window.addEventListener('load', initParallax);

    // Expose for manual calls if needed elsewhere
    window.initParallax = initParallax;
})();
