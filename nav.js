/*
					<!-- Nav -->
						<div id="nav-placeholder"></div> <!-- 	nav insert via nav.html and script -->
                        
        <!-- Nav only need one -->
        <script src="nav.js"></script>
        <script src="../nav.js"></script>
*/
function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            initializeDropdown();
            setCurrentPage();  // Call setCurrentPage after the nav is loaded
            initStickyNav();  // Initialize sticky nav after loading
        });
}
function setCurrentPage() {
    // Get the full path and current page filename
    const fullPath = window.location.pathname.toLowerCase();
    let currentPage = fullPath.split('/').pop();
    
    // Treat empty string (directory without index.html) as index.html
    if (currentPage === '' || currentPage === 'index.html') {
        currentPage = 'index.html';
    }
    
    console.log('Current page:', currentPage);
    
    const allNavLinks = document.querySelectorAll('#nav a');
    console.log('Total nav links found:', allNavLinks.length);
    
    // Remove 'current' class from all items
    allNavLinks.forEach(link => link.closest('li').classList.remove('current'));
    
    // Find the matching link
    const matchingLink = Array.from(allNavLinks).find(link => {
        const linkPage = link.getAttribute('href').split('/').pop().toLowerCase();
        console.log('Checking link:', linkPage, 'Text:', link.textContent);
        return linkPage === currentPage || (currentPage === 'index.html' && link.textContent.trim().toLowerCase() === 'home');
    });
    
    if (matchingLink) {
        console.log('Match found:', matchingLink.textContent);
        
        // Mark the matching link and its parents as current
        let current = matchingLink.closest('li');
        while (current && current !== document.querySelector('#nav')) {
            if (current.tagName === 'LI') {
                current.classList.add('current');
                console.log('Marked as current:', current.querySelector('a').textContent);
            }
            current = current.parentElement;
        }
    } else {
        console.log('No match found');
    }
    
    // Final check
    console.log('Elements with current class after execution:');
    document.querySelectorAll('#nav .current').forEach(el => {
        console.log(el.querySelector('a').textContent);
    });
}
/* debug current page
function setCurrentPage() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('#nav > ul > li');

  navItems.forEach(item => {
    const link = item.querySelector('a');
    const subItems = item.querySelector('ul');

    console.log('Current Path:', currentPath);
    console.log('Item:', item);
    console.log('Link:', link);
    console.log('Sub-items:', subItems);

    // ... rest of your function
  });
}
*/



            function initializeDropdown() {
                $('#nav > ul').dropotron({
                    expandMode: 'hover',
                    offsetY: -15,
                    hoverDelay: 0,
                    hideDelay: 350
                });
            }
function initStickyNav() {
    var navbar = document.getElementById("nav");
    var header = document.getElementById("header");
    
    if (!navbar || !header) {
        console.error("Navigation or header element not found");
        return;
    }

    var headerBottom = header.offsetTop + header.offsetHeight;
    var navbarHeight = navbar.offsetHeight;

    function makeNavSticky() {
        if (window.pageYOffset > headerBottom - navbarHeight) {
            navbar.classList.add("sticky");
            document.body.style.paddingTop = navbarHeight + "px";
        } else {
            navbar.classList.remove("sticky");
            document.body.style.paddingTop = "0";
        }
    }

    window.addEventListener('scroll', makeNavSticky);
    window.addEventListener('resize', () => {
        headerBottom = header.offsetTop + header.offsetHeight;
        navbarHeight = navbar.offsetHeight;
        makeNavSticky();
    });
    makeNavSticky(); // Run once to set initial state
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    // In case the nav is already in the DOM:
    if (document.getElementById('nav')) {
        setCurrentPage();
        initStickyNav();
    }
});