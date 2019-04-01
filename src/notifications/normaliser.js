// @flow

import includes from "lodash/includes";
import { notificationTypes } from "./helpers";

const getMessages = notifications => {
  const messagesTypes = [notificationTypes[5], notificationTypes[6]];

  return notifications.filter(
    n => messagesTypes.indexOf(notificationTypes[n.notification_type]) > -1
  );
};

export const normaliseUserNotifications = (
  notifications: Array<Notification>
): { alerts: Array<Alert>, messages: Array<Message> } => {
  const messages = getMessages(notifications);
  const alerts = notifications.filter(n => !includes(messages, n));

  return {
    alerts,
    messages,
  };
};
