document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const hamburgerClose = document.querySelector('.hamburger-close');
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.querySelector('#g-navigation nav ul');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle('open');
    }

    hamburgerClose.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    hamburger.addEventListener('click', (e) => {
        toggleMenu();
        e.stopPropagation();
    });

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('open')) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });

    window.addEventListener('scroll', () => {
        if (mobileMenu.classList.contains('open')) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    const btn = document.getElementById("scrollTopBtn");

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

    if (window.matchMedia("(max-width: 768px)").matches) {
        let lastScroll = 0;
        let scrollDistance = 0;
        const hamburg = document.querySelector('.hamburger');
        const threshold = 200;

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

        window.addEventListener('scroll', function () {
            var navBar = document.querySelector('.nav-bar');
            if (window.innerHeight / 2.5 < window.scrollY) {
                navBar.style.display = 'none';
            } else {
                navBar.style.display = 'flex';
                navBar.style.backgroundColor = '#e4cea1';
            }

            const bottomBar = document.querySelector('.bottom-bar');
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const isAtBottom = window.scrollY + window.innerHeight >= docHeight - 300;

            if (scrollTop > 0 && window.scrollY + window.innerHeight >= docHeight - 300 && window.scrollY > 50) {
                bottomBar.style.display = 'flex';
            } else {
                bottomBar.style.display = 'none';
            }
        });
    }

    // Mobile header and footer shrink on scroll
    if (window.innerWidth <= 768) {
        const logo = document.querySelector('.logo');
        const bottomBar = document.querySelector('.bottom-bar');

        if (logo || bottomBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > 50) {
                    logo?.classList.add('shrink');
                    bottomBar?.classList.add('shrink');
                } else {
                    logo?.classList.remove('shrink');
                    bottomBar?.classList.remove('shrink');
                }
            }, { passive: true });
        }
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
