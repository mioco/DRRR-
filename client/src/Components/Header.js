import React, { Component } from 'react';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      myDisplay: false,
      privateDisplay: false
    }
  }
  onToggle(state, event) {
    event.nativeEvent.stopImmediatePropagation();
    switch(state) {
      case 'myDisplay':
        this.setState({
          myDisplay: !this.state.myDisplay,
          privateDisplay: false
        });
        break;
      case 'privateDisplay':
        this.setState({
          privateDisplay: !this.state.privateDisplay,
          myDisplay: false
        });
        break;
      default: break;
    }
    
  }
  privateToggle() {
    this.setState({ privateDisplay: false });
    this.props.privateToggle();
  }
  componentDidMount() {
    document.onclick = () => {
      this.setState({ 
        myDisplay: false,
        privateDisplay: false
      });
    }
  }
  render() {
    let useTag = '<use xlink:href="#icon-my" />';
    let privateTalks = [];
    this.props.privateTalks.forEach((talk) => {
      privateTalks.push(
        <li onClick={this.privateToggle.bind(this)}>
          { talk.name }
          <i style={{'background-color': talk.isReaded ? 'green' : 'red'}}></i>
        </li>
      )
    })
    return(
      <div className="message-header">
        <div className="header-talkTo">
          <i className="iconfont" onClick={this.onToggle.bind(this, 'privateDisplay')}>&#xe602;</i>
          <ul 
            style={{display: this.state.privateDisplay ? 'block' : 'none'}}
            ref='privateDropdown'
            onClick={(e) => {e.nativeEvent.stopImmediatePropagation()}}
          >
            {privateTalks}
          </ul>
        </div>
        <div className="header-my">
          <i className="iconfont" onClick={this.onToggle.bind(this, 'myDisplay')}>&#xe62f;</i>
          <ul 
            style={{display: this.state.myDisplay ? 'block' : 'none'}}
            ref='myDropdown'
            onClick={(e) => {e.nativeEvent.stopImmediatePropagation()}}
          >
            <li id="header-my-name">USERNAME: { this.props.name}</li>
            <li onClick={ this.props.logout }>LOGOUT</li>
          </ul>
        </div>
      </div>
    )
  }
}

class privateTalk extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>

      </li>
    )
  }
}
export default Header;