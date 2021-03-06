import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import { Input } from "../Utils/Utils";
import "./LoginForm.css";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = "";
        password.value = "";
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div id="loginError" role="alert">
          {error && <p className="red">{error}</p>}
        </div>
        <div className="user_name">
          <label htmlFor="user_name">Username</label>
          <Input
            required
            name="user_name"
            id="user_name"
            aria-required="true"
            aria-label="user name"
            aria-describedby="loginError"
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <Input
            required
            name="password"
            type="password"
            id="password"
            aria-required="true"
            aria-label="password"
            aria-describedby="loginError"
          />
        </div>
        <button className="login_button" type="submit">
          Login
        </button>
      </form>
    );
  }
}
