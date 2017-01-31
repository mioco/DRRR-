import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMsg } from './Actions';
import NotLogin from './Components/NotLogin';
import Main from './Components/Main';
import './App.less';

import 'node-fetch'
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    }
  }
  textHandle(text) {
    this.props.dispatch( addTalk(text) )
    return true;
  }
  componentDidMount() {
    this.props.dispatch( initTalks() );
  }
  render() {
    console.log(this.props.store)
    let content = this.state.isLogin ? <Main talks={ TALKS } textHandle={ this.textHandle.bind(this) }/> : <NotLogin/>;
    return(
      <div>
        {content}
      </div>
    )
  }
}
var TALKS = [
  {key: 1,username: 'osyo', text: 'mock data0'},
  {key: 2,username: 'osyo4', text: 'mock data1'}
]

export default connect()(App);