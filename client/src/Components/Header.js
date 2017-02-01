import React, { Component } from 'react';

class Header extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <div></div>
        <div>
          <i className="drrr-my"></i>
          <ul>
            <li>USERNAME: { this.props.name}</li>
            <li onClick={ this.props.logout }>LOGOUT</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Header;