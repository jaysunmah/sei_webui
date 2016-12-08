function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function setPointer() {
  console.log('we');
  var offSets = getPosition(canvas);
  x = event.clientX;
  y = event.clientY;
  $('#pointer').css('margin-top', y - offSets.y - 12.5);
  $('#pointer').css('margin-left', x - 12.5);
  $('#pointer').css('display', 'inherit');
}

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
