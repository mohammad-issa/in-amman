import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../imports/layout/mainLayout';

import Homepage from '../imports/ui/main/homepage';
import App from '../imports/ui/todoapp/todoapp';


FlowRouter.route('/',{
	action(){
		// if(Meteor.userId()){
			// FlowRouter.redirect('/home')
		// }
		// else{
			mount(MainLayout,{
				content:(<Homepage/>)
			})
		// }
	}
})

FlowRouter.route('/app',{
	action(){
		// if(Meteor.userId()){
			// FlowRouter.redirect('/home')
		// }
		// else{
			mount(MainLayout,{
				content:(<App/>)
			})
		// }
	}
})