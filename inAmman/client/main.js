import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
 
// import App from '../imports/ui/todoapp/todoapp.js';
import Homepage from '../imports/ui/main/homepage.js';

 
Meteor.startup(() => {
  render(<Homepage />, document.getElementById('app'));
});