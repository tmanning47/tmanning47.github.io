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
    console.log('Initializing navigation');
    initializeDropdown();
    initializeMobileNav();
}

function initializeDropdown() {
    if (window.innerWidth > 980 && $.fn.dropotron) {
        $('#nav > ul').dropotron({
            expandMode: 'hover',
            offsetY: -15,
            hoverDelay: 0,
            hideDelay: 350
        });
    }
}

function initializeMobileNav() {
    console.log('Initializing mobile nav');
    const topLevelItems = document.querySelectorAll('#nav > ul > li');
    topLevelItems.forEach(item => {
        const link = item.querySelector('a');
        const subMenu = item.querySelector('ul');
        if (subMenu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 980) {
                    e.preventDefault();
                    subMenu.classList.toggle('active');
                }
            });
        }
    });
}

function initializeDropdown() {
    $('#nav > ul').dropotron({
        expandMode: 'hover',
        offsetY: -15,
        hoverDelay: 0,
        hideDelay: 350
    });
}




document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
});

function toggleMobileMenu() {
    console.log('Toggling mobile menu');
    const nav = document.querySelector('#nav > ul');
    if (nav) {
        nav.classList.toggle('active');
    } else {
        console.error('Navigation menu not found');
    }
}

window.addEventListener('resize', initializeNavigation);