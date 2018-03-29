import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : ''
    }
    this.setText = this.setText.bind(this)
  }

  render(){
    return(
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
          value = {this.state.text}
          onChange = {this.setText}
        />
      </form>
    )
  }

  setText(e){
    this.setState({
      text : e.target.value
    })
  }
  
  handleSubmit(event){
    event.preventDefault();
    Tasks.insert({
      text:this.state.text,
      createdAt: new Date(), 
    });
    this.setState({
      text:''
    })
    console.log('inserted')
  }
}
 
export default withTracker(() => {
  return {
    tasks: Tasks.find({},{sort: { createdAt: -1 }}).fetch(),
  };
})(App);