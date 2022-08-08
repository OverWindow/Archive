let gum = document.getElementById("gum");
let randomColor = Math.floor(Math.random()*16777215).toString(16);

const $blow = document.querySelector("#blow");
$blow.addEventListener('click',blow);

const $pop = document.querySelector('#pop');

function openPopup(){
    $pop.style.color = "#" + randomColor;
    $pop.style.display="block";
}

function closePopup(){
    $pop.style.display="none";
}

window.onload = function() { 
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    gum.style.backgroundColor = "#" + randomColor;

    gum.style.width = "650px";
    gum.style.height = "650px";
    gum.style.left = "28%";
    gum.style.top = "9%";
}


function initial() {
    openPopup();
    console.log("hello");
    setTimeout(closePopup,800);
    gum.style.transition= "0.5s";
    gum.style.backgroundColor = "rgb(243, 190, 138)";
    gum.style.width = "25px";
    gum.style.height = "25px";
    gum.style.left = "68.2%";
    gum.style.top = "53%";

    //const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //gum.style.backgroundColor = "#" + randomColor;
}

function blow() {
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    gum.style.backgroundColor = "#" + randomColor;
   
    gum.style.transition = "8s";

    gum.style.width = "650px";
    gum.style.height = "650px";
    gum.style.left = "28%";
    gum.style.top = "9%";
}

const $btn = document.querySelector("#blow");

$btn.onmouseover = function() {
    $btn.style.width = "60px"; 
    $btn.style.height = "60px";
}

$btn.onmouseout = function() {
    $btn.style.width = "50px";
    $btn.style.height = "50px";
}
