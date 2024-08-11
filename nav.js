function isMobileView() {
    return window.innerWidth <= 840 || (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            setCurrentPage();
            initializeDropdown();
            initializeMobileNav();
            // Add a slight delay to ensure everything is rendered
            setTimeout(checkViewportSize, 100);
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
    let $navPanel = $('#navPanel');
    let $titleBar = $('#titleBar');

    // If the elements don't exist, create them
    if (!$navPanel.length) {
        $navPanel = $('<div id="navPanel"><nav></nav></div>').appendTo($body);
    }
    if (!$titleBar.length) {
        $titleBar = $('<div id="titleBar"><a href="#navPanel" class="toggle"></a><span class="title"></span></div>').appendTo($body);
    }

    // Update the content
    $navPanel.find('nav').html($('#nav').html());
    $titleBar.find('.title').html($('#logo').html());

    // Initialize the panel
    $navPanel.panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'left',
        target: $body,
        visibleClass: 'navPanel-visible'
    });

    // Re-bind click events for mobile nav
    $titleBar.find('.toggle').off('click').on('click', function(e) {
        e.preventDefault();
        $body.toggleClass('navPanel-visible');
    });
}

function checkViewportSize() {
    if (isMobileView()) {
        $('#titleBar, #navPanel').show();
        $('#header').hide();
    } else {
        $('#titleBar, #navPanel').hide();
        $('#header').show();
    }
}


let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        checkViewportSize();
    }, 250);
});

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    // Add this line to check viewport size immediately
    setTimeout(checkViewportSize, 0);
});