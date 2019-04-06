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
  try {
    const response = await DiscourseService.put("notifications/mark-read", {
      id: notificationId,
    });

    return response;
  } catch (e) {
    return null;
  }
};

const markAllAsRead = async (notifications: Array<$Shape<Notification>>) => {
  notifications.forEach(({ id }) => markAsRead(id));
};

export default {
  getNotifications,
  markAllAsRead,
  markAsRead,
};
