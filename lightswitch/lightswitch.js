/* light on and off */
const $lightswitch = document.querySelector('.lightswitch');
const $light = document.querySelector('.light');
let onOroff = 1;

$lightswitch.addEventListener('click',() => {
    if(onOroff === 1) {
        $lightswitch.src = './off.png';
        $light.style.display = 'block';
        $lightswitch.style.opacity = '80%';
        onOroff = 0;
    } else {
        $lightswitch.src = './on.png';
        $light.style.display = 'none';
        onOroff = 1;
    }
});

/* exit */
const $door = document.querySelector("i");

$door.addEventListener('mouseover',() => {
    $door.classList.remove("fa-door-closed");
    $door.classList.add("fa-door-open");
});

$door.addEventListener('mouseout',() => {
    $door.classList.remove("fa-door-open");
    $door.classList.add("fa-door-closed");
})