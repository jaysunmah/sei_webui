var sketch1 = function (s) {
    var x = 0;
    var map;
    var imageScale = 200;
    var mouseX = -1;
    var mouseY = -1;
    var crosshairSize = 10;
    var needs_calibration = true;
    var all_calibrated = false;
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
    Session.set('calibrationPoints', calibrationPoints);
    var setRobotPoints = {
      x: -1,
      y: -1,
    }

    s.preload = function() {
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

      var calibrationCount = drawCalibrationLines(s);
      Session.set('calibrationCount', calibrationCount);
      displayInstructions(s, calibrationCount);
      if (calibrationCount == 4) {
        s.text("All calibration points are set!\nClick anywhere to send the robot", 25, 25);
        all_calibrated = true;
        var roomWidth = calibrationPoints.right.x - calibrationPoints.left.x;
        console.log(roomWidth);
        var roomWidthFrac = 0.6652173913043479;
        var roomHeight = calibrationPoints.bottom.y - calibrationPoints.top.y;
        drawRobot(s, roomWidth * roomWidthFrac + calibrationPoints.left.x, 242.5625, 0);


        if (setRobotPoints.x >= 0 && setRobotPoints.y >= 0) {
          drawRobotSetPoint(s, setRobotPoints.x, setRobotPoints.y);
        }
      } else if (calibrationCount == 0 && !Session.get('calibrateAll')) {
        s.text("No calibration points set!\nPlease click calibrate all edges", 25, 25);
      }
    }

    function displayInstructions(s, count) {
      var instructions;
      if (Session.get('mouseSelect') == 'left') {
        s.text("Please select the left\nmost boundary", 25, 25);
      } else if (Session.get('mouseSelect') == 'right') {
        s.text("Please select the right\nmost boundary", 25, 25);
      } else if (Session.get('mouseSelect') == 'top') {
        s.text("Please select the top\nmost boundary", 25, 25);
      } else if (Session.get('mouseSelect') == 'bottom') {
        s.text("Please select the bottom\nmost boundary", 25, 25);
      }
    }

    function drawCalibrationLines(s) {
      var calibrationCount = 0;
      if (calibrationPoints.left.x >= 0) {
        drawVerticalLine(s, calibrationPoints.left.x);
        calibrationCount += 1;
      }
      if (calibrationPoints.right.x >= 0) {
        drawVerticalLine(s, calibrationPoints.right.x);
        calibrationCount += 1;
      }
      if (calibrationPoints.top.x >= 0) {
        drawHorizontalLine(s, calibrationPoints.top.y);
        calibrationCount += 1;
      }
      if (calibrationPoints.bottom.x >= 0) {
        drawHorizontalLine(s, calibrationPoints.bottom.y);
        calibrationCount += 1;
      }
      //displayInstructions(s, calibrationCount);
      return calibrationCount;
    }

    function drawHorizontalLine(s, y) {
      s.strokeWeight(5);
      s.stroke('#ff7361');
      var xStart = 0;
      var xEnd = s.windowWidth;

      if (calibrationPoints.left.x >= 0) {
        xStart = calibrationPoints.left.x;
      }

      if (calibrationPoints.right.x >= 0) {
        xEnd = calibrationPoints.right.x;
      }
      s.line(xStart, y, xEnd, y);
      
      s.noStroke();
      s.strokeWeight(1);
    }

    function drawVerticalLine(s, x) {
      s.strokeWeight(5);
      s.stroke('#ff7361');
      var yStart = 0;
      var yEnd = s.windowHeight;

      if (calibrationPoints.top.y >= 0) {
        yStart = calibrationPoints.top.y;
      }

      if (calibrationPoints.bottom.y >= 0) {
        yEnd = calibrationPoints.bottom.y;
      }
      s.line(x, yStart, x, yEnd);

      s.noStroke();
      s.strokeWeight(1);
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
        if (Session.get('mouseSelect') == 'left') {
          calibrationPoints.left.x = s.mouseX;
          calibrationPoints.left.y = s.mouseY;
          if (Session.get('calibrateAll')) {
            Session.set('mouseSelect', 'top');
          }
          $('#calibrateLeft').val('x = ' + s.mouseX);
        } else if (Session.get('mouseSelect') == 'right') {
          calibrationPoints.right.x = s.mouseX;
          calibrationPoints.right.y = s.mouseY;
          if (Session.get('calibrateAll')) {
            Session.set('mouseSelect', 'bottom');
          }
          $('#calibrateRight').val('x = ' + s.mouseX);
        } else if (Session.get('mouseSelect') == 'top') {
          calibrationPoints.top.x = s.mouseX;
          calibrationPoints.top.y = s.mouseY;
          if (Session.get('calibrateAll')) {
            Session.set('mouseSelect', 'right');
          }
          $('#calibrateTop').val('y = ' + s.mouseX);
        } else if (Session.get('mouseSelect') == 'bottom') {
          calibrationPoints.bottom.x = s.mouseX;
          calibrationPoints.bottom.y = s.mouseY;
          if (Session.get('calibrateAll')) {
            Session.set('mouseSelect', 'no_select');
            Session.set('calibrateAll', false);
          }
          $('#calibrateBottom').val('y = ' + s.mouseY);
        } else if (Session.get('mouseSelect') == 'no_select' && all_calibrated) {
          Session.set('sendCoords', true);
          setRobotPoints.x = s.mouseX;
          setRobotPoints.y = s.mouseY;
        }
        Session.set('calibrationPoints', calibrationPoints);
        mouseX = s.mouseX;
        mouseY = s.mouseY;
        Session.set('mouseCoords', {x: s.mouseX, y: s.mouseY});
      }
      //Meteor.call('sendCoords', s.mouseX, s.mouseY);
    }
};


Template.landing.onRendered(function() {
    Session.set('mouseSelect', 'no_select');
    $('.ui.accordion').accordion();
    new p5(sketch1, "sketch1");
})
