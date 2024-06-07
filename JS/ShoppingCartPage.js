document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = filterProductsBySupermarket(data, 'Aeon');
            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching the products:', error));

    // Add event listeners to Edit and Done buttons
    const editButton = document.querySelector('.ChekotEdit h4');
    editButton.addEventListener('click', toggleEditMode);

    // Add event listener to "All" checkbox
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox.addEventListener('change', toggleSelectAll);

    // Add event listener to "Delete" button
    const deleteButton = document.querySelector('.deleteButton');
    deleteButton.addEventListener('click', deleteSelectedItems);

    // Add event listener to "Compare" button
    const compareButton = document.querySelector('.compareButton');
    compareButton.addEventListener('click', handleCompare);

    // Initialize total price to 0
    document.querySelector('.ChekotPrice').innerText = `Total: Rp 0`;

    // Display cart items if cart exists in localStorage
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    displayCartItems(cart);
});

function deleteSelectedItems() {
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');
    const cartContainer = document.querySelector('.CartContainer');
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            // Remove the product from the cart
            cart.splice(index, 1);
            // Remove the cart item from the DOM
            const cartItem = checkbox.closest('.CartItem');
            cartItem.parentNode.removeChild(cartItem);
        }
    });

    // Update localStorage with the modified cart data
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // Update total price after deleting items
    updateTotalPrice();
}

function toggleEditMode() {
    const editButton = document.querySelector('.ChekotEdit h4');
    const cartItems = document.querySelectorAll('.CartItem');

    if (editButton.textContent === 'Edit') {
        // Change to Done mode
        editButton.textContent = 'Done';

        // Add Delete buttons to each cart item
        cartItems.forEach(cartItem => {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'deleteButton';
            deleteButton.addEventListener('click', deleteCartItem);
            cartItem.appendChild(deleteButton);
        });
    } else {
        // Change to Edit mode
        editButton.textContent = 'Edit';

        // Remove Delete buttons from each cart item
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(deleteButton => {
            deleteButton.parentNode.removeChild(deleteButton);
        });
    }
}

function toggleSelectAll(event) {
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
    updateTotalPrice(); // Update total price after toggling checkboxes
}

function deleteCartItem(event) {
    const cartItem = event.target.closest('.CartItem');
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const productName = cartItem.querySelector('h3').textContent;

    // Find index of the product to delete in the cart
    const index = cart.findIndex(item => item.namaProduk === productName);
    if (index !== -1) {
        // Remove the product from the cart
        cart.splice(index, 1);
        // Update localStorage with the modified cart data
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        // Remove the cart item from the DOM
        cartItem.parentNode.removeChild(cartItem);
        // Update total price after deleting item
        updateTotalPrice();
    }
}

function displayProducts(products) {
    const productContainer = document.querySelector('.ProductContainer');
    productContainer.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'ProductCard';

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

function displayCartItems(cart) {
    const cartContainer = document.querySelector('.CartContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang belanja Anda kosong.</p>';
        return;
    }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'CartItem';
        cartItem.innerHTML = `
            <input type="checkbox" class="checkoutCheckbox" onchange="updateTotalPrice()">
            <img src="${product.fotoProduk}" alt="${product.namaProduk}">
            <h3>${product.namaProduk}</h3>
            <p>${product.namaSupermarket}</p>
            <p class="price">Rp ${product.hargaProduk}</p>
            <div class="rating">${displayRating(product.rating)}</div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add a checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = handleCheckout;
    document.querySelector('.ChekotButton').appendChild(checkoutButton);
}

function filterProductsBySupermarket(products, supermarket) {
    return products.filter(product => product.namaSupermarket.toLowerCase() === supermarket.toLowerCase());
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
    displayCartItems(cart); // Update cart display after adding/removing items
}

function updateTotalPrice() {
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let totalPrice = 0;

    checkboxes.forEach((checkbox, index) => {
        // Periksa status checkbox saat halaman dimuat
        if (checkbox.checked) {
            totalPrice += parseInt(cart[index].hargaProduk);
        }
    });

    // Periksa status checkbox saat terjadi perubahan
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                totalPrice += parseInt(cart[index].hargaProduk);
            } else {
                totalPrice -= parseInt(cart[index].hargaProduk);
            }
            // Update total price setelah perubahan checkbox
            document.querySelector('.ChekotPrice').innerText = `Total: Rp ${totalPrice}`;
        });
    });

    // Set total price saat halaman dimuat
    document.querySelector('.ChekotPrice').innerText = `Total: Rp ${totalPrice}`;
}

function handleCheckout() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            selectedItems.push(cart[index]);
        }
    });

    if (selectedItems.length > 0) {
        window.location.href = "PaymentPage.html";
    } else {
        alert('Tidak ada produk yang dipilih untuk checkout.');
    }
}

function handleCompare() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            selectedItems.push(cart[index]);
        }
    });

    if (selectedItems.length > 1) {
        // Save selected items to localStorage for the comparison page
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

        // Redirect to PriceScalePage.html for comparison
        window.location.href = "PriceScalePage.html";
    } else {
        alert('Pilih setidaknya dua produk untuk membandingkan.');
    }
}

function handleCheckout() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('.checkoutCheckbox');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            selectedItems.push(cart[index]);
        }
    });

    if (selectedItems.length > 1) {
        // Save selected items to localStorage for the comparison page
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

        // Redirect to PriceScalePage.html for comparison
        window.location.href = "PaymentPage.html";
    } else {
        alert('Pilih setidaknya dua produk untuk membandingkan.');
    }
}

document.getElementById('accountButton').addEventListener('click', function() {
    var navbar = document.getElementById('nav');
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});