import searchRouter from "./index";
import request = require("supertest");
import fetchMock = require("fetch-mock");
import { createMockServer } from "../../test/utils/server";
import { createGetUserSearchByUsername, createMockForGetUser } from "../../test/utils/search";

const server = createMockServer();
describe("search user route", () => {
  before(() => {
    createGetUserSearchByUsername(fetchMock, "example");
    createMockForGetUser(fetchMock, "example");
    createMockForGetUser(fetchMock, "examplecode");
    createMockForGetUser(fetchMock, "infologs");
    createMockForGetUser(fetchMock, "vipulnsward");
    server.use("/", searchRouter);
  });

  after(() => {
    fetchMock.restore();
  });

  it("should return an empty result is search is empty", (done) => {
    request(server)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;

        res.text.includes("Start you seach").should.be.true;
        done();
      });
  });

  it("should return results for a valid username", (done) => {
    request(server)
      .get("/?username=example")
      .expect("Content-Type", /html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        
        res.text.includes("Start you seach").should.be.false;
        res.text.includes("example").should.be.true;
        res.text.includes("examplecode").should.be.true;
        res.text.includes("infologs").should.be.true;
        res.text.includes("vipulnsward").should.be.true;
        done();
      });
  });
});
