// @flow

import { normaliseUserNotifications } from "../normaliser";
import { notifications } from "../../__fixtures__/notifications";

describe("normaliser", () => {
  it("returns categorised notifications by alerts and messages", () => {
    const result = normaliseUserNotifications(notifications);

    expect(result.alerts).toEqual([notifications[1], notifications[3]]);
    expect(result.messages).toEqual([notifications[0], notifications[2]]);
  });

  it("returns only unread notifications", () => {
    const notificationsUpdated = [...notifications];
    notificationsUpdated[3].read = true;
    notificationsUpdated[2].read = true;
    const result = normaliseUserNotifications(notificationsUpdated);

    expect(result.alerts).toEqual([notifications[1]]);
    expect(result.messages).toEqual([notifications[0]]);
  });
});
