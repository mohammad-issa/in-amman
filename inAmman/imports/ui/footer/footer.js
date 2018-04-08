import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
export default class Footer extends Component {
  render(){
    return(
      <footer className="ia-footer">
        <hr/>
        <h1>footer</h1>
      </footer>
    )
  }
}