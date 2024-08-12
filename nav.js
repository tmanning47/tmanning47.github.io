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
  const currentPage = window.location.pathname.split('/').filter(segment => segment !== '').join('/');
  const allNavLinks = document.querySelectorAll('#nav a');

  // Remove 'current' and 'current-parent' classes from all items
  allNavLinks.forEach(link => {
    link.classList.remove('current');
    link.closest('li').classList.remove('current', 'current-parent');
  });

  // Find the matching link
  const matchingLink = Array.from(allNavLinks).find(link => {
    const linkPath = link.getAttribute('href').split('/').filter(segment => segment !== '').join('/');
    return linkPath === currentPage;
  });

  if (matchingLink) {
    let current = matchingLink;
    current.classList.add('current');
    
    while (current && current !== document.querySelector('#nav')) {
      if (current.tagName === 'LI') {
        current.classList.add('current');
      }
      current = current.parentElement;
      if (current && current.tagName === 'LI') {
        current.classList.add('current-parent');
      }
    }
  } else if (currentPage === '') {
    // If on home page, mark Home as current
    const homeLink = document.querySelector('#nav > ul > li:first-child > a');
    if (homeLink) {
      homeLink.classList.add('current');
      homeLink.closest('li').classList.add('current');
    }
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setCurrentPage);

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