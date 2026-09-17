/* =====================================================
   KUSUM CHAURASIA - PERSONAL PORTFOLIO
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. TYPING EFFECT
    ================================================= */

    const typingText = document.getElementById("typingText");

    const words = [
        "Web Developer",
        "Java Programmer",
        "Python Learner",
        "CSE Student"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;
                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
            }
        }

        const speed = deleting ? 60 : 100;

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    /* =================================================
       2. DARK MODE
    ================================================= */

    const modeBtn = document.getElementById("modeBtn");

    if (modeBtn) {

        const icon = modeBtn.querySelector("i");

        const savedMode =
            localStorage.getItem("darkMode");

        if (savedMode === "enabled") {

            document.body.classList.add("dark");

            if (icon) {
                icon.className = "fa-solid fa-sun";
            }

        } else {

            if (icon) {
                icon.className = "fa-solid fa-moon";
            }
        }


        modeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            const darkMode =
                document.body.classList.contains("dark");


            if (darkMode) {

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );

                if (icon) {
                    icon.className =
                        "fa-solid fa-sun";
                }

            } else {

                localStorage.setItem(
                    "darkMode",
                    "disabled"
                );

                if (icon) {
                    icon.className =
                        "fa-solid fa-moon";
                }
            }

        });
    }


    /* =================================================
       3. CONTACT FORM
    ================================================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const subjectInput =
                    document.getElementById("subject");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput ? nameInput.value.trim() : "";

                const email =
                    emailInput ? emailInput.value.trim() : "";

                const subject =
                    subjectInput ? subjectInput.value.trim() : "";

                const message =
                    messageInput ? messageInput.value.trim() : "";


                /* Empty field validation */

                if (
                    name === "" ||
                    email === "" ||
                    subject === "" ||
                    message === ""
                ) {

                    alert(
                        "Please fill in all the fields."
                    );

                    return;
                }


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;
                }


                /* Success message */

                alert(
                    "Thank you, " +
                    name +
                    "! Your message has been sent successfully."
                );


                contactForm.reset();

            }
        );
    }


    /* =================================================
       4. SCROLL TO TOP
    ================================================= */

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    topBtn.style.display = "flex";

                } else {

                    topBtn.style.display = "none";
                }
            }
        );


        topBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =================================================
       5. NAVBAR ACTIVE LINK
    ================================================= */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveLink() {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");
            }
        });
    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =================================================
       6. MOBILE NAVBAR CLOSE
    ================================================= */

    const navLinksAll =
        document.querySelectorAll(
            "#navbarMenu .nav-link"
        );

    const navbarMenu =
        document.getElementById("navbarMenu");


    navLinksAll.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth < 992 &&
                    navbarMenu &&
                    navbarMenu.classList.contains("show")
                ) {

                    const bsCollapse =
                        bootstrap.Collapse.getInstance(
                            navbarMenu
                        );

                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        );
    });


    /* =================================================
       7. PROJECT MESSAGE
    ================================================= */

    window.showProject =
        function (projectName) {

            alert(
                "You selected: " +
                projectName +
                "\n\nProject details will be available soon."
            );
        };


    /* =================================================
       8. CURRENT YEAR
    ================================================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =================================================
       9. PROFILE IMAGE HOVER
    ================================================= */

    const profileImage =
        document.querySelector(".profile-img");

    if (profileImage) {

        profileImage.addEventListener(
            "mouseenter",
            function () {

                profileImage.style.transform =
                    "scale(1.04)";
            }
        );


        profileImage.addEventListener(
            "mouseleave",
            function () {

                profileImage.style.transform =
                    "scale(1)";
            }
        );
    }

});

/* =====================================================
   CERTIFICATE VIEWER
===================================================== */

function openCertificate(certificatePath) {

    const modal = document.getElementById("certificateModal");
    const frame = document.getElementById("certificateFrame");

    if (!modal || !frame) {
        return;
    }

    frame.src = certificatePath;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeCertificate() {

    const modal = document.getElementById("certificateModal");
    const frame = document.getElementById("certificateFrame");

    if (!modal || !frame) {
        return;
    }

    modal.classList.remove("show");

    frame.src = "";

    document.body.style.overflow = "";
}


/* Close when clicking outside certificate */

document.addEventListener("click", function (event) {

    const modal = document.getElementById("certificateModal");

    if (event.target === modal) {
        closeCertificate();
    }

});


/* Close certificate using Escape key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeCertificate();
    }

});