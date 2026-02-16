// Admin Logic
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderAdminProducts();
    setupEventListeners();
});

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('todozorras_auth');
    if (!isLoggedIn) {
        document.getElementById('login-modal').classList.remove('hidden');
    }
}

function setupEventListeners() {
    // Login Form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        if (password === 'demo123') {
            sessionStorage.setItem('todozorras_auth', 'true');
            document.getElementById('login-modal').classList.add('hidden');
            renderAdminProducts();
        } else {
            alert('Contraseña incorrecta');
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('todozorras_auth');
        location.reload();
    });

    // Add Product Modal
    const addModal = document.getElementById('product-modal');
    document.getElementById('add-product-btn').addEventListener('click', () => {
        document.getElementById('modal-title').innerText = 'Nuevo Producto';
        document.getElementById('product-form').reset();
        document.getElementById('product-id').value = '';
        addModal.classList.remove('hidden');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        addModal.classList.add('hidden');
    });

    // Product Form Submit
    document.getElementById('product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('product-id').value;
        const product = {
            id: id ? parseInt(id) : null,
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            category: document.getElementById('category').value,
            image: document.getElementById('image').value || 'https://via.placeholder.com/300'
        };

        if (id) {
            updateProduct(product);
        } else {
            addProduct(product);
        }

        addModal.classList.add('hidden');
        renderAdminProducts();
    });
}

function renderAdminProducts() {
    const products = getProducts();
    const tbody = document.getElementById('admin-products-body');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-4">
                <div class="h-12 w-12 bg-gray-100 rounded overflow-hidden">
                    <img src="${product.image}" class="object-cover h-full w-full">
                </div>
            </td>
            <td class="p-4 font-bold">${product.name}</td>
            <td class="p-4 text-gray-500">${product.category}</td>
            <td class="p-4">$${product.price.toLocaleString('es-AR')}</td>
            <td class="p-4 text-right space-x-2">
                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 font-medium">Editar</button>
                <button onclick="deleteProductHandler(${product.id})" class="text-red-600 hover:text-red-800 font-medium">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

window.editProduct = function (id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modal-title').innerText = 'Editar Producto';
    document.getElementById('product-id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category;
    document.getElementById('image').value = product.image;

    document.getElementById('product-modal').classList.remove('hidden');
};

window.deleteProductHandler = function (id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        deleteProduct(id);
        renderAdminProducts();
    }
};
