import * as functions from "firebase-functions";

interface AppConfig {
  github: GitHubConfig
}

interface GitHubConfig {
  authToken: string
}

const cfg: AppConfig = {
  github: {
    authToken: functions.config()["github.auth-token"] || "123test123",
  }
}

export default cfg;
