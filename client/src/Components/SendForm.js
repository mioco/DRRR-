import React, { Component } from 'react';

class Message extends Component{
  constructor(props){
    super(props);
    this.addTalk = this.addTalk.bind(this);
    this.state = {
      msgCount: 140,
      isFocus: false,
      lock: true,
      user: this.props.user || []
    }
    console.log('user: ', this.state.user)
  }
  addTalk(e) {
    e.preventDefault();
    if(!this.state.lock) {
      let msg = e.target.value || e.target.message.value;
      if(msg.replace(/\s/g, "") == "") {
        this.refs.msgBox.focus();
        return false;
      }
      if(this.props.addTalk(msg)) { 
        this.refs.msgForm.reset();
        this.setState({ msgCount: 140 });
      }
    }else {
      this.refs.msgBox.focus();
    }
  }
  inputMsg (e) {
    let count = e.target.value.replace(/\s|\n'/g, '').length;
    let state = count > 140 ? {
          lock: true,
          msgCount: 0
        } : {
          lock: false,
          msgCount: 140 - count
        };
    this.setState(state);
    if(!this.state.lock) 
      if(e.keyCode === 13 && !e.ctrlKey && !e.shiftKey) this.addTalk(e);
  }
  render() {
    return (
      <div>
        <div className="container">
          <form action="" ref="msgForm" method="post" onSubmit={ this.addTalk }>
            <textarea ref="msgBox" name="message" className="form-control" onKeyUp={this.inputMsg.bind(this)}></textarea>
            <small id="textCount">{ this.state.msgCount }</small>
            <button type="submit">POST!</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Message;