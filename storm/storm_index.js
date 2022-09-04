const $soundButton = document.querySelector('.sound');
const $container = document.querySelector('.container');
let engine = null;

$container.src = 'https://c2.staticflickr.com/6/5142/5653893318_d79d0828c8_b.jpg?w=1024&h=682&auto=compress&cs=tinysrgb';

$soundButton.addEventListener('click',()=>{
  run();
},true);

function run() {
  var image = document.getElementById('image');
  image.onload = function() {
    engine = new RainyDay({
      image: this,
      gravityAngle: Math.PI / 5,
      blur: 10,
      enableCollisions: true,
      fps: 30,
      enableSizeChange: true,
      sound: "./sound/rainsound.mp3",
    });
    engine.trail = engine.TRAIL_SMUDGE;
    engine.rain([ [3, 2, 2] ], 100);
    engine.rain(
      [
        [1, 0, 20], 
        [3, 3, 1],
        [1, 2, 19]
      ],                       
      100);
      engine.rain([ [0, 2, 200], [3, 3, 1] ], 100);
    };
      image.crossOrigin = 'anonymous';
      image.src = 'https://c2.staticflickr.com/6/5142/5653893318_d79d0828c8_b.jpg?w=1024&h=682&auto=compress&cs=tinysrgb';
      //image.src = './rainy_nashville.jpg';
      //image.src = './city_night.jpg';
}



/* manual: https://mubaidr.js.org/rainyday.js/ */