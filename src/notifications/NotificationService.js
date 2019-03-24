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

export default {
  getNotifications,
};
