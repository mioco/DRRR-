import React, { Component } from 'react';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      myDisplay: false
    }
  }
  onToggleMy(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({myDisplay: !this.state.myDisplay })
  }
  componentDidMount() {
    document.onclick = () => {
      this.setState({ myDisplay: false })
    }
  }
  render() {
    let useTag = '<use xlink:href="#icon-my" />';
    return(
      <div className="message-header">
        <div className="header-talkTo">
          <i className="iconfont">&#xe602;</i>
        </div>
        <div className="header-my">
          <i className="iconfont" onClick={this.onToggleMy.bind(this)}>&#xe62f;</i>
          <ul 
            style={{display: this.state.myDisplay ? 'block' : 'none'}}
            ref='myDropdown'
            onClick={(e) => {e.nativeEvent.stopImmediatePropagation()}}
          >
            <li>USERNAME: { this.props.name}</li>
            <li onClick={ this.props.logout }>LOGOUT</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Header;