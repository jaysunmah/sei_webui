//Schema for Meteor.Coordinates:
  //ip
  //ros_coords:
    //x
    //y
    //th (TODO)
Meteor.Coordinates = new Mongo.Collection('coordinates');
//Schema for Meteor.Calib:
  //type:
  //coords:
    //x
    //y
Meteor.Calib = new Mongo.Collection('calib');
