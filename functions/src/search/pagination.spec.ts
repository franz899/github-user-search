import { expect } from "chai";
import "chai/register-should";

import {getPaginationInfo} from "./pagination";

describe("getPaginationInfo", () => {
  it("should return an object with URL, rel type and page number", () => {
    const result = getPaginationInfo(
      "<https://api.github.com/search/users?q=example&page=1>; rel=\"prev\", <https://api.github.com/search/users?q=example&page=3>; rel=\"next\", <https://api.github.com/search/users?q=example&page=5>; rel=\"last\", <https://api.github.com/search/users?q=example&page=1>; rel=\"first\"",
    );

    const { first, last, next, prev } = result;

    first!.rel.should.equal("first");
    first!.page.should.equal(1);

    last!.rel.should.equal("last");
    last!.page.should.equal(5);

    next!.rel.should.equal("next");
    next!.page.should.equal(3);

    prev!.rel.should.equal("prev");
    prev!.page.should.equal(1);
  });

  it("should return null for each link not specified", () => {
    const result = getPaginationInfo(
      "<https://api.github.com/search/users?q=example&page=2>; rel=\"next\", <https://api.github.com/search/users?q=example&page=50>; rel=\"last\"",
    );

    const { first, last, next, prev } = result;

    expect(first).to.be.null;

    last!.rel.should.equal("last");
    last!.page.should.equal(50);

    next!.rel.should.equal("next");
    next!.page.should.equal(2);

    expect(prev).to.be.null;
  });
});
