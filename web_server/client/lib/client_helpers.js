//This file is for all global client helpers:
//This file is separate from p5_helpers.js in that this is a more global
//helper file

// leftmostX = 126.13;
// rightmostX = 325.13;
// topmostY = 873.69;
// bottommostY = 595.35;

leftmostX = 25.03;
rightmostX = 307.45;
topmostY = 1133.40;
bottommostY = 740.42;

sigFigs = 7;

//converts canvasCoordinates to world Coordinates (Ros);
canvasToWorld = function(x, y) {
	if (Session.get('calibrationPoints')) {
		var canvasLeftX = Session.get('calibrationPoints').left.x;
		var canvasRightX = Session.get('calibrationPoints').right.x;
		var xProportion = (x - canvasLeftX) / (canvasRightX - canvasLeftX);
		var xCoord = leftmostX + (rightmostX - leftmostX) * xProportion;
		var xResult = Number((xCoord).toFixed(sigFigs));

		var canvasTopY = Session.get('calibrationPoints').top.y;
		var canvasBottomY = Session.get('calibrationPoints').bottom.y;
		var yProp = (y - canvasTopY) / (canvasBottomY - canvasTopY);
		var yCoord = bottommostY + (topmostY - bottommostY) * (1 - yProp);
		var yResult = Number((yCoord).toFixed(sigFigs));

		return {x: xResult, y: yResult};
	}
	return {x: -1, y: -1};
}

//converts ROS coordinates into p5canvas coordinates
worldToCanvas = function(x, y) {
	if (Session.get('calibrationPoints')) {
		var canvasLeftX = Session.get('calibrationPoints').left.x;
		var canvasRightX = Session.get('calibrationPoints').right.x;

		var xProp = (x - leftmostX) / (rightmostX - leftmostX);
		var xCoord = canvasLeftX + (canvasRightX - canvasLeftX) * xProp;
		var xResult = Number((xCoord).toFixed(sigFigs));

		var canvasTopY = Session.get('calibrationPoints').top.y;
		var canvasBottomY = Session.get('calibrationPoints').bottom.y;
		var yProp = (y - topmostY) / (bottommostY - topmostY);
		var yCoord = canvasBottomY + (canvasTopY - canvasBottomY) * (1 - yProp);
		var yResult = Number((yCoord).toFixed(sigFigs));

		return {x: xResult, y: yResult};
	}
	return {x: -1, y: -1};
}
