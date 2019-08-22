import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import ValidationError from "../../Components/ValidationError/ValidationError";
import PortfolioApiService from "../../services/portfolio-api-service";
import "./AddProjectPage.css";

export default class AddProjectPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      skills: [],
      github_url: "",
      demo_url: "",
      image_url: "",
      nameValid: false,
      descriptionValid: false,
      githubValid: false,
      demoValid: false,
      imageValid: false,
      formValid: false,
      validationMessages: {
        name: "",
        description: "",
        github: "",
        demo: "",
        image: ""
      },
      skillsList: []
    };
  }

  componentDidMount() {
    PortfolioApiService.getSkills().then(skillsList => {
      this.setState({ skillsList });
    });
  }

  updateName(name) {
    this.setState({ name }, () => this.validateName(name));
  }

  updateDescription(description) {
    this.setState({ description }, () => this.validateDescription(description));
  }

  updateSkills(checked, skillId) {
    let { skills } = this.state;
    if (checked === true) {
      skills.push(skillId);
    } else {
      skills = skills.filter(skill => skill !== skillId);
    }
    this.setState({ skills });
  }

  updateGitHub(github_url) {
    this.setState({ github_url }, () => this.validateGitHub(github_url));
  }

  updateDemo(demo_url) {
    this.setState({ demo_url }, () => this.validateDemo(demo_url));
  }

  updateImage(image_url) {
    this.setState({ image_url }, () => this.validateImage(image_url));
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 2) {
      fieldErrors.name = "Name must be at least 2 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }

  validateDescription(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.description =
        "Description must be at least 3 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        descriptionValid: !hasError
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

  validateDemo(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (!fieldValue.includes(".") || fieldValue.length < 3) {
      fieldErrors.demo =
        "Please provide a valid URL for your live app / demo site";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        demoValid: !hasError
      },
      this.formValid
    );
  }

  validateImage(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (!fieldValue.includes(".") || fieldValue.length < 3) {
      fieldErrors.image = "Please provide a valid URL for your image";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        imageValid: !hasError
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.descriptionValid &&
        this.state.githubValid &&
        this.state.demoValid &&
        this.state.imageValid
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      description,
      skills,
      github_url,
      demo_url,
      image_url
    } = this.state;

    PortfolioApiService.createProject(
      name,
      description,
      skills,
      github_url,
      demo_url,
      image_url
    ).catch(err => console.error(err));

    this.props.history.push("/dashboard");
  };

  render() {
    const { skillsList } = this.state;

    return (
      <section className="add_project_section">
        <header role="banner">
          <h1 className="add_form_header">Add New Project</h1>
        </header>{" "}
        <form className="add_project_form" onSubmit={this.handleSubmit}>
          <h2 className="form_instructions">
            Fill out and save the fields below to add your project to your
            portfolio:
          </h2>
          <label htmlFor="name">Project Name</label>
          <input
            className="form_input text_input"
            type="text"
            name="name"
            id="name"
            placeholder="e.g., My Super Awesome Project"
            onChange={e => this.updateName(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessages.name}
            id="nameError"
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form_input text_input"
            name="description"
            id="description"
            placeholder="1-2 sentences describing of your project..."
            onChange={e => this.updateDescription(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.descriptionValid}
            message={this.state.validationMessages.description}
            id="descriptionError"
          />
          <fieldset className="form_input skills_section">
            <legend>Technologies Used</legend>
            <div className="checkbox_group">
              {skillsList.map(skill => (
                <div key={skill.id} className="checkbox_div">
                  <input
                    type="checkbox"
                    name="project_skills"
                    value={skill.id}
                    id={skill.name}
                    onChange={e =>
                      this.updateSkills(e.target.checked, skill.id)
                    }
                  />
                  <label htmlFor={skill.name}>{skill.name}</label>
                </div>
              ))}
            </div>
          </fieldset>
          <label htmlFor="github_url">GitHub URL</label>
          <input
            className="form_input text_input"
            type="text"
            name="github_url"
            id="github_url"
            placeholder="link to your project's GitHub repo..."
            onChange={e => this.updateGitHub(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.githubValid}
            message={this.state.validationMessages.github}
            id="githubError"
          />
          <label htmlFor="demo_url">Demo URL</label>
          <input
            className="form_input text_input"
            type="text"
            name="demo_url"
            id="demo_url"
            placeholder="link to live app / demo site..."
            onChange={e => this.updateDemo(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.demoValid}
            message={this.state.validationMessages.demo}
            id="demoError"
          />
          <label htmlFor="image_url">Image URL</label>
          <input
            className="form_input text_input"
            type="text"
            name="image_url"
            id="image_url"
            placeholder="link to image / screenshot of your app / website..."
            onChange={e => this.updateImage(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.imageValid}
            message={this.state.validationMessages.image}
            id="imageError"
          />

          <button
            className="form_button button save_project_button"
            type="submit"
            disabled={!this.state.formValid}
          >
            Save Project
          </button>
          {this.state.successMessage ? (
            <p className="success_message">{this.state.successMessage}</p>
          ) : (
            <></>
          )}
          <button className="back_button button">
            <Link className="back_link" to={`/dashboard`}>
              Back to Dashboard
            </Link>
          </button>
        </form>
      </section>
    );
  }
}
