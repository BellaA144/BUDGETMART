document.addEventListener('DOMContentLoaded', () => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const tbody = document.querySelector('#product-display tbody');
    const totalItemsEl = document.getElementById('total-items');
    const totalPriceEl = document.getElementById('total-price');
    const shippingCostEl = document.getElementById('shipping-cost');
    const discountEl = document.getElementById('discount');
    const totalOverallEl = document.getElementById('total-overall');

    tbody.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    selectedItems.forEach((item, index) => {
        const jumlahProduk = 1;  // Set jumlahProduk to 1
        const totalHarga = item.hargaProduk * jumlahProduk;  // Calculate totalHarga

        totalItems += jumlahProduk;
        totalPrice += totalHarga;

        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${item.namaSupermarket}</td>
            <td>${item.namaProduk}</td>
            <td>${item.hargaProduk}</td>
            <td class="jumlah-produk" data-index="${index}">${jumlahProduk}</td>
            <td class="total-harga">${totalHarga}</td>
            <td><button class="edit-button" data-index="${index}">Edit</button></td>
        `;
        
        tbody.appendChild(tr);
    });

    totalItemsEl.textContent = totalItems;
    totalPriceEl.textContent = totalPrice;

    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            editProduct(index, selectedItems);
        });
    });

    // Update summary whenever delivery or voucher dropdowns change
    document.getElementById('deliver-dropdown').addEventListener('change', updateSummary);
    document.getElementById('voucher-dropdown').addEventListener('change', updateSummary);

    function editProduct(index, selectedItems) {
        const tbody = document.querySelector('#product-display tbody');
        const tr = tbody.querySelectorAll('tr')[index];
        const jumlahProdukTd = tr.querySelector('.jumlah-produk');
        const totalHargaTd = tr.querySelector('.total-harga');
        const hargaProduk = selectedItems[index].hargaProduk;

        // Replace the jumlahProduk cell with an input field
        jumlahProdukTd.innerHTML = `<input type="number" value="${jumlahProdukTd.textContent}" min="1" class="edit-jumlah">`;

        const input = jumlahProdukTd.querySelector('.edit-jumlah');

        input.addEventListener('change', (event) => {
            const newJumlah = parseInt(event.target.value);
            const newTotalHarga = hargaProduk * newJumlah;

            // Update the totalHarga cell
            totalHargaTd.textContent = newTotalHarga;

            // Revert the input field back to text
            jumlahProdukTd.textContent = newJumlah;

            // Optionally update the selectedItems array and localStorage
            selectedItems[index].jumlahProduk = newJumlah;
            selectedItems[index].totalHarga = newTotalHarga;
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

            // Update total items and price
            updateSummary();
        });
    }

    function deliverDropDown() {
        const deliverChoose = document.getElementById('deliver-dropdown');

        // Buat opsi pertama
        const option1 = document.createElement('option');
        option1.value = 'deliver-choose';
        option1.textContent = 'Deliver Choose';
        deliverChoose.appendChild(option1);

        // Buat opsi kedua
        const option2 = document.createElement('option');
        option2.value = 'instant';
        option2.textContent = 'Instan (5000 per km)';
        deliverChoose.appendChild(option2);
        
        // Buat opsi ketiga
        const option3 = document.createElement('option');
        option3.value = 'same-day';
        option3.textContent = 'Same Day (2000 per km)';
        deliverChoose.appendChild(option3);
    }

    function voucherDropDown() {
        const voucherChoose = document.getElementById('voucher-dropdown');

        // Buat opsi pertama
        const option1 = document.createElement('option');
        option1.value = 'voucher-choose';
        option1.textContent = 'Voucher Choose';
        voucherChoose.appendChild(option1);
        
        // Buat opsi kedua
        const option2 = document.createElement('option');
        option2.value = 'SUPER5';
        option2.textContent = 'Super5 - 5% Discount';
        voucherChoose.appendChild(option2);

        // Buat opsi ketiga
        const option3 = document.createElement('option');
        option3.value = 'DISKON10';
        option3.textContent = 'Diskon10 - 10% Discount';
        voucherChoose.appendChild(option3);

        // Buat opsi keempat
        const option4 = document.createElement('option');
        option4.value = 'MURAH15';
        option4.textContent = 'Murah15 - 15% Discount';
        voucherChoose.appendChild(option4);

        // Buat opsi kelima
        const option5 = document.createElement('option');
        option5.value = 'HEMAT20';
        option5.textContent = 'Hemat20 - 20% Discount';
        voucherChoose.appendChild(option5);

        // Buat opsi keenam
        const option6 = document.createElement('option');
        option6.value = 'PROMO25';
        option6.textContent = 'Promo - 25% Discount';
        voucherChoose.appendChild(option6);
    }

    function updateSummary() {
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        let totalItems = 0;
        let totalPrice = 0;

        selectedItems.forEach(item => {
            totalItems += item.jumlahProduk || 1;
            totalPrice += item.totalHarga || item.hargaProduk * (item.jumlahProduk || 1);
        });

        totalItemsEl.textContent = totalItems;
        totalPriceEl.textContent = totalPrice;

        const deliveryMethod = document.getElementById('deliver-dropdown').value;
        let shippingCost = 0;

        if (deliveryMethod === 'instant') {
            shippingCost = 5000 * 5; // Assuming 5 km distance for calculation
        } else if (deliveryMethod === 'same-day') {
            shippingCost = 2000 * 5; // Assuming 5 km distance for calculation
        }
        shippingCostEl.textContent = shippingCost;

        const serviceFee = 1000;
        const selectedVoucher = document.getElementById('voucher-dropdown').value;
        let discountRate = 0;

        if (selectedVoucher === 'MURAH15') {
            discountRate = 0.15;
        } else if (selectedVoucher === 'SUPER5') {
            discountRate = 0.05;
        } else if (selectedVoucher === 'DISKON10') {
            discountRate = 0.10;
        } else if (selectedVoucher === 'HEMAT20') {
            discountRate = 0.20;
        } else if (selectedVoucher === 'PROMO25') {
            discountRate = 0.25;
        }

        const discount = totalPrice * discountRate;
        discountEl.textContent = discount;

        const totalOverall = totalPrice + shippingCost + serviceFee - discount;
        totalOverallEl.textContent = totalOverall;

         // Store totalOverall in localStorage for access in summaryResult
        localStorage.setItem('totalOverall', totalOverall);
    }

    deliverDropDown();
    voucherDropDown();
    updateSummary();
    
});

function summaryResult() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const totalOverall = localStorage.getItem('totalOverall') || 0;

    alert(`Pembelanjaan sukses dilakukan!\nProduk yang dibeli:\n${selectedItems.map(item => item.namaProduk).join(', ')}\nTotal Pembayaran: ${totalOverall}`);

    // Dapatkan data riwayat pembelian sebelumnya dari localStorage
    const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    // Tambahkan data checkout yang baru ke dalam history
    const newEntry = {
        date: new Date().toLocaleString(),
        items: selectedItems,
        total: totalOverall
    };
    history.push(newEntry);

    // Simpan kembali ke localStorage
    localStorage.setItem('purchaseHistory', JSON.stringify(history));

    // Redirect to HomePage.html
    window.location.href = 'index.html';
}

document.getElementById('accountButton').addEventListener('click', function() {
    var navbar = document.getElementById('nav');
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});