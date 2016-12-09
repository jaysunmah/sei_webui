var sketch1 = function (s) {
    var x = 0;
    var map;
    var imageScale = 200;
    var mouseX = -1;
    var mouseY = -1;
    var crosshairSize = 10;
    var needs_calibration = true;
    var all_calibrated = false;

    Session.set('calibrationPoints', calibrationPoints);
		var openedSetRobotAccordion = false;

    s.preload = function() {
			map = s.loadImage("images/sei_layout.png");
    }

    s.setup = function () {
      s.createCanvas($('#sketch1').width(), 1000);
      s.rectMode(s.CENTER);
      s.noStroke();
    };


    s.draw = function () {
			wei('hello');
      s.background(255);
      s.image(map, $('#sketch1').width() / 2 - 2.5 * imageScale / 2, 0, 2.5 * imageScale, 4 * imageScale);
			var arrowDegrees;
      if (Session.get('initPosCoords')) {
        arrowDegrees = Session.get('initPosCoords').th;
      } else {
        arrowDegrees = 0;
      }

      var calibrationCount = drawCalibrationLines(s);
      Session.set('calibrationCount', calibrationCount);
      displayInstructions(s, calibrationCount);
			//we've set all 4 corners of our bounding box, so now we can start settings
			//calibrated coordinates
      if (calibrationCount == 4) {
				var roomWidth = calibrationPoints.right.x - calibrationPoints.left.x;
        var roomHeight = calibrationPoints.bottom.y - calibrationPoints.top.y;
				if (Session.get('initializedPose')) {
        	Session.set('runtimeStatus', "All calibration points are set!\nClick anywhere to send the robot");
        	all_calibrated = true;
          var robotInitialPose = Session.get('initPosCoords');
        	drawRobot(s, robotInitialPose.x, robotInitialPose.y, robotInitialPose.th);
 					if (setRobotPoints.x >= 0 && setRobotPoints.y >= 0) {
          	drawRobotSetPoint(s, setRobotPoints.x, setRobotPoints.y);
        	}
				} else {2
        	Session.set('runtimeStatus', "All calibration points are set!\nPlease set the starting coordinates and heading of the robot");
					if (!openedSetRobotAccordion) {
						openedSetRobotAccordion = true;
						$('.ui.accordion').accordion('open', 1);
            Session.set('mouseSelect', 'init_pos');
					}
					if (setRobotInitPos.x >= 0 && setRobotInitPos.y >= 0) {
						Session.set('initializedPosition', true);
            Session.set('initPosCoords', setRobotInitPos);
						drawRobotInitPos(s, setRobotInitPos.x, setRobotInitPos.y, arrowDegrees);
					}
				}

       
      } else if (calibrationCount == 0 && !Session.get('calibrateAll')) {
        Session.set('runtimeStatus', "No calibration points set!\nPlease click calibrate all edges");
      }
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
        } else if (Session.get('mouseSelect') == 'init_pos') {
           console.log('wei going here');
           setRobotInitPos.x = s.mouseX;
           setRobotInitPos.y = s.mouseY;
        } else if (Session.get('mouseSelect') == 'send_coords') {
          //Session.set('sendCoords', true);
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
		$("#headingInput").mousemove(function () {
			$("#headingVal").text($("#headingInput").val())
      setRobotInitPos.th = parseInt($('#headingInput').val());
      Session.set('initPosCoords', setRobotInitPos);
		});

    new p5(sketch1, "sketch1");
})
