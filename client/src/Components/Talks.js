import React, { Component } from 'react';
import Talk from './Talk';
import { audioPlay } from '../common.js';
class Talks extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    let talk = this.props.talks[0];
    switch(talk.type) {
      case 'connectStatus':
        if(talk.status) audioPlay(this.refs.sound, 1.8, 2.5);
        break;
      case 'talk':
        audioPlay(this.refs.sound, 0, 1);
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="container">
        {this.props.talks.map( talk => {
          let renderEle = null;
          switch(talk.type) {
            case 'connectStatus':
              let status = talk.status ? '加入' : '离开';
              renderEle = <JoinSystem key={ talk.key } name={ talk.name } status={ status }/>;
              break;
            case 'talk':
              renderEle = <Talk key={ talk.key } name={ talk.name } talk={ talk.talk }/>;
              break;
            default:
              break;
          }
          return renderEle;
        })}
        
        <audio ref='sound' src="/images/effect.mp3" hidden></audio>
      </div>
    )
  }
}

class JoinSystem extends Component {
  render() {
    return (
      <div className="system">
        ►► @ <span>{ this.props.name }</span> { this.props.status }房间
      </div>
    )
  }
}

export default Talks;