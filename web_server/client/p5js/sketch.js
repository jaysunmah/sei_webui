var sketch1 = function (s) {
    var x = 0;
    //var map;

    s.preload = function() {
      console.log('wei');
      //map = s.loadImage("ghc5.png");

    }

    s.setup = function () {
        s.createCanvas($('#sketch1').width(), 500);
        //s.background(100);
    };

    s.draw = function () {
      s.background(255);
      s.rect(x,10,50,50);
      x = (x + 10) % $('#sketch1').width();

      //s.image(map, 250, 250);

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
