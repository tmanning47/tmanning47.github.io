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
  const currentPage = window.location.pathname.split('/').pop();
  const allNavLinks = document.querySelectorAll('#nav a');

  // Remove 'current' and 'current-parent' classes from all items
  allNavLinks.forEach(link => {
    link.classList.remove('current');
    link.closest('li').classList.remove('current', 'current-parent');
  });

  // Find the matching link
  const matchingLink = Array.from(allNavLinks).find(link => {
    return link.getAttribute('href') === currentPage || 
           (currentPage === '' && link.getAttribute('href') === 'index.html');
  });

  if (matchingLink) {
    highlightCurrentAndParents(matchingLink);
  } else if (currentPage === '' || currentPage === 'index.html') {
    // If on home page, mark Home as current
    const homeLink = document.querySelector('#nav > ul > li:first-child > a');
    if (homeLink) {
      highlightCurrentAndParents(homeLink);
    }
  }
}

function highlightCurrentAndParents(element) {
  element.classList.add('current');
  let current = element.closest('li');
  
  while (current && !current.matches('#nav')) {
    if (current.tagName === 'LI') {
      current.classList.add('current');
      
      // Add 'current-parent' to the parent of a submenu
      const parentLi = current.parentElement.closest('li');
      if (parentLi) {
        parentLi.classList.add('current-parent');
      }
    }
    current = current.parentElement;
  }
}


// Also call the function when the URL changes without a page reload (for single-page applications)
window.addEventListener('popstate', setCurrentPage);


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