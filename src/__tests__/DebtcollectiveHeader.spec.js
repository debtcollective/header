// @flow

jest.mock("../session/SessionService");

import DebtcollectiveHeader from "../";
import { notifications } from "../__fixtures__/notifications";
import NotificationService from "../notifications/NotificationService";
import React from "react";
import SessionService from "../session/SessionService";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from "react-testing-library";

describe("<DebtcollectiveHeader />", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const links = [
    { href: "/admin/disputes", text: "Admin" },
    { href: "/disputes/my", text: "My Disputes" },
    { href: "/", text: "Dispute Your Debt" },
    { href: "https://community.debtcollective.org", text: "Community" },
  ];

  it("renders", () => {
    const { container } = render(<DebtcollectiveHeader links={links} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("displays links after toggle menu", async () => {
    const { getByLabelText, getByText } = render(
      <DebtcollectiveHeader links={links} />
    );

    fireEvent.click(getByLabelText(/menu/i));

    const menuDrawer = await waitForElement(() => getByLabelText("Navigation"));

    expect(menuDrawer).toBeTruthy();
    expect(getByText(links[0].text)).toBeTruthy();
    expect(getByText(links[1].text)).toBeTruthy();
    expect(getByText(links[2].text)).toBeTruthy();
    expect(getByText(links[3].text)).toBeTruthy();
  });

  describe("when user is available", () => {
    const userData: $Shape<User> = {
      admin: false,
      avatar_template: "/user_avatar/localhost/johndoe/{size}/2_1.png",
      username: "johndoe",
    };
    SessionService.getUser = jest.fn().mockResolvedValue(userData);

    it("displays user avatar to toggle a dropdown with actions", async () => {
      const { getByText, getByAltText } = render(
        <DebtcollectiveHeader links={links} />
      );

      const userAvatar = await waitForElement(() =>
        getByAltText(userData.username)
      );

      fireEvent.click(userAvatar);

      expect(
        getByText(/profile/i).parentElement.getAttribute("href")
      ).toMatchInlineSnapshot("\"http://localhost:3000/u/johndoe\"");
      expect(
        getByText(/account/i).parentElement.getAttribute("href")
      ).toMatchInlineSnapshot(
        "\"http://localhost:3000/u/johndoe/preferences/account\""
      );
      expect(getByText(/logout/i)).toBeTruthy();
    });

    describe("when user has unread notifications", () => {
      SessionService.getUser = jest
        .fn()
        .mockResolvedValue({ ...userData, unread_notifications: 3 });
      NotificationService.getNotifications = jest
        .fn()
        .mockResolvedValue(notifications);

      it("displays a set of alerts", async () => {
        const { getByText, getByAltText, getByLabelText } = render(
          <DebtcollectiveHeader links={links} />
        );

        await waitForElement(() => getByAltText(userData.username));

        fireEvent.click(getByLabelText("AlertsToggler"));

        const AlertsDropdownItem = await waitForElement(() =>
          getByText(notifications[1].data.topic_title)
        );

        // fixture has an alert on index one
        expect(AlertsDropdownItem).toBeTruthy();
      });

      it("displays a set of messages", async () => {
        const { getByText, getByAltText, getByLabelText } = render(
          <DebtcollectiveHeader links={links} />
        );

        await waitForElement(() => getByAltText(userData.username));

        fireEvent.click(getByLabelText("InboxToggler"));

        const InboxDropdownItem = await waitForElement(() =>
          getByText(notifications[0].data.topic_title)
        );

        // fixture has a message on index zero
        expect(InboxDropdownItem).toBeTruthy();
      });

      describe("when user click mark all as read", () => {
        it("calls notifications service to mark as read and get new notifications", async () => {
          const { getByAltText, getByLabelText } = render(
            <DebtcollectiveHeader links={links} />
          );
          const spyOnMarkAllAsRead = jest.spyOn(
            NotificationService,
            "markAllAsRead"
          );
          const spyOnGetNotifications = jest.spyOn(
            NotificationService,
            "getNotifications"
          );

          await waitForElement(() => getByAltText(userData.username));

          fireEvent.click(getByLabelText("AlertsToggler"));
          fireEvent.click(getByLabelText("mark-all-read"));

          expect(spyOnMarkAllAsRead).toHaveBeenCalledTimes(1);
          expect(spyOnGetNotifications).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
