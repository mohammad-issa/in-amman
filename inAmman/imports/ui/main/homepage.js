import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import LoginForm from '../accountForms/loginForm';
import SignupForm from '../accountForms/signupForm';

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
        <SignupForm/>
        <LoginForm/>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: 'issa'
  };
})(Homepage);