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
  },
  'click #sendRobot' (event) {
    if (Session.get('sendCoords')) {
      console.log("WEI HELLO");
    }
  },
  'click #confirmInitialPose' (event) {
    if (Session.get('initializedPosition') && Session.get('initializedHeading')) {
      $('.ui.accordion').accordion('open', 2);
      Session.set('initializedPose', true);
      Session.set('mouseSelect', 'send_coords');
			var coords = Session.get('initPosCoords') || {};
			Meteor.call('initRobot', coords.x, coords.y, coords.th);
    }
  },
});

Template.landing.helpers({
  runtimeStatus: function() {
    return Session.get('runtimeStatus') || 'Welcome to Turtlebot!';
  },
  selected: function () {
    return Session.get('mouseCoords') || {x: "n/a", y: "n/a"};
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
    return Session.get('initPosCoords') || {x: "n/a", y: "n/a"};
  },
  blueInitPos: function() {
    if (Session.get('initializedPosition') && Session.get('initializedHeading')) {
      return 'blue';
    }
    return '';
  }
});
