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
			</div>
		)
	}

	// componentDidMount() {
	// 	console.log(this.props.evtId)
	// 	let self = this;
	// 	FlowRouter.subsReady("events", function() {
	// 	    console.log(Events.findOne({_id:self.props.evtId}));
 //      	});
	// }
}
export default withTracker((props) => {
	return {
		event: Events.findOne({_id:props.evtId}) || {}
	}
})(AdminEditEvent);