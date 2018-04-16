import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { EventsCategory } from '../../../api/events/eventsCategory.js';


class AdminEventCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.evtCategories,
			editModal: false,
			categorySelected: {}
		}
		this.addCategory = this.addCategory.bind(this);
		this.renderCategoryRow = this.renderCategoryRow.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.hideEditModal = this.hideEditModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.evtCategories
		});
	}

	render() {
		return(
			<div>
				<h1>Event categories</h1>
				<form onSubmit={this.addCategory}>
					<div>
						<label>Title : </label>
						<input name="name" ref="catName" type="text"/>
					</div>
					<input type="submit" value="add new event"/>
				</form>
				<div className="category-table">
					<table className="admin-table">
						<tbody>
							<tr>
								<th>category name</th>
								<th>active</th>
								<th>controls</th>
							</tr>
							{this.renderCategoryRow()}
						</tbody>
					</table>
				</div>
				{this.state.editModal && <EventEditPopup hideEditModal={this.hideEditModal} categorySelected={this.state.categorySelected}/>}
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
					alert(err.error)
				}
				else{
					alert('category added :)');
					this.refs.catName.value = '';
				}
			})
		} else {
			alert('fill name please')
		}
	}

	renderCategoryRow() {
		return this.state.categories.map((category,i) =>(
			<EventCategoryRow
				key={i}
				category={category}
				showEditModal={this.showEditModal}
				hideEditModal={this.hideEditModal}
			/>
		));
	}

	showEditModal(category) {
		this.setState({
			editModal: true,
			categorySelected: category
		})
	}
	
	hideEditModal(e) {
    	if(e.target.className==='ia-basic-modal' || e.target.className==='btn-link close-modal'){
			this.setState({
				editModal: false
			})
		}
	}

}

class EventCategoryRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: this.props.category
		}
		this.deleteCategory = this.deleteCategory.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			category: nextProps.category
		})
	}

	render() {
		return (
			<tr>
				<td>{this.state.category.name}</td>
				<td>{this.state.category.active ? 'true' : 'false'}</td>
				<td>
					<div>
						<button onClick={() => this.props.showEditModal(this.state.category)}>edit</button>
						<button onClick={this.deleteCategory}>delete</button>
					</div>
				</td>
			</tr>
		)
	}

	deleteCategory() {
		Meteor.call('events.deleteCategory', this.state.category._id, (err) => {
			if(err) {
				alert(err.error)
			} else {
				alert('category removed :)');
			}
		})
	}
}

class EventEditPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: this.props.categorySelected.name,
			categoryActive: this.props.categorySelected.active
		}
		this.setName= this.setName.bind(this);
		this.setActive= this.setActive.bind(this);
		this.saveChanges= this.saveChanges.bind(this);
	}

	render() {
		return(
			<div className='ia-basic-modal' onClick={(e) => this.props.hideEditModal(e)}>
		        <div className='ia-basic-modal__data'>
		            <div className="ia-basic-modal__header text-center">
		              <h2 className="ia-basic-modal__header__heading ">Edit Category</h2>
		            </div>
		            <div className='ia-basic-modal__body'>
		              <div className="input-wapper">
		              	<label>
		              		Category name :
		              	</label>
		                <input
		                  type='text'
		                  className="effect-2"
		                  value={this.state.categoryName}
		                  onChange={this.setName}
		                />
		                <span className="focus-border"> </span>
		              </div>
		              <input
		              	type="checkbox"
		              	checked= {this.state.categoryActive}
		              	onChange={this.setActive}
		              />
		              <div className="ia-basic-modal__body__no-account text-center">
		                <button className="btn-link" onClick={this.saveChanges}>save</button>
		                <button className="btn-link close-modal" ref="cancelBtn" onClick={(e) => this.props.hideEditModal(e)}>cancel</button>
		              </div>
		            </div>
		        </div>
		    </div>
		)
	}

	setName(e) {
		this.setState({
			categoryName: e.target.value
		});
	}

	setActive(e) {
		this.setState({
			categoryActive: e.target.checked
		});
	}

	saveChanges() {
		let self = this;
		if(this.state.categoryName.trim().length > 0 ){
			Meteor.call('events.updateCategory', this.props.categorySelected._id, this.state.categoryName, this.state.categoryActive, (err) => {
				if(err){
					alert(err.error)
				}
				else{
					alert('category updated :)');
					self.refs.cancelBtn.click()
				}
			})
		} else {
			alert('fill name please')
		}
	}
}

export default withTracker(() => {
  Meteor.subscribe('events_category');
  return {
	evtCategories: EventsCategory.find({},{ sort: { createdAt: -1 } }).fetch(),
  };
})(AdminEventCategory);