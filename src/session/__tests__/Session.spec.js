// @flow

import "jest-dom/extend-expect";
import React from "react";
import { Session } from "../Session";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from "react-testing-library";

describe("<Session />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a set of actions to login and signup", () => {
    const service = {
      getUser: () => Promise.resolve(undefined),
      login: jest.fn(),
      logout: jest.fn().mockResolvedValue(true),
      signup: jest.fn(),
    };

    const { getByText } = render(<Session service={service} />);
    fireEvent.click(getByText(/signup/i));
    fireEvent.click(getByText(/login/i));

    expect(service.login).toHaveBeenCalledTimes(1);
    expect(service.signup).toHaveBeenCalledTimes(1);
  });

  describe("when service request is successfull", () => {
    it("renders children with user info", async () => {
      const userData = { username: "John Doe" };
      const service = {
        getUser: () => Promise.resolve(userData),
        login: jest.fn(),
        logout: jest.fn().mockResolvedValue(true),
        signup: jest.fn(),
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
