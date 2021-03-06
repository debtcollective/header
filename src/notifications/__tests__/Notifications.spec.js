// @flow
jest.mock("../NotificationService");

import "jest-dom/extend-expect";
import * as normalisers from "../normaliser";
import { Notifications } from "../Notifications";
import { notifications } from "../../__fixtures__/notifications";
import NotificationService from "../NotificationService";
import React from "react";
import { cleanup, render, waitForElement } from "react-testing-library";

const renderNotifications = (props: { user: User }) => {
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
  let spyOnNormaliseUserNotifications;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  beforeAll(() => {
    NotificationService.getNotifications = jest
      .fn()
      .mockResolvedValue(notifications);

    spyOnNormaliseUserNotifications = jest.spyOn(
      normalisers,
      "normaliseUserNotifications"
    );
  });

  it("renders props of shaped object of messages and alerts", async () => {
    const userData: $Shape<User> = {
      unread_notifications: 10,
      username: "johndoe",
    };

    const { getByTestId } = renderNotifications({ user: userData });
    const alertsElem = await waitForElement(() => getByTestId("alerts"));
    const messagesElem = await waitForElement(() => getByTestId("messages"));

    expect(NotificationService.getNotifications).toBeCalledTimes(1);
    expect(spyOnNormaliseUserNotifications).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line
    expect(alertsElem.firstChild).toMatchInlineSnapshot(
      "[{\"created_at\":\"2019-03-24T10:37:18.891Z\",\"data\":{\"display_username\":\"system\",\"group_id\":1,\"topic_title\":\"Backup failed\"},\"fancy_title\":\"Backup failed\",\"id\":1,\"notification_type\":7,\"post_number\":1,\"read\":false,\"slug\":\"backup-failed\",\"topic_id\":11},{\"created_at\":\"2019-04-04T06:10:46.459Z\",\"data\":{\"badge_id\":5,\"badge_name\":\"Welcome\",\"badge_slug\":\"welcome\",\"badge_title\":false},\"id\":33,\"notification_type\":12,\"post_number\":null,\"read\":false,\"slug\":null,\"topic_id\":null,\"username\":\"alexis\"}]"
    );
    expect(messagesElem.firstChild).toMatchInlineSnapshot(
      "[{\"created_at\":\"2019-03-24T10:24:32.495Z\",\"data\":{\"display_username\":\"janedoe\",\"original_post_id\":41,\"original_post_type\":1,\"original_username\":\"janedoe\",\"revision_number\":null,\"topic_title\":\"Hello, I'm Jane Doe\"},\"fancy_title\":\"Hello, I&rsquo;m Jane Doe\",\"id\":18,\"notification_type\":6,\"post_number\":1,\"read\":false,\"slug\":\"hello-im-jane-doe\",\"topic_id\":26},{\"created_at\":\"2019-03-24T11:24:32.495Z\",\"data\":{\"display_username\":\"janedoe\",\"original_post_id\":42,\"original_post_type\":1,\"original_username\":\"janedoe\",\"revision_number\":null,\"topic_title\":\"Elephant\"},\"fancy_title\":\"Elephant\",\"id\":19,\"notification_type\":5,\"post_number\":1,\"read\":false,\"slug\":\"hello-im-jane-doe\",\"topic_id\":26}]"
    );
  });

  describe("when there is no unread notifications", () => {
    it("renders props of shaped object with empty data", async () => {
      const userData: $Shape<User> = {
        unread_notifications: 0,
      };
      const { getByTestId } = renderNotifications({ user: userData });
      const alertsElem = await waitForElement(() => getByTestId("alerts"));
      const messagesElem = await waitForElement(() => getByTestId("messages"));

      expect(NotificationService.getNotifications).toBeCalledTimes(0);
      expect(spyOnNormaliseUserNotifications).toHaveBeenCalledTimes(0);
      expect(alertsElem.firstChild).toMatchInlineSnapshot("[]");
      expect(messagesElem.firstChild).toMatchInlineSnapshot("[]");
    });
  });

  describe("reactive service", () => {
    it("injects a service with reactive effects", () => {
      let reactiveService;
      const userData: $Shape<User> = {
        unread_notifications: 10,
        username: "johndoe",
      };

      render(
        <Notifications user={userData}>
          {({ service }) => {
            reactiveService = service;

            return null;
          }}
        </Notifications>
      );

      // $FlowFixMe
      expect(reactiveService.getNotifications).toEqual(expect.any(Function));
      // $FlowFixMe
      expect(reactiveService.markAllAsRead).toEqual(expect.any(Function));
      // $FlowFixMe
      expect(reactiveService.markAsRead).toEqual(expect.any(Function));
    });

    it("updates Notifications state after markAllAsRead", async () => {
      let reactiveService;
      const userData: $Shape<User> = {
        unread_notifications: 1,
        username: "johndoe",
      };

      const { getByTestId } = render(
        <Notifications user={userData}>
          {({ alerts, messages, service }) => {
            reactiveService = service;

            return (
              <div data-testid="data">
                <div data-testid="alerts">{JSON.stringify(alerts)}</div>
                <div data-testid="messages">{JSON.stringify(messages)}</div>
              </div>
            );
          }}
        </Notifications>
      );

      NotificationService.getNotifications = jest
        .fn()
        // $FlowFixMe
        .mockResolvedValueOnce([{ read: true }]);
      // $FlowFixMe
      await reactiveService.markAllAsRead();
      const alertsElem = await waitForElement(() => getByTestId("alerts"));
      const messagesElem = await waitForElement(() => getByTestId("messages"));

      expect(alertsElem.firstChild).toMatchInlineSnapshot("[]");
      expect(messagesElem.firstChild).toMatchInlineSnapshot("[]");
    });
  });
});
