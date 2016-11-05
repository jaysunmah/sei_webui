var sketch1 = function (s) {
    var x = 0;
    var map;
    var imageScale = 200;
    var mouseX = -1;
    var mouseY = -1;
    var crosshairSize = 10;
    var calibrationPoints = {
      left: {
        x: -1,
        y: -1
      }, right: {
        x: -1,
        y: -1
      }, top: {
        x: -1,
        y: -1
      }, bottom: {
        x: -1,
        y: -1
      }
    }

    s.preload = function() {
      console.log('wei');
      map = s.loadImage("images/sei_layout.png");
    }

    s.setup = function () {
      console.log(calibrationPoints);
      s.createCanvas($('#sketch1').width(), 1000);
      s.rectMode(s.CENTER);
      s.noStroke();
    };

    s.draw = function () {
      s.background(255);
      s.image(map, $('#sketch1').width() / 2 - 2.5 * imageScale / 2, 0, 2.5 * imageScale, 4 * imageScale);
      s.rect(x,10,50,50);
      x = (x + 10) % $('#sketch1').width();

      if (calibrationPoints.left.x >= 0) {
        drawVerticalLine(s, calibrationPoints.left.x, calibrationPoints.left.y);
      }
      if (calibrationPoints.right.x >= 0) {
        drawVerticalLine(s, calibrationPoints.right.x, calibrationPoints.right.y);
      }
      if (calibrationPoints.top.x >= 0) {
        drawHorizontalLine(s, calibrationPoints.top.x, calibrationPoints.top.y);
      }
      if (calibrationPoints.bottom.x >= 0) {
        drawHorizontalLine(s, calibrationPoints.bottom.x, calibrationPoints.bottom.y);
      }

      if (Session.get('mouseSelect') == 'sendRobot') {
        drawRobotSetPoint(s, mouseX, mouseY);
      }

      drawRobot(s, 436.5, 242.5625, 0);
    }

    function drawHorizontalLine(s, x, y) {
      s.fill('#ff7361');
      s.rect(x, y, s.windowWidth * 2, 5);
    }

    function drawVerticalLine(s, x, y) {
      s.fill('#ff7361');
      s.rect(x, y, 5, s.windowHeight * 2);
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
      if (s.mouseX >= 0 && s.mouseY >= 0 && Session.get('mouseSelect') != 'no_select') {
        if (Session.get('mouseSelect') == 'left') {
          calibrationPoints.left.x = s.mouseX;
          calibrationPoints.left.y = s.mouseY;
        } else if (Session.get('mouseSelect') == 'right') {
          calibrationPoints.right.x = s.mouseX;
          calibrationPoints.right.y = s.mouseY;
        } else if (Session.get('mouseSelect') == 'top') {
          calibrationPoints.top.x = s.mouseX;
          calibrationPoints.top.y = s.mouseY;
        } else if (Session.get('mouseSelect') == 'bottom') {
          calibrationPoints.bottom.x = s.mouseX;
          calibrationPoints.bottom.y = s.mouseY;
        } else if (Session.get('mouseSelect') == 'sendRobot') {
          console.log('wei');
        }

        $('#calibrateLeft').val(s.mouseX);
        mouseX = s.mouseX;
        mouseY = s.mouseY;
        Session.set('mouseCoords', {x: s.mouseX, y: s.mouseY});
      }
      //Meteor.call('sendCoords', s.mouseX, s.mouseY);
    }
};


Template.landing.onRendered(function() {
    Session.set('mouseSelect', 'no_select');
    new p5(sketch1, "sketch1");
})
