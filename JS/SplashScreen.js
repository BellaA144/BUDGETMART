document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.splashLayer').classList.add('hide-bg');
        document.querySelector('.splashCircle').classList.add('expand-img');
    }, 1000);

    setTimeout(() => {
        window.location.href = "LoginPage.html";
    }, 4000);
});
