import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'initRobot': function(x, y, th){
      var options = {
				data: {
        	'x': x,
        	'y': y,
					'th': th,
				}
      }
			console.log(options);
      HTTP.post('http://127.0.0.1:5000/init', options)
    }
});

