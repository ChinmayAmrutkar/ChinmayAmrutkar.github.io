// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuButton ? menuButton.querySelector('i') : null; // Get the icon element

    if (menuButton && mobileMenu && menuIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between hamburger (fa-bars) and close (fa-times)
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        // Close mobile menu when a link inside it is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Hide the menu
                // Ensure icon is reset to hamburger
                if (menuIcon.classList.contains('fa-times')) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
    }


    // --- Smooth Scrolling for Navigation Links ---
    const scrollLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.hash;
            const targetElement = document.querySelector(hash);

            if (targetElement) {
                e.preventDefault(); // Prevent default jump

                const header = document.querySelector('header');
                // Use a fallback height if header isn't found or rendered yet
                const headerOffset = header ? header.offsetHeight : 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Calculate final scroll position considering header offset
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Enable smooth scrolling
                });
            }
        });
    });

    // --- Update Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header .hidden.md\\:flex a.nav-link'); // Target desktop nav links

    function changeNavOnScroll() {
        let currentSectionId = '';
        const headerOffset = document.querySelector('header')?.offsetHeight || 60;
        // Add a small buffer to trigger active state slightly earlier
        const scrollBuffer = 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - scrollBuffer;
            // Check if the current scroll position is past the top of the section
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Reset all links
            // Add 'active' class if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // --- Scroll Animation Trigger ---
    // Select all elements marked for animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Get the animation type from the data attribute
                const animationType = entry.target.dataset.animation || 'fade-in-up'; // Default to fade-in-up
                // Add the corresponding Tailwind animation class
                entry.target.classList.add(`animate-${animationType}`);
                // Optional: Stop observing the element once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
        // rootMargin: '0px 0px -50px 0px' // Optional: Adjust trigger point vertically
    });

    // Observe each element marked for animation
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Footer: Update Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Initial Calls on Load ---
    // Run scroll-based functions once on load to set initial states
    changeNavOnScroll();

}); // End DOMContentLoaded
