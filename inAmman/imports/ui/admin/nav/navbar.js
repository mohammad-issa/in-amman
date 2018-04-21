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
							href='/admin/events/categories'
							className={(FlowRouter.current().route.path === '/admin/events/categories' ? 'nav-admin-list__item nav-admin-list__item--active' : 'nav-admin-list__item')}
							>categories
						</a>
					</li>
					<li>
						<a
							href='/admin/store'
							className={(FlowRouter.current().route.path === '/admin/store' ? 'nav-admin-list__item nav-admin-list__item--active' : 'nav-admin-list__item')}
							>stores
						</a>
					</li>
				</ul>
			</div>
		)
	}
}
