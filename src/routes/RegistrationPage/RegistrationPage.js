import React, { Component } from "react";
import { Section } from "../../Components/Utils/Utils";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";

export default class RegistrationPage extends Component {
  static contextType = AppContext;

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = async user => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/dashboard";
    history.push(destination);
    await this.context.setLoggedIn();
    const jwtPayload = await TokenService.parseAuthToken();
    await this.context.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub
    });
  };

  render() {
    return (
      <Section className="RegistrationPage">
        <h1>Register</h1>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <h2>Password Requirements:</h2>
        <p className="password_instructions">
          Password must be at least 8 characters long
        </p>
        <p className="password_instructions">
          Password must contain at least one upper case letter, lower case
          letter, number and special character
        </p>
        <p className="password_instructions">
          Password must be less than 72 characters
        </p>
        <p className="password_instructions">
          Password must not start or end with empty spaces
        </p>
      </Section>
    );
  }
}
