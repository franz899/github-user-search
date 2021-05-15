import "chai/register-should";
import fetchMock = require("fetch-mock");
import { getUsers } from "./search";
import type { SearchResults } from "./search";

describe("search user", () => {
  after(function () {
    fetchMock.restore();
  });

  it("should return a list of 4 users", async () => {
    const query = "example";
    fetchMock.get(
      {
        url: "https://api.github.com/search/users?q=example&page=1",
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
      {
        headers: {
          link: '<https://api.github.com/search/users?q=example&page=2>; rel="next", <https://api.github.com/search/users?q=example&page=5>; rel="last"',
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
    const users: SearchResults = await getUsers(query, 1);
    users.totalCount.should.equal(4);
    users.users.should.have.length(4);
  });
});
