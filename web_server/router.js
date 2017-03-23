Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});

Router.route("/get_ros_location", {where: "server"})
  .get( function() {
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(rosCoords));
  })
  .post (function() {
    this.response.statusCode = 200;
    this.response.end("wei");
});

Router.route("/set_holo_pos", {where: "server"})
  .get( function() {
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(rosCoords));
  })
  .post (function() {
    var ip_address = this.request.headers['x-forwarded-for']
    post_data = this.request.body;
    var  data = Meteor.Coordinates.findOne({ip: ip_address});
    disconnect_id = timeoutRemove(ip_address);

    if (data) {
      Meteor.clearTimeout(timeout_ids[ip_address]);
      timeout_ids[ip_address] = disconnect_id;
      Meteor.Coordinates.update(
        {ip: ip_address},
        {$set: {
          ros_coords: {
            x: post_data['x'],
            y: post_data['y']
          },
        }});
    } else {
      timeout_ids[ip_address] = disconnect_id;
      data = {
        ip: ip_address,
        type: "hololens",
        ros_coords: {
          x: post_data['x'],
          y: post_data['y'],
        },
      }
      Meteor.Coordinates.insert(data);
    }

    this.response.statusCode = 200;
    this.response.end("wei");
    return;
});
