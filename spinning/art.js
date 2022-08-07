let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);
let one = document.getElementsByClassName(".container .one");
let two = document.querySelector(".container").getElementsByClassName("two");

btn.onclick = function() {
    container.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 1000);
}

btn.onmouseover = function() {
    spin.style.width = "20%"; 
}

btn.onmouseout = function() {
    spin.style.width = "15%";
}
