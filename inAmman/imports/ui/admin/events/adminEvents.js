import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../../api/events/events.js';
import AdminEventCard from './adminEventCard.js';

export default class AdminEvents extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			events: Events.find({}, {skip: 0, limit: 10, sort: { createdAt: -1 } }).fetch() || [],
			contentHeight: 0,
			y: 0,
			limit: 10,
			skip: 0,
			totalCounts: 0
		}
		this.renderCards = this.renderCards.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentWillMount() {
		let self = this;
		FlowRouter.subsReady("events", function() {
			self.setState({
				events: Events.find({}, {skip: 0, limit: self.state.limit , sort: { createdAt: -1 } }).fetch() || [],
			})
    });
	}

	componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
		Meteor.call('events.totalCounts', (err, result) => {
			if(!err) {
				this.setState({
					totalCounts: result
				})
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			// events: nextProps.events
		})
	}

	render() {
		const caca = {
			position: 'fixed',
			top:'0',
			left:'0',
			background: 'red'
		}
		return(
			<div>
				<h1>Events</h1>
				<a href="/admin/events/add-event">add new</a>
				<div style={caca}>
					<span>{this.state.y} | </span>
					<span>{this.state.contentHeight}</span>
				</div>
				<div className='admin-evt-cards-container'>
					{this.renderCards()}
				</div>
				<div>
					<button onClick={this.handleScroll}>SEE MORE</button>
				</div>
			</div>
		)
	}

	renderCards() {
		return this.state.events.map((evt, i) => (
			<AdminEventCard key={i} event={evt}/>
		))
	}

	handleScroll(e) {
		let wrap = document.getElementsByClassName('in-amman-admin')[0];
		let contentHeight = wrap.offsetHeight;
		let yOffset = window.pageYOffset;
		let y = (yOffset + window.innerHeight);
		let self = this;
		this.setState({
			y: y,
			contentHeight: contentHeight,
		})
		if(y >= contentHeight && (this.state.skip <= this.state.totalCounts)) {
			// window.removeEventListener('scroll', this.handleScroll);
			this.setState({
				skip: this.state.skip + this.state.limit,
			}, () => {
						let joinedEvents = Events.find({}, { sort: {createdAt: -1 }, skip: this.state.skip, limit: this.state.limit}).fetch();
						let oldEvents = self.state.events
						let newEvents = oldEvents.concat(joinedEvents)
						self.setState({
							events: newEvents
						})
			})
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
}
