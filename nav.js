function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            initializeDropdown();
            setCurrentPage();  // Call setCurrentPage after the nav is loaded
        });
}

function setCurrentPage() {
    const currentPath = window.location.pathname.replace(/^\//, '').toLowerCase();
    console.log('Current path:', currentPath);

    const navItems = document.querySelectorAll('#nav > ul > li');
    let matchFound = false;

    navItems.forEach(item => {
        const link = item.querySelector('a');
        const subItems = item.querySelectorAll('ul li a');
        
        item.classList.remove('current');  // Reset current state

        if (link) {
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/^\//, '').toLowerCase();
            console.log('Checking main link:', linkPath);

            if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                console.log('Match found for main link');
                item.classList.add('current');
                matchFound = true;
                return;  // Exit the forEach loop if main link matches
            }
        }

        // Check sub-items only if no match has been found yet
        if (!matchFound) {
            for (let subLink of subItems) {
                const subLinkPath = new URL(subLink.href, window.location.origin).pathname.replace(/^\//, '').toLowerCase();
                console.log('Checking sub-link:', subLinkPath);

                if (currentPath === subLinkPath) {
                    console.log('Match found for sub-link');
                    item.classList.add('current');
                    matchFound = true;
                    break;  // Exit the for loop if sub-link matches
                }
            }
        }

        if (matchFound) return;  // Exit the forEach loop if any match is found
    });

    // If no match found and we're not on the home page, set Home as current
    if (!matchFound && currentPath !== '' && currentPath !== 'index.html') {
        console.log('No match found, setting Home as current');
        const homeItem = document.querySelector('#nav > ul > li:first-child');
        if (homeItem) homeItem.classList.add('current');
    }
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