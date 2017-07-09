import React, { Component } from 'react';
import NotLogin from './Components/NotLogin';
import Main from './Components/Main';
import './App.less';
import io from 'socket.io-client';
import 'whatwg-fetch';
import cookie from 'react-cookie';
import { audioPlay } from './common.js';
// import { initTalks, addTalk, addName, logout } from './Action';
const socketUrl = window.location.hostname + ':3000';
const socket = io(socketUrl);

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      talks: [],
      pTalks: [],
      user: []
    }
    this.addName = this.addName.bind(this);
    this.addTalk = this.addTalk.bind(this);
    this.logout = this.logout.bind(this);
  }
  initTalks() {
    let url = '//drrr.osyox.com:3000'
    fetch()
  }
  addTalk(text) {
    socket.emit('talk', JSON.stringify({
      talk: text,
      name: cookie.load('name')
    }))
    return true;
  }

  addName(name) {
    let send = JSON.stringify({
      name: name,
      status: 1
    })
    socket.emit('connectStatus', send);
    if(!cookie.load('name')) cookie.save('name', name)
    this.setState({ isLogin: true })
  }

  logout() {
    audioPlay(this.refs.sound, 3.5) 
    let send = JSON.stringify({
      name: cookie.load('name'),
      status: 0
    })
    socket.emit('connectStatus', send);
    setTimeout(() => {
      cookie.remove('name');
      
      this.setState({
        isLogin: false,
        talks: [],
        pTalks: []
      });
    },1000)
  }

  componentWillMount() {
    if(!cookie.load('name')){this.setState({ isLogin: false })}
    else {
      this.setState({
        isLogin: true,
        name: cookie.load('name')
        // talks: this.initTalks()
      })
    }
    let talks = this.state.talks;
    socket.on('connectStatus', (msg) => {
      msg = JSON.parse(msg);
      talks.unshift({ 
        key: msg.key, 
        type: 'connectStatus', 
        name: msg.name,
        status: msg.status
      });
      this.setState({
        talks: talks,
        user: msg.user
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
      pTalks={ this.state.pTalks }
      talks={ this.state.talks } 
      addTalk={ this.addTalk }
      logout={ this.logout }
      name={ cookie.load('name') }
      user={ this.state.user }
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