import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  Meteor.publish('events', function tasksPublication() {
    return Events.find();
  });

	Meteor.methods({
	  'events.insertNewEvent'(text) {
	    try {
		    // check(name, String);
	    	check(text, Number);
		  } catch (error) {
	      throw new Meteor.Error('text is not number');
		  }
	    // Make sure the user is logged in before inserting a task
	    if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
	      throw new Meteor.Error('not-authorized');
	    }
	 
	    Events.insert({
	      text,
	      createdAt: new Date(),
	      owner: this.userId,
	      username: Meteor.users.findOne(this.userId).username,
	    });
	  },

	  'events.removeEvent'(evtId) {
	    check(evtId, String);
	    Events.remove(evtId);
		}
	});
}
