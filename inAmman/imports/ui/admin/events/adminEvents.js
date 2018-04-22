import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../../api/events/events.js';
import AdminEventCard from './adminEventCard.js';

class AdminEvents extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			events: this.props.events,
		}
		this.renderCards = this.renderCards.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			events: nextProps.events
		})
	}

	render() {
		return(
			<div>
				<h1>Events</h1>
				<a href="/admin/events/add-event">add new</a>
				<div className='admin-evt-cards-container'>
					{this.renderCards()}
				</div>
			</div>
		)
	}

	renderCards() {
		return this.state.events.map((evt, i) => (
			<AdminEventCard key={i} event={evt}/>
		))
	}
}

export default withTracker(() => {
  Meteor.subscribe('events');
  return {
	events: Events.find({}, { sort: { createdAt: -1 } }).fetch() || [],
  };
})(AdminEvents);