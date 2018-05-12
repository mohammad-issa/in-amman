import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class AdminStoreForm extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			strData: {
				_id: this.props.storeData && this.props.storeData._id !== null ? this.props.storeData._id : '',
				name: this.props.storeData && this.props.storeData.name !== null ? this.props.storeData.name : '',
				thum: this.props.storeData && this.props.storeData.thum !== null ? this.props.storeData.thum : '',
				gallery: this.props.storeData && this.props.storeData.gallery !== null ? this.props.storeData.gallery : [],
				bio: this.props.storeData && this.props.storeData.bio !== null ? this.props.storeData.bio : '',
				branches: this.props.storeData && this.props.storeData.branches !== null ? this.props.storeData.branches : [],
				categoryId: this.props.storeData && this.props.storeData.categoryId !== null ? this.props.storeData.categoryId : '',
				telephone: ['0123', '3123'],
			}
		}
		this.updateStore = this.updateStore.bind(this);
		this.setValues = this.setValues.bind(this);
		this.phoneRender = this.phoneRender.bind(this);
		this.phoneUpdate = this.phoneUpdate.bind(this);
	}

	render() {
		return(
			<div>
				<form className='admin-form' onSubmit={this.updateStore}>
					<div>
						<label>*Name : </label>
						<input name='name' ref='strName' type='text' value={this.state.strData.name} onChange={(e) => this.setValues(e,'name')}/>
					</div>
					<div>
						<label>*Thumbnail : </label>
						<input name='thum' ref='strThum' type='text' value={this.state.strData.thum} onChange={(e) => this.setValues(e,'thum')}/>
					</div>
					<div>
						<label>Bio : </label>
						<textarea name='bio' ref='strBio' type='text' value={this.state.strData.bio} onChange={(e) => this.setValues(e,'bio')}/>
					</div>
					<div>
						<label>Telephone : </label>
						<div>
							{this.phoneRender()}
						</div>
					</div>
					<div>
						<input type="submit" value="submit"/>
					</div>
				</form>
			</div>

		)
	}

	// Gets 
	phoneRender() {
		return this.state.strData.telephone.map((phone, i) => (
			<StorePhone key={i} index={i} phone={phone} update={this.phoneUpdate}/>
		));
	}

	phoneUpdate(value, index) {
		let newStrData = Object.assign({}, this.state.strData);
		newStrData.telephone[index] = value;
		this.setState({
			strData: newStrData
		});

	}

	// set input values
	setValues(e, key) {
		let newStrData = Object.assign({}, this.state.strData);
		newStrData[key] = e.target.value
		this.setState({
			strData: newStrData
		});
	}

	// check required values
	checkValues() {
		if(this.refs.strName.value.trim().length <= 0 || this.refs.strThum.value.trim().length <= 0) {
			return false;
		} else {
			return true;
		}
	}
	
	// Add new store or update by call method
	updateStore(e) {
		e.preventDefault();
		if(this.checkValues()) {
			Meteor.call('store.insertUpdateStore', this.state.strData, (err) => {
				if(err) {
					alert(err.error);
				}
				else {
					alert('updated :D');
					// FlowRouter.go('/admin/events');
				}
			})
		} else {
			alert('please fill all the required fields');
		}
	}

}

class StorePhone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: this.props.phone
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			phone: nextProps.phone
		})
	}
	render() {
		return(
			<div>
				<input value={this.state.phone} onChange={(e) => this.props.update(e.target.value, this.props.index)}/>
			</div>
		)
	}
}
export default withTracker(() => {
	Meteor.subscribe('store');
	// Meteor.subscribe('events_category');
	return {
		events: 'hello',
	};
})(AdminStoreForm);