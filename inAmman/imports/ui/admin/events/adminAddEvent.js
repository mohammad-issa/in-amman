import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import AdminEventForm from './adminEventForm';

class AdminAddEvent extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div>
				<h1>Add Event</h1>
				<AdminEventForm/>
			</div>
		)
	}

}
export default withTracker(() => {
  return {};
})(AdminAddEvent);