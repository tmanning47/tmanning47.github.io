function loadHeader() {
                fetch('nav.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('nav-placeholder').innerHTML = data;
                        setCurrentPage();
                        initializeDropdown();
                    });
            }

function setCurrentPage() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('#nav > ul > li');

  navItems.forEach(item => {
    const link = item.querySelector('a');
    const subItems = item.querySelector('ul');

    if (link) {
      const itemPath = link.getAttribute('href');

      // Check for direct match (including empty path for Home)
      if ((itemPath === currentPath) || (itemPath === '' && currentPath === '/')) {
        item.classList.add('current');
        return; // Exit the loop if a direct match is found
      }

      // Check for sub-items
      if (subItems) {
        const subLinks = subItems.querySelectorAll('li a');
        subLinks.forEach(subLink => {
          const subItemPath = subLink.getAttribute('href');
          if (subItemPath === currentPath) {
            item.classList.add('current');
            return; // Exit the loop if a sub-item match is found
          }
        });
      }

      // No match, remove the 'current' class
      item.classList.remove('current');
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