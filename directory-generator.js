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

    return generateList(navElement.querySelector('ul'), 0);
}

function generateList(ul, depth) {
    let content = '<div class="indent-' + depth + '">';
    const items = ul.children;

    for (let item of items) {
        const link = item.querySelector(':scope > a');
        if (link) {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();

            if (href && href !== '#') {
                content += `<p><a href="${href}"${link.getAttribute('target') ? ` target="${link.getAttribute('target')}"` : ''}>${text}</a></p>`;
            } else {
                content += `<p><strong>${text}</strong></p>`;
            }

            const subUl = item.querySelector(':scope > ul');
            if (subUl) {
                content += generateList(subUl, depth + 1);
            }
        }
    }

    content += '</div>';
    return content;
}