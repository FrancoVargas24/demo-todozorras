// Main App Logic
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateYear();
});

function renderProducts() {
    const products = getProducts();
    const grid = document.getElementById('product-grid');

    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="card flex flex-col h-full">
            <div class="h-48 overflow-hidden bg-white flex items-center justify-center p-4">
                <img src="${product.image}" alt="${product.name}" class="max-h-full object-contain hover:scale-110 transition-transform duration-300">
            </div>
            <div class="p-4 flex-grow flex flex-col">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">${product.category}</span>
                <h3 class="text-xl font-bold mb-2 font-oswald text-gray-800">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4 flex-grow">${product.description}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span class="text-lg font-bold text-primary">$${product.price ? product.price.toLocaleString('es-AR') : 'Consultar'}</span>
                    <a href="${getWhatsappLink(product)}" target="_blank" class="btn-primary text-sm px-4 py-2 rounded">
                        Consultar
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function getWhatsappLink(product) {
    const phone = "5491112345678"; // Replace with real number
    const message = `Hola, estoy interesado en el producto: ${product.name}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
}
