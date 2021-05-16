import fetchMock = require("fetch-mock");

const AuthToken = "123test123";

export function getHeaders() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.NODE_ENV === "production") {
    headers.Authorization = "token " + AuthToken;
  }
  return headers;
}

export function createGetUserSearchByUsername(fetchMock: fetchMock.FetchMockStatic, username: string) {
  fetchMock.get(
    {
      url: `https://api.github.com/search/users?q=${username}&page=1`,
      headers: getHeaders(),
    },
    {
      headers: {
        link: `<https://api.github.com/search/users?q=${username}&page=2>; rel="next", <https://api.github.com/search/users?q=${username}&page=5>; rel="last"`,
      },
      body: {
        total_count: 4,
        items: [
          {
            login: "example",
            avatar_url: "https://avatars.githubusercontent.com/u/57936?v=4",
            url: "https://api.github.com/users/example",
          },
          {
            login: "examplecode",
            avatar_url: "https://avatars.githubusercontent.com/u/2177000?v=4",
            url: "https://api.github.com/users/examplecode",
          },
          {
            login: "infologs",
            avatar_url:
              "https://avatars.githubusercontent.com/u/17062486?v=4",
            url: "https://api.github.com/users/infologs",
          },
          {
            login: "vipulnsward",
            avatar_url: "https://avatars.githubusercontent.com/u/567626?v=4",
            url: "https://api.github.com/users/vipulnsward",
          },
        ],
      },
    }
  );
}

export function createMockForGetUser(fetchMock: fetchMock.FetchMockStatic, username: string) {
  fetchMock.get(
    {
      url: `https://api.github.com/users/${username}`,
      headers: getHeaders(),
    },
    {
      body: {
        login: username,
        id: 57936,
        node_id: "MDQ6VXNlcjU3OTM2",
        avatar_url: "https://avatars.githubusercontent.com/u/57936?v=4",
        gravatar_id: "",
        url: `https://api.github.com/users/${username}`,
        html_url: `https://github.com/${username}`,
        followers_url: `https://api.github.com/users/${username}/followers`,
        following_url:
          `https://api.github.com/users/${username}/following{/other_user}`,
        gists_url: `https://api.github.com/users/${username}/gists{/gist_id}`,
        starred_url:
          `https://api.github.com/users/${username}/starred{/owner}{/repo}`,
        subscriptions_url:
          `https://api.github.com/users/${username}/subscriptions`,
        organizations_url: `https://api.github.com/users/${username}/orgs`,
        repos_url: `https://api.github.com/users/${username}/repos`,
        events_url: `https://api.github.com/users/${username}/events{/privacy}`,
        received_events_url:
          `https://api.github.com/users/${username}/received_events`,
        type: "User",
        site_admin: false,
        name: null,
        company: null,
        blog: "",
        location: null,
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 1,
        public_gists: 0,
        followers: 19,
        following: 0,
        created_at: "2009-02-25T19:01:55Z",
        updated_at: "2019-08-22T16:25:57Z",
      },
    }
  );
}