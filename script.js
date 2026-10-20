/* ---------- Scroll spy ---------- */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. clear the highlight from every link
        links.forEach((link) => link.classList.remove("active"));

        // 2. highlight the link whose href matches this section's id
        const match = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (match) match.classList.add("active");
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" } // only watch a thin line across the middle of the screen
);

sections.forEach((section) => observer.observe(section));

/* ---------- Facilities ---------- */
const facilities = [
  { icon: "🛋️", title: "Semi-Furnished", text: "Move in comfortably with essentials already in place." },
  { icon: "🏍️", title: "Parking + Bike Porch", text: "Dedicated parking with a separate porch for two-wheelers." },
  { icon: "💧", title: "Well Water", text: "Reliable well water supply. Water and common charges just ₹200." },
  { icon: "♻️", title: "Bio Compost & Incinerator", text: "Eco-conscious waste handling on the premises." },
  { icon: "🏥", title: "Near Rajagiri Hospital", text: "Healthcare close by when you need it." },
  { icon: "🛒", title: "Shops Within Walking Distance", text: "Daily household needs without needing a vehicle." },
];

const grid = document.getElementById("facility-grid");

grid.innerHTML = facilities
  .map(
    (f) => `
      <div class="card">
        <div class="card-icon">${f.icon}</div>
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </div>`
  )
  .join("");

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Gallery ---------- */
const images = [
  "AsherHomePhotos/ash.jpeg",
  "AsherHomePhotos/ash1.jpeg",
  "AsherHomePhotos/ash11.jpeg",
  "AsherHomePhotos/ash12.jpeg",
  "AsherHomePhotos/ash13.jpeg",
  "AsherHomePhotos/ash14.jpeg",
  "AsherHomePhotos/ash15.jpeg",
  "AsherHomePhotos/ash16.jpeg",
  "AsherHomePhotos/ash17.jpeg",
];

const slidesEl = document.getElementById("slides");
const countEl = document.getElementById("count");

// build the <img> tags from the array
// each slide = a blurred background copy + the real photo on top
slidesEl.innerHTML = images
  .map(
    (src) => `
      <div class="slide">
        <img class="bg" src="${src}" alt="" aria-hidden="true">
        <img class="fg" src="${src}" alt="Asher Homes apartment">
      </div>`
  )
  .join("");

const slideImgs = slidesEl.querySelectorAll(".slide");
let current = 0;

function show(index) {
  // wrap around: past the last goes to the first, before the first goes to the last
  current = (index + images.length) % images.length;

  slideImgs.forEach((img, i) => {
    img.classList.toggle("active", i === current);
  });

  countEl.textContent = `${current + 1} / ${images.length}`;
}

document.getElementById("next").addEventListener("click", () => show(current + 1));
document.getElementById("prev").addEventListener("click", () => show(current - 1));

// bonus: arrow keys work too
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});

show(0); // display the first image on load
/* ---------- Auto-play ---------- */
const sliderEl = document.querySelector(".slider");
let timer;

function startAuto() {
  stopAuto(); // never run two timers at once
  timer = setInterval(() => show(current + 1), 5000);
}

function stopAuto() {
  clearInterval(timer);
}

// pause while the mouse is over the gallery, resume when it leaves
sliderEl.addEventListener("mouseenter", stopAuto);
sliderEl.addEventListener("mouseleave", startAuto);

// after a manual click, restart the 5s countdown so it doesn't jump right after
document.getElementById("next").addEventListener("click", startAuto);
document.getElementById("prev").addEventListener("click", startAuto);

startAuto();