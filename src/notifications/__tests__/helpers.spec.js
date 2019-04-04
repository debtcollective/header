// @flow

import { getNotificationTypeName } from "../helpers";

describe("helpers", () => {
  describe("getNotificationTypeName", () => {
    it("returns mapped notification name after number", () => {
      expect(getNotificationTypeName(1)).toEqual("replied");
    });
  });
});
