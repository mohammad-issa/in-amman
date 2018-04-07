import React from 'react';

import Header from '../ui/header/header';
import Footer from '../ui/footer/footer';

export const MainLayout = ({content}) =>(
	<div className="in-amman-app">
		<Header/>
		<div className="ia-body">
			{content}
		</div>
		<Footer/>
	</div>
)