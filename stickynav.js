function initStickyNav() {
    // Get the navbar
    var navbar = document.getElementById("nav");
    
    if (!navbar) {
        console.error("Navigation element not found");
        return;
    }

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.scrollY >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

    // When the user scrolls the page, execute myFunction
    window.onscroll = myFunction;

    // Run once to set initial state
    myFunction();
}

// Call this function after your nav has been loaded
document.addEventListener('DOMContentLoaded', function() {
    // Assuming you're using jQuery to load the nav
    $("#nav-placeholder").load("nav.html", function() {
        initStickyNav();
    });
});