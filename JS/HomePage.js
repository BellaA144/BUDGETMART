document.addEventListener('DOMContentLoaded', () => {
    const adsMain = document.getElementById('adsMain');
    const ads = document.querySelectorAll('.AdsBox');
    let currentIndex = 0;

    function showNextAd() {
        currentIndex = (currentIndex + 1) % ads.length;
        const offset = -currentIndex * 100;
        adsMain.style.transform = `translateX(${offset}%)`;
    }

    setInterval(showNextAd, 3000); // Change the ad every 3 seconds
});

document.getElementById('accountButton').addEventListener('click', function() {
    var navbar = document.getElementById('nav');
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});
