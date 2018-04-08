import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount, withOptions } from 'react-mounter';
import { Tracker } from 'meteor/tracker';

import { MainLayout } from '../imports/layout/mainLayout';
import { AdminLayout } from '../imports/layout/adminLayout';

import Homepage from '../imports/ui/main/homepage';
import OffersMain from '../imports/ui/offers/offersMain';
import EventsMain from '../imports/ui/events/eventsMain';
import Admintest from '../imports/ui/admin/admintest';
import AddEvent from '../imports/ui/admin/addEvent';

const mount2 = withOptions({
    rootId: 'in-amman-root',
    // rootProps: {'className': 'some-class-name'}
}, mount);

FlowRouter.wait();

Tracker.autorun(() => {
  // wait on roles to intialise so we can check is use is in proper role
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize()
  }
});

FlowRouter.route('/',{
	action(){
		mount2(MainLayout,{
			content:(<Homepage name="Arunoda" />)
		})
	}
})

FlowRouter.route('/offers',{
	triggersEnter: [(context, redirect) => {
	    // console.log(context, redirect)
  	}],
	action(){
		if(!Meteor.userId()){
			FlowRouter.redirect('/')
		}
		else{
			mount2(MainLayout,{
				content:(<OffersMain/>)
			})
		}
	}
})

FlowRouter.route('/events',{
	triggersEnter: [(context, redirect) => {
	    // console.log(context, redirect)
  	}],
	action(){
		if(!Meteor.userId()){
			FlowRouter.redirect('/')
		}
		else{
			mount2(MainLayout,{
				content:(<EventsMain/>)
			})
		}
	}
})

FlowRouter.route('/admin',{
  name: 'admin',
  triggersEnter: [(context, redirect) => {
	    if(Meteor.userId() && Meteor.user().roles.indexOf('Admin') !== -1){
			mount2(AdminLayout,{
				content:(<Admintest/>)
			})
		}
		else{
			FlowRouter.redirect('/')
		}
  }],
});

FlowRouter.route('/admin/events',{
  name: 'admin',
  triggersEnter: [(context, redirect) => {
	    if(Meteor.userId() && Meteor.user().roles.indexOf('Admin') !== -1){
			mount2(AdminLayout,{
				content:(<AddEvent/>)
			})
		}
		else{
			FlowRouter.redirect('/')
		}
  }],
});
