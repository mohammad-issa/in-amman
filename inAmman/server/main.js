import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';


Meteor.startup(() => {
  // code to run on server at startup
  console.log(Meteor.settings.private.hackTheGibson);
});