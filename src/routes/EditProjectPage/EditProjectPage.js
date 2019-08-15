// import React, { Component } from "react";
// //import TokenService from "../../services/token-service";

// export default class EditProjectPage extends Component {
//   render() {
//     const currentUserId = TokenService.parseAuthToken().user_id;
//     if (currentUserId != project.user_id) {
//       return <h1>Unauthorized</h1>;
//     }
//     return <h1>Edit Project</h1>;
//   }
// }

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import ValidationError from "../../Components/ValidationError/ValidationError";
import PortfolioApiService from "../../services/portfolio-api-service";

export default class EditProjectPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      skills: [],
      github_url: "",
      demo_url: "",
      image_url: "",
      nameValid: true,
      descriptionValid: true,
      githubValid: true,
      demoValid: true,
      imageValid: true,
      formValid: true,
      validationMessages: {
        name: "",
        description: "",
        github: "",
        demo: "",
        image: ""
      },
      successMessage: "",
      skillsList: []
    };
  }

  async componentDidMount() {
    const { project_id } = this.props.match.params;

    await PortfolioApiService.getSkills().then(skillsList => {
      this.setState({ skillsList });
    });

    PortfolioApiService.getProjectData(project_id).then(project =>
      this.setState({
        id: project.id,
        name: project.name,
        description: project.description,
        skills: project.skills,
        github_url: project.github_url,
        demo_url: project.demo_url,
        image_url: project.image_url
      })
    );
  }

  updateName(name) {
    this.setState({ name, successMessage: "" }, () => this.validateName(name));
  }

  updateDescription(description) {
    this.setState({ description, successMessage: "" }, () =>
      this.validateDescription(description)
    );
  }

  updateSkills(checked, skillId) {
    let { skills } = this.state;
    if (checked === true) {
      skills.push(skillId);
    } else {
      skills = skills.filter(skill => skill !== skillId);
    }
    this.setState({ skills, successMessage: "" });
  }

  updateGitHub(github_url) {
    this.setState({ github_url, successMessage: "" }, () =>
      this.validateGitHub(github_url)
    );
  }

  updateDemo(demo_url) {
    this.setState({ demo_url, successMessage: "" }, () =>
      this.validateDemo(demo_url)
    );
  }

  updateImage(image_url) {
    this.setState({ image_url, successMessage: "" }, () =>
      this.validateImage(image_url)
    );
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
      id,
      name,
      description,
      skills,
      github_url,
      demo_url,
      image_url
    } = this.state;

    PortfolioApiService.updateProject(
      id,
      name,
      description,
      skills,
      github_url,
      demo_url,
      image_url
    )
      .then(
        this.setState({
          name,
          description,
          skills,
          github_url,
          demo_url,
          image_url,
          successMessage: "Project Saved Successfully!"
        })
      )
      .catch(err => {
        console.error(err);
        this.setState({ successMessage: err.error.message });
      });
  };

  render() {
    const {
      name,
      description,
      skills,
      github_url,
      demo_url,
      image_url,
      skillsList
    } = this.state;

    return (
      <section className="add_project_section">
        <header role="banner">
          <h1 className="add_form_header">Edit Project</h1>
        </header>{" "}
        <form className="add_project_form" onSubmit={this.handleSubmit}>
          <h2>Update your project using the fields below:</h2>
          <label htmlFor="name">Project Name</label>
          <input
            className="form_input text_input"
            type="text"
            name="name"
            id="name"
            placeholder="e.g., My Super Awesome Project"
            value={name}
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
            value={description}
            onChange={e => this.updateDescription(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.descriptionValid}
            message={this.state.validationMessages.description}
            id="descriptionError"
          />
          <fieldset className="form_input">
            <legend>Technologies Used</legend>
            <div className="checkbox_group">
              {skillsList.map(skill => (
                <div key={skill.id} className="checkbox_div">
                  <input
                    type="checkbox"
                    name="project_skills"
                    value={skill.id}
                    checked={skills.includes(skill.id)}
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
            value={github_url}
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
            value={demo_url}
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
            value={image_url}
            onChange={e => this.updateImage(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.imageValid}
            message={this.state.validationMessages.image}
            id="imageError"
          />

          <button
            className="form_button button"
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
