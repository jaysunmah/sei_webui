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

Template.landing.events({
  'click #canvas' (event) {
    var offSets = getPosition(event.currentTarget);
    console.log(offSets);
    var x = event.clientX;
    var y = event.clientY;
    console.log(x,y);
    $('#pointer').css('margin-top', y - offSets.y - 25)
    $('#pointer').css('margin-left', x - 25)
    $('#pointer').css('display', 'inherit')
  },


});
