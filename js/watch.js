document.addEventListener('DOMContentLoaded', () => {
    // Get the watch ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const watchId = urlParams.get('id');

    // Watch data (matching catalogue.js)
    const watches = [
        { 
            id: 1, 
            name: "SEIKO MOD DATEJUST WIMBLEDON", 
            category: "Luxe", 
            style: "Classique", 
            material: "Acier", 
            price: 199.99, 
            image: "./stocks/1.png",
            description: "Une montre élégante qui allie tradition et modernité. Son cadran finement travaillé et son mouvement automatique en font un choix parfait pour les amateurs d'horlogerie.",
            features: [
                "Mouvement automatique",
                "Réserve de marche de 41 heures",
                "Verre saphir",
                "Étanchéité 50m",
                "Bracelet en acier inoxydable"
            ]
        },
        { 
            id: 2, 
            name: "SEIKO MOD AQUANAUT SHINE", 
            category: "Premium", 
            style: "Sport", 
            material: "Acier", 
            price: 199.99, 
            image: "./stocks/2.png",
            description: "Une montre sportive et élégante qui se distingue par son design unique. Parfaite pour ceux qui recherchent un style distinctif avec des performances exceptionnelles.",
            features: [
                "Mouvement automatique",
                "Étanchéité 100m",
                "Verre saphir anti-reflets",
                "Bracelet intégré en acier",
                "Index luminescents"
            ]
        },
        { 
            id: 3, 
            name: "SEIKO MOD DATEJUST WIMBLEDON ROLESOR", 
            category: "Premium", 
            style: "Classique", 
            material: "Or", 
            price: 199.99, 
            image: "./stocks/3.png",
            description: "Une montre luxueuse qui combine l'or et l'acier pour un style intemporel. Son cadran Wimbledon distinctif en fait une pièce unique dans notre collection.",
            features: [
                "Mouvement automatique",
                "Finition Rolesor (or et acier)",
                "Verre saphir",
                "Étanchéité 100m",
                "Bracelet jubilé"
            ]
        },
        { 
            id: 4, 
            name: "SEIKO MOD ROYAL OAK NOIR", 
            category: "Premium", 
            style: "Classique", 
            material: "Acier", 
            price: 199.99, 
            image: "./stocks/4.png",
            description: "Une réinterprétation moderne d'un design iconique. Son cadran noir et sa construction robuste en font une montre aussi élégante que durable.",
            features: [
                "Mouvement automatique",
                "Cadran motif tapisserie",
                "Verre saphir",
                "Étanchéité 50m",
                "Bracelet intégré en acier"
            ]
        }
    ];

    // Format price with euro symbol
    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    // Find the watch by ID
    const watch = watches.find(w => w.id === parseInt(watchId));

    // Update the page content if watch is found
    if (watch) {
        // Update page title
        document.title = `${watch.name} - ModTime`;

        // Update main image
        document.querySelector('.main-image img').src = watch.image;
        document.querySelector('.main-image img').alt = watch.name;

        // Update watch info
        document.querySelector('.watch-info h1').textContent = watch.name;
        document.querySelector('#watch-category').textContent = watch.category;
        document.querySelector('#watch-style').textContent = watch.style;
        document.querySelector('#watch-material').textContent = watch.material;
        document.querySelector('.watch-price').textContent = formatPrice(watch.price);
        document.querySelector('.watch-description p').textContent = watch.description;

        // Update features list
        const featuresList = document.querySelector('.watch-features ul');
        featuresList.innerHTML = watch.features.map(feature => `
            <li>${feature}</li>
            `).join('');

        // Setup WhatsApp button
        const whatsappBtn = document.querySelector('#whatsapp-btn');
        if (whatsappBtn) {
            const message = `Bonjour, je suis intéressé(e) par la montre ${watch.name} à ${formatPrice(watch.price)}. Pouvez-vous me donner plus d'informations ?`;
            const whatsappUrl = `https://wa.me/33612345678?text=${encodeURIComponent(message)}`;
            whatsappBtn.href = whatsappUrl;
        }
    } else {
        // Handle case where watch is not found
        document.querySelector('.watch-detail').innerHTML = `
            <div class="container">
                <h1>Montre non trouvée</h1>
                <p>Désolé, la montre que vous recherchez n'existe pas.</p>
                <a href="catalogue.html" class="btn-secondary">Retour au catalogue</a>
            </div>
        `;
    }
}); 