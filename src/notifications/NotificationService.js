// @flow

import DiscourseService from "../common/DiscourseService";
import get from "lodash/get";

const getNotifications = async (
  { limit }: { limit: number } = { limit: 20 }
): Promise<Array<$NonMaybeType<Notification>>> => {
  try {
    const response = await DiscourseService.get(
      `notifications.json?recent=true&limit=${limit}`
    );

    return get(response, "notifications", []);
  } catch (e) {
    return [];
  }
};

const markAsRead = async (notificationId: number) => {
  const data = { id: notificationId };

  try {
    const response = await DiscourseService.put("notifications/mark-read", {
      body: JSON.stringify(data),
    });

    return response;
  } catch (e) {
    return null;
  }
};

const markAllAsRead = async () => {
  try {
    // When no param is passed to the endpoint it will mark all as read https://bit.ly/2UFzPTC
    const response = await DiscourseService.put("notifications/mark-read");

    return response;
  } catch (e) {
    return null;
  }
};

export default {
  getNotifications,
  markAllAsRead,
  markAsRead,
};
