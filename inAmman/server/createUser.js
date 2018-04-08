import { check } from 'meteor/check';

if (Meteor.isServer) {

  // if (Meteor.users.findOne({username: "issa"})) {
  //   Roles.addUsersToRoles(Meteor.users.findOne({username: "issa"})._id, 'Admin');
  // }
  Roles.addUsersToRoles('CJFWyhgfkL4GXsniF', 'Admin');


  Accounts.onCreateUser(function(info, user) {
    user.username = info.username;
    user.profile = {
      fname:'',
      lname :'',
      fullName:'',
      image:'',
      bio : '',
      phoneNum : '',
      gender : 'notSpecified',
      dob :'',
      website : '',
      createdAt:new Date(),
      followers :[],
      following : [],
      posts : []
    }

    return user;
  },( error ) => {
    console.log(error)
  });

  Meteor.methods({
    'addRoleToUser'(userId){
      check(userId, String);
      Roles.addUsersToRoles(userId, 'User');
    },
    'addRoleToAdmin'(id){
      check(id, String);
      if(Meteor.users.findOne({_id: id})){
        Roles.addUsersToRoles(id, 'Admin');
      }
    }
  });

}