// @flow

import includes from "lodash/includes";

/**
 * check discourse notification types at: https://goo.gl/Lcyhp3
 * besides, keep into account that Discourse return `notification_type`
 * as a number which map to the below indexes
 */
const notificationTypes = [
  "mentioned",
  "replied",
  "quoted",
  "edited",
  "liked",
  "privateMessage",
  "invitedToPrivateMessage",
  "inviteeAccepted",
  "posted",
  "movedPost",
  "linked",
  "grantedBadge",
  "invitedToTopic",
  "custom",
  "groupMentioned",
  "groupMessageSummary",
  "watchingFirstPost",
  "topicReminder",
];

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
