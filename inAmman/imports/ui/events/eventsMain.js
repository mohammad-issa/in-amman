import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class EventsMain extends Component {
  render(){
    return(
      <h1>events</h1>
    )
  }
}
 
export default withTracker(() => {
  return {
    tasks: 'App',
  };
})(EventsMain);