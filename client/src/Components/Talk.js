import React, { Component } from 'react';
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
export default Talk;