const watchDetails = {
    1: {
        id: 1,
        name: "SEIKO MOD DATEJUST WIMBLEDON",
        description: "Une réinterprétation moderne du classique Datejust, le Wimbledon se distingue par son cadran vert olive distinctif et ses index romains. Cette montre allie l'élégance traditionnelle à une touche contemporaine, parfaite pour toutes les occasions.",
        category: "luxe",
        style: "classique",
        material: "acier",
        price: 24900,
        image: "./images/datejust-wimbledon.jpg",
        specifications: {
            movement: "Automatique NH35",
            diameter: "41mm",
            waterResistance: "100m",
            crystal: "Saphir bombé",
            caseMaterial: "Acier 316L",
            bracelet: "Jubilé en acier"
        }
    },
    2: {
        id: 2,
        name: "SEIKO MOD AQUANAUT SHINE",
        description: "L'Aquanaut Shine redéfinit l'élégance sportive avec son boîtier en titane ultra-léger et son cadran texturé unique. Un chef-d'œuvre de design contemporain qui ne sacrifie pas la fonctionnalité pour le style.",
        category: "premium",
        style: "sport",
        material: "titane",
        price: 24900,
        image: "./images/aquanaut-shine.jpg",
        specifications: {
            movement: "Automatique NH35",
            diameter: "42mm",
            waterResistance: "120m",
            crystal: "Saphir plat",
            caseMaterial: "Titane grade 5",
            bracelet: "Caoutchouc intégré"
        }
    },
    3: {
        id: 3,
        name: "SEIKO MOD DATEJUST WIMBLEDON ROLESOR",
        description: "Le Rolesor combine la noblesse de l'or avec la robustesse de l'acier. Cette version du Wimbledon élève encore plus le design iconique avec des détails en or qui capturent la lumière de manière spectaculaire.",
        category: "luxe",
        style: "classique",
        material: "or",
        price: 24900,
        image: "./images/datejust-rolesor.jpg",
        specifications: {
            movement: "Automatique NH35",
            diameter: "41mm",
            waterResistance: "100m",
            crystal: "Saphir bombé",
            caseMaterial: "Acier 316L et or",
            bracelet: "Jubilé bicolore"
        }
    },
    4: {
        id: 4,
        name: "SEIKO MOD ROYAL OAK NOIR",
        description: "Le Royal Oak Noir capture l'essence du luxe sportif avec son cadran tapisserie noir profond et son boîtier octogonal distinctif. Une montre qui fait tourner les têtes tout en restant suffisamment subtile pour un usage quotidien.",
        category: "premium",
        style: "sport",
        material: "acier",
        price: 24900,
        image: "./images/royal-oak-noir.jpg",
        specifications: {
            movement: "Automatique NH35",
            diameter: "41mm",
            waterResistance: "50m",
            crystal: "Saphir plat",
            caseMaterial: "Acier 316L",
            bracelet: "Intégré en acier"
        }
    }
};

function getWatchById(id) {
    return watchDetails[id] || null;
}

function getAllWatches() {
    return Object.values(watchDetails);
} 