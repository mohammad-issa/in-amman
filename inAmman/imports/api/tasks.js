import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

// Users = new Mongo.Collection('userInfo');

// Users_Schema = new SimpleSchema({   
//     username: {
//         type: String,
//         optional: false
//     },
//     firstName: {
//         type: String,
//         optional: false
//     },
//     lastName: {
//         type: String,
//         optional: false 
//     },
//     age: {
//         type: Number,
//         optional: false
//     },
//     //.. other details that you need.
// });

// Users.attachSchema(Users_Schema);