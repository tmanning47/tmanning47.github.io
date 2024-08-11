function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            setCurrentPage();
            initializeNavigation();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
}

function initializeNavigation() {
    if (window.innerWidth > 980) {
        initializeDropdown();
    } else {
        initializeMobileNav();
    }
}

function initializeDropdown() {
    $('#nav > ul').dropotron({
        expandMode: 'hover',
        offsetY: -15,
        hoverDelay: 0,
        hideDelay: 350
    });
}

function initializeMobileNav() {
    const topLevelItems = document.querySelectorAll('#nav > ul > li');
    topLevelItems.forEach(item => {
        const link = item.querySelector('a');
        const subMenu = item.querySelector('ul');
        if (subMenu) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                subMenu.classList.toggle('active');
            });
        }
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('#nav > ul');
    nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
});

window.addEventListener('resize', initializeNavigation);