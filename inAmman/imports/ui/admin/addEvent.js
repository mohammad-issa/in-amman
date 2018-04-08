import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { EventsCategory } from '../../api/events/eventsCategory.js';


class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsCategory : this.props.eventsCategory
		}
		this.getCategories= this.getCategories.bind(this);
		this.addEvent= this.addEvent.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			eventsCategory : nextProps.eventsCategory
		})
	}
	render() {
		return(
			<div>
				<h1>Add Event</h1>
				<div>
					<form onSubmit={this.addEvent}>
						<label>Title : </label>
						<input ref="evtTitle" type="text"/>

						<label>Sub title : </label>
						<input ref="evtSubTitle" type="text"/>

						<label>categoryategory : </label>
						<select>
							{this.getCategories()}
						</select>

						<input type="submit" value="add new event"/>
					</form>
				</div>
			</div>
		)
	}

	// Get categories from porps
	getCategories(){
		return this.state.eventsCategory.map((cat, i) => (
			<option key={i}>{cat.name}</option>
		))
	}

	// Add new event by call 'events.insertNewEvent' method
	addEvent(e) {
		e.preventDefault();
		// Check is there values of form
		if(this.refs.evtTitle.value.trim() && this.refs.evtSubTitle.value.trim()){
			let eventData = {
				title: this.refs.evtTitle.value.trim(),
				subTitle: this.refs.evtSubTitle.value.trim(),
				categoryId: 'asfkjbasfj3'
			}
			Meteor.call('events.insertNewEvent', eventData, (err) => {
				if(err){
					console.log(err.error)
				}
			})
		}
		else{
			alert('fill all fields')
		}
	}
}
export default withTracker(() => {
  Meteor.subscribe('events_category');
  return {
	eventsCategory: EventsCategory.find({}).fetch(),
  };
})(AddEvent);