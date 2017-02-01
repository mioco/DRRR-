import React, { Component } from 'react';
import Talks from './Talks';
import Header from './Header';

class Main extends Component{
  
  componentDidMount() {
    let sound = this.refs.sound;
    sound.currentTime = 1.8;
    sound.play();
    sound.addEventListener('timeupdate', function(){
      if(sound.currentTime>=2.5) sound.pause();
    }, false)
  }
  render() {
    return(
      <div>
        <div className="message-wrap">
          <Header name={ this.props.name } logout={ this.props.logout }/>
          <Message addTalk={ this.props.addTalk }/>
        </div>
        <Talks talks={ this.props.talks }/>
        
        <audio ref='sound' src="/images/effect.mp3" hidden></audio>
      </div>
    )
  }
}

class Message extends Component{
  constructor(props){
    super(props);
  }
  addTalk(e) {
    e.preventDefault();
    let msg = e.target.message.value;
    if(msg.replace(/(^\s*)|(\s*$)/g, "") == "") {
      this.refs.msgBox.focus();
      return false;
    }
    if(this.props.addTalk(msg)) {
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
    return (
      <div>
        <div className="container">
          <form action="" ref="msgForm" method="post" onSubmit={ this.addTalk.bind(this) }>
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