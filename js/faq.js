document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ Script chargé');
    
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Nombre d\'éléments FAQ trouvés:', faqItems.length);

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        console.log(`FAQ Item ${index + 1} initialisé`);

        // Set initial state
        if (answer) {
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
        }

        question.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Clic sur la question ${index + 1}`);

            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('i');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0px';
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            // Update maxHeight and rotate icon
            if (!isActive) {
                if (answer) {
                    const height = answer.scrollHeight;
                    console.log(`Ouverture de la réponse ${index + 1}, hauteur: ${height}px`);
                    answer.style.maxHeight = `${height}px`;
                }
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                if (answer) {
                    console.log(`Fermeture de la réponse ${index + 1}`);
                    answer.style.maxHeight = '0px';
                }
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}); 