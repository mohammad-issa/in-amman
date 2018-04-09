import React, { Component } from 'react';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
		<div className="col-md-4">
			<div className="evt-card">
				<p>{this.props.item.title}</p>
			</div>
		</div>
    )
  }
}