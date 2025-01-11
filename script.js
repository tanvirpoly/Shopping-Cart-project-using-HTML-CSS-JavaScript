// Simulating products fetched from a JSON file
const products = [
    { id: 1, name: "Laptop", description: "High performance laptop", price: 1200, image: "image1.png" },
    { id: 2, name: "Smartphone", description: "Latest model smartphone", price: 800, image: "image2.png" },
    { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 200, image: "image3.png" },
];

let cart = {};

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!cart[productId]) {
        cart[productId] = { ...product, quantity: 1 };
    } else {
        cart[productId].quantity++;
    }
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    for (const id in cart) {
        const item = cart[id];
        const subtotal = item.price * item.quantity;
        total += subtotal;
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${id}, this.value)">
                </td>
                <td>$${item.price}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${id})">Remove</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Update item quantity
function updateQuantity(productId, quantity) {
    if (quantity <= 0) return;
    cart[productId].quantity = parseInt(quantity);
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    delete cart[productId];
    updateCartUI();
}

// Clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = {};
    updateCartUI();
});

// Initialize
displayProducts();

