/* HOOD MA V4 */
/* Designed by Aref Kiani */

// Mobile menu

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// Dark mode

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("hood-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  themeToggle.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem(
    "hood-theme",
    isDark ? "dark" : "light"
  );
});


// Image gallery

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

let previousFocus = null;

function closeGallery() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";

  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll(".gallery-item").forEach(item => {

  item.addEventListener("click", () => {

    const image = item.querySelector("img");

    if (!image) return;

    previousFocus = document.activeElement;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeLightbox.focus();
  });

});

closeLightbox.addEventListener("click", closeGallery);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "Tab") {
    event.preventDefault();
    closeLightbox.focus();
  }
});
