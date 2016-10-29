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
  'click #calibrateLeftButton' (event) {
    document.getElementById("calibrateLeft").readOnly = false;
  },
  'click #calibrateRightButton' (event) {
    document.getElementById("calibrateRight").readOnly = false;
  },

});

Template.landing.helpers({
  selected: function () {
    return Session.get('mouseCoords') || {x: "n/a", y: "n/a"};
  }
});
