
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
                    if (link) {
                        const itemPath = link.getAttribute('href');
                        if (itemPath === currentPath || 
                            (currentPath.endsWith('/') && itemPath === 'index.html') ||
                            (currentPath === '/index.html' && itemPath === 'https://traviswmanning.com/') ||
                            currentPath.includes(itemPath)) {
                            item.classList.add('current');
                        } else {
                            item.classList.remove('current');
                        }
                    }
                });
            }
function initializeDropdown() {
  const navList = document.getElementById('nav');

  navList.addEventListener('touchstart', (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.parentNode.classList.contains('dropdown')) {
      event.preventDefault();
      target.parentNode.classList.toggle('active');
    }
  }, { passive: false }); // Prevent default behavior to prevent scrolling
}

            document.addEventListener('DOMContentLoaded', loadHeader);
