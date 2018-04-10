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

            <div className="ia-basic-modal__header text-center">
              <h2 className="ia-basic-modal__header__heading">Signup</h2>
            </div>

            <div className='ia-basic-modal__body'>
              <div className="input-wapper">
                <input
                  className="effect-2"
                  type='email'
                  value={this.state.userInfo.email}
                  placeholder="Email"
                  onChange={(e) => this.setValues('email',e)}
                />
                <span className="focus-border"> </span>
              </div>
              <div className="input-wapper">
                <input
                  className="effect-2"
                  type='text'
                  value={this.state.userInfo.username}
                  placeholder="Username"
                  onChange={(e) => this.setValues('username',e)}
                />
                <span className="focus-border"> </span>
              </div>

              <div className="input-wapper">
                <input
                  className="effect-2"
                  type='password'
                  value={this.state.userInfo.password}
                  placeholder="Password"
                  onChange={(e) => this.setValues('password',e)}
                />
                <span className="focus-border"> </span>
              </div>

              <button type="button" className="btn btn-dark full-width" onClick={this.onSignup}>Signup</button>
            </div>

            {/*<div className='ia-basic-modal__footer'>
              <button onClick={() => this.props.visibility('signup')}>close</button>
            </div>*/}
            
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