import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class Footer extends Component {
  render(){
    return(
      <footer className="ia-footer">
        <hr/>
        <h1>footer</h1>
      </footer>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: 'Footer',
  };
})(Footer);