import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class Header extends Component {
  render(){
    return(
      <div>
      	<a href="/">Home</a>
      	<a href="/app">App</a>
      	<hr/>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: 'Header',
  };
})(Header);