import React, { Component } from 'react';
import Talks from './Talks';
import io from 'socket.io-client';

class Main extends Component{
  render() {
    return(
      <div>
        <Message textHandle={ this.props.textHandle }/>
        <Talks talks={ this.props.talks }/>
      </div>
    )
  }
}

class Message extends Component{
  constructor(props){
    super(props);
  }
  textHandle(e) {
    e.preventDefault();
    let msg = e.target.message.value;
    if(msg.replace(/(^\s*)|(\s*$)/g, "") == "") {
      this.refs.msgBox.focus();
      return false;
    }
    if(this.props.textHandle(msg)) {
      let sound = this.refs.sound;
      sound.currentTime = 0;
      sound.play();
      sound.addEventListener('timeupdate', function(){
        if(sound.currentTime>=1) sound.pause();
      }, false)
      this.refs.msgForm.reset();
    }
  }
  render() {
    let socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connecion success')
    })

    socket.on('talks', (msg) => {
      console.log(msg)
    })
    return (
      <div className="message-wrap">
        <div className="container">
          <form action="" ref="msgForm" method="post" onSubmit={ this.textHandle.bind(this) }>
            <textarea ref="msgBox" name="message" className="form-control"></textarea>
            <button type="submit">POST!</button>
          </form>
        </div>
        <audio ref='sound' src="/images/effect.mp3" hidden></audio>
      </div>
    )
  }
}

export default Main;