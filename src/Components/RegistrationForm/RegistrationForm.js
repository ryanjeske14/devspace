import React, { Component } from "react";
import { Input, Required } from "../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";
import "./RegistrationForm.css";

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    const { user_name, full_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      full_name: full_name.value,
      password: password.value
    })
      .then(user => {
        user_name.value = "";
        full_name.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div id="registrationError" role="alert">
          {error && <p className="red">{error}</p>}
        </div>
        <div className="user_name">
          <label htmlFor="user_name">
            User name <Required />
          </label>
          <Input
            name="user_name"
            type="text"
            required
            id="user_name"
            aria-required="true"
            aria-label="user name"
            aria-describedby="registrationError"
          />
        </div>
        <div className="full_name">
          <label htmlFor="full_name">
            Full name <Required />
          </label>
          <Input
            name="full_name"
            type="text"
            required
            id="full_name"
            aria-required="true"
            aria-label="user name"
            aria-describedby="registrationError"
          />
        </div>
        <div className="password">
          <label htmlFor="password">
            Password <Required />
          </label>
          <Input
            name="password"
            type="password"
            required
            id="password"
            aria-required="true"
            aria-label="password"
            aria-describedby="registrationError"
          />
        </div>
        <button className="registration_button" type="submit">
          Register
        </button>
      </form>
    );
  }
}
