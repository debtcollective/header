// @flow

import filter from "lodash/filter";
import includes from "lodash/includes";
import { notificationTypes } from "./helpers";

const getMessages = notifications => {
  const messagesTypes = [notificationTypes[5], notificationTypes[6]];

  return filter(
    notifications,
    (n: Notification) =>
      messagesTypes.indexOf(notificationTypes[n.notification_type]) > -1
  );
};

export const normaliseUserNotifications = (
  notifications: Array<Notification>
): { alerts: Array<Alert>, messages: Array<Message> } => {
  const messages = getMessages(notifications);
  const alerts = notifications.filter(n => !includes(messages, n));

  return {
    alerts: filter(alerts, { read: false }),
    messages: filter(messages, { read: false }),
  };
};
