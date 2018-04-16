import React from 'react';
import AdminNavbar from './../ui/admin/nav/navbar.js';

export const AdminLayout = ({content}) =>(
	<div className="in-amman-admin">
		<div className="admin-layout">
			<div className="admin-layout__nav">
				<AdminNavbar/>
			</div>
			<div className="admin-layout__wapper">
				{content}
			</div>
		</div>
	</div>
)