import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EventsCategory = new Mongo.Collection('events_category');

if (Meteor.isServer) {
	Meteor.publish('events_category', function eventsCategoryPublication() {
		return EventsCategory.find();
	});

	Meteor.methods({
		'events.addCategory'(category) {
			try {
				check(category, {
					name: String,
				});
			}
			catch (error) {
			  throw new Meteor.Error('text is not string');
			}

			// check if category is already exists
			if(EventsCategory.find({name:category.name}).fetch().length !== 0) {
			  throw new Meteor.Error('category name is already exists');
			}

			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
			  throw new Meteor.Error('not-authorized');
			}
	 
			EventsCategory.insert({
				name: category.name,
				active: category.active || true,
				visible: category.visible || true,
				createdAt: new Date()
			});
		},

	});

}
