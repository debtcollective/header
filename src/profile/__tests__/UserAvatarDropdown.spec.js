// @flow

import React from "react";
import { UserAvatarDropdown } from "../UserAvatarDropdown";
import { cleanup, fireEvent, render } from "react-testing-library";

const service = {
  getUser: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  signup: jest.fn(),
};

const user: $Shape<User> = {
  name: "Jane Doe",
  username: "janedoe",
};

describe("<UserAvatarDropdown />", () => {
  afterEach(cleanup);

  it("handles a logout action after toggle", async () => {
    const { getByText, getByLabelText } = render(
      <UserAvatarDropdown service={service} user={user} />
    );

    fireEvent.click(getByLabelText(user.username));
    fireEvent.click(getByText(/logout/i));

    expect(service.logout).toHaveBeenCalledTimes(1);
  });
});
