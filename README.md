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
