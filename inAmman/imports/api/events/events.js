import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
	Meteor.publish('events', function eventsPublication() {
		return Events.find();
	});

	Meteor.methods({
		// Insert New Event
		'events.insertNewEvent'(obj) {
			try {
				check(obj, {
					title: String,
					subTitle: String,
					categoryId: String
				});
			}
			catch (error) {
				throw new Meteor.Error('error in object types');
			}
			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
			  throw new Meteor.Error('not-authorized');
			}
		
			Events.insert({
				title: obj.title,
				subTitle: obj.subTitle,
				categoryId: obj.categoryId,
				createdAt: new Date(),
				addById: this.userId,
				addByIdUsername: Meteor.users.findOne(this.userId).username,
			});
		},
	});
}
