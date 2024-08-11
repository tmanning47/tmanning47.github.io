function loadHeader() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            initializeDropdown();
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

// Load the header when the page loads
document.addEventListener('DOMContentLoaded', loadHeader);