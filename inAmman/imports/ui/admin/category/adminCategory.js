import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Category } from '../../../api/category/category.js';


class AdminCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.categories,
			relatedCategory: {
				offer: true,
				event: true
			},
			editModal: false,
			selectedCategory: {}
		}
		this.setRelated = this.setRelated.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.renderCategoryRow = this.renderCategoryRow.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.hideEditModal = this.hideEditModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.categories
		});
	}

	render() {
		return(
			<div>
				<h1>categories</h1>
				<form onSubmit={this.addCategory}>
					<div>
						<label>Title : </label>
						<input name="name" ref="catName" type="text"/>
					</div>
					<div>
						<label>Offer : </label>
						<input 
							name= "related-to-offer"
							ref= "relatedToOffer"
							type= "checkbox"
							checked= {this.state.relatedCategory.offer}
							onChange= {this.setRelated}
						/>
					</div>
					<div>
						<label>Event : </label>
						<input 
							name= "related-to-event"
							ref= "relatedToEvent"
							type= "checkbox"
							checked= {this.state.relatedCategory.event}
							onChange= {this.setRelated}
						/>
					</div>
					<input type="submit" value="add new event"/>
				</form>
				<div className="category-table">
					<table className="admin-table">
						<tbody>
							<tr>
								<th>category name</th>
								<th>related to offer</th>
								<th>related to event</th>
								<th>active</th>
								<th>controls</th>
							</tr>
							{this.renderCategoryRow()}
						</tbody>
					</table>
				</div>
				{this.state.editModal && <CategoryEditPopup hideEditModal={this.hideEditModal} selectedCategory={this.state.selectedCategory}/>}
			</div>
		)
	}

	setRelated(e) {
		let newRelatedCategory = Object.assign({}, this.state.relatedCategory);
		if(e.target.name === 'related-to-offer') {
			newRelatedCategory.offer = !newRelatedCategory.offer;
			this.setState({
				relatedCategory: newRelatedCategory
			})
		}
		if(e.target.name === 'related-to-event') {
			newRelatedCategory.event = !newRelatedCategory.event;
			this.setState({
				relatedCategory: newRelatedCategory
			})
		}
	}

	addCategory(e) {
		e.preventDefault();
		let newCategory = {
			name : this.refs.catName.value.trim(),
			relatedCategory: this.state.relatedCategory,
		}
		if(newCategory.name){
			Meteor.call('category.addCategory', newCategory, (err) => {
				if(err){
					alert(err.error)
				}
				else{
					this.refs.catName.value = '';
					alert('category added :)');
				}
			})
		} else {
			alert('fill name please')
		}
	}

	renderCategoryRow() {
		return this.state.categories.map((category,i) =>(
			<CategoryRow
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
			selectedCategory: category
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

class CategoryRow extends Component {
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
				<td>{this.state.category.related.offer ? 'true' : 'false'}</td>
				<td>{this.state.category.related.event ? 'true' : 'false'}</td>
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
		Meteor.call('category.deleteCategory', this.state.category._id, (err) => {
			if(err) {
				alert(err.error)
			} else {
				alert('category removed :)');
			}
		})
	}
}

class CategoryEditPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: this.props.selectedCategory.name,
			categoryRelated: this.props.selectedCategory.related,
			categoryActive: this.props.selectedCategory.active
		}
		this.setName= this.setName.bind(this);
		this.setRelated= this.setRelated.bind(this);
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
		              <div>
		              	<label>
		              		Offer:
		              	</label>
			              <input
			              	type='checkbox'
			              	name= 'related-to-offer'
			              	checked= {this.state.categoryRelated.offer}
			              	onChange={this.setRelated}
			              />
		              </div>
		              <div>
		              	<label>
		              		Event:
		              	</label>
			              <input
			              	type='checkbox'
			              	name= 'related-to-event'
			              	checked= {this.state.categoryRelated.event}
			              	onChange={this.setRelated}
			              />
		              </div>
		              <div>
		              	<label>
		              		Active:
		              	</label>
			              <input
			              	type='checkbox'
			              	checked= {this.state.categoryActive}
			              	onChange={this.setActive}
			              />
		              </div>
		              <div className='ia-basic-modal__body__no-account text-center'>
		                <button className='btn-link' onClick={this.saveChanges}>save</button>
		                <button className='btn-link close-modal' ref='cancelBtn' onClick={(e) => this.props.hideEditModal(e)}>cancel</button>
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

	setRelated(e) {
		let newRelatedCategory = Object.assign({}, this.state.categoryRelated);
		if(e.target.name === 'related-to-offer') {
			newRelatedCategory.offer = !newRelatedCategory.offer;
			this.setState({
				categoryRelated: newRelatedCategory
			})
		}
		if(e.target.name === 'related-to-event') {
			newRelatedCategory.event = !newRelatedCategory.event;
			this.setState({
				categoryRelated: newRelatedCategory
			})
		}
	}

	setActive(e) {
		this.setState({
			categoryActive: e.target.checked
		});
	}

	saveChanges() {
		let self = this;
		if(this.state.categoryName.trim().length > 0 ){
			Meteor.call('category.updateCategory', this.props.selectedCategory._id, this.state.categoryName, this.state.categoryRelated, this.state.categoryActive, (err) => {
				if(err){
					alert(err.error)
				}
				else{
					self.refs.cancelBtn.click()
					alert('category updated :)');
				}
			})
		} else {
			alert('fill name please')
		}
	}
}

export default withTracker(() => {
  Meteor.subscribe('category');
  return {
	categories: Category.find({},{ sort: { createdAt: -1 } }).fetch(),
  };
})(AdminCategory);