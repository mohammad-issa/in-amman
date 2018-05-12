import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check'

export const Store = new Mongo.Collection('store');

if (Meteor.isServer) {

	Meteor.publish('store', function storePublication() {
		return Store.find({});
	});

	Meteor.methods({
		// Insert Or Update Event
		'store.insertUpdateStore'(strData) {
			console.log('strData', strData)
			try {
				check(strData, {
					_id: String,
					name: String,
					thum: String,
					bio: String,
					categoryId: String,
				    gallery: [String],
				    branches: [String],
				    telephone: [String]
				});
			}
			catch (error) {
				console.log(error);
				throw new Meteor.Error('error in object types');
			}

			// Make sure the admin user is logged in before inserting a task
			if(!Meteor.userId() && !Meteor.user().roles.indexOf('Admin') !== -1){
			  throw new Meteor.Error('not-authorized');
			  return;
			}

			// Check all inputs required
			if(strData.name.trim() === '' || strData.thum.trim() === '') {
			  throw new Meteor.Error('all inputs required');
			}

			// If store is already exists
			if(strData._id) {
				try {
					check(strData._id, String)
				} catch (error) {
					console.log('id is not string');
					throw new Meteor.Error('id is not string');
				};
				Store.update(
					{_id: strData._id},
					{
						$set: {
							name: strData.name,
							thumbnail: strData.thum,
							bio: strData.bio,
							gallery: strData.gallery,
							branches: strData.branches,
							categoryId: strData.categoryId
						}
					}
				)
				console.log('update');

			} else { // If is no there store
				Store.insert({
					name: strData.name,
					thumbnail: strData.thum,
					bio: strData.bio || '',
					gallery: strData.gallery || [],
					branches: strData.branches || [],
					categoryId: strData.categoryId
				});
				console.log('new store has been inserted');
			}
		}
	});
}
