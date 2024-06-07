document.addEventListener('DOMContentLoaded', function() {
    const historyContainer = document.querySelector('.HistoryList');
    const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    history.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('HistoryEntry');

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('HistoryDate');
        dateDiv.textContent = `Date: ${entry.date}`;
        entryDiv.appendChild(dateDiv);

        const itemsDiv = document.createElement('div');
        itemsDiv.classList.add('HistoryItems');
        itemsDiv.textContent = `Items: ${entry.items.map(item => item.namaProduk).join(', ')}`;
        entryDiv.appendChild(itemsDiv);

        const totalDiv = document.createElement('div');
        totalDiv.classList.add('HistoryTotal');
        totalDiv.textContent = `Total: ${entry.total}`;
        entryDiv.appendChild(totalDiv);

        historyContainer.appendChild(entryDiv);
    });
});

document.getElementById('accountButton').addEventListener('click', function() {
    var navbar = document.getElementById('nav');
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});