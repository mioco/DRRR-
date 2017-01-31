import React, { Component } from 'react';

class NotLogin extends Component{
  render() {
    return(
      <div>
        <LoginLogo />
        <LoginForm />
      </div>
    )
  }
}

class LoginLogo extends Component{
  render() {
    return (
      <div className="logo-wrapper">
        <div className="login-logo"></div>
      </div>
    )
  }
}
class LoginForm extends Component{
  render() {
    return(
      <form method="psot">
        <div className="login-form">
          <label for="form-name">USERNAME:&nbsp;</label>
          <input id="form-name" />
          <br />
          <br />
          <button>ENTER!</button>
        </div>
      </form>
    )
  }
}
export default NotLogin;