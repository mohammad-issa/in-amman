if (Meteor.isServer) {
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
}