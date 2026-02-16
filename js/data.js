// Data Management
const STORAGE_KEY = 'todozorras_products';

const initialProducts = [
    {
        id: 1,
        name: "Carro Plegable Reforzado",
        description: "Ideal para transporte logístico ligero. Estructura de aluminio resistente.",
        price: 150000,
        image: "https://todozorras.com.ar/img/p/3/3-home_default.jpg",
        category: "Reforzados"
    },
    {
        id: 2,
        name: "Zorra Hidráulica 2TN",
        description: "Zorra hidráulica estándar para pallets. Capacidad de carga 2000kg.",
        price: 450000,
        image: "https://todozorras.com.ar/img/p/2/4/24-home_default.jpg",
        category: "Zorras"
    },
    {
        id: 3,
        name: "Carro de Almacén 2 Ruedas",
        description: "Carro vertical clásico para cajas y bultos. Ruedas neumáticas.",
        price: 85000,
        image: "https://todozorras.com.ar/img/p/6/6-home_default.jpg",
        category: "Estandar"
    },
    {
        id: 4,
        name: "Plataforma Rodante",
        description: "Base con ruedas para movimiento de muebles y cajas pesadas.",
        price: 45000,
        image: "https://todozorras.com.ar/img/p/1/3/13-home_default.jpg",
        category: "Especiales"
    }
];

function initData() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        console.log('Data initialized');
    }
}

function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function addProduct(product) {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ ...product, id: newId });
    saveProducts(products);
    return newId;
}

function updateProduct(updatedProduct) {
    let products = getProducts();
    products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    saveProducts(products);
}

function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
}

// Initialize on load
initData();
