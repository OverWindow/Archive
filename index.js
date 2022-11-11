const $nav_middle = document.querySelector(".nav_middle");
const $nav_right = document.querySelector(".nav_right");
const $nav = document.querySelector(".nav");

/* when resize menu button */
document.querySelector("button").addEventListener("click", function () {
  const icon = this.querySelector("i");
  if (icon.classList.contains("fa-angle-down")) {
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
    $nav_middle.classList.toggle("active");
    $nav_right.classList.toggle("active");
  } else {
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
    $nav_middle.classList.toggle("active");
    $nav_right.classList.toggle("active");
  }
});

/* Logo Switch */
let $slides = document.getElementsByClassName("slide");
let $dots = document.getElementsByClassName("dot");
let slideIndex = 2;

ShowSlides(slideIndex);

function CurrentSlide(n) {
  console.log("clicked");
  ShowSlides((slideIndex = n));
}

function ShowSlides(n) {
  for (let i = 0; i < $slides.length; i++) {
    $slides[i].style.display = "none";
  }
  for (i = 0; i < $dots.length; i++) {
    $dots[i].className = $dots[i].className.replace(" active", "");
  }
  $slides[slideIndex - 1].style.display = "flex";

  for (let i = 0; i < $slides.length; i++) {
    $dots[i].style.width = "0";
    $dots[i].style.borderRadius = "50%";
  }
  $dots[n - 1].style.width = "17px";
  $dots[n - 1].style.borderRadius = "5px";
}

/* when resized below 1000px ShowSlide(1) */
window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    console.log("shrink");
    slideIndex = 1;
    ShowSlides(slideIndex);
  }
});
