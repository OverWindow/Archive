const $nav_left = document.querySelector(".nav_left");
const $nav_right = document.querySelector(".nav_right");
const $nav = document.querySelector(".nav");

/* nav bar resize */
document.querySelector('button').addEventListener('click', function () {
	const icon = this.querySelector('i');
	if (icon.classList.contains('fa-angle-down')) {
		icon.classList.remove('fa-angle-down');
		icon.classList.add('fa-angle-up');
    $nav_left.classList.toggle('active');
		$nav_right.classList.toggle('active');
	} else {
		icon.classList.remove('fa-angle-up');
		icon.classList.add('fa-angle-down');
		$nav_left.classList.toggle('active');
		$nav_right.classList.toggle('active');
	}
});
