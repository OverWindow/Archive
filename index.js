$nav_middle = document.querySelector(".nav_middle");
$nav_right = document.querySelector(".nav_right");
$nav = document.querySelector(".nav");

document.querySelector('button').addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-angle-down')) {
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-up');
      $nav_middle.classList.toggle('active');
      $nav_right.classList.toggle('active');
    } else {
      icon.classList.remove('fa-angle-up');
      icon.classList.add('fa-angle-down');
      $nav_middle.classList.toggle('active');
      $nav_right.classList.toggle('active');
    }
  });