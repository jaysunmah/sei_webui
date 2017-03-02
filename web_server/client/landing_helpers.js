//These are the helper functions used on our landing page. Updated as of March 2nd, 2017.
//Notable functions in here:
//1) Ros library helper functions

var ros;
var listener;
var test;
var t;

calibrationEventHandler = function(id) {
  if (id == "calibrateLeft") {
    if (Session.get('mouseSelect') == 'left') {
      Session.set('mouseSelect', 'no_select');
      Session.set('openedSetRobotInitPosAccordion', false);
    } else {
      Session.set('mouseSelect', 'left');
    }
  } else if (id == "calibrateRight") {
    if (Session.get('mouseSelect') == 'right') {
      Session.set('mouseSelect', 'no_select');
      Session.set('openedSetRobotInitPosAccordion', false);
    } else {
      Session.set('mouseSelect', 'right');
    }
  } else if (id == "calibrateTop") {
    if (Session.get('mouseSelect') == 'top') {
      Session.set('mouseSelect', 'no_select');
      Session.set('openedSetRobotInitPosAccordion', false);
    } else {
      Session.set('mouseSelect', 'top');
    }
  } else if (id == "calibrateBottom") {
    if (Session.get('mouseSelect') == 'bottom') {
      Session.set('mouseSelect', 'no_select');
      Session.set('openedSetRobotInitPosAccordion', false);
    } else {
      Session.set('mouseSelect', 'bottom');
    }
  }
}

rosConnect = function(ip) {
  console.log("Connecting to ip address: " + ip);
  ros = new ROSLIB.Ros({
      url : ip
  });
  ros.on('connection',function() {
    console.log('Connected to websocket server.');
    Session.set('rosConnectionStatus', true);
  });

  ros.on('error',function() {
    console.log('Error: ',error);
  });
  ros.on('close',function() {
    console.log('Closed');
  });

  listener = new ROSLIB.Topic({
    ros: ros,
    name : '/localization',
    messageType : 'cgr_localization/LocalizationMsg'
  });

  listener.subscribe(function(message) {
    data = {
      x: message.x,
      y: message.y,
      th: message.angle,
    }
    //set the Session variable for ui purposes only
    Session.set('rosTurtlePos', data);
    //Call the meteor server to update the new position
    Meteor.call("rosTurtlePosHandler", data);
  });

  test = new ROSLIB.Topic({
    ros: ros,
    name: '/jason',
    messageType: 'std_msgs/String'
  });
}

rosSendMessage = function(data) {
  t = new ROSLIB.Message({
    data: data,
  });

  test.publish(t);
  console.log('sent!');
}
