import React, { Component } from 'react';

import AdminStoreForm from './adminStoreForm.js'

export default class AdminStore extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>AdminStore</h1>
				<AdminStoreForm />
			</div>
		)
	}
}