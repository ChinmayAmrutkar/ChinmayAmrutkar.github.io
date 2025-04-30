// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuButton ? menuButton.querySelector('i') : null;

    if (menuButton && mobileMenu && menuIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuIcon.classList.contains('fa-times')) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Smooth Scrolling ---
    const scrollLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 70; // Adjust if header height changes
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                // Close mobile menu if open after clicking a link
                if (!mobileMenu.classList.contains('hidden')) {
                     mobileMenu.classList.add('hidden');
                     if (menuIcon.classList.contains('fa-times')) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header .hidden.md\\:flex a.nav-link');
    const headerOffsetForNav = (document.querySelector('header')?.offsetHeight || 70) + 50; // Offset + buffer

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffsetForNav;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // --- Scroll Animation Trigger using Intersection Observer ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger the CSS transition
                entry.target.classList.add('is-visible');

                // Apply delay if specified in data-delay attribute
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% is visible
    });

    // Set initial animation states based on data attributes and observe
    animatedElements.forEach(el => {
        // Check for specific animation start states defined in CSS (e.g., fade-in-up-start)
        if (el.classList.contains('fade-in-up-start')) {
             // Initial state is set by Tailwind/CSS, observer will remove transform
        } else if (el.classList.contains('slide-in-left-start')) {
             // Initial state is set by Tailwind/CSS, observer will remove transform
        }
        // Start observing
        observer.observe(el);
    });


    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Initial Calls ---
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Initial check

}); // End DOMContentLoaded
