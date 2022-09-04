function run() {var image = document.getElementById('image');
image.onload = function() {
  var engine = new RainyDay({
    image: this,
    gravityAngle: Math.PI / 5,
    blur: 10,
    enableCollisions: true,
    fps: 30,
    enableSizeChange: true,
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
}

/* manual: https://mubaidr.js.org/rainyday.js/ */