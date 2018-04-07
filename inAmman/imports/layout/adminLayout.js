import React from 'react';

export const AdminLayout = ({content}) =>(
	<div className="in-amman-admin">
		<h1>Dashboard</h1>
		<div className="ia-admin">
			{content}
		</div>
	</div>
)