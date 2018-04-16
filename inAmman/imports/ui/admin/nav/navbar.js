import React, { Component } from 'react';


export default class AdminNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return(
			<div>
				<ul className="list-block nav-admin-list">
					<li>
						<a
							href='/admin'
							className={(FlowRouter.current().route.path === '/admin' ? 'nav-admin-list__item nav-admin-list__item--active' : 'nav-admin-list__item')}
							>dashboard
						</a>
					</li>
					<li>
						<a
							href='/admin/events'
							className={(FlowRouter.current().route.path === '/admin/events' ? 'nav-admin-list__item nav-admin-list__item--active' : 'nav-admin-list__item')}
							>events
						</a>
					</li>
					<li>
						<a
							href='/admin/events/evtCategory'
							className={(FlowRouter.current().route.path === '/admin/events/evtCategory' ? 'nav-admin-list__item nav-admin-list__item--active' : 'nav-admin-list__item')}
							>events categories
						</a>
					</li>
					<li><a className="nav-admin-list__item">stores</a></li>
				</ul>
			</div>
		)
	}
}
