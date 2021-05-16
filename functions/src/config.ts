import * as functions from "firebase-functions";

interface AppConfig {
  env: string,
  github: GitHubConfig
}

interface GitHubConfig {
  authToken: string
}

const cfg: AppConfig = {
  github: {
    authToken: `token ${functions.config()["github.auth-token"]}` || "",
  },
  env: process.env.NODE_ENV!,
};

export default cfg;
