import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.setInterval(function() {
    console.log("Pinging heroku app...")
    HTTP.get("https://seiturtle.herokuapp.com");
    HTTP.get("https://sheltered-refuge-14380.herokuapp.com/");
  }, 300000);
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
			console.log('Initializing robot at ', options);
			//HTTP.post('http://127.0.0.1:5000/init', options)
    },
		'getPose': function() {
			this.unblock();
			return HTTP.get('http://127.0.0.1:5000/location');
		}
});
