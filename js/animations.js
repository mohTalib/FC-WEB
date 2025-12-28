/**
 * Fourth Corner - Unified Animation & Scroll Logic
 */
document.addEventListener('DOMContentLoaded', function() {
    
    const observerOptions = {
        root: null,
        threshold: 0.15 // Start animation when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // DESKTOP: Trigger the container
                if (window.innerWidth > 991) {
                    if (entry.target.classList.contains('reveal-trigger')) {
                        entry.target.classList.add('visible');
                        scrollObserver.unobserve(entry.target); // Stop watching after success
                    }
                } 
                // MOBILE: Trigger each item individually
                else {
                    if (entry.target.classList.contains('scroll-reveal')) {
                        entry.target.classList.add('mobile-visible');
                        scrollObserver.unobserve(entry.target); // Stop watching after success
                    }
                }
            }
        });
    }, observerOptions);

    // Watch all trigger sections
    document.querySelectorAll('.reveal-trigger').forEach(section => {
        scrollObserver.observe(section);
    });

    // Watch all individual items (specifically for mobile scroll)
    document.querySelectorAll('.scroll-reveal').forEach(item => {
        scrollObserver.observe(item);
    });

    // FORCE START: Handle the Banner/Hero if it's already on screen
    setTimeout(() => {
        const firstSection = document.querySelector('.reveal-trigger');
        if (firstSection) {
            const rect = firstSection.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                firstSection.classList.add('visible');
                // Trigger children for the banner
                firstSection.querySelectorAll('.scroll-reveal').forEach(el => {
                    el.classList.add('mobile-visible');
                });
            }
        }
    }, 150);
});