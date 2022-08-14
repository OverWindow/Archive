const $rightArrow = document.querySelector('.right i');
const $leftArrow = document.querySelector('.left i');
const $title = document.querySelector('.title');
let currentslide = 0;

window.onload = function() {
    $rightArrow.addEventListener('click',nextslide);
    $leftArrow.addEventListener('click',beforeslide);
}

function nextslide() {
    document.querySelector('.img').src = `./img/${currentslide+1}.png`;    
    currentslide += 1;
    if(currentslide < 9 && currentslide > 0) {
        $rightArrow.style.display = 'block';
        $leftArrow.style.display = 'block';
    } else if (currentslide == 0 ) {
        $leftArrow.style.display = 'none';
    } else if (currentslide == 9) {
        $rightArrow.style.display = 'none';
    }
    description(currentslide);
}   

function beforeslide() {
    document.querySelector(".img").src = `./img/${currentslide-1}.png`;
    currentslide -= 1;
    if(currentslide == 0) {
        $leftArrow.style.display = 'none';
    } else if (currentslide < 9) {
        $rightArrow.style.display = 'block';
    }
    description(currentslide);
}

function description(currentslide) {
    console.log("hello");
    switch(currentslide) {
        case 0:
            $title.innerHTML = "Red And Yellow: Zero";
            break;
        case 1:
            $title.innerHTML = "Red And Yellow: One";
            break;
        case 2:
            $title.innerHTML = "Red And Yellow: Two";
            break;
        case 3:
            $title.innerHTML = "Red And Yellow: Three";
            break;
        case 4:
            $title.innerHTML = "Red And Yellow: Four";
            break;
        case 5:
            $title.innerHTML = "Red And Yellow: Five";
            break;
        case 6:
            $title.innerHTML = "Red And Yellow: Six";
            break;
        case 7:
            $title.innerHTML = "Red And Yellow: Seven";
            break;  
        case 8:
            $title.innerHTML = "Red And Yellow: Eight";
            break;
        case 9:
            $title.innerHTML = "Red And Yellow: Nine";
            break;     
    }
}