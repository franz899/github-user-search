import "chai/register-should";
import fetchMock = require("fetch-mock");
import { getUsers, getUser } from "./search";
import type { SearchResults, User } from "./search";

describe("get results", () => {
  before(() => {
    createGetUserSearchByUsername(fetchMock, "example");
    createMockForGetUser(fetchMock, "example");
    createMockForGetUser(fetchMock, "examplecode");
    createMockForGetUser(fetchMock, "infologs");
    createMockForGetUser(fetchMock, "vipulnsward");
  });
  after(() => {
    fetchMock.restore();
  });

  it("should return a list of 4 users", async () => {
    const query = "example";
    const users: SearchResults = await getUsers(query, 1);
    users.totalCount.should.equal(4);
    users.users.should.have.length(4);
  });

  it("should set page to 1 if not specified", async () => {
    const query = "example";
    const users: SearchResults = await getUsers(query);
    users.totalCount.should.equal(4);
    users.users.should.have.length(4);
  });
});

describe("get single user", () => {
  before(() => {
    createMockForGetUser(fetchMock, "example");
  });
  after(() => {
    fetchMock.restore();
  });
  it("should return the data for a single user by username", async () => {
    const user: User = await getUser("example");
    user.followers!.should.equal(19);
    user.memberFor!.should.equal(12)
  });
});

const AuthToken = "123test123";

function createGetUserSearchByUsername(fetchMock: fetchMock.FetchMockStatic, username: string) {
  fetchMock.get(
    {
      url: `https://api.github.com/search/users?q=${username}&page=1`,
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + AuthToken
      },
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

function createMockForGetUser(fetchMock: fetchMock.FetchMockStatic, username: string) {
  fetchMock.get(
    {
      url: `https://api.github.com/users/${username}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + AuthToken
      },
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