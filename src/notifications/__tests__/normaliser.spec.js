// @flow

import { normaliseUserNotifications } from "../normaliser";
import { notifications } from "../../__fixtures__/notifications";

describe("normaliser", () => {
  it("returns categorised notifications by alerts and messages", () => {
    const result = normaliseUserNotifications(notifications);

    expect(result.alerts).toEqual([notifications[1], notifications[3]]);
    expect(result.messages).toEqual([notifications[0], notifications[2]]);
  });
});
