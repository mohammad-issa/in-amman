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
				createdAt: new Date()
			});
		},
		'events.deleteCategory'(categoryId) {
			try {
				check(categoryId, String);
			}
			catch (error) {
			  throw new Meteor.Error('Id is not string');
			}

			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1) {
			  throw new Meteor.Error('not-authorized');
			}
	 
			EventsCategory.remove({
				_id: categoryId
			});
		},
		'events.updateCategory'(categoryId, categoryName, categoryActive) {
			try {
				check(categoryId, String);
				check(categoryName, String);
				check(categoryActive, Boolean);
			}
			catch (error) {
			  throw new Meteor.Error('issue in data type');
			}

			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1) {
			  throw new Meteor.Error('not-authorized');
			}

			if(categoryName.length <= 0) {
			  throw new Meteor.Error('please enter a name');
			}
	 
			EventsCategory.update(
				{_id: categoryId},
				{
					$set:{
						name: categoryName,
						active: categoryActive
					}
				}
			);
		},

	});

}
