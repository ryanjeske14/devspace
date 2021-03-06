import React, { Component } from "react";
import "./PortfolioFooter.css";

export default class PortfolioFooter extends Component {
  render() {
    const { theme_color } = this.props;
    return (
      <footer className="footer">
        <h2 className="contact_header">CONTACT</h2>{" "}
        <div className="footer_author">
          <div className="footer_social_media">
            <a
              href={this.props.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github profile link"
            >
              <i
                className={`fab fa-github ${theme_color}`}
                aria-hidden="true"
              />
            </a>
            <a
              href={this.props.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin profile link"
            >
              <i
                className={`fab fa-linkedin ${theme_color}`}
                aria-hidden="true"
              />
            </a>
            <a href={`mailto:${this.props.email}`} aria-label="email_link">
              <i
                className={`far fa-envelope ${theme_color}`}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
