function loadHeader() {
                fetch('nav.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('nav-placeholder').innerHTML = data;
                        setCurrentPage();
                        initializeDropdown();
                    });
            }
/*
function setCurrentPage() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('#nav > ul > li');

  navItems.forEach(item => {
    const link = item.querySelector('a');
    const subItems = item.querySelector('ul');

    // Check for direct match (including empty path for Home)
    if (link && link.getAttribute('href') === currentPath) {
      item.classList.add('current');
      return; // Exit the loop if a direct match is found
    }

    // Check for sub-items
    if (subItems) {
      const subLinks = subItems.querySelectorAll('li a');
      let hasActiveSubItem = false;

      subLinks.forEach(subLink => {
        const subItemPath = subLink.getAttribute('href');
        if (subItemPath === currentPath) {
          hasActiveSubItem = true;
        }
      });

      if (hasActiveSubItem) {
        item.classList.add('current');
      } else {
        item.classList.remove('current');
      }
    } else {
      item.classList.remove('current');
    }
  });
}

*/
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

function setCurrentPage() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('#nav > ul > li');

  navItems.forEach(item => {
    const link = item.querySelector('a');
    const subItems = item.querySelector('ul');

    // Remove trailing slashes for consistent comparison
    const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;

    // Check for direct match (including empty path for Home)
    if (link) {
      const itemPath = link.getAttribute('href');
      const normalizedItemPath = itemPath.endsWith('/') ? itemPath.slice(0, -1) : itemPath;

      if (normalizedItemPath === normalizedCurrentPath || (normalizedItemPath === 'index.html' && normalizedCurrentPath === '/')) {
        item.classList.add('current');
        return; // Exit the loop if a direct match is found
      }

      // Check for sub-items
      if (subItems) {
        // ... rest of your sub-item logic
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

            document.addEventListener('DOMContentLoaded', loadHeader);