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
    this.onSignup = this.onSignup.bind(this);
    this.overlay = this.overlay.bind(this);

  }
  render(){
    return(
      <div className='ia-basic-modal' onClick={(e) => this.overlay(e)}>
        <div className='ia-basic-modal__data'>

            <div className="ia-basic-modal__header">
              <h4>Login</h4>
            </div>

            <div className='ia-basic-modal__body'>
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
              <button type="button" className="btn btn-dark full-width" onClick={this.onSignup}>Signup</button>
            </div>

            <div className='ia-basic-modal__footer'>
              <button onClick={() => this.props.visibility('signup')}>close</button>
            </div>
            
        </div>
      </div>
    )
  }

  setValues(key,e) {
    var newUser = Object.assign({},this.state.userInfo)
    newUser[key] = e.target.value
    this.setState({
      userInfo:newUser
    })
  }

  onSignup() {
    let self = this
    Accounts.createUser(this.state.userInfo,function(err){
      if(err){
        alert(err.message)
      }
      else{
        Meteor.call('addRoleToUser', Meteor.userId(), (err) => {
          if(!err){
            self.props.loginStatus();
            self.props.visibility('signup')
            console.log('success new user')
          }
        });
      }
    });
  }

  overlay(e){
    if(e.target.className==='ia-basic-modal'){
      this.props.visibility('signup')
    }
  }
}