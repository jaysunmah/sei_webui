var sketch1 = function (s) {
    var x = 0;
    var map;
    var imageScale = 200;

    s.preload = function() {
      console.log('wei');
      map = s.loadImage("images/sei_layout.png");

    }

    s.setup = function () {
        s.createCanvas($('#sketch1').width(), 1000);
    };

    s.draw = function () {
      s.background(255);
      s.image(map, $('#sketch1').width() / 2 - 2.5 * imageScale / 2, 0, 2.5 * imageScale, 4 * imageScale);
      s.rect(x,10,50,50);
      x = (x + 10) % $('#sketch1').width();
    }

    s.mouseClicked = function() {
      console.log(s.mouseX, s.mouseY);
      Meteor.call('sendCoords', s.mouseX, s.mouseY);
    }
};


Template.landing.onRendered(function() {
    console.log('pls worl');
    new p5(sketch1, "sketch1");
})
