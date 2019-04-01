// @flow

import { NotificationsPanel } from "../NotificationsPanel";
import React from "react";
import { cleanup, render } from "react-testing-library";

const DATE_TO_USE = new Date("2019");
const _Date = Date;

global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
global.Date = jest.fn(() => DATE_TO_USE);

const baseProps = {
  handleClose: jest.fn(),
};

describe("<NotificationsPanel />", () => {
  afterEach(cleanup);

  it("renders a messge of \"no notifications\" when there is no notifications", () => {
    const { getByLabelText } = render(
      <NotificationsPanel {...baseProps} notifications={[]} />
    );

    expect(getByLabelText(/empty/i)).toBeTruthy();
  });
});
