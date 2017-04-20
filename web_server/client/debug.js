Template.debug.onRendered(function() {
  //motivation behind this: it seems as if p5js is a bit buggy when we try to
  //rerender the landing page. therefore, if we've rendered a nonlanding page,
  //if our landing page renders we need to auto refresh the browser.
  Session.set('renderedNonlanding', true);

  document.getElementById('inputCommand').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      $('#inputCommand').val('');
      return false;
    }
  }
});

Template.debug.events({
  'input #inputCommand' (event) {
    // console.log('hello');
  },

});

Template.debug.helpers({
  rosConnectionStatus: function() {
    if (Session.get('rosConnectionStatus')) {
      return 'green';
    }
    return 'red';
  },
  rosTurtlePos: function() {
    return Session.get('rosTurtlePos');
  },
  //TODO: REMOVE THIS LATER
  testRosCoords: function() {
    return data = Meteor.Coordinates.find({}).fetch();
  },
});
