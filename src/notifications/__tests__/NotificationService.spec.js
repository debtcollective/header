// @flow

import DiscourseService from "../../common/DiscourseService";
import faker from "faker";
import { notifications } from "../../__fixtures__/notifications";
import NotificationService from "../NotificationService";

describe("NotificationService", () => {
  describe("getNotifications", () => {
    it("allows to send a request to get user recent notifications", () => {
      DiscourseService.get = jest.fn().mockResolvedValueOnce(null);
      NotificationService.getNotifications();

      expect(DiscourseService.get).toHaveBeenNthCalledWith(
        1,
        "notifications.json?recent=true&limit=20"
      );
    });

    it("returns the notifications when request is successful", done => {
      const response = { notifications };

      DiscourseService.get = jest.fn().mockResolvedValueOnce(response);
      NotificationService.getNotifications().then(result => {
        expect(result).toEqual(notifications);
        done();
      });
    });

    it("returns null when request is unsuccessful", done => {
      DiscourseService.get = jest.fn().mockRejectedValueOnce("Network Error");

      NotificationService.getNotifications().then(result => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe("markAsRead", () => {
    it("sends a request to the mark notifications as read", () => {
      const notifificationId = faker.random.number();
      DiscourseService.put = jest.fn().mockResolvedValueOnce(null);

      NotificationService.markAsRead(notifificationId);

      expect(DiscourseService.put).toHaveBeenCalledTimes(1);
      expect(DiscourseService.put).toHaveBeenCalledWith(
        "notifications/mark-read",
        { body: JSON.stringify({ id: notifificationId }) }
      );
    });
  });
});
