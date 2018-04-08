import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class Admintest extends Component {
	constructor(props) {
		super(props);
		this.addEvent= this.addEvent.bind(this);
	}
	render() {
		return(
			<div>
				<h1>Add Event</h1>
				<div>
					<span>Title :</span>
					<input ref="eventTitle" type="text"/>
					<button onClick={this.addEvent}>add event</button>
				</div>
			</div>
		)
	}
	addEvent() {
		console.log(this.refs.eventTitle.value)
		Meteor.call('events.insertNewEvent', this.refs.eventTitle.value, (err) => {
			if(err){
				console.log(err.error)
			}
		})
	}
}

