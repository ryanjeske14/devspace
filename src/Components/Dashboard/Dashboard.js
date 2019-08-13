import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./Dashboard.css";

export default class Dashboard extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      title: "",
      bio: "",
      theme_color: "",
      github_url: "",
      linkedin_url: "",
      email_address: "",
      projects: []
    };
  }

  render() {
    return (
      <section className="dashboard_section">
        <header role="banner">
          <h1>Your Dashboard</h1>
        </header>{" "}
        <form className="dashboard_form">
          <label htmlFor="full_name">Full Name</label>
          <input
            className="dashboard_input"
            type="text"
            name="full_name"
            id="full_name"
          />
          <label htmlFor="title">Title</label>
          <input
            className="dashboard_input"
            type="text"
            name="title"
            id="title"
          />
          <label htmlFor="bio">Bio</label>
          <textarea className="dashboard_input" name="bio" id="bio" />
          <label htmlFor="github_url">GitHub URL</label>
          <input
            className="dashboard_input"
            type="text"
            name="github_url"
            id="github_url"
          />
          <label htmlFor="linkedin_url">LinkedIn URL</label>
          <input
            className="dashboard_input"
            type="text"
            name="linkedin_url"
            id="linkedin_url"
          />
          <label htmlFor="email_address">Email</label>
          <input
            className="dashboard_input"
            type="text"
            name="email_address"
            id="email_address"
          />

          <button className="dashboard_button" type="submit">
            Save Changes
          </button>
          <button className="dashboard_button">View My Portfolio</button>
        </form>
      </section>
    );
  }
}
