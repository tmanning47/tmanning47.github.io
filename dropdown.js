
                    function initializeDropdown() {
                        // Or, if you're using a custom dropdown, you might do something like:
                        const dropdowns = document.querySelectorAll('.dropdown-toggle');
                        dropdowns.forEach(dropdown => {
                            dropdown.addEventListener('click', function() {
                                this.nextElementSibling.classList.toggle('show');
                            });
                        });
                    }
                // Call this when the page loads
                loadHeader();