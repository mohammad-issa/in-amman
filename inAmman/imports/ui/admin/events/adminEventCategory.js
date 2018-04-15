import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { EventsCategory } from '../../../api/events/eventsCategory.js';


class AdminEventCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.addCategory = this.addCategory.bind(this)
	}

	render() {
		return(
			<div>
				<h1>Admin event category</h1>
				<form onSubmit={this.addCategory}>
					<div>
						<label>Title : </label>
						<input name="name" ref="catName" type="text"/>
					</div>
					<input type="submit" value="add new event"/>
				</form>
			</div>
		)
	}

	addCategory(e) {
		e.preventDefault();
		let newCategory = {
			name : this.refs.catName.value.trim(),
		}
		if(newCategory.name){
			Meteor.call('events.addCategory', newCategory, (err) => {
				if(err){
					console.log(err.error)
				}
				else{
					console.log('category added :)');
					this.refs.catName.value = '';
				}
			})
		}
		else{
			alert('fill name please')
		}
	}

}
export default withTracker(() => {
  // Meteor.subscribe('events_category');
  return {
	issa: 'EventsCategory.find({}).fetch()',
  };
})(AdminEventCategory);