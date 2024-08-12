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

  // Find all matching links (for nested paths)
  const matchingLinks = Array.from(allNavLinks).filter(link => {
    const linkPath = link.getAttribute('href').split('/').filter(segment => segment !== '').join('/');
    return currentPage.startsWith(linkPath);
  });

  if (matchingLinks.length > 0) {
    // Sort matching links by length (descending) to get the most specific match first
    matchingLinks.sort((a, b) => b.getAttribute('href').length - a.getAttribute('href').length);

    const exactMatch = matchingLinks.find(link => 
      link.getAttribute('href').split('/').filter(segment => segment !== '').join('/') === currentPage
    );

    if (exactMatch) {
      exactMatch.classList.add('current');
    }

    matchingLinks.forEach(link => {
      let current = link.closest('li');
      while (current && !current.matches('#nav')) {
        if (current.tagName === 'LI') {
          if (link === exactMatch) {
            current.classList.add('current');
          } else {
            current.classList.add('current-parent');
          }
        }
        current = current.parentElement;
      }
    });
  } else if (currentPage === '') {
    // If on home page, mark Home as current
    const homeLink = document.querySelector('#nav > ul > li:first-child > a');
    if (homeLink) {
      homeLink.classList.add('current');
      homeLink.closest('li').classList.add('current');
    }
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