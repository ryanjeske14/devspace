import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landing">
        <header className="banner">
          <img src="/img/hero.jpg" alt="hero_img" className="banner_img" />
        </header>

        <section className="landing_section">
          <h1 className="top_header">A portfolio builder for web developers</h1>
          <p>
            Are you a web developer? &nbsp; Do you have projects or prior work
            experience that you want to share? &nbsp; Devspace provides a quick
            and easy-to-use platform for building your very own portfolio site
            where you can tell your story, demo your work, and let yourself be
            seen!
          </p>
          <i className="far fa-address-card" />
        </section>

        <section className="landing_section">
          <h2>Tell your story</h2>
          <p>
            Fill out some basic information about yourself, your background, and
            anything you want people to know about you.
          </p>
          <i className="fas fa-book" />
        </section>

        <section className="landing_section">
          <h2>Demo your projects</h2>
          <p>
            Devspace makes it easy to demo your projects. &nbsp; All you have to
            do is fill out a few simple fields, select the technologies you
            used, include a screenshot of your app, and the rest is done for
            you!
          </p>
          <i className="far fa-folder-open" />
        </section>

        <section className="landing_section">
          <section className="get_started_section">
            <button className="get_started">
              <Link to="/dashboard" className="get_started_link">
                GET STARTED
              </Link>
            </button>
          </section>
        </section>
      </section>
    );
  }
}
