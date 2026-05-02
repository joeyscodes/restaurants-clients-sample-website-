/**
 * MONSOON — Asian Restaurant & Bar, Manama
 * Premium JavaScript — IntersectionObserver, Navbar Scroll, Form Handling, Mobile Menu
 * No scroll event listeners. No canvas. Pure performance.
 */

(function () {
    'use strict';

    /* ============ LOADER (Index Only) ============ */
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 1200);
        });
    }

    /* ============ NAVBAR SCROLL EFFECT ============ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        navbar.classList.remove('scrolled');
                    } else {
                        navbar.classList.add('scrolled');
                    }
                });
            },
            { threshold: 0 }
        );

        const heroSection = document.getElementById('hero');
        if (heroSection) {
            observer.observe(heroSection);
        } else {
            navbar.classList.add('scrolled');
        }
    }

    /* ============ HAMBURGER MENU ============ */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    /* ============ SCROLL REVEAL (IntersectionObserver) ============ */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -60px 0px',
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /* ============ RESERVATION FORM HANDLER ============ */
    const reservationForm = document.getElementById('reservationForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (reservationForm && confirmationMessage) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(reservationForm);

            fetch(reservationForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(function (response) {
                    if (response.ok) {
                        reservationForm.style.display = 'none';
                        confirmationMessage.style.display = 'block';
                    } else {
                        alert(
                            'There was an issue submitting your reservation. Please try again or call us directly at +973 1774 9222.'
                        );
                    }
                })
                .catch(function () {
                    alert(
                        'There was an issue submitting your reservation. Please try again or call us directly at +973 1774 9222.'
                    );
                });
        });
    }

    /* ============ INIT LOG ============ */
    console.log('Monsoon — Premium Asian Dining. Manama, Bahrain. Ready.');
})();
