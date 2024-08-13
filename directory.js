document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const directoryContent = generateDirectory(data);
            document.getElementById('directory-content').innerHTML = directoryContent;
        })
        .catch(error => console.error('Error:', error));
});

function generateDirectory(navContent) {
    const parser = new DOMParser();
    const navDoc = parser.parseFromString(navContent, 'text/html');
    const navElement = navDoc.querySelector('#nav');

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
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            content += `<li><a href="${href}"${target ? ` target="${target}"` : ''}>${link.textContent}</a>`;
            
            if (item.querySelector('ul')) {
                content += `<h${headerLevel}>${link.textContent}</h${headerLevel}>`;
                content += generateSubList(item, headerLevel + 1);
            }
            
            content += '</li>';
        }
    });

    content += '</ul>';
    return content;
}