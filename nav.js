function loadHeader(callback) {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            setCurrentPage();
            initializeDropdown();
            if (callback) callback();
        });
}

            function setCurrentPage() {
                const currentPath = window.location.pathname;
                const navItems = document.querySelectorAll('#nav > ul > li');

                navItems.forEach(item => {
                    const link = item.querySelector('a');
                    if (link) {
                        const itemPath = link.getAttribute('href');
                        if (itemPath === currentPath || 
                            (currentPath.endsWith('/') && itemPath === 'index.html') ||
                            (currentPath.endsWith('.com') && itemPath === 'index.html') ||
                            (currentPath === '/index.html' && itemPath === 'https://traviswmanning.com/') ||
                            currentPath.includes(itemPath)) {
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
function initializeMobileNav() {
    const $body = $('body');
    const $navPanel = $('#navPanel');
    const $titleBar = $('#titleBar');

    // If the elements already exist, remove them
    if ($navPanel.length) $navPanel.remove();
    if ($titleBar.length) $titleBar.remove();

    // Title Bar
    $('<div id="titleBar">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '<span class="title">' + $('#logo').html() + '</span>' +
    '</div>')
        .appendTo($body);

    // Navigation Panel
    $('<div id="navPanel">' +
        '<nav>' +
            $('#nav').html() +
        '</nav>' +
    '</div>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        });

    // Fix: Re-bind click events for mobile nav
    $('#titleBar .toggle').on('click', function(e) {
        e.preventDefault();
        $body.toggleClass('navPanel-visible');
    });
}



document.addEventListener('DOMContentLoaded', function() {
    loadHeader(function() {
        initializeMobileNav();
    });
});

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth <= 840) {
            initializeMobileNav();
        }
    }, 250);
});