import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Meteor.Coordinates = new Mongo.Collection('coordinates');
});

Meteor.methods({
    'initRobot': function(x, y, th) {
      var options = {
				data: {
        	'x': x,
        	'y': y,
					'th': th,
				}
      }
      rosCoords = options.data;
			console.log('Initializing robot at ', options);
			//HTTP.post('http://127.0.0.1:5000/init', options)
    }, //I don't think we need this funciton anymore? Investigate this later
		'getPose': function() {
			this.unblock();
      return rosCoords;
		},
    'rosTurtlePosHandler': function(data) {
      console.log("ros Coords", rosCoords);
      rosCoords = data;
    }
});
