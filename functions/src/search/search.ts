import { getPaginationInfo } from "./pagination";
import type { PaginationInfo } from "./pagination";
import type { GitHubSearchUsersResult, GitHubUserInfo } from "../github";
import "isomorphic-fetch";
import config from "../config";

export interface SearchPage {
  title: string
  query: string
  results?: SearchResults
}

export interface SearchResults {
  totalCount: number
  users: User[]
  pagination: PaginationInfo
}

export interface User {
  username: string
  profileURL: string
  avatarURL: string
  followers?: number
  memberFor?: number
}

const githubAPIHeaders: HeadersInit = {
  "Accept": "application/vnd.github.v3+json",
};

if (config.env === "production") {
  githubAPIHeaders.Authorization = `${config.github.authToken}`;
}

export async function getUsers(query: string, page: number = 1): Promise<SearchResults> {
  const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}`, {
    headers: githubAPIHeaders,
  });
  // console.log("response", response);
  const link = response.headers.get("link") as string;
  const pagination: PaginationInfo = getPaginationInfo(link);
  const data: GitHubSearchUsersResult = await response.json();
  // console.log("data", data);

  const totalCount = data.total_count;
  const users = await Promise.all(data.items.map((item) => {
    return getUser(item.login);
  }));

  return {
    totalCount,
    users,
    pagination,
  }
}

export async function getUser(username: string): Promise<User> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: githubAPIHeaders
  });
  const data: GitHubUserInfo = await response.json()

  return {
    username,
    avatarURL: data.avatar_url,
    profileURL: data.html_url,
    followers: data.followers,
    memberFor: getMemeberForInYears(data.created_at),
  }
}

function getMemeberForInYears(creationDate: string): number {
  const currentYear = new Date().getUTCFullYear();
  return currentYear - new Date(creationDate).getUTCFullYear();
}
