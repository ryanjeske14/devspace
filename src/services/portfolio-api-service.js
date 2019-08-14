import TokenService from "./token-service";
import config from "../config";

const PortfolioApiService = {
  getPortfolioData(username) {
    return fetch(`${config.API_ENDPOINT}/portfolio/${username}`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  updateUserData(
    username,
    full_name,
    title,
    bio,
    github_url,
    linkedin_url,
    email_address,
    projects
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
        github_url,
        linkedin_url,
        email_address,
        projects
      })
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default PortfolioApiService;
