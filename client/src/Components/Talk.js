import React, { Component } from 'react';
class Talk extends Component {
  constructor(props) {
    super(props);
  }
  talk () {
    return {__html: this.props.talk.replace(/\n/g, '<br />')};
  }
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
            <p className="text-wrap" dangerouslySetInnerHTML={this.talk()}></p>
          </div>
        </dd>
      </dl>
    )
  }
}
export default Talk;