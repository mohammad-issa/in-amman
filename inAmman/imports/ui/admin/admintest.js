import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
 
export default class Admintest extends Component {
	constructor(props) {
		super(props);
		this.addAdminToRole= this.addAdminToRole.bind(this);
	}
	render() {
		return(
			<div>
				<h1>Admin</h1>
				<p>add admin:</p>
				<div>
					<span>user id :</span>
					<input ref="userId" type="text"/>
					<button onClick={this.addAdminToRole}>add</button>
				</div>
			</div>
		)
	}
	addAdminToRole() {
		console.log(typeof(this.refs.userId.value))
		Meteor.call('addRoleToAdmin', this.refs.userId.value, (err) => {
			if(err){
				console.log(err)
			}
		})
	}
}

