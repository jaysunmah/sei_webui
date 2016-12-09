README:
Status as of 12/9/16:
Ajay and I were able to get our POST and GET requests working properly, however we suspect we are receiving certain race conditions when we try to run them for a longer period of time.
TODO: Fix these race conditions, then add in code for drawing the robot based on the GET location results.

Set up:
Our dependencies will mainly lie in downloading Meteor JS: https://www.meteor.com/
Once setup, (the current turtlebot SHOULD have the latest meteor version already installed), simply run
```
meteor
```
in the terminal (make sure you are in the /web_server directory)

The project also heavily uses a javascript drawing library called P5JS which is used to handle user mouse interactions as well as animating (soon) the robot's movements: p5js.org

Third, the website uses a css library called semantic ui: http://semantic-ui.com/
It's just another bootstrap library but I really liked using this from previous projects so I decided to use this one here as well.

When meteor sets up the server, just go to a web browser and go to 127.0.0.1:3000/ or localhost:3000/

Some helpful guidelines and intros to MeteorJS that I thought were helpful when learning it:
1) The meteor package already precompiles a ton of server/client js files for us. They even purposefully make these files in two distinct folders: client and server. There is also a public folder which is used to reference things both from the server and from the client. I usually keep assets like audio files or images here. 
2) Due to Meteor's strict hierarchy with client/server, you sort of have to view the server file as a "proxy" between the client and any other server you would want to interract with. I would look up Meteor.methods for more documentation on this.
3) The Session variable is probably one of Meteor's most important aspects. It's sort of like reactJS where we can reactively modify components of a web page without having to introduce aton of vanilla javascript logic. The Session variable is unique to each client, and it is inacessible from the server.
4) Meteor also comes with a super useful template package. While I don't use it as much here, the template package is super nice if you have alot of repetitive html blocks that can take in a data object and nicely render it. 
