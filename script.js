/* =========================================================
   IRSHAD AHMAD - BACKEND DEVELOPER PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. THEME TOGGLE
       Dark / Light Mode
       ===================================================== */

    const themeToggle = document.querySelector(".theme-toggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    } else if (savedTheme === "dark") {
        document.body.classList.remove("light-theme");
    } else {
        // Use system preference if no theme is saved
        const prefersLight = window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

        if (prefersLight) {
            document.body.classList.add("light-theme");
        }
    }

    // Toggle theme
    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        // Accessibility
        themeToggle.setAttribute(
            "aria-pressed",
            isLight ? "true" : "false"
        );
    });


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle?.addEventListener("click", () => {

        navMenu?.classList.toggle("mobile-open");

        const isOpen = navMenu?.classList.contains("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });

    // Close mobile menu after clicking a link
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu?.classList.remove("mobile-open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       3. SMOOTH SCROLLING
       ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       4. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =====================================================
       5. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentSection}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.25
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       6. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".section-title, " +
        ".about-content, " +
        ".service-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".contact-content, " +
        ".contact-form"
    );

    animatedElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       7. STAGGER ANIMATION FOR CARDS
       ===================================================== */

    const cardGroups = [
        ".service-card",
        ".skill-card",
        ".project-card",
        ".timeline-item"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       8. HERO TEXT ANIMATION
       ===================================================== */

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        heroContent.classList.add("hero-loaded");

    }


    /* =====================================================
       9. CODE WINDOW TYPING EFFECT
       ===================================================== */

    const codeLines = document.querySelectorAll(
        ".code-window .code-line"
    );

    codeLines.forEach((line, index) => {

        line.style.opacity = "0";

        setTimeout(() => {

            line.style.opacity = "1";
            line.classList.add("code-line-show");

        }, 500 + index * 180);

    });


    /* =====================================================
       10. MOUSE SCROLL INDICATOR
       ===================================================== */

    const mouseIndicator = document.querySelector(
        ".scroll-mouse"
    );

    mouseIndicator?.addEventListener("click", () => {

        const aboutSection = document.querySelector("#about");

        if (aboutSection) {

            aboutSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });


    /* =====================================================
       11. SCROLL TO TOP BUTTON
       ===================================================== */

    const scrollTopButton = document.querySelector(
        ".scroll-top"
    );

    window.addEventListener("scroll", () => {

        if (!scrollTopButton) return;

        if (window.scrollY > 500) {

            scrollTopButton.classList.add("visible");

        } else {

            scrollTopButton.classList.remove("visible");

        }

    });

    scrollTopButton?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       12. PROJECT CARD TILT EFFECT
       Very subtle professional 3D effect
       ===================================================== */

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";

        });

    });


    /* =====================================================
       13. SKILL CARD HOVER EFFECT
       ===================================================== */

    const skillCards = document.querySelectorAll(
        ".skill-card"
    );

    skillCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("skill-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("skill-hover");
        });

    });


    /* =====================================================
       14. CONTACT FORM
       Frontend validation
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    const formMessage =
        document.querySelector(".form-message");

    contactForm?.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            contactForm.querySelector("[name='name']");

        const email =
            contactForm.querySelector("[name='email']");

        const message =
            contactForm.querySelector("[name='message']");


        // Basic validation
        if (!name?.value.trim()) {

            showFormMessage(
                "Please enter your name.",
                "error"
            );

            name?.focus();

            return;
        }


        if (!email?.value.trim()) {

            showFormMessage(
                "Please enter your email address.",
                "error"
            );

            email?.focus();

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;
        }


        if (!message?.value.trim()) {

            showFormMessage(
                "Please enter your message.",
                "error"
            );

            message?.focus();

            return;
        }


        // Success message
        showFormMessage(
            "Thanks! Your message is ready to be sent.",
            "success"
        );

        contactForm.reset();

    });


    function showFormMessage(text, type) {

        if (!formMessage) return;

        formMessage.textContent = text;

        formMessage.className =
            `form-message ${type}`;

    }


    /* =====================================================
       15. CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.querySelector(".current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       16. BACKGROUND PARALLAX
       Very subtle hero movement
       ===================================================== */

    const heroBackground =
        document.querySelector(".hero-background");

    window.addEventListener("scroll", () => {

        if (!heroBackground) return;

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            heroBackground.style.transform =
                `translateY(${scrollPosition * 0.15}px)`;

        }

    });


    /* =====================================================
       17. PAGE LOADED
       ===================================================== */

    document.body.classList.add("page-loaded");

});