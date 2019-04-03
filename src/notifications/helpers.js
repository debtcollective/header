// @flow

import AddComment from "@material-ui/icons/AddComment";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import Announcement from "@material-ui/icons/Announcement";
import CenterFocusStrong from "@material-ui/icons/CenterFocusStrong";
import Edit from "@material-ui/icons/Edit";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Favorite from "@material-ui/icons/Favorite";
import FormatQuote from "@material-ui/icons/FormatQuote";
import Group from "@material-ui/icons/Group";
import Link from "@material-ui/icons/Link";
import Loyalty from "@material-ui/icons/Loyalty";
import Mail from "@material-ui/icons/Mail";
import Person from "@material-ui/icons/Person";
import { prependDiscourseUrl } from "../common/helpers";
import React from "react";
import Reply from "@material-ui/icons/Reply";

/**
 * check discourse notification types at: https://goo.gl/Lcyhp3
 * besides, keep into account that Discourse return `notification_type`
 * as a number which map to the below indexes
 */
export const notificationTypes = [
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

const iconsMapping = {
  [notificationTypes[0]]: AlternateEmail,
  [notificationTypes[1]]: Reply,
  [notificationTypes[2]]: FormatQuote,
  [notificationTypes[3]]: Edit,
  [notificationTypes[4]]: Favorite,
  [notificationTypes[5]]: Mail,
  [notificationTypes[6]]: Person,
  [notificationTypes[7]]: Reply,
  [notificationTypes[8]]: ExitToApp,
  [notificationTypes[9]]: Link,
  [notificationTypes[10]]: Loyalty,
  [notificationTypes[11]]: AddComment,
  [notificationTypes[12]]: Announcement,
  [notificationTypes[13]]: Group,
  [notificationTypes[14]]: Group,
  [notificationTypes[15]]: CenterFocusStrong,
  [notificationTypes[16]]: AddComment,
};

export const getNotificationLink = (notification: Notification) => {
  if (!notification.topic_id || !notification.post_number) {
    return "#";
  }

  return prependDiscourseUrl(
    `/t/${notification.topic_id}/${notification.post_number}`
  );
};

export const getNotificationTypeName = (
  notificationType: string | number
): string => {
  return typeof notificationType === "number"
    ? notificationTypes[notificationType]
    : notificationType;
};

export const getNotificationIcon = (
  notificationType: string | number,
  color: string = "disabled"
) => {
  const Icon = iconsMapping[getNotificationTypeName(notificationType)];

  return Icon ? <Icon color={color} /> : <Announcement color={color} />;
};
