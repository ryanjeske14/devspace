import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Hyph } from "../Utils/Utils";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Header.css";

export default class Header extends Component {
  static contextType = AppContext;

  handleLogoutClick = async () => {
    TokenService.clearAuthToken();
    // when logging out, clear the callbacks to the refresh api and idle auto logout
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    await this.context.setLoggedIn();
    await this.context.setUser({});
  };

  renderLogoutLink() {
    return (
      <div className="logged-in">
        <Link to="/dashboard">Dashboard</Link>
        <Hyph />
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="not-logged-in">
        <Link to="/register">Register</Link>
        <Hyph />
        <Link to="/login">Login</Link>
      </div>
    );
  }

  render() {
    const destination = this.context.loggedIn ? "/dashboard" : "/";

    return (
      <nav className="Header">
        <div className="logo">
          <Link to={destination}>
            <img src="/img/logo2.png" alt="logo" />
          </Link>
        </div>
        {this.context.loggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}
