Meteor.Coordinates = new Mongo.Collection('coordinates');

leftmostX = 126.13;
rightmostX = 325.13;
topmostY = 873.69;
bottommostY = 595.35;

//converts canvasCoordinates to world Coordinates (Ros);
canvasToWorld = function(x, y) {
	if (Session.get('calibrationPoints')) {
		var canvasLeftX = Session.get('calibrationPoints').left.x;
		var canvasRightX = Session.get('calibrationPoints').right.x;
		var xProportion = (x - canvasLeftX) / (canvasRightX - canvasLeftX);
		var xCoord = leftmostX + (rightmostX - leftmostX) * xProportion;
		var xResult = Number((xCoord).toFixed(5));

		var canvasTopY = Session.get('calibrationPoints').top.y;
		var canvasBottomY = Session.get('calibrationPoints').bottom.y;
		var yProportion = (y - canvasTopY) / (canvasBottomY - canvasTopY);
		var yCoord = bottommostY + (topmostY - bottommostY) * (1 - yProportion);
		var yResult = Number((yCoord).toFixed(5));

		return {x: xResult, y: yResult};
	} else {
		return {x: -1, y: -1};
	}
}
