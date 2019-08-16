import React, { Component } from "react";
import PortfolioApiService from "../../services/portfolio-api-service";
import PortfolioFooter from "../../Components/PortfolioFooter/PortfolioFooter";
import "./PortfolioPage.css";

export default class PortfolioPage extends Component {
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

  componentDidMount() {
    const { user_name } = this.props.match.params;
    PortfolioApiService.getPortfolioData(user_name).then(user => {
      this.setState({
        full_name: user.full_name,
        title: user.title,
        bio: user.bio,
        theme_color: user.theme_color,
        github_url: user.github_url,
        linkedin_url: user.linkedin_url,
        email_address: user.email_address,
        projects: user.projects
      });
    });
  }

  render() {
    const {
      full_name,
      title,
      bio,
      github_url,
      linkedin_url,
      email_address,
      projects
    } = this.state;

    return (
      <section className="portfolio_section">
        <h1>{full_name}</h1>
        <h2 className="subsection_header">{title}</h2>
        <p className="bio">{bio}</p>
        <h2 className="subsection_header">Projects</h2>
        {projects.map(project => (
          <section className="project_section">
            <h3>{project.name}</h3>
            <p className="project_description">{project.description}</p>
            <img
              className="project_image"
              src={project.image_url}
              alt="project_screenshot"
            />
            <h4 className="built_with_header">Built With</h4>
            <ul>
              {project.skills.map(skill => (
                <li>{skill.name}</li>
              ))}
            </ul>
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project_link"
            >
              Demo
            </a>
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project_link"
            >
              Code
            </a>
          </section>
        ))}
        <PortfolioFooter
          github={github_url}
          linkedin={linkedin_url}
          email={email_address}
        />
      </section>
    );
  }
}
