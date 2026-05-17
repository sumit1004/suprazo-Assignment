

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('syntra-theme') || 'dark';

    // Apply initial theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        htmlElement.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
    } else {
        htmlElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = 'light_mode';
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');

            if (isLight) {
                htmlElement.classList.remove('dark');
                themeIcon.textContent = 'dark_mode';
                localStorage.setItem('syntra-theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                themeIcon.textContent = 'light_mode';
                localStorage.setItem('syntra-theme', 'dark');
            }
        });
    }
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // Page Load Animations
    setTimeout(() => {
        document.querySelectorAll('.load-reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Navbar Scroll Effect
    const headerEl = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (headerEl) headerEl.classList.add('scrolled');
        } else {
            if (headerEl) headerEl.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Toggle icon
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = navLinksContainer.classList.contains('active') ? 'close' : 'menu';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.navbar') || document.querySelector('.header');
    const headerOffset = header ? header.offsetHeight : 0;

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(nav => nav.classList.remove('active'));

                // Add active class to clicked link
                this.classList.add('active');

                // Calculate position with header offset
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    const icon = menuToggle.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = 'menu';
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - headerOffset - 50)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
