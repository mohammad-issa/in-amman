import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Category } from '../../../api/category/category.js';


class AdminAddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsCategory : this.props.eventsCategory,
			evtData: {
				date: {
					startDate: new Date(),
					endDate: ''
				},
				gallery: [],
				tags: ['tag1','tag2'],
				category: ''
			}
		}
		this.getCategories= this.getCategories.bind(this);
		this.categoryChange= this.categoryChange.bind(this);
		this.inputValidation= this.inputValidation.bind(this);
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
						<div>
							<label>*Title : </label>
							<input name='title' ref='evtTitle' type='text'/>
						</div>
						<div>
							<label>Sub title : </label>
							<input name='subtitle' ref='evtSubTitle' type='text'/>
						</div>
						
						<div>
							<label>Description : </label>
							<input name='description' ref='evtDescription' type='text'/>
						</div>

						<div>
							<label>*Location : </label>
							<input name='location' ref='evtLocation' type='text'/>
						</div>
						
						<div>
							<label>*Thumbnail </label>
							<input name='thumbnail' ref='evtThumbnail' type='text'/>
						</div>
						
						<div>
							<label>Gallery </label>
							<input name='gallery' ref='evtGallery' type='text'/>
						</div>

						<div>
							<label>*Category : </label>
							<select onChange={this.categoryChange} defaultValue=''>
								<option value=''>select category</option>
								{this.getCategories()}
							</select>
						</div>

						<div>
							<label>*Start Date : </label>
							<input name='startDate' ref='evtStartDate' type='text'/>
						</div>

						<div>
							<label>End Date : </label>
							<input name='endDate' ref='evtEndDate' type='text'/>
						</div>
		
						<div>
							<label>Price : </label>
							<input name='price' ref='evtPrice' type='number'/>
						</div>

						<div>
							<label>Old price : </label>
							<input name='oldPrice' ref='evtOldPrice' type='number'/>
						</div>

						<div>
							<label>Discount : </label>
							<input name='discount' ref='evtDiscount' type='number'/>
						</div>
						
						<div>
							<label>*Tags : </label>
							<input name='tags' ref='evtTags' type='text'/>
						</div>

						<div>
							<label>*Store : </label>
							<input name='store' ref='evtStore' type='text'/>
						</div>

						<input type='submit' value='add new event'/>

					</form>
				</div>
			</div>
		)
	}

	// Get categories from porps
	getCategories(){
		return this.state.eventsCategory.map((cat, i) => (
			<option key={i} value={cat._id}>{cat.name}</option>
		))
	}

	// set category from select
	categoryChange(e) {
		let newEvtData = Object.assign({}, this.state.evtData);
		newEvtData.category = e.target.value
		this.setState({
			evtData: newEvtData
		})
	}

	// set required inputs
	inputValidation(evtData) {
		if(evtData.title.length <= 0 || evtData.location.length <= 0 || evtData.thumbnail.length <= 0 || evtData.categoryId.length <= 0 || evtData.startDate.length <= 0 || evtData.store.length <= 0) {
			alert('fill all required inputs')
			return false;
		}
		else{
			return true
		}
	}

	// Add new event by call 'events.insertNewEvent' method
	addEvent(e) {
		e.preventDefault();
		// new event data
		let eventData = {
			title: this.refs.evtTitle.value.trim(),
			subTitle: this.refs.evtSubTitle.value.trim(),
			description: this.refs.evtDescription.value.trim(),
			location: this.refs.evtLocation.value.trim(),
			categoryId: this.state.evtData.category,
			startDate: this.state.evtData.date.startDate,
			endDate: this.state.evtData.date.endDate,
			thumbnail: this.refs.evtThumbnail.value.trim(),
			gallery: this.state.evtData.gallery,
			price: parseFloat(this.refs.evtPrice.value.trim()),
			oldPrice: parseFloat(this.refs.evtOldPrice.value.trim()),
			discount: parseFloat(this.refs.evtDiscount.value.trim()),
			store: this.refs.evtStore.value.trim(),
			visable: false,
			active: false,
			tags: this.state.evtData.tags
		}

		if(this.inputValidation(eventData)) {
			Meteor.call('events.insertNewEvent', eventData, (err) => {
				if(err) {
					alert(err.error)
				}
				else {
					alert('new event added')
				}
			})
		}

	}
}
export default withTracker(() => {
  Meteor.subscribe('category');
  return {
	eventsCategory: Category.find({'related.event':true}, {}).fetch(),
  };
})(AdminAddEvent);