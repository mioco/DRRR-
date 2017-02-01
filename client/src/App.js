import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotLogin from './Components/NotLogin';
import Main from './Components/Main';
import './App.less';
import io from 'socket.io-client';
import 'whatwg-fetch';
import cookie from 'react-cookie';
const socket = io('http://localhost:3000');
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      talks: []
    }
    this.addName = this.addName.bind(this);
    this.addTalk = this.addTalk.bind(this);
    this.logout = this.logout.bind(this);
  }

  addTalk(text) {
    socket.emit('talk', JSON.stringify({
      talk: text,
      name: cookie.load('name')
    }))
    return true;
  }

  addName(name) {
    socket.emit('login', name);
    if(!cookie.load('name')) cookie.save('name', name)
    this.setState({ isLogin: true })
  }

  logout() {
    let sound = this.refs.sound;
    sound.currentTime = 3.5;
    sound.play();
    sound.addEventListener('timeupdate', function(){
      if(sound.currentTime>=5) sound.pause();
    }, false)    
    setTimeout(() => {
      cookie.remove('name');
      this.setState({ isLogin: false });
    },1000)
    
  }

  componentWillMount() {
    if(!cookie.load('name')){this.setState({ isLogin: false })}
    else {
      this.setState({
        isLogin: true,
        name: cookie.load('name')
      })
    }
    let talks = this.state.talks;
    socket.on('connect', () => {
      
    })
    socket.on('join', (msg) => {
      console.log(msg)
      msg = JSON.parse(msg);
      talks.unshift({ key: msg.key, type: 'join', name: msg.name });
      this.setState({
        talks: talks
      })
      
    })
    socket.on('talk', (msg) => {
      msg = JSON.parse(msg);
      talks.unshift({ key: msg.key, type: 'talk', name: msg.name, talk: msg.talk});
      this.setState({
        talks: talks
      })
    })
  }
  render() {
    let content = this.state.isLogin ? 
    <Main 
      talks={ this.state.talks } 
      addTalk={ this.addTalk }
      logout={ this.logout }
      name={ cookie.load('name') }
    /> : 
    <NotLogin addName={ this.addName }/>;
    return(
      <div>
        {content}        
        <audio ref='sound' src="/images/effect.mp3" hidden></audio>
      </div>
    )
  }
}

export default App;