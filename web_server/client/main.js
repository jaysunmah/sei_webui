import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onRendered(function() {
  Meteor.subscribe('coordinates');
});
