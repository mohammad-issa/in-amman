import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


class Homepage extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return(
      <div>
        <h1>Home</h1>
        
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: 'issa'
  };
})(Homepage);