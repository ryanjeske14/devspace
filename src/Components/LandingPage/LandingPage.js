import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landing">
        <header role="banner">
          <h1>Devspace</h1>
          <h2>let your work be seen</h2>
        </header>

        <section className="landing_section">
          <h2>A portfolio builder for web developers</h2>
          <p>
            Are you a web developer? Do you have projects or prior work
            experience that you want to share? Devspace provides a quick and
            easy-to-use platform for building your very own portfolio site where
            you can tell your story, demo your work, and help you connect with
            others.
          </p>
        </section>

        <section className="landing_section">
          <h2>Tell your story</h2>
          <p>
            [<em>placeholder for screenshot</em>]
          </p>
          <p>
            Fill out some basic information about yourself, your background, and
            anything you want other developers to know about you.
          </p>
        </section>

        <section className="landing_section">
          <h2>Demo your projects</h2>
          <p>
            [<em>placeholder for screenshot</em>]
          </p>
          <p>
            Devspace makes it easy to demo your projects. All you have to do is
            fill out a few simple fields, select the technologies you used,
            upload a screenshot of your app, and the rest is done for you!
          </p>
        </section>

        <section className="landing_section">
          {/* 
            <h3>Get Started</h3>
            <p>Register below to start making your portfolio site today!</p>
           */}
          <section className="get_started_section">
            <h2 className="get_started">
              <Link to="/dashboard">GET STARTED</Link>
            </h2>
          </section>
          {/* <form class="signup-form">
            <div>
              <label for="full_name">Full name</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label for="user_name">User name</label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="User Name"
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit">Sign Up</button>
          </form> */}
        </section>
      </section>
    );
  }
}
