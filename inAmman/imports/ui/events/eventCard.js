import React, { Component } from 'react';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <p>{this.props.item.title}</p>
    )
  }
}