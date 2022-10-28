const $startButton = document.querySelector('#startButton');

const density = "Ñ@#W$9876543210?!abc;:+=-,._                                    ";
//const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/()1{}[]?-_+~<>i!lI;:,";
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';

let video;
let asciiDiv;
let startButton;
let gameStart = 0;

/** setup */
function setup() {
  noCanvas();

  startButton = select('#startButton');
  startButton.mousePressed(greet);

  video = createCapture(VIDEO);
  video.size(60, 45);
	video.hide();
  asciiDiv = createDiv();
}

/** when button clicked */
function greet() {
  if(!gameStart) {
    $startButton.innerHTML = 'Stop';
  } else {
    $startButton.innerHTML = 'Start';
  }
  gameStart = !gameStart;
}

/** text video */
function draw() {
  if(!gameStart) { // text video stop
    return; 
  }
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}