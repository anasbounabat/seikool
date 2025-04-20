document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navRight = document.querySelector(".nav-right");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navRight.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navRight.classList.remove("active");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navRight.contains(e.target)) {
            hamburger.classList.remove("active");
            navRight.classList.remove("active");
        }
    });

    // Handle active state for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScroll = 0;
    const navbar = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && !hamburger.classList.contains('active')) {
            // Scrolling down & menu is closed
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Best Sellers Carousel Touch Handling
    const bestSellersContainer = document.querySelector('.watch-carousel .carousel-container');
    let isScrolling = false;
    let startX;
    let scrollLeft;
    let startTime;
    let momentumID;

    bestSellersContainer.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - bestSellersContainer.offsetLeft;
        scrollLeft = bestSellersContainer.scrollLeft;
        startTime = Date.now();
        
        // Arrêter l'animation d'inertie précédente
        if (momentumID) {
            cancelAnimationFrame(momentumID);
        }
    });

    bestSellersContainer.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - bestSellersContainer.offsetLeft;
        const walk = (x - startX);
        bestSellersContainer.scrollLeft = scrollLeft - walk;
    });

    bestSellersContainer.addEventListener('touchend', (e) => {
        if (!isScrolling) return;
        isScrolling = false;
        
        const endTime = Date.now();
        const timeElapsed = endTime - startTime;
        
        if (timeElapsed < 150) {
            // Calculer la vélocité du swipe
            const endX = e.changedTouches[0].pageX - bestSellersContainer.offsetLeft;
            const distance = endX - startX;
            const velocity = Math.abs(distance / timeElapsed);
            
            if (velocity > 0.5) {
                // Appliquer l'inertie
                const direction = distance < 0 ? 1 : -1;
                let momentum = velocity * 15;
                
                const scroll = () => {
                    bestSellersContainer.scrollLeft += direction * momentum;
                    momentum *= 0.95;
                    
                    if (momentum > 0.1) {
                        momentumID = requestAnimationFrame(scroll);
                    }
                };
                
                momentumID = requestAnimationFrame(scroll);
            }
        }
    });

    // Empêcher le scroll vertical pendant le swipe horizontal
    bestSellersContainer.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].pageY - startY) < Math.abs(e.touches[0].pageX - startX)) {
            e.preventDefault();
        }
    }, { passive: false });

    // Hide scroll indicator after first scroll
    let hasScrolled = false;
    bestSellersContainer.addEventListener('scroll', () => {
        if (!hasScrolled) {
            const scrollIndicator = document.querySelector('.watch-carousel .scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.classList.add('hidden');
                hasScrolled = true;
            }
        }
    });

    // Desktop carousel navigation
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const carouselTrack = document.querySelector('.watch-carousel .carousel-track');
    const slides = document.querySelectorAll('.watch-carousel .carousel-slide');
    let currentSlide = 0;

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        nextArrow.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        });
    }

    // Update carousel on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            updateCarousel();
        }
    });

    // Chatbot functionality
    const chatBubble = document.getElementById('chatBubble');
    const chat = document.getElementById('seikool-chat');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Ouvrir le chat en cliquant sur la bulle
    chatBubble.addEventListener('click', () => {
        chat.classList.toggle('active');
        // Retirer le badge de notification quand on ouvre le chat
        const badge = chatBubble.querySelector('.notification-badge');
        if (badge) badge.style.display = 'none';
    });

    // Fermer le chat
    closeChatBtn.addEventListener('click', () => {
        chat.classList.remove('active');
    });

    // Fermer le chat en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!chat.contains(e.target) && !chatBubble.contains(e.target) && chat.classList.contains('active')) {
            chat.classList.remove('active');
        }
    });

    // Envoyer un message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Créer et ajouter le message de l'utilisateur
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(messageDiv);
            chatInput.value = '';
            
            // Faire défiler jusqu'au dernier message
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simuler une réponse du bot
            setTimeout(() => {
                const botResponse = document.createElement('div');
                botResponse.className = 'message bot-message';
                botResponse.innerHTML = '<p>Je vais vous répondre dans les plus brefs délais. En attendant, vous pouvez utiliser les réponses rapides ci-dessous ou continuer sur WhatsApp.</p>';
                chatMessages.appendChild(botResponse);
                
                // Ajouter les quick replies après la réponse
                const quickReplies = document.createElement('div');
                quickReplies.className = 'quick-replies';
                quickReplies.innerHTML = `
                    <button class="quick-reply"><i class="fas fa-shopping-cart"></i> Comment acheter ?</button>
                    <button class="quick-reply"><i class="fas fa-ruler"></i> Guide des tailles</button>
                    <button class="quick-reply"><i class="fas fa-truck"></i> Délais de livraison</button>
                    <button class="quick-reply"><i class="fas fa-undo"></i> Retours et garanties</button>
                    <button class="whatsapp-contact quick-reply">
                        <i class="fab fa-whatsapp"></i> Continuer sur WhatsApp
                    </button>
                `;
                chatMessages.appendChild(quickReplies);
                
                // Faire défiler jusqu'au dernier message
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Ajouter les événements aux nouveaux quick replies
                addQuickReplyEvents(quickReplies);
            }, 1000);
        }
    }

    // Gérer l'envoi de message
    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Gérer les quick replies
    function addQuickReplyEvents(container) {
        container.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('whatsapp-contact')) {
                    window.open('https://wa.me/33612345678', '_blank');
                } else {
                    chatInput.value = button.textContent.trim();
                    sendMessage();
                }
            });
        });
    }

    // Ajouter les événements aux quick replies initiaux
    addQuickReplyEvents(document.querySelector('.quick-replies'));

    // Animation de la bulle de chat
    function animateChatBubble() {
        chatBubble.classList.add('bounce');
        setTimeout(() => {
            chatBubble.classList.remove('bounce');
        }, 1000);
    }

    // Animer la bulle toutes les 30 secondes
    setInterval(animateChatBubble, 30000);

    // Ouvrir automatiquement le chat après 5 secondes
    setTimeout(() => {
        if (!chat.classList.contains('active')) {
            chat.classList.add('active');
            setTimeout(() => {
                if (chat.classList.contains('active')) {
                    chat.classList.remove('active');
                }
            }, 5000);
        }
    }, 5000);

    // Gestion du menu des filtres
    const filterToggle = document.querySelector('.filter-toggle');
    const filtersMenu = document.querySelector('.filters-menu');

    if (filterToggle && filtersMenu) {
        filterToggle.addEventListener('click', () => {
            filtersMenu.classList.toggle('active');
            filterToggle.style.transform = filtersMenu.classList.contains('active') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        });

        // Fermeture du menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!filtersMenu.contains(e.target) && !filterToggle.contains(e.target)) {
                filtersMenu.classList.remove('active');
                filterToggle.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Collections Carousel Navigation
    const collectionsTrack = document.querySelector('.collections .carousel-track');
    const collectionSlides = document.querySelectorAll('.collections .carousel-item');
    const prevButton = document.querySelector('.collections #prevBtn');
    const nextButton = document.querySelector('.collections #nextBtn');
    
    let currentIndex = 0;
    const slidesToShow = getSlidesToShow();
    
    function getSlidesToShow() {
        if (window.innerWidth <= 480) return 2;
        if (window.innerWidth <= 768) return 3;
        if (window.innerWidth <= 1024) return 4;
        return 5;
    }
    
    function updateCarouselPosition() {
        const slideWidth = collectionSlides[0].offsetWidth + 20; // 20px is the gap
        const offset = -currentIndex * slideWidth;
        collectionsTrack.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        
        const maxIndex = collectionSlides.length - slidesToShow;
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const maxIndex = collectionSlides.length - slidesToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            currentIndex = Math.min(currentIndex, collectionSlides.length - slidesToShow);
            updateCarouselPosition();
        }
    });
    
    // Initial position update
    updateCarouselPosition();

    // Touch handling for collections carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    collectionsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    collectionsTrack.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });
    
    collectionsTrack.addEventListener('touchend', () => {
        const touchDiff = touchStartX - touchEndX;
        
        if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
            if (touchDiff > 0 && currentIndex < collectionSlides.length - slidesToShow) {
                // Swipe left
                currentIndex++;
                updateCarouselPosition();
            } else if (touchDiff < 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
                updateCarouselPosition();
            }
        }
    });
}); 