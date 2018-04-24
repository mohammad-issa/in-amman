import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Category } from '../../../api/category/category.js';

class AdminEventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsCategory : this.props.eventsCategory,
			evtData: {
				eventId: this.props.data && this.props.data._id !== null ? this.props.data._id : '',
				title: this.props.data && this.props.data.title !== null ? this.props.data.title : '',
				subTitle: this.props.data && this.props.data.subTitle !== null? this.props.data.subTitle : '',
				description: this.props.data && this.props.data.description !== null ? this.props.data.description : '',
				thumbnail: this.props.data && this.props.data.thumbnail !== null? this.props.data.thumbnail : '',
				date: {
					startDate: this.props.data && this.props.data.startDate !== null? this.props.data.startDate : '',
					endDate: ''
				},
				gallery: [],
				tags: ['tag1','tag2'],
				category: this.props.data ? this.props.data.categoryId : '',
			}
		}
		this.getCategories= this.getCategories.bind(this);
		this.categoryChange= this.categoryChange.bind(this);
		this.inputValidation= this.inputValidation.bind(this);
		this.setValues= this.setValues.bind(this);
		this.setDates= this.setDates.bind(this);
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
				<form onSubmit={this.addEvent}>
					<div>
						<label>*Title : </label>
						<input name='title' ref='evtTitle' type='text' value={this.state.evtData.title} onChange={(e) => this.setValues(e,'title')}/>
					</div>
					<div>
						<label>Sub title : </label>
						<input name='subtitle' ref='evtSubTitle' type='text' value={this.state.evtData.subTitle} onChange={(e) => this.setValues(e,'subTitle')}/>
					</div>
					
					<div>
						<label>Description : </label>
						<input name='description' ref='evtDescription' type='text' value={this.state.evtData.description} onChange={(e) => this.setValues(e,'description')}/>
					</div>

					<div>
						<label>*Location : </label>
						<input name='location' ref='evtLocation' type='text'/>
					</div>
					
					<div>
						<label>*Thumbnail </label>
						<input name='thumbnail' ref='evtThumbnail' type='text' value={this.state.evtData.thumbnail} onChange={(e) => this.setValues(e,'thumbnail')}/>
					</div>
					
					<div>
						<label>Gallery </label>
						<input name='gallery' ref='evtGallery' type='text'/>
					</div>

					<div>
						<label>*Category : </label>
						<select onChange={this.categoryChange} value={this.state.evtData.category}>
							<option value=''>select category</option>
							{this.getCategories()}
						</select>
					</div>

					<div>
						<label>*Start Date : </label>
						<input name='startDate' ref='evtStartDate' type='text' value={this.state.evtData.date.startDate} onChange={(e) => this.setDates(e, 'startDate')}/>
					</div>

					<div>
						<label>End Date : </label>
						<input name='endDate' ref='evtEndDate' type='text' onChange={(e) => this.setDates(e, 'endDate')}/>
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

					<input type='submit' value='SAVE'/>

				</form>
			</div>
		)
	}

	// Get categories from porps
	getCategories(){
		return this.state.eventsCategory.map((cat, i) => (
			<option key={i} value={cat._id}>{cat.name}</option>
		))
	}

	// set input values
	setValues(e, key) {
		let newEvtData = Object.assign({},this.state.evtData);
		newEvtData[key] = e.target.value
		this.setState({
			evtData: newEvtData
		});
	}

	// set start and end date
	setDates(e, key) {
		let newEvtData = Object.assign({},this.state.evtData);
		newEvtData.date[key] = e.target.value
		this.setState({
			evtData: newEvtData
		});
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

	// Add new event by call 'events.insertUpdateEvent' method
	addEvent(e) {
		e.preventDefault();
		// new event data
		let eventData = {
			id: this.state.evtData.eventId,
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
			Meteor.call('events.insertUpdateEvent', eventData, (err) => {
				if(err) {
					alert(err.error)
				}
				else {
					alert('updated :D')
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
})(AdminEventForm);