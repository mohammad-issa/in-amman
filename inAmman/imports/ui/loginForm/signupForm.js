import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo:{
        email : '',
        username:'',
        password:''
      }
    }
    this.setValues = this.setValues.bind(this);
    this.signUp = this.signUp.bind(this);

  }
  render(){
    return(
      <div>
        <input
          type='email'
          value={this.state.userInfo.email}
          placeholder="email"
          onChange={(e) => this.setValues('email',e)}
        />
        <input
          type='text'
          value={this.state.userInfo.username}
          placeholder="username"
          onChange={(e) => this.setValues('username',e)}
        />
        <input
          type='password'
          value={this.state.userInfo.password}
          placeholder="password"
          onChange={(e) => this.setValues('password',e)}
        />
        <button type="button" className="btn btn-primary" onClick={this.signUp}>Signup</button>
      </div>
    )
  }
  setValues(key,e){
    var newUser = Object.assign({},this.state.userInfo)
    newUser[key] = e.target.value
    this.setState({
      userInfo:newUser
    })
  }
  signUp(){
    Accounts.createUser(this.state.userInfo,function(err){
      if(err){
        alert(err.message)
      }
      else{
        console.log('success new user')
      }
    });

  }
}