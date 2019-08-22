import TokenService from "./token-service";
import config from "../config";

const PortfolioApiService = {
  getPortfolioData(username) {
    return fetch(`${config.API_ENDPOINT}/portfolio/${username}`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getProjectData(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getSkills() {
    return fetch(`${config.API_ENDPOINT}/skills`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  createProject(name, description, skills, github_url, demo_url, image_url) {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name,
        description,
        skills,
        github_url,
        demo_url,
        image_url
      })
    }).then(res => {
      !res.ok ? res.json().then(e => e.Promise.reject(e)) : res.json();
    });
  },

  updateProject(
    id,
    name,
    description,
    skills,
    github_url,
    demo_url,
    image_url
  ) {
    return fetch(`${config.API_ENDPOINT}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name,
        description,
        skills,
        github_url,
        demo_url,
        image_url
      })
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  updateUserData(
    username,
    full_name,
    title,
    bio,
    profile_picture,
    github_url,
    linkedin_url,
    email_address,
    theme_color,
    banner_image
  ) {
    return fetch(`${config.API_ENDPOINT}/users/${username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        full_name,
        title,
        bio,
        profile_picture,
        github_url,
        linkedin_url,
        email_address,
        theme_color,
        banner_image
      })
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  deleteProject(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default PortfolioApiService;
