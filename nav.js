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

    const allNavLinks = document.querySelectorAll('#nav a');
    let matchFound = false;

    console.log('Total nav links found:', allNavLinks.length);

    // First, remove 'current' class from all items
    allNavLinks.forEach(link => {
        const li = link.closest('li');
        if (li.classList.contains('current')) {
            console.log('Removing current class from:', link.textContent);
            li.classList.remove('current');
        }
    });

    // Check all links, including sub-items
    for (let link of allNavLinks) {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/^\//, '').toLowerCase();
        console.log('Checking link:', linkPath, 'Text:', link.textContent);

        // Skip links that are just "#" or javascript:void(0)
        if (linkPath === '/' || linkPath.includes('javascript:void(0)')) {
            console.log('Skipping placeholder link:', link.textContent);
            continue;
        }

        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            console.log('Match found:', linkPath, 'Text:', link.textContent);
            
            // Mark the immediate parent li as current
            const parentLi = link.closest('li');
            parentLi.classList.add('current');
            console.log('Marked as current:', parentLi.textContent);
            
            // Also mark all parent li elements up to the top level
            let parent = parentLi.parentElement;
            while (parent && parent !== document.querySelector('#nav > ul')) {
                if (parent.tagName === 'LI') {
                    parent.classList.add('current');
                    console.log('Also marked as current:', parent.querySelector('a').textContent);
                }
                parent = parent.parentElement;
            }

            matchFound = true;
            break;
        }
    }

    // If no match found and we're not on the home page, set Home as current
    if (!matchFound && currentPath !== '' && currentPath !== 'index.html') {
        console.log('No match found, setting Home as current');
        const homeItem = document.querySelector('#nav > ul > li:first-child');
        if (homeItem) {
            homeItem.classList.add('current');
            console.log('Marked Home as current');
        }
    }

    // Final check
    console.log('Elements with current class after execution:');
    document.querySelectorAll('#nav .current').forEach(el => {
        console.log(el.textContent);
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