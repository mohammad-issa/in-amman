import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Events } from '../events/events.js'

export const Category = new Mongo.Collection('category');

if (Meteor.isServer) {
	Meteor.publish('category', function categoryPublication() {
		return Category.find();
	});

	Meteor.publish('eventCategories', (() => {
		return Category.find({'related.event':true}, {});
	}));

	Meteor.methods({
		'category.addCategory'(category) {
			try {
				check(category, {
					name: String,
					relatedCategory: Object
				});
			}
			catch (error) {
			  throw new Meteor.Error('text is not string');
			}

			// check if category is already exists
			if(Category.find({name:category.name}).fetch().length !== 0) {
			  throw new Meteor.Error('category name is already exists');
			}

			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
			  throw new Meteor.Error('not-authorized');
			}
	 
			Category.insert({
				name: category.name,
				active: category.active || true,
				related: {
					offer: category.relatedCategory.offer,
					event: category.relatedCategory.event
				},
				createdAt: new Date()
			});
		},
		'category.deleteCategory'(categoryId) {
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

			// events still in db but without category ID
			// see category.updateCategory function
			let allEventsHasCategoryId = Events.find({categoryId:categoryId},{}).fetch();
			for(let i = 0 ; i < allEventsHasCategoryId.length ; i++) {
				Events.update(
					{_id:allEventsHasCategoryId[i]._id},
					{
						$set: {
							categoryId: ''
						}
					}
				)
			}
	 
			Category.remove({
				_id: categoryId
			});
		},
		'category.updateCategory'(categoryId, categoryName, categoryRelated, categoryActive) {
			try {
				check(categoryId, String);
				check(categoryName, String);
				check(categoryRelated, Object);
				check(categoryActive, Boolean);
			}
			catch (error) {
			  throw new Meteor.Error('issue in data type');
			}

			// Make sure the user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1) {
			  throw new Meteor.Error('not-authorized');
			}
			// category name is required
			if(categoryName.length <= 0) {
			  throw new Meteor.Error('please enter a name');
			}

			// when category that related to events was true and updated to false all events that hold this category id should be null
			// events still in db but without category ID
			let allEventsHasCategoryId = Events.find({categoryId:categoryId},{}).fetch();
			for(let i = 0 ; i < allEventsHasCategoryId.length ; i++) {
				Events.update(
					{_id:allEventsHasCategoryId[i]._id},
					{
						$set: {
							categoryId: ''
						}
					}
				)
			}
	 
			Category.update(
				{_id: categoryId},
				{
					$set: {
						name: categoryName,
						related: {
							offer: categoryRelated.offer,
							event: categoryRelated.event
						},
						active: categoryActive
					}
				}
			);
		},

	});

}
