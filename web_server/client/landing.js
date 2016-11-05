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
    if (Session.get('mouseSelect') == 'no_select') {
      Session.set('mouseSelect', 'left');
      $('#calibrateLeftButton').addClass('blue');
      document.getElementById("calibrateLeft").readOnly = false;
    } else if (Session.get('mouseSelect') == 'left') {
      Session.set('mouseSelect', 'no_select');
      $('#calibrateLeftButton').removeClass('blue');
    }
  },
  'click #calibrateRightButton' (event) {
    if (Session.get('mouseSelect') == 'no_select') {
      Session.set('mouseSelect', 'right');
      $('#calibrateRightButton').addClass('blue');
      document.getElementById("calibrateRight").readOnly = false;
    } else if (Session.get('mouseSelect') == 'right') {
      Session.set('mouseSelect', 'no_select');
      $('#calibrateRightButton').removeClass('blue');
    }
  },
  'click #calibrateTopButton' (event) {
    if (Session.get('mouseSelect') == 'no_select') {
      Session.set('mouseSelect', 'top');
      $('#calibrateTopButton').addClass('blue');
      document.getElementById("calibrateTop").readOnly = false;
    } else if (Session.get('mouseSelect') == 'top') {
      Session.set('mouseSelect', 'no_select');
      $('#calibrateTopButton').removeClass('blue');
    }
  },
  'click #calibrateBottomButton' (event) {
    if (Session.get('mouseSelect') == 'no_select') {
      Session.set('mouseSelect', 'bottom');
      $('#calibrateBottomButton').addClass('blue');
      document.getElementById("calibrateBottom").readOnly = false;
    } else if (Session.get('mouseSelect') == 'bottom') {
      Session.set('mouseSelect', 'no_select');
      $('#calibrateBottomButton').removeClass('blue');
    }
  },

});

Template.landing.helpers({
  selected: function () {
    return Session.get('mouseCoords') || {x: "n/a", y: "n/a"};
  }
});
