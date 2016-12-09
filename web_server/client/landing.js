var x;
var y;
var canvas;

Template.landing.events({
  'change #headingInput' (event) {
    Session.set('initializedHeading', true);
  },
  'click #calibrateLeftButton' (event) {
    if (Session.get('mouseSelect') == 'left') {
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'left');
    }
  },
  'click #calibrateRightButton' (event) {
    if (Session.get('mouseSelect') == 'right') {
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'right');
    }
  },
  'click #calibrateTopButton' (event) {
    if (Session.get('mouseSelect') == 'top') {
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'top');
    }
  },
  'click #calibrateBottomButton' (event) {
    if (Session.get('mouseSelect') == 'bottom') {
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'bottom');
    }
  },
  'click #calibrateAll' (event) {
    if (Session.get('calibrateAll')) {
      Session.set('calibrateAll', false);
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'left');
      Session.set('calibrateAll', true);
    }
  }, //this is just for testing purposes right now, remove this later
		//on if we get the GET location request to work properly
  'click #sendRobot' (event) {
		if (Session.get('sendCoords')) {
			var cb = function(e, res) {
				console.log(res);
			}
			Meteor.call('getPose', {}, cb);
		}
  },
  'click #confirmInitialPose' (event) {
    if (Session.get('initializedPosition') && Session.get('initializedHeading')) {
      $('.ui.accordion').accordion('open', 2);
      Session.set('initializedPose', true);
      Session.set('mouseSelect', 'send_coords');
			var coords = Session.get('initPosCoords');
			if (coords) {
				var result = canvasToWorld(coords.x, coords.y);
				Meteor.call('initRobot', result.x, result.y, coords.th);
			}
    }
  },
});

Template.landing.helpers({
  runtimeStatus: function() {
    return Session.get('runtimeStatus') || 'Welcome to Turtlebot!';
  },
  selected: function () {
    var coords = Session.get('mouseCoords') || {x: -1, y: -1};
		return canvasToWorld(coords.x, coords.y);
  },
  blueLeft: function () {
    if (Session.get('mouseSelect') == 'left') {
      return 'blue';
    }
    return '';
  },
  blueRight: function () {
    if (Session.get('mouseSelect') == 'right') {
      return 'blue';
    }
    return '';
  },
  blueTop: function () {
    if (Session.get('mouseSelect') == 'top') {
      return 'blue';
    }
    return '';
  },
  blueBottom: function () {
    if (Session.get('mouseSelect') == 'bottom') {
      return 'blue';
    }
    return '';
  },
  blueCalibrateAll: function () {
    if (Session.get('calibrateAll')) {
      return 'blue';
    }
    return '';
  },
  blueGo: function () {
    if (Session.get('sendCoords')) {
      return 'blue'
    }
    return '';
  },
  calibrationPoints: function () {
    return Session.get('calibrationPoiints');
  },
  initCoords: function() {
    var coords = Session.get('initPosCoords') || {x: -1, y: -1};
		return canvasToWorld(coords.x, coords.y);
  },
  blueInitPos: function() {
    if (Session.get('initializedPosition') && Session.get('initializedHeading')) {
      return 'blue';
    }
    return '';
  }
});
