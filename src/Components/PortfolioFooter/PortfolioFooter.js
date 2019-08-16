import React, { Component } from "react";
import "./PortfolioFooter.css";

export default class PortfolioFooter extends Component {
  render() {
    return (
      <footer className="footer">
        <h3 className="contact_header">Contact</h3>{" "}
        <div className="footer_author">
          <div className="footer_social_media">
            <a
              href={this.props.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github profile link"
            >
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a
              href={this.props.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin profile link"
            >
              <i className="fab fa-linkedin" aria-hidden="true" />
            </a>
            <a href={`mailto:${this.props.email}`} aria-label="email_link">
              <i className="far fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
