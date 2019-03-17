// @flow

import "jest-dom/extend-expect";
import React from "react";
import { Session } from "../Session";
import { cleanup, render, waitForElement } from "react-testing-library";

describe("<Session />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a set of actions to login and signup", () => {
    const service = {
      getUser: () => Promise.resolve(undefined),
      login: () => undefined,
      signup: () => undefined,
    };

    const { getByText } = render(<Session service={service} />);

    expect(getByText(/signup/i)).toBeTruthy();
    expect(getByText(/login/i)).toBeTruthy();
  });

  describe("when service request is successfull", () => {
    it("renders children with user info", async () => {
      const userData = { username: "John Doe" };
      const service = {
        getUser: () => Promise.resolve(userData),
        login: () => undefined,
        signup: () => undefined,
      };

      const { getByText } = render(
        <Session service={service}>
          {({ user }) => <div>{user.username}</div>}
        </Session>
      );

      const childrenNode = await waitForElement(() =>
        getByText(userData.username)
      );

      expect(childrenNode).toBeTruthy();
    });
  });
});
