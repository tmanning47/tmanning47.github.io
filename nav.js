function loadHeader() {
                fetch('nav.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('nav-placeholder').innerHTML = data;
                        setCurrentPage();
                        initializeDropdown();
                        initializeMobileNav();
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
    const $window = $(window);
    const $body = $('body');

    // Title Bar.
    $(
        '<div id="titleBar">' +
            '<a href="#navPanel" class="toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
        '</div>'
    )
        .appendTo($body);

    // Navigation Panel.
    $(
        '<div id="navPanel">' +
            '<nav>' +
                $('#nav').navList() +
            '</nav>' +
        '</div>'
    )
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
}

$(window).on('resize', function() {
    if ($(window).width() <= 840) {
        initializeMobileNav();
    }
});

            document.addEventListener('DOMContentLoaded', loadHeader);