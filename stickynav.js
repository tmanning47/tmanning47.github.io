window.addEventListener('scroll', function() {
    var header = document.getElementById('nav');
    var logo = document.getElementById('logo');
    if (window.pageYOffset > logo.offsetHeight) {
        header.style.top = '0';
    } else {
        header.style.top = '-100px'; // Should match the initial top value in CSS
    }
});