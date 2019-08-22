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
      profile_picture: "",
      theme_color: "",
      banner_image: "",
      github_url: "",
      linkedin_url: "",
      email_address: "",
      projects: []
    };
  }

  componentDidMount() {
    const { user_name } = this.props.match.params;
    PortfolioApiService.getPortfolioData(user_name).then(user => {
      this.setState(
        {
          full_name: user.full_name,
          title: user.title,
          bio: user.bio,
          profile_picture: user.profile_picture,
          theme_color: user.theme_color,
          banner_image: user.banner_image,
          github_url: user.github_url,
          linkedin_url: user.linkedin_url,
          email_address: user.email_address,
          projects: user.projects
        },
        // dynamically update document title to be specific to user's portfolio
        () => (document.title = `${user.full_name} Portfolio`)
      );
    });
  }

  render() {
    const {
      full_name,
      title,
      bio,
      profile_picture,
      theme_color,
      banner_image,
      github_url,
      linkedin_url,
      email_address,
      projects
    } = this.state;

    return (
      <section className="portfolio_section">
        <section className={`banner_${banner_image}`}>
          <h1 className="name_header">{full_name}</h1>
          <h2 className="subsection_header title">{title}</h2>
        </section>
        <h2 className="subsection_header about_header">ABOUT ME</h2>
        <p className="bio">{bio}</p>
        <div
          className="profile_picture_div"
          style={{ backgroundImage: `url(${profile_picture})` }}
        />
        <h2 className="subsection_header portfolio_projects_header">
          PROJECTS
        </h2>
        {projects.map(project => (
          <section
            key={project.id}
            className={`project_section project_section_${theme_color}`}
          >
            <h3 className="project_name">{project.name}</h3>
            <p className="project_description">{project.description}</p>
            <img
              className="project_image"
              src={project.image_url}
              alt="project_screenshot"
            />
            <h4 className="built_with_header">Built With</h4>
            <ul className="skills_list">
              {project.skills.map(skill => (
                <li key={skill.id} className="project_skill">
                  {skill.name}
                </li>
              ))}
            </ul>
            <section className="project_button_section">
              <button
                className={`project_button project_button_${theme_color}`}
              >
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project_link"
                >
                  Demo
                </a>
              </button>
              <button
                className={`project_button project_button_${theme_color}`}
              >
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project_link"
                >
                  Code
                </a>
              </button>
            </section>
          </section>
        ))}
        <PortfolioFooter
          github={github_url}
          linkedin={linkedin_url}
          email={email_address}
          theme_color={theme_color}
        />
      </section>
    );
  }
}
