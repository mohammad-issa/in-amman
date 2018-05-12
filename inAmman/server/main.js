import { Meteor } from 'meteor/meteor';

import '../imports/api/events/events.js';
import '../imports/api/category/category.js';
import '../imports/api/store/store.js';


Meteor.startup(() => {
  // code to run on server at startup
  console.log(Meteor.settings.private.hackTheGibson);
});
