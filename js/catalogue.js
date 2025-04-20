// Données des montres (à remplacer par vos données réelles)
const watches = [
    { 
        id: 1, 
        name: "SEIKO MOD DATEJUST WIMBLEDON", 
        category: "luxe", 
        style: "classique", 
        material: "acier", 
        price: 199.99, 
        image: "./stocks/1.png",
        delivery: "Livraison en 24h"
    },
    { 
        id: 2, 
        name: "SEIKO MOD AQUANAUT SHINE", 
        category: "premium", 
        style: "sport", 
        material: "acier", 
        price: 199.99, 
        image: "./stocks/2.png",
        delivery: "Livraison en 24h"
    },
    { 
        id: 3, 
        name: "SEIKO MOD DATEJUST WIMBLEDON ROLESOR", 
        category: "prenium", 
        style: "classique", 
        material: "or", 
        price: 199.99, 
        image: "./stocks/3.png",
        delivery: "Livraison en 24h"
    },
    { 
        id: 4, 
        name: "SEIKO MOD ROYAL OAK NOIR", 
        category: "premium", 
        style: "classique", 
        material: "acier", 
        price: 199.99, 
        image: "./stocks/4.png",
        delivery: "Livraison en 24h"
    }
];

// Éléments du DOM
const searchInput = document.getElementById('search');
const filterToggle = document.getElementById('filter-toggle');
const filters = document.getElementById('filters');
const resetFilters = document.getElementById('reset-filters');
const filterCount = document.getElementById('filter-count');
const resultsCount = document.getElementById('results-count');
const watchesGrid = document.getElementById('watches-grid');
const categorySelect = document.getElementById('category');
const styleSelect = document.getElementById('style');
const materialSelect = document.getElementById('material');
const priceRangeSelect = document.getElementById('price-range');
const closeFiltersButton = document.getElementById('close-filters');

// État des filtres
let activeFilters = {
    search: '',
    category: '',
    style: '',
    material: '',
    priceRange: ''
};

// Gestion du menu hamburger
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navRight.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Gestion du bouton de fermeture des filtres
if (closeFiltersButton) {
    closeFiltersButton.addEventListener('click', () => {
        filters.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}

// Gestion de l'ouverture des filtres
filterToggle.addEventListener('click', () => {
    filters.classList.toggle('hidden');
    if (!filters.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Réinitialisation des filtres
resetFilters.addEventListener('click', () => {
    activeFilters = {
        search: '',
        category: '',
        style: '',
        material: '',
        priceRange: ''
    };
    
    searchInput.value = '';
    categorySelect.value = '';
    styleSelect.value = '';
    materialSelect.value = '';
    priceRangeSelect.value = '';
    
    updateUI();
});

// Écouteurs d'événements pour les filtres
[searchInput, categorySelect, styleSelect, materialSelect, priceRangeSelect].forEach(element => {
    if (element === searchInput) {
        element.addEventListener('input', (e) => {
            activeFilters.search = e.target.value;
            updateUI();
        });
    } else {
        element.addEventListener('change', (e) => {
            activeFilters[e.target.id] = e.target.value;
            updateUI();
        });
    }
});

// Fonctions utilitaires
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getActiveFiltersCount() {
    return Object.values(activeFilters).filter(value => value !== '').length;
}

function filterWatches() {
    return watches.filter(watch => {
        const matchesSearch = watch.name.toLowerCase().includes(activeFilters.search.toLowerCase());
        const matchesCategory = !activeFilters.category || watch.category === activeFilters.category;
        const matchesStyle = !activeFilters.style || watch.style === activeFilters.style;
        const matchesMaterial = !activeFilters.material || watch.material === activeFilters.material;
        const matchesPriceRange = !activeFilters.priceRange || (() => {
            switch (activeFilters.priceRange) {
                case 'under30':
                    return watch.price < 30000;
                case '30to50':
                    return watch.price >= 30000 && watch.price <= 50000;
                case 'over50':
                    return watch.price > 50000;
                default:
                    return true;
            }
        })();

        return matchesSearch && matchesCategory && matchesStyle && matchesMaterial && matchesPriceRange;
    });
}

function createWatchCard(watch) {
    return `
        <div class="watch-card" data-category="${watch.category}" data-style="${watch.style}" data-material="${watch.material}">
            <div class="watch-image">
                <img src="${watch.image}" alt="${watch.name}">
            </div>
            <div class="watch-info">
                <h3>${watch.name}</h3>
                <div class="watch-meta">
                    <span class="watch-category">${watch.category}</span>
                    <span class="separator">•</span>
                    <span class="watch-style">${watch.style}</span>
                </div>
                <div class="watch-price">${formatPrice(watch.price)}</div>
                <div class="watch-delivery">
                    <i class="fas fa-truck"></i>
                    <span>${watch.delivery}</span>
                </div>
                <a href="watch.html?id=${watch.id}" class="btn-primary">Voir les détails</a>
            </div>
        </div>
    `;
}

function updateUI() {
    const activeFiltersCount = getActiveFiltersCount();
    const filteredWatches = filterWatches();
    
    filterCount.textContent = activeFiltersCount;
    filterCount.classList.toggle('hidden', activeFiltersCount === 0);
    
    resetFilters.classList.toggle('hidden', activeFiltersCount === 0);
    
    resultsCount.textContent = `${filteredWatches.length} montre${filteredWatches.length > 1 ? 's' : ''} trouvée${filteredWatches.length > 1 ? 's' : ''}`;
    
    watchesGrid.innerHTML = filteredWatches.map(createWatchCard).join('');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
}); 