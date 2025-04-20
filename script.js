document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Modal functionality
    const modal = document.getElementById('discount-modal');
    const closeModal = document.querySelector('.close-modal');
    const discountForm = document.querySelector('.discount-form');

    // Show modal after 3 seconds
    setTimeout(() => {
        modal.classList.add('active');
    }, 3000);

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle form submission
    discountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = discountForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Email submitted:', email);
        
        // Show success message
        alert('Merci ! Votre code de réduction vous a été envoyé par email.');
        
        // Close modal
        modal.classList.remove('active');
    });

    // ====== PREMIER CAROUSEL (Collections) ======
    const collectionsCarousel = document.querySelector('.collections .carousel');
    const collectionsTrack = document.querySelector('.collections .carousel-track');
    const collectionsItems = document.querySelectorAll('.collections .carousel-item');
    const collectionsPrevButton = document.getElementById('prevBtn');
    const collectionsNextButton = document.getElementById('nextBtn');

    if (collectionsTrack && collectionsItems.length > 0) {
        let collectionsCurrentIndex = 0;
        const collectionsItemWidth = collectionsItems[0].offsetWidth;
        const collectionsItemsToShow = 5;
        const collectionsMaxIndex = Math.max(0, collectionsItems.length - collectionsItemsToShow);

        function updateCollectionsCarousel() {
            const offset = -collectionsCurrentIndex * (collectionsItemWidth + 20);
            collectionsTrack.style.transform = `translateX(${offset}px)`;
            
            if (collectionsPrevButton) {
                collectionsPrevButton.style.opacity = collectionsCurrentIndex === 0 ? '0.5' : '1';
            }
            if (collectionsNextButton) {
                collectionsNextButton.style.opacity = collectionsCurrentIndex === collectionsMaxIndex ? '0.5' : '1';
            }
        }

        collectionsNextButton && collectionsNextButton.addEventListener('click', () => {
            if (collectionsCurrentIndex < collectionsMaxIndex) {
                collectionsCurrentIndex++;
                updateCollectionsCarousel();
            }
        });

        collectionsPrevButton && collectionsPrevButton.addEventListener('click', () => {
            if (collectionsCurrentIndex > 0) {
                collectionsCurrentIndex--;
                updateCollectionsCarousel();
            }
        });

        updateCollectionsCarousel();

        let collectionsResizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(collectionsResizeTimeout);
            collectionsResizeTimeout = setTimeout(() => {
                collectionsCurrentIndex = 0;
                updateCollectionsCarousel();
            }, 100);
        });
    }

    // ====== CAROUSEL ICONIQUES ======
    const watchCarousel = document.querySelector('.watch-carousel');
    if (watchCarousel) {
        const track = watchCarousel.querySelector('.carousel-track');
        const slides = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
        const nextButton = watchCarousel.querySelector('.next-arrow');
        const prevButton = watchCarousel.querySelector('.prev-arrow');
        const dotsNav = watchCarousel.querySelector('.carousel-dots');

        if (track && slides.length > 0) {
            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dotsNav.appendChild(dot);
            });

            const dots = Array.from(dotsNav.children);
            let currentIndex = 0;
            const slideWidth = slides[0].getBoundingClientRect().width;
            const slideGap = 32; // Gap between slides

            const moveToSlide = (targetIndex) => {
                // Calculate the translation with the gap
                const translation = targetIndex * (slideWidth + slideGap);
                track.style.transform = `translateX(-${translation}px)`;
                
                // Update active dot
                dots.forEach(dot => dot.classList.remove('active'));
                dots[targetIndex].classList.add('active');
                
                // Update arrows visibility
                prevButton.style.display = targetIndex === 0 ? 'none' : 'flex';
                nextButton.style.display = targetIndex === slides.length - 1 ? 'none' : 'flex';
                
                currentIndex = targetIndex;
            };

            // Click events for arrows
            nextButton.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    moveToSlide(currentIndex + 1);
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                }
            });

            // Click events for dots
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;
                
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                if (targetIndex !== -1) {
                    moveToSlide(targetIndex);
                }
            });

            // Initialize carousel
            moveToSlide(0);

            // Auto-play functionality
            let autoplayInterval;

            const startAutoplay = () => {
                autoplayInterval = setInterval(() => {
                    if (currentIndex < slides.length - 1) {
                        moveToSlide(currentIndex + 1);
                    } else {
                        moveToSlide(0);
                    }
                }, 5000);
            };

            const stopAutoplay = () => {
                clearInterval(autoplayInterval);
            };

            // Start autoplay
            startAutoplay();

            // Pause autoplay on hover
            track.addEventListener('mouseenter', stopAutoplay);
            track.addEventListener('mouseleave', startAutoplay);

            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Update slide width and position on resize
                    const newSlideWidth = slides[0].getBoundingClientRect().width;
                    moveToSlide(currentIndex);
                }, 100);
            });
        }
    }

    // ====== DEUXIÈME CAROUSEL (Best Sellers) ======
    const bestSellerTrack = document.querySelector('.best-seller-carousel .carousel-track');
    const bestSellerSlides = bestSellerTrack ? Array.from(bestSellerTrack.children) : [];
    const bestSellerNextButton = document.querySelector('.best-seller-carousel .next-btn');
    const bestSellerPrevButton = document.querySelector('.best-seller-carousel .prev-btn');
    const bestSellerDotsNav = document.querySelector('.best-seller-carousel .carousel-dots');
    
    if (bestSellerTrack && bestSellerSlides.length > 0) {
        const bestSellerSlideWidth = bestSellerSlides[0].getBoundingClientRect().width;
        
        // Arrange best seller slides
        const setBestSellerSlidePosition = (slide, index) => {
            slide.style.left = bestSellerSlideWidth * index + 'px';
        };
        
        bestSellerSlides.forEach(setBestSellerSlidePosition);
        
        // Create best seller dot indicators
        if (bestSellerDotsNav) {
            bestSellerDotsNav.innerHTML = ''; // Clear existing dots
            bestSellerSlides.forEach((_, index) => {
                bestSellerDotsNav.insertAdjacentHTML('beforeend', 
                    `<div class="dot ${index === 0 ? 'active' : ''}"></div>`);
            });
        }
        
        const bestSellerDots = bestSellerDotsNav ? Array.from(bestSellerDotsNav.children) : [];
        
        // Move to target best seller slide
        const moveToBestSellerSlide = (currentIndex, targetIndex) => {
            const targetSlide = bestSellerSlides[targetIndex];
            
            // Move to the target slide
            bestSellerTrack.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            
            // Update active class on dots
            if (bestSellerDots.length > 0) {
                bestSellerDots.forEach(dot => dot.classList.remove('active'));
                bestSellerDots[targetIndex].classList.add('active');
            }
        };
        
        // Click handlers for best seller buttons
        let bestSellerCurrentIndex = 0;
        
        bestSellerNextButton && bestSellerNextButton.addEventListener('click', () => {
            bestSellerCurrentIndex = (bestSellerCurrentIndex + 1) % bestSellerSlides.length;
            moveToBestSellerSlide(bestSellerCurrentIndex - 1, bestSellerCurrentIndex);
        });
        
        bestSellerPrevButton && bestSellerPrevButton.addEventListener('click', () => {
            bestSellerCurrentIndex = (bestSellerCurrentIndex - 1 + bestSellerSlides.length) % bestSellerSlides.length;
            moveToBestSellerSlide(bestSellerCurrentIndex + 1, bestSellerCurrentIndex);
        });
        
        // Click handlers for best seller dots
        bestSellerDotsNav && bestSellerDotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('div');
            
            if (!targetDot) return;
            
            const targetIndex = bestSellerDots.findIndex(dot => dot === targetDot);
            if (targetIndex !== -1) {
                bestSellerCurrentIndex = targetIndex;
                moveToBestSellerSlide(bestSellerCurrentIndex, targetIndex);
            }
        });
    }

    // Chatbot functionality
    const whatsappButton = document.querySelector('.whatsapp-button');
    const chatbot = document.getElementById('seikool-chat');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');

    // Open chat when WhatsApp button is clicked
    whatsappButton.addEventListener('click', () => {
        chatbot.classList.add('active');
        // Remove notification badge when chat is opened
        const badge = whatsappButton.querySelector('.notification-badge');
        if (badge) badge.remove();
    });

    // Close chat when close button is clicked
    closeChatBtn.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    // Handle quick reply buttons
    quickReplies.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('whatsapp-contact')) {
                // Numéro de téléphone WhatsApp
                const phoneNumber = '+33600000000'; // Remplacez par votre numéro
                const message = 'Bonjour, je souhaite en savoir plus sur les montres ModTime.';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            } else {
                const question = button.textContent;
                addUserMessage(question);
                handleUserQuestion(question);
            }
        });
    });

    // Handle send message button
    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            handleUserQuestion(message);
            chatInput.value = '';
        }
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserQuestion(question) {
        let response = '';
        
        // Simulate bot responses based on questions
        if (question.toLowerCase().includes('comment acheter')) {
            response = `Pour acheter une montre ModTime :<br>
            1. Choisissez votre modèle dans notre catalogue<br>
            2. Sélectionnez vos options de personnalisation<br>
            3. Ajoutez au panier<br>
            4. Procédez au paiement sécurisé<br>
            Je peux vous guider à chaque étape ! 😊`;
        } 
        else if (question.toLowerCase().includes('guide des tailles')) {
            response = `Nos montres sont disponibles en plusieurs tailles :<br>
            - 36mm : Idéal pour les poignets fins<br>
            - 40mm : Taille classique, convient à la plupart<br>
            - 42mm : Pour un style plus affirmé<br>
            Besoin d'aide pour choisir ? 🤔`;
        }
        else if (question.toLowerCase().includes('délais de livraison')) {
            response = `Nos délais de livraison :<br>
            - France : 2-3 jours ouvrés<br>
            - Europe : 3-5 jours ouvrés<br>
            - International : 5-7 jours ouvrés<br>
            La livraison est gratuite ! 🚚`;
        }
        else if (question.toLowerCase().includes('retours')) {
            response = `Notre politique de retour :<br>
            - 30 jours pour retourner votre montre<br>
            - Retour gratuit<br>
            - Remboursement sous 48h<br>
            - Garantie 2 ans sur toutes nos montres ⌚`;
        }
        else {
            response = "Je peux vous aider avec :<br>- Le processus d'achat<br>- Le guide des tailles<br>- Les délais de livraison<br>- Les retours et garanties<br>Que souhaitez-vous savoir ? 😊";
        }

        setTimeout(() => {
            addBotMessage(response);
        }, 500);
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = 0;
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Gestion du menu des filtres
    const filterToggle = document.querySelector('.filter-toggle');
    const filtersMenu = document.querySelector('.filters-menu');

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

    // Gestion des filtres
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Logique de filtrage à implémenter selon vos besoins
            console.log('Filter changed:', checkbox.value, checkbox.checked);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    // Search and filter function
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCollections = Array.from(filterCheckboxes)
            .filter(cb => cb.checked && cb.value !== '0-200' && cb.value !== '200-300' && cb.value !== '300+')
            .map(cb => cb.value);
        
        const selectedPrices = Array.from(filterCheckboxes)
            .filter(cb => cb.checked && (cb.value === '0-200' || cb.value === '200-300' || cb.value === '300+'))
            .map(cb => cb.value);

        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();
            const productPrice = parseFloat(card.getAttribute('data-price'));
            const productCollection = card.getAttribute('data-collection');

            // Check if product matches search term
            const matchesSearch = productName.includes(searchTerm);

            // Check if product matches selected collections
            const matchesCollection = selectedCollections.length === 0 || 
                                    selectedCollections.includes(productCollection);

            // Check if product matches selected price ranges
            const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
                if (range === '0-200') return productPrice <= 200;
                if (range === '200-300') return productPrice > 200 && productPrice <= 300;
                if (range === '300+') return productPrice > 300;
                return false;
            });

            // Show/hide product based on all filters
            if (matchesSearch && matchesCollection && matchesPrice) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterProducts);
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Add click animation to color dots
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const parentCard = this.closest('.product-card');
            parentCard.querySelectorAll('.color-dot').forEach(d => {
                d.style.transform = 'scale(1)';
            });
            this.style.transform = 'scale(1.2)';
        });
    });
});
