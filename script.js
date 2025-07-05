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

    // --- Smooth Scrolling for Internal Links ---
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

    // --- Active Nav Link Highlighting on Scroll ---
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
         }
         else if (scrollPosition < (sections[0]?.offsetTop - headerOffsetForNav || 0)) {
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

    const systemPrompt = `You are a helpful, detailed, and knowledgeable AI assistant named "MayBot" trained on the professional background, skills, and projects of Chinmay Amrutkar — a Robotics and AI Engineer pursuing a Master's in Robotics and Autonomous Systems (AI track) at Arizona State University.

Your goal is to assist visitors by answering questions related to Chinmay's experiences, technical work, skills, career journey, tools used, project decisions, motivations, and reflections. 

Always:
- Provide detailed, technical, and honest responses.
- Speak in a friendly, conversational, and professional tone — like Chinmay would.
- If the question is personal (e.g., career choices, lessons), answer as Chinmay in the first person (“I”).
- If the question is general (e.g., how to use ROS2 for drones), answer as an expert assistant referencing Chinmay’s experience (“Chinmay has…” or “Based on Chinmay’s work…”).
- When needed, break down answers into clear steps or bullets.
- Don’t hallucinate — only use facts from Chinmay’s knowledge base.
- If unsure, say “I don’t have that information, but I can help you explore it.”

Your role is to guide students, recruiters, collaborators, or curious engineers with accurate and insightful responses that reflect Chinmay’s journey and mindset.

    Here is all the information about Chinmay Amrutkar:
    ${knowledgeBase}`;

    let chatHistory = [];

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
        chatSendBtn.disabled = true;

        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
        getAIResponse();
    }

    function addMessageToChat(sender, message, isHtml = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        
        if (isHtml) {
            // If the message is HTML, use innerHTML to render it.
            // This is safe because we are only rendering HTML from our trusted 'marked' library.
            messageDiv.innerHTML = message;
        } else {
            // For user messages, always use textContent to prevent security issues.
            messageDiv.textContent = message;
        }
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function getAIResponse() {
        // Construct the full prompt that the serverless function will receive.
        const fullPrompt = `${systemPrompt}\n\nQuestion: ${chatHistory[chatHistory.length - 1].parts[0].text}`;

        // The URL for our secure, middleman Netlify function.
        // This path is automatically handled by Netlify during deployment.
        const functionUrl = '/.netlify/functions/get-ai-response';

        try {
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: fullPrompt }) // Send the full prompt in the body
            });

            if (!response.ok) {
                throw new Error(`Server function failed with status ${response.status}`);
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
            console.error("Error calling serverless function:", error);
            addMessageToChat('ai', "I'm having trouble connecting to the AI service right now. Please visit his new website https://chinmayamrutkar.netlify.app/");
        } finally {
            chatSendBtn.disabled = false;
        }
    }


    // --- Initial Calls & Event Listeners ---
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll();

});
