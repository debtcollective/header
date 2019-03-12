import DiscourseService from "../DiscourseService";
import faker from "faker";

describe("DiscourseService", () => {
  it("allows to navigate to a Discourse page", () => {
    window.open = jest.fn();
    DiscourseService.goTo("foo");
    expect(window.open).toHaveBeenCalledWith(
      "http://localhost:3000/foo",
      "_blank"
    );
  });

  describe("refreshToken", () => {
    const tokenResponse = {
      json: () => Promise.resolve({ csrf: faker.random.uuid(), ok: true }),
    };

    const randomResponse = {
      json: () =>
        Promise.resolve({ data: faker.random.objectElement(), ok: true }),
    };

    beforeEach(() => {
      DiscourseService.resetToken();
      jest.clearAllMocks();
    });

    it("saves the token after being called", async () => {
      jest
        .spyOn(window, "fetch")
        .mockImplementationOnce(() => Promise.resolve(tokenResponse));

      const initialToken = DiscourseService.getToken();
      const refreshedToken = await DiscourseService.refreshToken();

      expect(initialToken).toBeNull();
      expect(DiscourseService.getToken()).toEqual(refreshedToken);
    });

    it("gets called before every XHR request", async () => {
      jest
        .spyOn(window, "fetch")
        .mockImplementationOnce(() => Promise.resolve(tokenResponse))
        .mockImplementationOnce(() => Promise.resolve(randomResponse));
      const spyOnRefreshToken = jest.spyOn(DiscourseService, "refreshToken");

      await DiscourseService.get();
      expect(spyOnRefreshToken).toHaveBeenCalledTimes(1);
    });

    it("returns the saved token if available", async () => {
      jest
        .spyOn(window, "fetch")
        .mockImplementationOnce(() => Promise.resolve(tokenResponse));

      const refreshedToken = await DiscourseService.refreshToken();
      const nextToken = await DiscourseService.refreshToken();

      expect(refreshedToken).toEqual(nextToken);
      expect(window.fetch).toBeCalledTimes(1);
    });
  });

  describe("XHR requests", () => {
    const baseUrl = process.env.REACT_APP_DISCOURSE_ENDPOINT;
    const valueToMatch = faker.random.word();
    const tokenToMatch = faker.random.uuid();
    const tokenResponse = {
      json: () => Promise.resolve({ csrf: tokenToMatch, ok: true }),
    };

    const randomResponse = {
      json: () => Promise.resolve({ data: valueToMatch, ok: true }),
    };

    beforeEach(() => {
      DiscourseService.resetToken();
      jest.clearAllMocks();
    });

    it("allows send GET request to a given path returning parsed response", async () => {
      window.fetch = jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(tokenResponse))
        .mockReturnValueOnce(Promise.resolve(randomResponse));

      const response = await DiscourseService.get("foo.json");
      const { data } = response;

      expect(data).toEqual(valueToMatch);
      expect(window.fetch).toHaveBeenNthCalledWith(
        1,
        `${baseUrl}/session/csrf.json`
      );
      expect(window.fetch).toHaveBeenNthCalledWith(2, `${baseUrl}/foo.json`, {
        credentials: "include",
        headers: { Accept: "application/json", "X-CSRF-Token": tokenToMatch },
      });
    });

    xit("allows to send POST request to a given path", () => {});

    xit("allows to send PUT request to a given path", () => {});

    xit("allows to send DELETE request to a given path", () => {});
  });
});
