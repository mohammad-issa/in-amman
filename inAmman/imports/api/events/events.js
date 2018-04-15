import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check'

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
	Meteor.publish('events', function eventsPublication() {
		return Events.find();
	});

	Meteor.methods({
		// Insert New Event
		'events.insertNewEvent'(evtData) {
			console.log(evtData);
			try {
				check(evtData, {
					title: String,
					subTitle: String,
					description: String,
					location: String,
					categoryId: String,
					startDate: Match.OneOf(String, Date),
					endDate: Match.OneOf(String, Date),
					thumbnail: String,
				    gallery: [String],
				    price: Number,
				    oldPrice: Number,
				    discount: Number,
				    store: String,
				    tags: [String],
				    active: Boolean,
				    visable: Boolean
				});
			}
			catch (error) {
				console.log('error in object types');
				throw new Meteor.Error('error in object types');
			}
			// Make sure the admin user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
			  throw new Meteor.Error('not-authorized');
			  return;
			}
			Events.insert({
				title: evtData.title,
				subTitle: evtData.subTitle || null,
				description: evtData.description || null,
				categoryId: evtData.categoryId,
				startDate: evtData.startDate || null,
				endDate: evtData.endDate || null,
				createdAt: new Date(),
				price: evtData.price || null,
				oldPrice: evtData.oldPrice || null,
				discount: evtData.discount || null,
				location: evtData.location,
				thumbnail: evtData.thumbnail,
				gallery: evtData.gallery,
				storeId: evtData.storeId,
				visable: evtData.visable || true,
				active: evtData.active || true,
				tags: evtData.tags,
				addByUsername: Meteor.users.findOne(this.userId).username,
				likes: 0,
				share: 0
			});
		},
	});
}
