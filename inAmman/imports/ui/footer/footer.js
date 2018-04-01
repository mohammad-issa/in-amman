import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class Footer extends Component {
  render(){
    return(
      <div>
        <hr/>
        <h1>footer</h1>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: 'Footer',
  };
})(Footer);