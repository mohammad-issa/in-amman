import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events.js';

class EventsMain extends Component {
  render(){
    return(
      <h1>events</h1>
    )
  }
}
 
export default withTracker(() => {
  Meteor.subscribe('events');
  return {
    events: Events.find({}).fetch(),
  };
})(EventsMain);