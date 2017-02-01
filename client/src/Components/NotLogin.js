import React, { Component } from 'react';

class NotLogin extends Component{
  constructor(props) {
    super(props);
  }

  addName(e) {
    e.preventDefault();
    let name = this.input.value;
    if(name.replace(/(^\s*)|(\s*$)/g, "") == "") {
      this.input.focus();
      return false;
    }
    this.props.addName(this.input.value);
  }
  render() {
    return(
      <div>
        <div className="logo-wrapper">
          <div className="login-logo"></div>
        </div>
        <form method="post" onSubmit={ this.addName.bind(this) }>
          <div className="login-form">
            <label htmlFor="form-name">USERNAME:&nbsp;</label>
            <input id="form-name" ref={ (input) => this.input = input }/>
            <br />
            <br />
            <button type="submit">ENTER!</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NotLogin;