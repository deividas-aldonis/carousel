const carouselContainer = document.querySelector(".carousel-container");
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");
const carouselBullets = document.querySelectorAll(".carousel-bullets .bullet");
const activeBullet = document.querySelector(".carousel-bullets .active");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let isRendered = true;
let counter = 1;
let bullet = 0;
const size = carouselImages[0].clientWidth;
const bulletSize = 20;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
activeBullet.style.transform = "translateX(" + bulletSize + "px)";

const render = () => {
  isRendered = false;
  carouselContainer.style.transition = "all .3s ease-in-out";
  carouselContainer.style.transform = "translateY(0) scale(1)";

  carouselContainer.style.opacity = 1;
};

nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform .4s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform .4s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

carouselSlide.addEventListener("transitionend", () => {
  if (isRendered) {
    render();
    return;
  }

  if (carouselImages[counter].classList.contains("lastClone")) {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }

  if (carouselImages[counter].classList.contains("firstClone")) {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }

  activeBullet.style.transform = "translateX(" + counter * bulletSize + "px)";
});

carouselBullets.forEach((bullet) => {
  carouselSlide.style.transition = "transform .4s ease-in-out";

  bullet.addEventListener("click", (b) => {
    counter = parseInt(b.target.dataset.id);
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  });
});
