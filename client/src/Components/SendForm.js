import React, { Component } from 'react';

class Message extends Component{
  constructor(props){
    super(props);
    this.addTalk = this.addTalk.bind(this);
    this.state = {
      msgCount: 140,
      isFocus: false,
      lock: true
    }
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
        // let sound = this.refs.sound;
        // sound.currentTime = 0;
        // sound.play();
        // sound.addEventListener('timeupdate', function(){
        //   if(sound.currentTime>=1) sound.pause();
        // }, false)    
        this.refs.msgForm.reset();
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
            <small>{ this.state.msgCount }</small>
            <button type="submit">POST!</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Message;