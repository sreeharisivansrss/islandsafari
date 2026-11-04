/* =========================================
   ISLAND SAFARI - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".main-navbar");

    function handleNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    handleNavbar();
    window.addEventListener("scroll", handleNavbar);


    // ACTIVE NAV LINK
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });


    // CLOSE MOBILE NAV AFTER CLICK
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const navMenu = document.querySelector(".navbar-collapse");

            if (navMenu && navMenu.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
                bsCollapse.hide();
            }
        });
    });


    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // IMAGE LIGHTBOX
    const lightbox = document.querySelector(".image-lightbox");
    const lightboxImage = document.querySelector(".image-lightbox img");
    const lightboxClose = document.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-item img").forEach(image => {
        image.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });


    // WHATSAPP ENQUIRY FORM
    const enquiryForm = document.querySelector("#enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.reportValidity()) return;

            const name = document.querySelector("#customerName")?.value.trim() || "";
            const phone = document.querySelector("#customerPhone")?.value.trim() || "";
            const email = document.querySelector("#customerEmail")?.value.trim() || "";
            const packageName = document.querySelector("#customerPackage")?.value || "";
            const travelDate = document.querySelector("#travelDate")?.value || "";
            const guests = document.querySelector("#guestCount")?.value || "";
            const message = document.querySelector("#customerMessage")?.value.trim() || "";

            const whatsappNumber = "918891601055";

            const whatsappMessage =
                `Hello Island Safari! I would like to enquire about a trip.\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email}\n` +
                `Package: ${packageName}\n` +
                `Travel Date: ${travelDate}\n` +
                `Guests: ${guests}\n` +
                `Message: ${message}`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    }


    // CURRENT YEAR IN FOOTER
    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

});

// Image loading and placeholder handling
document.querySelectorAll("img").forEach((img) => {
    const markLoaded = () => {
        img.classList.add("image-loaded");
    };

    if (img.complete && img.naturalWidth > 0) {
        markLoaded();
    } else {
        img.addEventListener("load", markLoaded);
    }
});
