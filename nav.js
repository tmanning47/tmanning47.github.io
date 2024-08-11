
function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            setCurrentPage();
            initializeDropdown();
        });
}

function setCurrentPage() {
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    const navItems = document.querySelectorAll('#nav > ul > li');

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const itemPath = link.getAttribute('href');
            console.log('Checking item:', itemPath);
            if (itemPath === currentPath || 
                (currentPath.endsWith('/') && itemPath === 'index.html') ||
                (currentPath.endsWith('.com') && itemPath === 'index.html') ||
                (currentPath === '/index.html' && itemPath === 'https://traviswmanning.com/') ||
                currentPath.includes(itemPath)) {
                console.log('Match found for:', itemPath);
                item.classList.add('current');
            } else {
                item.classList.remove('current');
            }
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

document.addEventListener('DOMContentLoaded', loadHeader);