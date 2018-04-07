import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class OffersMain extends Component {
  render(){
    return(
      <h1>offers</h1>
    )
  }
}
 
export default withTracker(() => {
  return {
    tasks: 'App',
  };
})(OffersMain);