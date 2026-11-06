/* =========================================
   ISLAND SAFARI — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. FOOTER YEAR
    ===================================== */

    const yearElements = document.querySelectorAll(
        "#currentYear, .current-year, [data-current-year]"
    );

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       2. NAVBAR SCROLL EFFECT
    ===================================== */

    const header = document.querySelector(".site-header");

    function updateNavbar() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =====================================
       3. SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================
       4. MOBILE NAVBAR AUTO CLOSE
    ===================================== */

    const navCollapse = document.querySelector(".navbar-collapse");

    const navLinks = document.querySelectorAll(
        ".navbar-collapse .nav-link, .navbar-collapse .nav-cta"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navCollapse &&
                navCollapse.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                const collapseInstance =
                    bootstrap.Collapse.getOrCreateInstance(navCollapse);

                collapseInstance.hide();
            }

        });

    });


    /* =====================================
       5. IMAGE LIGHTBOX
    ===================================== */

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.querySelector(".lightbox-close");

    function openLightbox(imageSrc, imageAlt) {

        if (!lightbox || !lightboxImage || !imageSrc) return;

        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt || "Island Safari image";

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (lightboxImage) {
            lightboxImage.src = "";
        }

    }

    document.querySelectorAll("[data-lightbox], .lightbox-trigger").forEach(
        function (image) {

            image.addEventListener("click", function (event) {

                if (event.target.closest("a")) {
                    event.preventDefault();
                }

                const imageElement =
                    image.tagName === "IMG"
                        ? image
                        : image.querySelector("img");

                const imageSrc =
                    image.getAttribute("data-lightbox") ||
                    (imageElement && (
                        imageElement.currentSrc ||
                        imageElement.src
                    ));

                const imageAlt =
                    imageElement ? imageElement.alt : "";

                openLightbox(imageSrc, imageAlt);

            });

        }
    );

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {
            closeLightbox();
        }

    });


    /* =====================================
       6. WHATSAPP FLOATING BUTTON
    ===================================== */

    document.querySelectorAll(".whatsapp-float").forEach(function (button) {

        button.addEventListener("click", function (event) {

            const href = button.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();

                console.warn(
                    "Please add the WhatsApp URL to .whatsapp-float."
                );
            }

        });

    });


    /* =====================================
       7. WHATSAPP ENQUIRY FORM
    ===================================== */

    const enquiryForm = document.querySelector(
        "#contactForm, #enquiryForm, [data-whatsapp-form]"
    );

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const formData = new FormData(enquiryForm);

            const getValue = function (names) {

                for (const name of names) {

                    const value = formData.get(name);

                    if (value && String(value).trim()) {
                        return String(value).trim();
                    }

                }

                return "";

            };

            const name = getValue(["name", "fullName", "full_name"]);
            const email = getValue(["email"]);
            const phone = getValue(["phone", "mobile", "whatsapp"]);
            const packageName = getValue([
                "package",
                "packageName",
                "package_name"
            ]);
            const message = getValue(["message", "enquiry", "details"]);

            const whatsappNumber =
                enquiryForm.dataset.whatsappNumber ||
                "REPLACE_WITH_WHATSAPP_NUMBER";

            if (
                !whatsappNumber ||
                whatsappNumber === "REPLACE_WITH_WHATSAPP_NUMBER"
            ) {
                alert(
                    "WhatsApp number is not configured. Please contact the website administrator."
                );
                return;
            }

            const whatsappMessage = [
                "Hello Island Safari!",
                "",
                "I would like to enquire about a Lakshadweep trip.",
                "",
                name ? "Name: " + name : "",
                phone ? "Phone: " + phone : "",
                email ? "Email: " + email : "",
                packageName ? "Package: " + packageName : "",
                message ? "Message: " + message : "",
                "",
                "Please share more details."
            ].filter(Boolean).join("\n");

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber.replace(/\D/g, "") +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        });

    }


    /* =====================================
       8. REVEAL ANIMATION COMPATIBILITY
    ===================================== */

    document.querySelectorAll(".reveal").forEach(function (element) {

        element.classList.add("active");

    });


    /* =====================================
       9. ACTIVE NAVIGATION LINK
    ===================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".navbar .nav-link").forEach(
        function (link) {

            const linkPage = link.getAttribute("href");

            if (!linkPage || linkPage.startsWith("#")) return;

            const normalizedLink = linkPage
                .split("/")
                .pop()
                .toLowerCase();

            if (
                normalizedLink === currentPage ||
                (
                    currentPage === "" &&
                    normalizedLink === "index.html"
                )
            ) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }

        }
    );


    /* =====================================
       10. IMAGE LOADING OPTIMIZATION
    ===================================== */

    document.querySelectorAll("img").forEach(function (image) {

        if (!image.hasAttribute("loading")) {
            image.loading = "lazy";
        }

        if (!image.hasAttribute("decoding")) {
            image.decoding = "async";
        }

    });


    console.log("Island Safari website initialized successfully.");

});