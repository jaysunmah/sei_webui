Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});

Router.route("/getroslocation", {where: "server"})
  .get( function() {
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(rosCoords));
  })
  .post (function() {
    this.response.statusCode = 200;
    this.response.end("wei");
});
