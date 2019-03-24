// @flow
jest.mock("../NotificationService");

import "jest-dom/extend-expect";
import { Notifications } from "../Notifications";
import notificationsData from "./__fixtures__/notifications";
import NotificationService from "../NotificationService";
import React from "react";
import { cleanup, render, waitForElement } from "react-testing-library";

const renderNotifications = (props: Object) => {
  return render(
    <Notifications {...props}>
      {({ alerts, messages }) => {
        return (
          <div data-testid="data">
            <div data-testid="alerts">{JSON.stringify(alerts)}</div>
            <div data-testid="messages">{JSON.stringify(messages)}</div>
          </div>
        );
      }}
    </Notifications>
  );
};

describe("<Notifications />", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders props of shaped object of messages and alerts", async () => {
    const userData = {
      unread_notifications: 10,
      username: "johndoe",
    };
    NotificationService.getNotifications = jest
      .fn()
      .mockResolvedValue(notificationsData);
    const { getByTestId } = renderNotifications({ user: userData });
    const alertsElem = await waitForElement(() => getByTestId("alerts"));
    const messagesElem = await waitForElement(() => getByTestId("messages"));

    expect(NotificationService.getNotifications).toBeCalledTimes(1);
    expect(alertsElem.firstChild).toMatchInlineSnapshot(
      "[{\"created_at\":\"2019-02-16T14:37:18.891Z\",\"data\":{\"display_username\":\"system\",\"group_id\":1,\"topic_title\":\"Backup failed\"},\"fancy_title\":\"Backup failed\",\"id\":1,\"notification_type\":7,\"post_number\":1,\"read\":false,\"slug\":\"backup-failed\",\"topic_id\":11}]"
    );
    expect(messagesElem.firstChild).toMatchInlineSnapshot(
      "[{\"created_at\":\"2019-03-24T10:24:32.495Z\",\"data\":{\"display_username\":\"janedoe\",\"original_post_id\":41,\"original_post_type\":1,\"original_username\":\"janedoe\",\"revision_number\":null,\"topic_title\":\"Hello, I'm Jane Doe\"},\"fancy_title\":\"Hello, I&rsquo;m Jane Doe\",\"id\":18,\"notification_type\":6,\"post_number\":1,\"read\":false,\"slug\":\"hello-im-jane-doe\",\"topic_id\":26}]"
    );
  });

  describe("when there is no unread notifications", () => {
    it("renders props of shaped object with empty data", async () => {
      const userData = {
        unread_notifications: 0,
      };
      const { getByTestId } = renderNotifications({ user: userData });
      const alertsElem = await waitForElement(() => getByTestId("alerts"));
      const messagesElem = await waitForElement(() => getByTestId("messages"));

      expect(NotificationService.getNotifications).toBeCalledTimes(0);
      expect(alertsElem.firstChild).toMatchInlineSnapshot("[]");
      expect(messagesElem.firstChild).toMatchInlineSnapshot("[]");
    });
  });
});
