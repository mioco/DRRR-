import React, { Component } from 'react';

class Talks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let talkList = [];
    this.props.talks.forEach( (talks) => {
      talkList.push(<Talk key={ talks.key } username={ talks.username } text={ talks.text }/>);
    })
    return (
      <div className="container">
        { talkList }
        <JoinSystem />
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
          <div className="name">{ this.props.username }</div>
        </dt>
        <dd className="bounce">
          <div>
            <div className="tail-wrap">
              <div className="tail-mask"></div>
            </div>
            <p className="text-wrap">{ this.props.text }</p>
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
        ►► @ <span>osyo</span> 加入房间
      </div>
    )
  }
}
export default Talks;