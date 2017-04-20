var sketch1 = function (s) {
  var x = 0;
  var map;
  var imageScale = 200;
  var crosshairSize = 10;
  var needs_calibration = true;
  var all_calibrated = false;

  Session.set('calibrationPoints', calibration_points);
  Session.set('openedSetRobotInitPosAccordion', false);

  s.preload = function() {
		map = s.loadImage("images/sei_layout.png");
  }

  s.setup = function () {
    console.log('loading sketch...');
    s.createCanvas($('#sketch1').width(), 1000);
    s.rectMode(s.CENTER);
    s.noStroke();
  };

  s.draw = function () {
    s.background(255);
    s.image(map, $('#sketch1').width() / 2 - 2.5 * imageScale / 2, 0, 2.5 * imageScale, 4 * imageScale);

		var arrow_degrees;
    if (Session.get('initPosCoords')) {
      arrow_degrees = Session.get('initPosCoords').th;
    } else {
      arrow_degrees = 0;
    }

    var calibrationCount = drawCalibrationLines(s);
    Session.set('calibrationCount', calibrationCount);
    displayInstructions(s, calibrationCount);
		//we've set all 4 corners of our bounding box, so now we can start settings
		//calibrated coordinates
    if (calibrationCount == 4 && !isCalibratingCoordinates()) {
			var roomWidth = calibration_points.right.x - calibration_points.left.x;
      var roomHeight = calibration_points.bottom.y - calibration_points.top.y;
      //check to see if we've initialized our robot pose
			if (Session.get('initializedPose')) {
      	Session.set('runtimeStatus', "All calibration points are set!\nClick anywhere to send the robot");
      	all_calibrated = true;
        var robot_init_pose = Session.get('initPosCoords');
      	drawRobot(s, robot_init_pose.x, robot_init_pose.y, robot_init_pose.th);
					if (send_robot_points.x >= 0 && send_robot_points.y >= 0) {
        	drawRobotSetPoint(s, send_robot_points.x, send_robot_points.y);
      	}
			} else {
        //still need to set up robot coordinates
      	Session.set('runtimeStatus', "All calibration points are set!\nPlease set the starting coordinates and heading of the robot");
				if (!Session.get('openedSetRobotInitPosAccordion')) {
					Session.set('openedSetRobotInitPosAccordion', true);
					$('.ui.accordion').accordion('open', 1);
          Session.set('mouseSelect', 'init_pos');
				}
				if (set_robot_init_pose.x >= 0 && set_robot_init_pose.y >= 0) {
					Session.set('initializedPosition', true);
          Session.set('initPosCoords', set_robot_init_pose);
					drawRobotInitPos(s, set_robot_init_pose.x, set_robot_init_pose.y, arrow_degrees);
				}
			}
    } else if (calibrationCount == 0 && !Session.get('calibrateAll')) {
      //we haven't initialized ANYTHING, so display the new set of instructions
      Session.set('runtimeStatus', "No calibration points set!\nPlease click calibrate all edges");
    }

    var devices = Meteor.Coordinates.find({}).fetch();

    s.fill('#ff7361');
    for (var i = 0; i < devices.length; i++) {
      var device = devices[i];
      var canvasCoords = worldToCanvas(device.ros_coords.x, device.ros_coords.y);
      s.rect(canvasCoords.x,canvasCoords.y,20,20);
    }
  }

  s.mouseClicked = function() {
    if (s.mouseX >= 0 && s.mouseY >= 0) {
      if (Session.get('mouseSelect') == 'left') {
        calibration_points.left.x = s.mouseX;
        calibration_points.left.y = s.mouseY;
        $('#calibrateLeft').val('x = ' + s.mouseX);
      } else if (Session.get('mouseSelect') == 'right') {
        calibration_points.right.x = s.mouseX;
        calibration_points.right.y = s.mouseY;
        $('#calibrateRight').val('x = ' + s.mouseX);
      } else if (Session.get('mouseSelect') == 'top') {
        calibration_points.top.x = s.mouseX;
        calibration_points.top.y = s.mouseY;
        $('#calibrateTop').val('y = ' + s.mouseX);
      } else if (Session.get('mouseSelect') == 'bottom') {
        calibration_points.bottom.x = s.mouseX;
        calibration_points.bottom.y = s.mouseY;
        $('#calibrateBottom').val('y = ' + s.mouseY);
      } else if (Session.get('mouseSelect') == 'init_pos') {
         set_robot_init_pose.x = s.mouseX;
         set_robot_init_pose.y = s.mouseY;
      } else if (Session.get('mouseSelect') == 'send_coords') {
				Session.set('sendCoords', true);
        send_robot_points.x = s.mouseX;
        send_robot_points.y = s.mouseY;
      }
      if (Session.get('calibrateAll') && isCalibratingCoordinates()) {
        advanceNextMouseSelect();
      }
      Session.set('calibrationPoints', calibration_points);

    }
    Session.set('mouseCoords', {x: s.mouseX, y: s.mouseY});
    // Meteor.call('sendCoords', s.mouseX, s.mouseY);
  }
};

Template.landing.onRendered(function() {
    if (Session.get('renderedNonlanding')) {
      location.reload();
    }
    Session.set('mouseSelect', 'no_select');
    $('.ui.accordion').accordion();
		$("#headingInput").mousemove(function () {
			$("#headingVal").text($("#headingInput").val())
      set_robot_init_pose.th = parseInt($('#headingInput').val());
      Session.set('initPosCoords', set_robot_init_pose);
		});

    new p5(sketch1, "sketch1");

});
