import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onRendered(function() {
  Meteor.subscribe('coordinates');
});

Template.main.helpers({
  activated: function(id) {
    if (id == Router.current().route._path) {
      return 'active';
    }
    return ''
  },
});
