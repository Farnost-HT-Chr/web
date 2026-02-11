document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const hamburgerClose = document.querySelector('.hamburger-close');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    if (hamburger && mobileMenu && hamburgerClose) {
        function openMobileMenu() {
            mobileMenu.classList.add('open');
            body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        }

        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = mobileMenu.classList.contains('open');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        hamburgerClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close on scroll
        window.addEventListener('scroll', () => {
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        // Close when clicking menu links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
                hamburger.focus();
            }
        });

        // Submenu toggles
        const submenuToggles = mobileMenu.querySelectorAll('.submenu-toggle');
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const submenu = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close sibling submenus
                const parent = this.parentElement.parentElement;
                const siblings = parent.querySelectorAll(':scope > li > .submenu-toggle');
                siblings.forEach(sibling => {
                    if (sibling !== toggle) {
                        sibling.setAttribute('aria-expanded', 'false');
                        const siblingSubmenu = sibling.nextElementSibling;
                        if (siblingSubmenu) {
                            siblingSubmenu.classList.remove('active');
                        }
                    }
                });
                
                this.setAttribute('aria-expanded', !isExpanded);
                if (submenu) {
                    submenu.classList.toggle('active');
                }
            });
        });
    }

    const btn = document.getElementById("scrollTopBtn");

    if (btn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btn.classList.add("show");
            } else {
                btn.classList.remove("show");
            }
        });

        btn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (window.matchMedia("(max-width: 768px)").matches) {
        let lastScroll = 0;
        let scrollDistance = 0;
        const hamburg = document.querySelector('.hamburger');
        const threshold = 200;

        if (hamburg) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScroll > lastScroll) {
                    scrollDistance += currentScroll - lastScroll;
                    if (scrollDistance > threshold) {
                        hamburg.classList.add('hide');
                    }
                } else {
                    scrollDistance = 0;
                    hamburg.classList.remove('hide');
                }

                lastScroll = currentScroll;
            });
        }

        window.addEventListener('scroll', function () {
            const navBar = document.querySelector('.nav-bar');
            if (navBar) {
                if (window.innerHeight / 2.5 < window.scrollY) {
                    navBar.style.display = 'none';
                } else {
                    navBar.style.display = 'flex';
                    navBar.style.backgroundColor = '#e4cea1';
                }
            }

            const bottomBar = document.querySelector('.bottom-bar');
            if (bottomBar) {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight;

                if (scrollTop > 0 && window.scrollY + window.innerHeight >= docHeight - 300 && window.scrollY > 50) {
                    bottomBar.style.display = 'flex';
                } else {
                    bottomBar.style.display = 'none';
                }
            }
        });
    }

    // Tile click functionality for index page
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (tile.classList.contains("active")) {
                tile.classList.remove("active");
            } else {
                tiles.forEach((t) => t.classList.remove("active"));
                tile.classList.add("active");
            }
        });
    });
});