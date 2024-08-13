document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, starting fetch...');
    fetch('nav.html')
        .then(response => {
            console.log('Fetch response received:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Data received, length:', data.length);
            const directoryContent = generateDirectory(data);
            console.log('Directory content generated, length:', directoryContent.length);
            const contentDiv = document.getElementById('directory-content');
            if (contentDiv) {
                contentDiv.innerHTML = directoryContent;
                console.log('Content inserted into page');
            } else {
                console.error('Could not find #directory-content element');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('directory-content').innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
});

function generateDirectory(navContent) {
    console.log('Generating directory...');
    const parser = new DOMParser();
    const navDoc = parser.parseFromString(navContent, 'text/html');
    const navElement = navDoc.querySelector('#nav');

    if (!navElement) {
        console.error('No #nav element found in parsed content');
        return '<p>Error: Navigation structure not found</p>';
    }

    let content = '';
    const topLevelItems = navElement.querySelectorAll(':scope > ul > li');
    console.log('Number of top-level items:', topLevelItems.length);

    topLevelItems.forEach((item, index) => {
        const link = item.querySelector(':scope > a');
        if (link) {
            console.log(`Processing item ${index + 1}:`, link.textContent);
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