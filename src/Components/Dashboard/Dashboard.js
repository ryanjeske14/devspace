import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";
import ValidationError from "../../Components/ValidationError/ValidationError";
import PortfolioApiService from "../../services/portfolio-api-service";
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
      projects: [],
      fullNameValid: true,
      titleValid: true,
      bioValid: true,
      githubValid: true,
      linkedinValid: true,
      emailValid: true,
      formValid: true,
      validationMessages: {
        fullName: "",
        title: "",
        bio: "",
        github: "",
        linkedin: "",
        email: ""
      },
      successMessage: ""
    };
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      const username = TokenService.parseAuthToken().sub;
      PortfolioApiService.getPortfolioData(username).then(user => {
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
  }

  updateFullName(full_name) {
    this.setState({ full_name, successMessage: "" }, () =>
      this.validateFullName(full_name)
    );
  }

  updateTitle(title) {
    this.setState({ title, successMessage: "" }, () =>
      this.validateTitle(title)
    );
  }

  updateBio(bio) {
    this.setState({ bio, successMessage: "" }, () => this.validateBio(bio));
  }

  updateGitHub(github_url) {
    this.setState({ github_url, successMessage: "" }, () =>
      this.validateGitHub(github_url)
    );
  }

  updateLinkedIn(linkedin_url) {
    this.setState({ linkedin_url, successMessage: "" }, () =>
      this.validateLinkedIn(linkedin_url)
    );
  }

  updateEmail(email_address) {
    this.setState({ email_address, successMessage: "" }, () =>
      this.validateEmail(email_address)
    );
  }

  validateFullName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 2) {
      fieldErrors.fullName = "Full name must be at least 2 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        fullNameValid: !hasError
      },
      this.formValid
    );
  }

  validateTitle(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.title = "Title must be at least 3 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        titleValid: !hasError
      },
      this.formValid
    );
  }

  validateBio(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.bio = "Bio must be at least 3 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        bioValid: !hasError
      },
      this.formValid
    );
  }

  validateGitHub(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (!fieldValue.includes("github.com")) {
      fieldErrors.github = "GitHub URL must contain 'github.com'";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        githubValid: !hasError
      },
      this.formValid
    );
  }

  validateLinkedIn(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (!fieldValue.includes("linkedin.com")) {
      fieldErrors.linkedin = "LinkedIn URL must contain 'linkedin.com'";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        linkedinValid: !hasError
      },
      this.formValid
    );
  }

  validateEmail(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(fieldValue)) {
      fieldErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        emailValid: !hasError
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid:
        this.state.fullNameValid &&
        this.state.titleValid &&
        this.state.bioValid &&
        this.state.githubValid &&
        this.state.linkedinValid &&
        this.state.emailValid
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const username = TokenService.parseAuthToken().sub;
    const {
      full_name,
      title,
      bio,
      github_url,
      linkedin_url,
      email_address
    } = this.state;

    PortfolioApiService.updateUserData(
      username,
      full_name,
      title,
      bio,
      github_url,
      linkedin_url,
      email_address
    )
      .then(
        this.setState({
          full_name,
          title,
          bio,
          github_url,
          linkedin_url,
          email_address,
          successMessage: "Profile Saved Successfully!"
        })
      )
      .catch(err => {
        console.error(err);
        this.setState({ successMessage: err.error.message });
      });
  };

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
      <section className="dashboard_section">
        <header role="banner">
          <h1>My Dashboard</h1>
        </header>{" "}
        <button className="dashboard_button">View My Portfolio</button>
        <form className="dashboard_form" onSubmit={this.handleSubmit}>
          <h2>About Me</h2>
          <label htmlFor="full_name">Full Name</label>
          <input
            className="dashboard_input"
            type="text"
            name="full_name"
            id="full_name"
            value={full_name}
            onChange={e => this.updateFullName(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.fullNameValid}
            message={this.state.validationMessages.fullName}
            id="fullNameError"
          />
          <label htmlFor="title">Title</label>
          <input
            className="dashboard_input"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={e => this.updateTitle(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.title}
            id="titleError"
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            className="dashboard_input"
            name="bio"
            id="bio"
            value={bio}
            onChange={e => this.updateBio(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.bioValid}
            message={this.state.validationMessages.bio}
            id="bioError"
          />
          <label htmlFor="github_url">GitHub URL</label>
          <input
            className="dashboard_input"
            type="text"
            name="github_url"
            id="github_url"
            value={github_url}
            onChange={e => this.updateGitHub(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.githubValid}
            message={this.state.validationMessages.github}
            id="githubError"
          />
          <label htmlFor="linkedin_url">LinkedIn URL</label>
          <input
            className="dashboard_input"
            type="text"
            name="linkedin_url"
            id="linkedin_url"
            value={linkedin_url}
            onChange={e => this.updateLinkedIn(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.linkedinValid}
            message={this.state.validationMessages.linkedin}
            id="linkedinError"
          />
          <label htmlFor="email_address">Email</label>
          <input
            className="dashboard_input"
            type="text"
            name="email_address"
            id="email_address"
            value={email_address}
            onChange={e => this.updateEmail(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.emailValid}
            message={this.state.validationMessages.email}
            id="emailError"
          />

          <button
            className="dashboard_button"
            type="submit"
            disabled={!this.state.formValid}
          >
            Save Changes
          </button>
          {this.state.successMessage ? (
            <p className="success_message">{this.state.successMessage}</p>
          ) : (
            <></>
          )}
        </form>
        <section className="dashboard_projects">
          <h2>My Projects</h2>
          <ul className="projects_list">
            {projects.map(project => (
              <li className="dashboard_project" key={project.id}>
                <Link
                  className="dashboard_project_name"
                  to={`/edit-project/${project.id}`}
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className="dashboard_button">
            <Link className="add_project_link" to={`/add-project`}>
              Add New Project
            </Link>
          </button>
        </section>
      </section>
    );
  }
}
