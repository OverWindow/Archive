import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";

const $rows = document.querySelector(".rows");

/* developer variables */
let string1 = "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
let string2 = "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
//let string3 = "@@@@@@@@@@@@@@@OVERWINDOW@@@@@@@@@@@@@@@"
let rows = 19;

/** making rows */
window.onload = function () {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.className = "animate-me";
    /*if(i == (rows+1)/2) {
      row.innerHTML = string3;
    } else */ if (i % 2 == 0)
      row.innerHTML = string1;
    else
      row.innerHTML = string2;
    $rows.appendChild(row);
  }

  animationMove();
}

/**  animation function */
function animationMove() {
  const test = new Letterize({
    targets: ".animate-me"
  });

  const animation = anime.timeline({
    targets: test.listAll,
    delay: anime.stagger(100, {
      grid: [test.list[0].length, test.list.length],
      from: "center"
    }),
    loop: true
  });

  animation
    .add({
      scale: 0.5
    })
    .add({
      letterSpacing: "10px"
    })
    .add({
      scale: 1
    })
    .add({
      letterSpacing: "6px"
    });
}