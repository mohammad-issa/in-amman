import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class AdminAddEvent extends Component {
	render() {
		return(
			<div>
				<h1>Events</h1>
				<a href="/admin/events/add-event">add new</a>
			</div>
		)
	}
}