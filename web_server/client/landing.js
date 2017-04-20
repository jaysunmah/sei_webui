var x;
var y;
var canvas;

select_calib_left = false;
select_calib_right = false;
select_calib_top = false;
select_calib_bot = false;
select_calib_all = false;

select_init_pos = false;
select_send_coords = false;

Template.landing.events({
  'change #headingInput' (event) {
    Session.set('initializedHeading', true);
  },
  'click .calibrate' (event) {
    calibrationEventHandler(event.currentTarget.id);
  }, //Toggles calibration statuses
  'click #calibrateAll' (event) {
    if (Session.get('calibrateAll')) {
      Session.set('calibrateAll', false);
      Session.set('mouseSelect', 'no_select');
    } else {
      select_calib_left = true;
      select_calib_all = true;
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
  'click #initRobotPos' (event) {
    if (Session.get('initializedPose') && Session.get('initializedHeading')) {
      Session.set('mouseSelect', 'init_pos');
      Session.set('initializedPose', false);
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
  'click #initRos' (event) {
    var newUrl = 'ws://' + $('#ipAddress').val() + ':9090';
    rosConnect(newUrl);
  },
  'click #sendRosMessage' (event) {
    var data = $('#rosMessage').val();
    console.log(data);
    rosSendMessage(data);
  }
});

Template.landing.helpers({
  runtimeStatus: function() {
    return Session.get('runtimeStatus') || 'Welcome to Turtlebot!';
  },
  selected: function () {
    var coords = Session.get('mouseCoords') || {x: -1, y: -1};
		return canvasToWorld(coords.x, coords.y);
  },
  activated: function(id, type) {
    if (type == "mouseSelect") {
      if (Session.get('mouseSelect') == id) {
        return 'blue';
      }
    } else {
      if ((id == "calibrateAll" && Session.get("calibrateAll")) ||
         (id == "sendCoords" && Session.get("sendCoords")) ||
         (id == "initPos" && Session.get('initializedPosition') && Session.get('initializedHeading'))) {
           return 'blue';
      }
    }
    return '';
  },
  calibrationPoints: function () {
    return Session.get('calibrationPoiints');
  },
  initCoords: function() {
    var coords = Session.get('initPosCoords') || {x: -1, y: -1};
		return canvasToWorld(coords.x, coords.y);
  }, //Get Ros connection status
});
