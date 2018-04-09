import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Events } from '../../api/events/events.js';
import { EventsCategory } from '../../api/events/eventsCategory.js';

import EventCard from '../../../imports/ui/events/eventCard.js';

class EventsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events : this.props.events,
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
			<div className="ia-events">
				<div className="container">
					<h1>events</h1>
					<div className="ia-events__evt-cards-wapper">
						<div className="row">
							{this.renderCards()}
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderCards() {
		return this.state.events.map((item, i) => (
			<EventCard key={i} item={item}/>
		))
	}
}
export default withTracker(() => {
	Meteor.subscribe('events');
	Meteor.subscribe('events_category');
	return {
		events: Events.find({}, { sort: { createdAt: -1 } }).fetch() || [],
	};
})(EventsMain);