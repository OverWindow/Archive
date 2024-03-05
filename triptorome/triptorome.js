const $imgContainer = document.getElementsByClassName("imgContainer");
const $img = document.getElementsByClassName("img");
const $caption = document.getElementsByClassName("caption");

let imgNum = $imgContainer.length;

for (let i = 0; i < imgNum; i++) {
  $imgContainer[i].addEventListener("click", function () {
    if ($caption[i].style.visibility == "visible") {
      $caption[i].style.visibility = "hidden";
      $img[i].style.filter = "none";
    } else {
      $caption[i].style.visibility = "visible";
      $img[i].style.filter = "blur(3px)";
    }
  });
}
