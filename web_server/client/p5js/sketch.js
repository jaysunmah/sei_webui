var sketch1 = function (s) {
    var x = 0;
    var map;
    var imageScale = 200;
    var setRobotX = -1;
    var setRobotY = -1;
    var crosshairSize = 10;

    s.preload = function() {
      console.log('wei');
      map = s.loadImage("images/sei_layout.png");
    }

    s.setup = function () {
      s.createCanvas($('#sketch1').width(), 1000);
      s.rectMode(s.CENTER);
      s.noStroke();
    };

    s.draw = function () {
      s.background(255);
      s.image(map, $('#sketch1').width() / 2 - 2.5 * imageScale / 2, 0, 2.5 * imageScale, 4 * imageScale);
      s.rect(x,10,50,50);
      x = (x + 10) % $('#sketch1').width();

      if (setRobotX >= 0) {
        drawRobotSetPoint(s, setRobotX, setRobotY);
      }
      drawRobot(s, 436.5, 242.5625, 0);
    }

    function drawRobotSetPoint(s, x, y) {
      //s.ellipse(x, y, 10, 10);
      s.push();
      s.fill('#ff7361');
      s.translate(x, y);
      s.rotate(s.radians(45));
      s.rect(0,0,6,40);
      s.rotate(s.radians(90));
      s.rect(0,0,6,40);
      s.pop();
    }

    function drawRobot(s, x, y, th) {
      s.push();
      s.fill('#ff7361');
      s.translate(x, y);
      s.rotate(s.radians(-1 * th));
      s.rect(0,5,20,15);
      s.arc(0,0,20, 25, s.PI, 0);
      s.fill('#000');
      s.rect(-12, 4, 4, 10);
      s.rect(12, 4, 4, 10);
      s.pop();
    }

    s.mouseClicked = function() {
      if (s.mouseX >= 0 && s.mouseY >= 0) {
        $('#calibrateLeft').val(s.mouseX);
        setRobotX = s.mouseX;
        setRobotY = s.mouseY;
        Session.set('mouseCoords', {x: s.mouseX, y: s.mouseY});
      }
      //Meteor.call('sendCoords', s.mouseX, s.mouseY);
    }
};


Template.landing.onRendered(function() {
    new p5(sketch1, "sketch1");
})
