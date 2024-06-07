document.addEventListener('DOMContentLoaded', () => {
    fetch('../products.json')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = filterProductsByCategory(data, 'seasoning');
            displayProducts(filteredProducts);
            updateCartButtons();
        })
        .catch(error => console.error('Error fetching the products:', error));
});

function displayProducts(products) {
    const productContainer = document.querySelector('.ProductContainer');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'ProductCard';
        productCard.innerHTML = `
            <img src="${product.fotoProduk}" alt="${product.namaProduk}">
            <h3>${product.namaProduk}</h3>
            <p>${product.namaSupermarket}</p>
            <p class="price">Rp ${product.hargaProduk}</p>
            <div class="rating">${displayRating(product.rating)}</div>
            <button class="addToCartButton" data-product='${JSON.stringify(product)}'><i class="fas fa-plus"></i></button>
        `;
        productContainer.appendChild(productCard);
    });

    document.querySelectorAll('.addToCartButton').forEach(button => {
        button.addEventListener('click', function() {
            const product = JSON.parse(this.getAttribute('data-product'));
            addToCart(product, this);
        });
    });
}

function filterProductsByCategory(products, category) {
    return products.filter(product => product.kategori.toLowerCase() === category.toLowerCase());
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

    const existingProductIndex = cart.findIndex(item => item.namaProduk === product.namaProduk && item.namaSupermarket === product.namaSupermarket);

    if (existingProductIndex !== -1) {
        cart.splice(existingProductIndex, 1);
        alert(`${product.namaProduk} dari ${product.namaSupermarket} telah dihapus dari keranjang!`);
        button.innerHTML = '<i class="fas fa-plus"></i>';
    } else {
        cart.push(product);
        alert(`${product.namaProduk} dari ${product.namaSupermarket} telah ditambahkan ke keranjang!`);
        button.innerHTML = '<i class="fas fa-check"></i>';
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCartButtons() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    document.querySelectorAll('.addToCartButton').forEach(button => {
        const product = JSON.parse(button.getAttribute('data-product'));
        const inCart = cart.some(item => item.namaProduk === product.namaProduk && item.namaSupermarket === product.namaSupermarket);
        
        if (inCart) {
            button.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            button.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
}

document.getElementById('accountButton').addEventListener('click', function() {
    var navbar = document.getElementById('nav');
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});