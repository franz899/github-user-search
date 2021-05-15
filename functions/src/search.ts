import { getPaginationInfo } from "./pagination";
import type { PaginationInfo } from "./pagination";
import type { GitHubResultList } from "./github";
// import fetch from "node-fetch";
import "isomorphic-fetch";

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

interface User {
  username: string
  profileURL: string
  avatarURL: string
  stars?: number
  followers?: number
}

export async function getUsers(query: string, page: number = 1): Promise<SearchResults> {
  const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}`, {
    headers: {
      "Accept": "application/vnd.github.v3+json",
    }
  });
  const link = response.headers.get("link") as string;
  const pagination: PaginationInfo = getPaginationInfo(link);
  const data: GitHubResultList = await response.json();

  const totalCount = data.total_count;
  const users: User[] = data.items.map((item) => {
    return {
      username: item.login,
      profileURL: item.html_url,
      avatarURL: item.avatar_url
    };
  });

  return {
    totalCount,
    users,
    pagination,
  }
}