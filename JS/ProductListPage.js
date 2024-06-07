document.addEventListener('DOMContentLoaded', () => {
    fetch('../products.json')
        .then(response => response.json())
        .then(products => displayProducts(products)) // Tambahkan ini untuk menampilkan produk setelah fetch
        .catch(error => console.error('Error fetching the products:', error));
});

function displayProducts(products) {
    const productContainer = document.querySelector('.ProductContainer');
    productContainer.innerHTML = '';

    // Load the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'ProductCard';

        // Check if the product is already in the cart
        const isInCart = cart.some(item => item.namaProduk === product.namaProduk && item.namaSupermarket === product.namaSupermarket);
        const buttonIcon = isInCart ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';

        productCard.innerHTML = `
            <img src="${product.fotoProduk}" alt="${product.namaProduk}">
            <h3>${product.namaProduk}</h3>
            <p>${product.namaSupermarket}</p>
            <p class="price">Rp ${product.hargaProduk}</p>
            <div class="rating">${displayRating(product.rating)}</div>
            <button class="addToCartButton" onclick='addToCart(${JSON.stringify(product)}, this)'>${buttonIcon}</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function displayRating(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '★'; // Full star
    }
    for (let i = rating; i < 5; i++) {
        stars += '☆'; // Empty star
    }
    return stars;
}

function addToCart(product, button) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Check if there's a product with the same name and supermarket in the cart
    const existingProductIndex = cart.findIndex(item => item.namaProduk === product.namaProduk && item.namaSupermarket === product.namaSupermarket);

    if (existingProductIndex !== -1) {
        // If a product with the same name and supermarket is found in the cart, remove it from the cart
        cart.splice(existingProductIndex, 1);
        alert(`${product.namaProduk} dari ${product.namaSupermarket} telah dihapus dari keranjang!`);
        // Update the button icon to "plus"
        button.innerHTML = '<i class="fas fa-plus"></i>';
    } else {
        cart.push(product);
        alert(`${product.namaProduk} dari ${product.namaSupermarket} telah ditambahkan ke keranjang!`);
        // Update the button icon to "check"
        button.innerHTML = '<i class="fas fa-check"></i>';
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}
