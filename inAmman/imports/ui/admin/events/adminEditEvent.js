import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../../api/events/events.js';

class AdminEditEvent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return( 
			<div className=''>
				<h1>Edit Event</h1>
				<p>{this.props.event.title}</p>
			</div>
		)
	}
}
export default withTracker((props) => {
	console.log('withTracker')
	const event = Events.findOne(props.evtId) || {}
	return {
		event 
	}
})(AdminEditEvent);