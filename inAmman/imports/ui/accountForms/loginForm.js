import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        username:'',
        password:''
      }
    }
    this.setValues = this.setValues.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.overlay = this.overlay.bind(this);

  }

  render() {
    return(
      <div className='ia-basic-modal' onClick={(e) => this.overlay(e)}>
        <div className='ia-basic-modal__data'>
            <div className="ia-basic-modal__header text-center">
              <h2 className="ia-basic-modal__header__heading ">Login</h2>
            </div>
            <div className='ia-basic-modal__body'>
              <div className="input-wapper">
                <input
                  type='text'
                  className="effect-2"
                  value={this.state.user.username}
                  placeholder="Username or Email"
                  onChange={(e) => this.setValues('username',e)}
                />
                <span className="focus-border"> </span>
              </div>
              <div className="input-wapper">
                <input
                  type='password'
                  className="effect-2"
                  value={this.state.user.password}
                  placeholder="Password"
                  onChange={(e) => this.setValues('password',e)}
                />
                <span className="focus-border"></span>
              </div>
              <button type="button" className="btn btn-dark full-width" onClick={this.onLogin}>Login</button>
              <div className="ia-basic-modal__body__no-account text-center">
                <div>Have not account yet?</div>
                <button className="btn-link">signup</button>
              </div>
            </div>
            {/*<div className='ia-basic-modal__footer text-right'>
                <button onClick={() => this.props.visibility('login')}>close</button>
            </div>*/}
        </div>
      </div>
    )
  }

  setValues(key,e) {
    var newUser = Object.assign({},this.state.user)
    newUser[key] = e.target.value
    this.setState({
      user:newUser
    })
  }

  onLogin() {
    let self = this
    Meteor.loginWithPassword(self.state.user.username, self.state.user.password, function(err) {
      if (!err) {
        console.log('success!');
        // Router.go('/home');
        self.props.loginStatus();
        self.props.visibility('login')
      } else {
        console.log(err);
        alert(err.reason)
      }
    });
    console.log('login')
  }

  overlay(e) {
    if(e.target.className==='ia-basic-modal'){
      this.props.visibility('login')
    }
  }
  // logout(){
  //   Meteor.logout();
  // }

}