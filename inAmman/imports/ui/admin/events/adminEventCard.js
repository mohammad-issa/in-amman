import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Category } from '../../../api/category/category.js';

class AdminEventCard extends Component {
	constructor(props) {
		super(props);
		this.getCategory = this.getCategory.bind(this);
	}

	render() {
		return( 
			<div className='admin-evt-card'>
				<div className='card-thumbnail'>
					<img src='http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg'/>
				</div>
				<div className='card-body'>
					<div className='card-body__title'>
						<h4>{this.props.event.title}</h4>
					</div>
					<div className='card-body__content'>
						<div className='card-body__content__row'>
							<span className='card-body__content__row__key'>category:</span>
							<span className='card-body__content__row__val'>{this.getCategory()}</span>
						</div>
					</div>
				</div>
				<div className='card-options'>
					<a href={ '/admin/events/edit-event/' + this.props.event._id }>Edit</a>
					<button>Delete</button>
				</div>
			</div>
		)
	}

	getCategory() {
		let self = this;
		let array1 = this.props.eventCategories;
		let found = array1.find(function(element,index) {
		  return element._id === self.props.event.categoryId;
		});
		try {
			return found.name
		} catch (error) {
			return ''
		}
	}
}
export default withTracker((props) => {
	Meteor.subscribe('eventCategories');
	return {
		eventCategories: Category.find().fetch()
	}
})(AdminEventCard);