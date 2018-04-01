import React from 'react';

import Header from '../ui/header/header';

export const MainLayout = ({content}) =>(
	<div className="app">
		<Header/>
		<div className="app-body">
			{content}
		</div>
	</div>
)