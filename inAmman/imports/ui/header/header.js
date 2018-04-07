import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
import LoginForm from '../accountForms/loginForm';
import SignupForm from '../accountForms/signupForm';
 
export default class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			loginForm: false,
			signupForm: false,
			userId: Meteor.userId()
		}
		this.toggleForm = this.toggleForm.bind(this);
		this.loginStatus = this.loginStatus.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentWillReceiveProps(nextProps){
	}

	render() {
		return(
			<header className="ia-header">
				<nav className="ia-header__navbar">
					<div className="ia-header__menu">
						<ul className="list-inline">
							<li><a className={(FlowRouter.current().route.path === '/' ? 'ia-header__menu__item ia-header__menu__item--active' : 'ia-header__menu__item')} href="/">Home</a></li>
							<li><a className={(FlowRouter.current().route.path === '/offers' ? 'ia-header__menu__item ia-header__menu__item--active' : 'ia-header__menu__item')} href="/offers">offers</a></li>
							<li><a className={(FlowRouter.current().route.path === '/events' ? 'ia-header__menu__item ia-header__menu__item--active' : 'ia-header__menu__item')} href="/events">events</a></li>
						</ul>
					</div>
					
					{ 
						this.state.userId === null ?
						<div className="ia-header__menu">
							<button onClick={() => this.toggleForm('login')}>Login</button>
							<button onClick={() => this.toggleForm('signup')}>Signup</button>
						</div>
						:
						<div className="ia-header__menu">
							<button onClick={this.logout}>Logout</button>
						</div>
					}

				</nav>
				{this.state.signupForm && <SignupForm visibility={this.toggleForm} loginStatus={this.loginStatus}/>}
        		{this.state.loginForm && <LoginForm visibility={this.toggleForm} loginStatus={this.loginStatus}/>}
			</header>
		)
	}
	toggleForm(formKey) {
		if(formKey==='login'){
			this.setState({
				loginForm : !this.state.loginForm
			});
		}
		else if(formKey==='signup') {
			this.setState({
				signupForm : !this.state.signupForm
			});
		}
	}

	loginStatus() {
		this.setState({
			userId: Meteor.userId()
		})
	}

	logout() {
		let self = this;
		Meteor.logout(function(err) {
			if(!err) {
				self.setState({
					userId: Meteor.userId()
				})
			}
		});
	}
}

// export default withTracker(() => {
//   return {
//     tasks: 'Header',
//   };
// })(Header);