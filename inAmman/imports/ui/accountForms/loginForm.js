import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        username:'',
        password:''
      }
    }
    this.setValues = this.setValues.bind(this);
    this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);

  }
  render(){
    return(
      <div>
        <input
          type='text'
          value={this.state.user.username}
          placeholder="Username or Email"
          onChange={(e) => this.setValues('username',e)}
        />
        <input
          type='password'
          value={this.state.user.password}
          placeholder="password"
          onChange={(e) => this.setValues('password',e)}
        />
        <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
      </div>
    )
  }
  setValues(key,e){
    // console.log(e.target.value,key)
    var newUser = Object.assign({},this.state.user)
    newUser[key] = e.target.value
    this.setState({
      user:newUser
    })
  }
  login(){
    var self = this
    Meteor.loginWithPassword(self.state.user.username, self.state.user.password, function(err) {
      if (!err) {
        console.log('success!');
        // Router.go('/home');
      } else {
        console.log(err);
        alert(err.reason)
      }
    });
    console.log('login')
    
  }
  // logout(){
  //   Meteor.logout();
  // }
}