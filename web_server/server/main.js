import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
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
    },
		'getPose': function() {
			this.unblock();
			return HTTP.get('http://127.0.0.1:5000/location');
		},
    'rosTurtlePosHandler': function(data) {
      console.log("ros Coords", rosCoords);
      rosCoords = data;
    }
});
