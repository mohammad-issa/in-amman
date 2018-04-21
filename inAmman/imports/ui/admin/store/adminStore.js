import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

export default class AdminStore extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h1>AdminStore</h1>
		)
	}
}