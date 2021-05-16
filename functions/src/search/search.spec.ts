import "chai/register-should";
import fetchMock = require("fetch-mock");
import { getUsers, getUser } from "./search";
import type { SearchResults, User } from "./search";
import { createGetUserSearchByUsername, createMockForGetUser } from "../../test/utils/search";

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
