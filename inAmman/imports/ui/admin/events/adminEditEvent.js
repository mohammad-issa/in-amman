import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../../api/events/events.js';
import AdminEventForm from './adminEventForm';

class AdminEditEvent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return( 
			<div className=''>
				<h1>Edit Event</h1>
				<p>#{this.props.event._id}  -  {this.props.event.title}</p>
				<AdminEventForm data={this.props.event}/>
			</div>
		)
	}
}
export default withTracker((props) => {
	const event = Events.findOne(props.evtId) || {}
	return {
		event 
	}
})(AdminEditEvent);