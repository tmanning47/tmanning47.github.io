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
  const currentPathSegments = window.location.pathname.split('/').filter(segment => segment !== '');

  function findCurrentItem(items, pathSegments) {
    for (const item of items) {
      const link = item.querySelector('a');
      const linkPathSegments = link.href.split('/').filter(segment => segment !== '');

      if (linkPathSegments.length === pathSegments.length && linkPathSegments.every((segment, index) => segment === pathSegments[index])) {
        item.classList.add('current');
        return item;
      } else if (item.querySelector('ul')) {
        const childItem = findCurrentItem(item.querySelector('ul').children, pathSegments);
        if (childItem) {
          item.classList.add('current'); // Highlight parent item
          return childItem;
        }
      }
    }
    return null;
  }

  const navItems = document.querySelectorAll('#nav > ul > li');
  findCurrentItem(navItems, currentPathSegments);
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