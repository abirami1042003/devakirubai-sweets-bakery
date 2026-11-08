/* ===================================
   DEVAKIRUBAI SWEETS AND BAKERY
   Website JavaScript
=================================== */


// CURRENT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

    // Close menu after clicking a navigation link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// IMAGE GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeButton = document.getElementById("lightboxClose");
const previousButton = document.getElementById("previousImage");
const nextButton = document.getElementById("nextImage");

let currentImageIndex = 0;


// Open selected image

function openLightbox(index) {

    if (!galleryImages.length) return;

    currentImageIndex = index;

    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].alt;

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


// Close image viewer

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// Show previous image

function showPreviousImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    openLightbox(currentImageIndex);

}


// Show next image

function showNextImage() {

    currentImageIndex++;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    openLightbox(currentImageIndex);

}


// Gallery click events

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});


// Lightbox buttons

if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
}

if (previousButton) {
    previousButton.addEventListener(
        "click",
        showPreviousImage
    );
}

if (nextButton) {
    nextButton.addEventListener(
        "click",
        showNextImage
    );
}


// Close when clicking the dark background

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


// Keyboard controls

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

});


// IMAGE ERROR HANDLING

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

    });

});


// CURRENT NAVIGATION HIGHLIGHT

const sections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {

                        link.classList.remove("active-link");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.classList.add("active-link");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}

console.log(
    "Devakirubai Sweets and Bakery website loaded successfully!"
);