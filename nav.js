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
        expandMode: 'click',
        offsetY: -15,
        hoverDelay: 0,
        hideDelay: 350,
        submenuClassNames: 'dropotron',
        mode: 'fade',
        speed: 'fast',
        breakpoints: {
            1024: {
                offsetY: -5
            },
            768: {
                mode: 'none',
                expandMode: 'click'
            }
        }
    });

    $('#nav li:has(ul)').on('touchstart', function(e) {
        if (!$(this).hasClass('sfHover')) {
            e.preventDefault();
            $(this).addClass('sfHover');
        }
    });

    $(document).on('touchstart', function(e) {
        if (!$(e.target).closest('#nav').length) {
            $('#nav li.sfHover').removeClass('sfHover');
        }
    });
}

function reinitializeOnResize() {
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            $('#nav > ul').dropotron('destroy');
            initializeDropdown();
        }, 250);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    reinitializeOnResize();
});