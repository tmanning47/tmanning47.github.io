document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const navDoc = parser.parseFromString(data, 'text/html');
            const navElement = navDoc.querySelector('#nav');

            if (navElement) {
                const directoryContent = generateDirectory(navElement);
                document.getElementById('directory-content').innerHTML = directoryContent;
            }
        })
        .catch(error => console.error('Error:', error));
});

function generateDirectory(navElement) {
    let content = '';
    const topLevelItems = navElement.querySelectorAll(':scope > ul > li');

    topLevelItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        if (link) {
            content += `<h2>${link.textContent}</h2>`;
            content += generateSubList(item, 3);
        }
    });

    return content;
}

function generateSubList(element, headerLevel) {
    let content = '<ul>';
    const items = element.querySelectorAll(':scope > ul > li');

    items.forEach(item => {
        const link = item.querySelector(':scope > a');
        if (link) {
            content += `<li><a href="${link.getAttribute('href')}"${link.getAttribute('target') ? ` target="${link.getAttribute('target')}"` : ''}>${link.textContent}</a></li>`;
            
            if (item.querySelector('ul')) {
                content += `<h${headerLevel}>${link.textContent}</h${headerLevel}>`;
                content += generateSubList(item, headerLevel + 1);
            }
        }
    });

    content += '</ul>';
    return content;
}