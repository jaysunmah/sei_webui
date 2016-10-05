import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'sendCoords': function(x, y){
      console.log('wei', x, y);
      HTTP.get('http://127.0.0.1:5000/wei');
    }
});

