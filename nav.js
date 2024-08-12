/*
					<!-- Nav -->
						<div id="nav-placeholder"></div> <!-- 	nav insert via nav.html and script -->
                        
        <!-- Nav only need one -->
        <script src="nav.js"></script>
        <script src="../nav.js"></script>
*/
function loadHeader() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (!navPlaceholder) return;

    const navPath = navPlaceholder.dataset.navPath || 'nav.html';
    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;
            initializeDropdown();
            setCurrentPage();
        })
        .catch(error => console.error('Error loading nav:', error));
}

function setCurrentPage() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    console.log('Current page:', currentPage);

    const allNavLinks = document.querySelectorAll('#nav a');
    console.log('Total nav links found:', allNavLinks.length);

    // Remove 'current' class from all items
    allNavLinks.forEach(link => link.closest('li').classList.remove('current'));

    // Find the matching link
const matchingLink = Array.from(allNavLinks).find(link => {
    const linkPage = link.getAttribute('href').split('/').pop().toLowerCase();
    return linkPage === currentPage || (currentPage === 'index.html' && linkPage === '');
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
    } else if (currentPage === '' || currentPage === 'index.html') {
        // If on home page, mark Home as current
        const homeLink = document.querySelector('#nav > ul > li:first-child');
        if (homeLink) {
            homeLink.classList.add('current');
            console.log('Marked Home as current');
        }
        }
        else {
        // Fallback: highlight the parent directory
        const parentDir = window.location.pathname.split('/').slice(-2, -1)[0].toLowerCase();
        const parentLink = Array.from(allNavLinks).find(link => 
            link.getAttribute('href').toLowerCase().includes(parentDir)
        );
        if (parentLink) {
            parentLink.closest('li').classList.add('current');
        }
        }
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

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    // In case the nav is already in the DOM:
    if (document.getElementById('nav')) {
        setCurrentPage();
    }
});