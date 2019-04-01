// @flow
jest.mock("moment");

import moment from "moment";
import { notifications } from "../../__fixtures__/notifications";
import { NotificationsPanel } from "../NotificationsPanel";
import React from "react";
import { cleanup, render } from "react-testing-library";

const baseProps = {
  handleClose: jest.fn(),
};

describe("<NotificationsPanel />", () => {
  beforeAll(() => {
    moment.mockImplementation(() => ({ fromNow: () => "1 day ago" }));
  });

  afterEach(cleanup);

  it("renders a messge of \"no notifications\" when there is no notifications", () => {
    const { getByLabelText } = render(
      <NotificationsPanel {...baseProps} notifications={[]} />
    );

    expect(getByLabelText(/empty/i)).toBeTruthy();
  });

  it("renders rows with notifications", () => {
    const length = notifications.length;
    const { getByText, getAllByLabelText } = render(
      <NotificationsPanel {...baseProps} notifications={notifications} />
    );

    expect(getAllByLabelText(/notification/i)).toHaveLength(length);
    expect(getByText(notifications[0].data.topic_title)).toBeTruthy();
  });
});
