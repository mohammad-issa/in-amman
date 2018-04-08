import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EventsCategory = new Mongo.Collection('events_category');

if (Meteor.isServer) {
	Meteor.publish('events_category', function eventsCategoryPublication() {
		return EventsCategory.find();
	});
// Meteor.methods({
//   'events.addCategory'(obj) {
//     try {
// 	    check(text, String);
//   	}
//   	catch (error) {
//       throw new Meteor.Error('text is not string');
//   	}
//     // Make sure the user is logged in before inserting a task
//     if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
//       throw new Meteor.Error('not-authorized');
//     }
 
//     EventsCategory.insert({
//       text,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },

//   'events.removeEvent'(evtId) {
//     check(evtId, String);
//     Events.remove(evtId);
// 	}
// });

}
