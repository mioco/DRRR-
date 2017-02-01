import React, { Component } from 'react';

class Talks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let nodeList = [];
    this.props.talks.forEach( (talk) => {
      switch(talk.type) {
        case 'connectStatus':
          let status = talk.status ? '加入' : '离开';
          nodeList.push(<JoinSystem key={ talk.key } name={ talk.name } status={ status }/>);
          break;
        case 'talk':
          nodeList.push(<Talk key={ talk.key } name={ talk.name } talks={ talk.talk }/>);
          break;
        default:
          break;
      }
    })
    return (
      <div className="container">
        { nodeList }
      </div>
    )
  }
}

class Talk extends Component {
  render() {
    return (
      <dl className="talk">
        <dt className="dropdown">
          <div className="avatar"></div>
          <div className="name">{ this.props.name }</div>
        </dt>
        <dd className="bounce">
          <div>
            <div className="tail-wrap">
              <div className="tail-mask"></div>
            </div>
            <p className="text-wrap">{ this.props.talks }</p>
          </div>
        </dd>
      </dl>
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