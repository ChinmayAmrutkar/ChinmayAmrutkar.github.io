// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate On Scroll) ---
    AOS.init({
        duration: 600, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

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
            // Check if the link is internal before trying to scroll
            if (hash.startsWith('#') && hash.length > 1) {
                 const targetElement = document.querySelector(hash);
                 if (targetElement) {
                    e.preventDefault();
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                         mobileMenu.classList.add('hidden');
                         if (menuIcon.classList.contains('fa-times')) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }
                }
            }
            // Allow default behavior for external links or resume download
        });
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header .hidden.md\\:flex a.nav-link'); // Target only desktop links
    const headerOffsetForNav = (document.querySelector('header')?.offsetHeight || 70) + 100; // Increased buffer

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            // Ensure section exists and has an offsetTop property
            if (section && typeof section.offsetTop === 'number') {
                const sectionTop = section.offsetTop - headerOffsetForNav;
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });

         // Handle edge case: If scrolled to the very top, no section might be active
        if (window.pageYOffset < sections[0]?.offsetTop - headerOffsetForNav) {
             currentSectionId = ''; // Or set to 'hero' if you have a 'Home' link
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Initial Calls & Listeners ---
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Initial check on load

}); // End DOMContentLoaded
