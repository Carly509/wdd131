document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
});


document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-content')) {
        navMenu.classList.remove('show');
        hamburger.textContent = '☰';
    }
});


const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        hamburger.textContent = '☰';
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) {
        navMenu.classList.remove('show');
        hamburger.textContent = '☰';
    }
});
