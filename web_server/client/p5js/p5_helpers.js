//returns true if the user is currently trying to calibrate points
isCalibratingCoordinates = function() {
	var mouseStatus = Session.get('mouseSelect');
	return (mouseStatus == 'left' ||
					mouseStatus == 'right' ||
					mouseStatus == 'top' ||
					mouseStatus == 'bottom')
}

advanceNextMouseSelect = function() {
	var mouseStatus = Session.get('mouseSelect');
	if (mouseStatus == 'left') {
		Session.set('mouseSelect', 'top');
	} else if (mouseStatus == 'right') {
		Session.set('mouseSelect', 'bottom');
	} else if (mouseStatus == 'top') {
		Session.set('mouseSelect', 'right');
	} else if (mouseStatus == 'bottom') {
		Session.set('mouseSelect', 'no_select');
		Session.set('calibrateAll', false);
	}
}

displayInstructions = function(s, count) {
  var instructions;
  if (Session.get('mouseSelect') == 'left') {
    Session.set('runtimeStatus', "Please select the left\nmost boundary");
  } else if (Session.get('mouseSelect') == 'right') {
    Session.set('runtimeStatus', "Please select the right\nmost boundary");
  } else if (Session.get('mouseSelect') == 'top') {
    Session.set('runtimeStatus', "Please select the top\nmost boundary");
  } else if (Session.get('mouseSelect') == 'bottom') {
    Session.set('runtimeStatus', "Please select the bottom\nmost boundary");
  }
}

drawCalibrationLines = function(s) {
  var calibration_count = 0;
  if (calibration_points.left.x >= 0) {
    drawVerticalLine(s, calibration_points.left.x);
    calibration_count += 1;
  }
  if (calibration_points.right.x >= 0) {
    drawVerticalLine(s, calibration_points.right.x);
    calibration_count += 1;
  }
  if (calibration_points.top.x >= 0) {
    drawHorizontalLine(s, calibration_points.top.y);
    calibration_count += 1;
  }
  if (calibration_points.bottom.x >= 0) {
    drawHorizontalLine(s, calibration_points.bottom.y);
    calibration_count += 1;
  }
  //displayInstructions(s, calibration_count);
  return calibration_count;
}

drawHorizontalLine = function(s, y) {
  s.strokeWeight(5);
  s.stroke('#ff7361');
  var xStart = 0;
  var xEnd = s.windowWidth;

  if (calibration_points.left.x >= 0) {
    xStart = calibration_points.left.x;
  }

  if (calibration_points.right.x >= 0) {
    xEnd = calibration_points.right.x;
  }
  s.line(xStart, y, xEnd, y);

  s.noStroke();
  s.strokeWeight(1);
}

drawVerticalLine = function(s, x) {
  s.strokeWeight(5);
  s.stroke('#ff7361');
  var yStart = 0;
  var yEnd = s.windowHeight;

  if (calibration_points.top.y >= 0) {
    yStart = calibration_points.top.y;
  }

  if (calibration_points.bottom.y >= 0) {
    yEnd = calibration_points.bottom.y;
  }
  s.line(x, yStart, x, yEnd);

  s.noStroke();
  s.strokeWeight(1);
}

drawRobotSetPoint = function(s, x, y) {
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

drawRobotInitPos = function(s, x, y, th) {
  var th = -1 * th;
  s.rectMode(s.CENTER);
  s.push();
  s.fill('#ff7361');
  s.translate(x,y);
  s.rotate(s.radians(th));
  s.rect(0,0,4,35);
  s.rotate(s.radians(30));
  s.rect(-9, -3, 4, 20);
  s.rotate(s.radians(-60));
  s.rect(9, -3, 4, 20);
  s.pop();
}

drawRobot = function(s, x, y, th) {
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
