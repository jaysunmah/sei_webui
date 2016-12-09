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
