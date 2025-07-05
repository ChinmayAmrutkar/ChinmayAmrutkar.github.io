// // script.js

// document.addEventListener('DOMContentLoaded', function() {

//     // --- Initialize AOS (Animate On Scroll) ---
//     // This function finds elements with 'data-aos' attributes and animates them
//     // when they enter the viewport based on the attribute value (e.g., "fade-up").
//     AOS.init({
//         duration: 600,      // Animation duration in milliseconds
//         easing: 'ease-in-out', // Type of easing for the animation
//         once: true,         // Animate elements only once when they scroll into view
//         mirror: false,      // Don't animate elements out when scrolling past them
//         anchorPlacement: 'top-bottom', // Trigger animation when the top of the element hits the bottom of the window
//     });

//     // // --- Initialize Swiper for Project Carousel ---
//     // // This initializes the Swiper library on the element with the class 'swiper-container'.
//     // const swiper = new Swiper('.swiper-container', {
//     //     // Configuration options for the carousel
//     //     loop: false, // Don't loop back to the beginning after the last slide
//     //     slidesPerView: 1, // Show 1 slide at a time on mobile by default
//     //     spaceBetween: 30, // Space between slides in pixels

//     //     // Responsive breakpoints to change settings based on screen width
//     //     breakpoints: {
//     //         // For screens 768px wide or larger (tablets)
//     //         768: {
//     //             slidesPerView: 2, // Show 2 slides
//     //             spaceBetween: 30
//     //         },
//     //         // For screens 1024px wide or larger (desktops)
//     //         1024: {
//     //             slidesPerView: 3, // Show 3 slides
//     //             spaceBetween: 40 // Increase space slightly
//     //         }
//     //     },

//     //     // Enable navigation arrows
//     //     navigation: {
//     //         nextEl: '.swiper-button-next', // CSS selector for the 'next' button
//     //         prevEl: '.swiper-button-prev', // CSS selector for the 'previous' button
//     //     },

//     //     // Improve accessibility
//     //     a11y: {
//     //         prevSlideMessage: 'Previous project', // ARIA label for previous button
//     //         nextSlideMessage: 'Next project',     // ARIA label for next button
//     //     },
//     // });
//     // --- Initialize Swiper for Project Carousel ---
//     // This initializes the Swiper library on the element with the class 'swiper-container'.
//     const swiper = new Swiper('.swiper-container', {
//         // Configuration for the carousel
//         loop: false, // Don't loop infinitely
//         slidesPerView: 1, // Default for mobile: 1 slide visible
//         slidesPerGroup: 1,
//         spaceBetween: 30, // Space between slides

//         // Settings for arranging slides in a grid
//         grid: {
//             rows: 1, // Default for mobile: 1 row
//         },

//         // Responsive breakpoints to change settings based on screen width
//         breakpoints: {
//             // For screens 768px wide or larger (tablets)
//             768: {
//                 slidesPerView: 2,
//                 slidesPerGroup: 2,
//                 spaceBetween: 30,
//                 grid: {
//                     rows: 2, // 2 rows on tablet
//                     fill: 'row',
//                 },
//             },
//             // For screens 1024px wide or larger (desktops)
//             1024: {
//                 slidesPerView: 3,
//                 slidesPerGroup: 3,
//                 spaceBetween: 40,
//                 grid: {
//                     rows: 2, // 2 rows on desktop, creating the 2x3 grid
//                     fill: 'row',
//                 },
//             }
//         },

//         // Enable navigation arrows
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },

//         // Optional: Add pagination dots for better usability
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },

//         // Improve accessibility
//         a11y: {
//             prevSlideMessage: 'Previous project',
//             nextSlideMessage: 'Next project',
//         },
//     });




//     // --- Mobile Menu Toggle ---
//     const menuButton = document.getElementById('mobile-menu-button');
//     const mobileMenu = document.getElementById('mobile-menu');
//     const menuIcon = menuButton ? menuButton.querySelector('i') : null; // Get the icon inside the button

//     // Check if all elements exist before adding listeners
//     if (menuButton && mobileMenu && menuIcon) {
//         // Toggle menu visibility when the button is clicked
//         menuButton.addEventListener('click', () => {
//             mobileMenu.classList.toggle('hidden'); // Add/remove 'hidden' class
//             // Toggle the icon between hamburger (bars) and close (times)
//             menuIcon.classList.toggle('fa-bars');
//             menuIcon.classList.toggle('fa-times');
//         });

//         // Add listeners to each link within the mobile menu
//         const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
//         mobileNavLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 mobileMenu.classList.add('hidden'); // Hide the menu when a link is clicked
//                 // Reset the icon back to hamburger if it was the close icon
//                 if (menuIcon.classList.contains('fa-times')) {
//                     menuIcon.classList.remove('fa-times');
//                     menuIcon.classList.add('fa-bars');
//                 }
//             });
//         });
//     }

//     // --- Smooth Scrolling for Internal Links ---
//     // Select all anchor links pointing to an internal section (#...)
//     const scrollLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
//     scrollLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             const hash = this.hash; // Get the #section part of the href

//             // Make sure it's a valid internal link
//             if (hash.startsWith('#') && hash.length > 1) {
//                  const targetElement = document.querySelector(hash); // Find the target section

//                  // If the target section exists on the page
//                  if (targetElement) {
//                     e.preventDefault(); // Stop the default browser jump

//                     const header = document.querySelector('header');
//                     // Calculate header height (use a fallback if header not found)
//                     const headerOffset = header ? header.offsetHeight : 70;
//                     // Get position of the target element relative to the viewport
//                     const elementPosition = targetElement.getBoundingClientRect().top;
//                     // Calculate the final scroll position, adjusting for the sticky header
//                     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//                     // Perform the smooth scroll
//                     window.scrollTo({ top: offsetPosition, behavior: "smooth" });

//                     // Close mobile menu if it's open after clicking a link
//                     if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
//                          mobileMenu.classList.add('hidden');
//                          if (menuIcon && menuIcon.classList.contains('fa-times')) {
//                             menuIcon.classList.remove('fa-times');
//                             menuIcon.classList.add('fa-bars');
//                         }
//                     }
//                 }
//             }
//             // Let external links or the resume download link behave normally
//         });
//     });

//     // --- Active Nav Link Highlighting on Scroll ---
//     // Select all main sections with an ID and the desktop navigation links
//     const sections = document.querySelectorAll('main section[id]');
//     const navLinks = document.querySelectorAll('header .hidden.md\\:flex a.nav-link');
//     // Calculate offset needed for highlighting considering header height and a buffer
//     const headerOffsetForNav = (document.querySelector('header')?.offsetHeight || 70) + 100;

//     function changeNavOnScroll() {
//         let currentSectionId = '';
//         const scrollPosition = window.pageYOffset; // Current vertical scroll position

//         // Iterate through each section to see which one is currently in view
//         sections.forEach(section => {
//             // Check if section exists and has a valid offsetTop
//             if (section && typeof section.offsetTop === 'number') {
//                 const sectionTop = section.offsetTop - headerOffsetForNav; // Adjusted top position
//                 const sectionHeight = section.offsetHeight;
//                 // Check if the current scroll position is within this section's bounds
//                 if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//                      currentSectionId = section.getAttribute('id'); // Set the active section ID
//                 }
//             }
//         });

//          // Handle edge case: If scrolled near the bottom, make the last section active
//          const bottomThreshold = document.body.offsetHeight - window.innerHeight - 50; // 50px buffer
//          if (scrollPosition >= bottomThreshold && sections.length > 0) {
//              // Make sure sections array is not empty before accessing last element
//              const lastSection = sections[sections.length - 1];
//              if(lastSection) {
//                 currentSectionId = lastSection.getAttribute('id');
//              }
//          }
//          // Handle edge case: If scrolled to the very top
//          else if (scrollPosition < (sections[0]?.offsetTop - headerOffsetForNav || 0)) {
//              currentSectionId = ''; // Or set to 'hero' if you have a 'Home' link
//          }


//         // Update the 'active' class on navigation links
//         navLinks.forEach(link => {
//             link.classList.remove('active'); // Remove active class from all links first
//             // Add active class if the link's href matches the current section ID
//             if (link.getAttribute('href') === `#${currentSectionId}`) {
//                 link.classList.add('active');
//             }
//         });
//     }

//     // --- Footer Year ---
//     // Automatically update the copyright year in the footer
//     const yearSpan = document.getElementById('current-year');
//     if (yearSpan) {
//         yearSpan.textContent = new Date().getFullYear();
//     }

//     // --- Initial Calls & Event Listeners ---
//     // Add scroll listener to update nav highlighting as user scrolls
//     window.addEventListener('scroll', changeNavOnScroll);
//     // Run the nav highlighting function once on page load to set the initial state
//     changeNavOnScroll();

// }); // End DOMContentLoaded wrapper

// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate On Scroll) ---
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });

    // --- Initialize Swiper for Project Carousel ---
    const swiper = new Swiper('.swiper-container', {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        grid: { rows: 1 },
        breakpoints: {
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 30, grid: { rows: 2, fill: 'row' } },
            1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 40, grid: { rows: 2, fill: 'row' } }
        },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        a11y: { prevSlideMessage: 'Previous project', nextSlideMessage: 'Next project' },
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
            if (hash.startsWith('#') && hash.length > 1) {
                 const targetElement = document.querySelector(hash);
                 if (targetElement) {
                    e.preventDefault();
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                         mobileMenu.classList.add('hidden');
                         if (menuIcon && menuIcon.classList.contains('fa-times')) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header .hidden.md\\:flex a.nav-link');
    const headerOffsetForNav = (document.querySelector('header')?.offsetHeight || 70) + 100;

    function changeNavOnScroll() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset;
        sections.forEach(section => {
            if (section && typeof section.offsetTop === 'number') {
                const sectionTop = section.offsetTop - headerOffsetForNav;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                     currentSectionId = section.getAttribute('id');
                }
            }
        });

         const bottomThreshold = document.body.offsetHeight - window.innerHeight - 50;
         if (scrollPosition >= bottomThreshold && sections.length > 0) {
             const lastSection = sections[sections.length - 1];
             if(lastSection) { currentSectionId = lastSection.getAttribute('id'); }
         } else if (scrollPosition < (sections[0]?.offsetTop - headerOffsetForNav || 0)) {
             currentSectionId = '';
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


    // ===================================================================
    // --- AI CHAT AGENT LOGIC ---
    // ===================================================================
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const knowledgeBaseElement = document.getElementById('ai-knowledge-base');
    const knowledgeBase = knowledgeBaseElement ? knowledgeBaseElement.textContent.trim() : "No information available.";

    // The AI's instructions and persona, combined with your data.
    const systemPrompt = `You are a professional and helpful AI assistant for the personal portfolio of Chinmay Amrutkar, a Robotics and AI Engineer. Your task is to answer questions from users like recruiters based ONLY on the information provided below. Do not make up information. If a question is about a topic not covered here, politely state that you only have information related to Chinmay's professional portfolio. Be friendly, professional, and concise.

    Here is all the information about Chinmay Amrutkar:
    ${knowledgeBase}`;

    let chatHistory = []; // To store the conversation

    // --- UI Event Listeners ---
    if (chatBubble) {
        chatBubble.addEventListener('click', () => chatWindow.classList.remove('hidden'));
    }
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleSendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    // --- Core Chat Functions ---
    function handleSendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        addMessageToChat('user', userMessage);
        chatInput.value = '';
        chatSendBtn.disabled = true; // Disable button while AI is thinking

        // Add user message to history
        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

        // Get AI response
        getAIResponse();
    }

    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
    }

    async function getAIResponse() {
        const fullPrompt = `${systemPrompt}\n\nHere is the conversation history:\n${JSON.stringify(chatHistory)}\n\nBased on all this, what is the best response to the last user message?`;

        // We will just use the last user message for a simpler context
        const lastUserMessage = chatHistory[chatHistory.length - 1];

        // The payload now includes the system instructions and the user's query
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: `${systemPrompt}\n\nQuestion: ${lastUserMessage.parts[0].text}` }]
                }
            ]
        };

        const apiKey = ""; // Leave blank, it will be handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            let aiResponseText = "Sorry, I couldn't generate a response. Please try again.";

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                aiResponseText = result.candidates[0].content.parts[0].text;
            }

            addMessageToChat('ai', aiResponseText);
            chatHistory.push({ role: "model", parts: [{ text: aiResponseText }] });

        } catch (error) {
            console.error("Error fetching AI response:", error);
            addMessageToChat('ai', "I'm having trouble connecting right now. Please try again later.");
        } finally {
            chatSendBtn.disabled = false; // Re-enable the send button
        }
    }


    // --- Initial Calls & Listeners ---
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll();

}); // End DOMContentLoaded
