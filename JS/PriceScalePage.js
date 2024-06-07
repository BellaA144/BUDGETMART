document.addEventListener('DOMContentLoaded', () => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const wishlist = document.getElementById('wishlist');

    selectedItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="productList">
                <img src="${item.fotoProduk}" alt="${item.namaProduk}" width="50" height="50">
                <div class="product-details">
                    <span>${item.namaProduk}</span>
                    <span>${item.namaSupermarket}</span>
                    <span>${item.hargaProduk}</span>
                </div>
            </div>
        `;
        wishlist.appendChild(listItem);
    });
});

// Load products from JSON file
let products = [];

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        populateDropdown();
    });

// Populate dropdown with unique supermarket names
function populateDropdown() {
    const dropdown = document.getElementById('supermarket-dropdown');
    const supermarkets = [...new Set(products.map(product => product.namaSupermarket))];
    
    supermarkets.forEach(supermarket => {
        const option = document.createElement('option');
        option.value = supermarket;
        option.textContent = supermarket;
        dropdown.appendChild(option);
    });
}

// Handle ScalePrice button click
function scalePrice() {
    const selectedSupermarket = document.getElementById('supermarket-dropdown').value;
    const comparisonTableBody = document.querySelector('#comparison-table tbody');
    comparisonTableBody.innerHTML = ''; // Clear previous results

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Filter only products on wishlist from all supermarket
    const wishlistProducts = products.filter(product => 
            selectedItems.some(item => item.namaProduk === product.namaProduk)
    );
    console.log(wishlistProducts)
    
    // Filter products to only include those in the wishlist
    const ProductOnlyOnWishlish = products.filter(product =>
        selectedItems.some(item => item.namaProduk === product.namaProduk && item.namaSupermarket === product.namaSupermarket)  
    );
    console.log(ProductOnlyOnWishlish)

    // // Get products of selected supermarket that are in the wishlist
    const selectedProducts = wishlistProducts.filter(product => 
        product.namaSupermarket === selectedSupermarket
    );
    console.log(selectedProducts)
    
    selectedProducts.forEach(product => {
        const basedSupermarket = ProductOnlyOnWishlish.filter(wishlist =>
            wishlist.namaProduk === product.namaProduk
        );

        console.log(basedSupermarket)

        basedSupermarket.forEach(Compare => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${Compare.namaProduk}</td>
                <td><img src="${Compare.fotoProduk}" alt="${product.namaProduk}" width="50"></td>
                <td>${Compare.namaSupermarket}</td>
                <td>${Compare.hargaProduk}</td>
                <td>${selectedSupermarket}</td>
                <td>${product.hargaProduk}</td>
                <td>${product.hargaProduk < Compare.hargaProduk ? 'Murah' : (product.hargaProduk > Compare.hargaProduk ? 'Mahal' : 'Sama')}</td>
            `;
            comparisonTableBody.appendChild(row);
            console.log(comparisonTableBody)
        });

    });
    document.querySelector('.ScaleButton').style.opacity = 1;
}

function resetScale() {
    // Reset the opacity of the ScaleButton to 0
    document.querySelector('.ScaleButton').style.opacity = 0;

    // Optionally, clear any comparison results or reset other elements
    // For example, if you want to clear the comparison table:
    const tbody = document.querySelector('#comparison-table tbody');
    tbody.innerHTML = '';  // Clear all rows in the tbody

    // If you want to reset the dropdown or any other elements, add that logic here
    // For example, reset the dropdown to the first option:
    const dropdown = document.getElementById('supermarket-dropdown');
    dropdown.selectedIndex = 0;
}

function replaceBest() {
    const rows = document.querySelectorAll('#comparison-table tbody tr');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    rows.forEach(row => {
        const comparisonResult = row.cells[6].textContent.trim();
        if (comparisonResult === 'Murah') {
            const productName = row.cells[0].textContent.trim();
            const newSupermarket = row.cells[4].textContent.trim();
            const newPrice = row.cells[5].textContent.trim();
            const newImage = row.cells[1].querySelector('img').src;

            // Find the corresponding item in the selectedItems array and update it
            const itemIndex = selectedItems.findIndex(item => item.namaProduk === productName);
            if (itemIndex > -1) {
                selectedItems[itemIndex] = {
                    ...selectedItems[itemIndex],
                    namaSupermarket: newSupermarket,
                    hargaProduk: newPrice,
                    fotoProduk: newImage
                };
            }
        }
    });

    // Update localStorage with the new selectedItems array
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // Optionally, update the displayed wishlist to reflect changes
    const wishlist = document.getElementById('wishlist');
    wishlist.innerHTML = '';
    selectedItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="productList">
                <img src="${item.fotoProduk}" alt="${item.namaProduk}" width="50" height="50">
                <div class="product-details">
                    <span>${item.namaProduk}</span>
                    <span>${item.namaSupermarket}</span>
                    <span>${item.hargaProduk}</span>
                </div>
            </div>
        `;
        wishlist.appendChild(listItem);
    });
}

function replaceAll() {
    const rows = document.querySelectorAll('#comparison-table tbody tr');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    rows.forEach(row => {
        const productName = row.cells[0].textContent.trim();
        const newSupermarket = row.cells[4].textContent.trim();
        const newPrice = row.cells[5].textContent.trim();
        const newImage = row.cells[1].querySelector('img').src;

        // Find the corresponding item in the selectedItems array and update it
        const itemIndex = selectedItems.findIndex(item => item.namaProduk === productName);
        if (itemIndex > -1) {
            selectedItems[itemIndex] = {
                ...selectedItems[itemIndex],
                namaSupermarket: newSupermarket,
                hargaProduk: newPrice,
                fotoProduk: newImage
            };
        }
    });

    // Update localStorage with the new selectedItems array
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // Optionally, update the displayed wishlist to reflect changes
    const wishlist = document.getElementById('wishlist');
    wishlist.innerHTML = '';
    selectedItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="productList">
                <img src="${item.fotoProduk}" alt="${item.namaProduk}" width="50" height="50">
                <div class="product-details">
                    <span>${item.namaProduk}</span>
                    <span>${item.namaSupermarket}</span>
                    <span>${item.hargaProduk}</span>
                </div>
            </div>
        `;
        wishlist.appendChild(listItem);
    });
}

function checkout() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    // Update selectedItems with the items in the wishlist
    const wishlistItems = document.querySelectorAll('#wishlist .productList');
    wishlistItems.forEach(item => {
        const productName = item.querySelector('.product-details span:nth-child(1)').textContent.trim();
        const supermarketName = item.querySelector('.product-details span:nth-child(2)').textContent.trim();
        const productPrice = item.querySelector('.product-details span:nth-child(3)').textContent.trim();
        const productImage = item.querySelector('img').src;

        const existingItemIndex = selectedItems.findIndex(selectedItem => selectedItem.namaProduk === productName);
        if (existingItemIndex !== -1) {
            // Update existing item in selectedItems
            selectedItems[existingItemIndex].namaSupermarket = supermarketName;
            selectedItems[existingItemIndex].hargaProduk = productPrice;
            selectedItems[existingItemIndex].fotoProduk = productImage;
        } else {
            // Add new item to selectedItems
            selectedItems.push({
                namaProduk: productName,
                namaSupermarket: supermarketName,
                hargaProduk: productPrice,
                fotoProduk: productImage
            });
        }
    });

    // Update localStorage with the new selectedItems array
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // Redirect to Payment.html
    window.location.href = 'PaymentPage.html';
}