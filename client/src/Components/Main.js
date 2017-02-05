import React, { Component } from 'react';
import Talks from './Talks';
import Header from './Header';
import Private from './Private';
import Message from './SendForm';

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
        <Private talks={ this.props.pTalks }/>
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

export default Main;