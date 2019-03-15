// @flow

import DiscourseService from "../../common/DiscourseService";
import SessionService from "../SessionService";

describe("SessionService", () => {
  describe("getUser", () => {
    it("allows to send a request to get user information", () => {
      DiscourseService.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(null));
      SessionService.getUser();

      expect(DiscourseService.get).toHaveBeenNthCalledWith(
        1,
        "session/current.json"
      );
    });

    it("returns the current_user when request is successful", done => {
      const response = { current_user: { id: "007" } };
      DiscourseService.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(response));
      SessionService.getUser().then(result => {
        expect(result).toEqual(response.current_user);
        done();
      });
    });

    it("returns null when request is unsuccessful", done => {
      DiscourseService.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject("Network Error"));

      SessionService.getUser().then(result => {
        expect(result).toBeNull();
        done();
      });
    });
  });

  it("allows to redirect to login", () => {
    const spy = jest
      .spyOn(DiscourseService, "goTo")
      .mockImplementationOnce(jest.fn());

    SessionService.login();

    expect(spy).toHaveBeenLastCalledWith("login");
  });

  it("allows to redirect to signup", () => {
    const spy = jest
      .spyOn(DiscourseService, "goTo")
      .mockImplementationOnce(jest.fn());

    SessionService.signup();

    expect(spy).toHaveBeenLastCalledWith("signup");
  });
});
