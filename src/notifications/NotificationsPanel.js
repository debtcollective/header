// @flow

import moment from "moment";
import NotificationService from "./NotificationService";
import { NotificationsPanelComponents as NPC } from "./styled";
import React from "react";
import { translate } from "../locales";
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import { getNotificationIcon, getNotificationLink } from "./helpers";

type Props = {
  handleClose: Function,
  service: NotificationsHandler,
  notifications: Array<Notification>,
};

export const NotificationsPanel = ({
  handleClose,
  service,
  notifications,
}: Props) => {
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <NPC.Container>
        <NPC.Header>
          <Typography variant="caption">
            {translate("notifications.panel.title")}
          </Typography>
          <Button
            aria-label="mark-all-read"
            variant="caption"
            onClick={service.markAllAsRead}
          >
            {translate("notifications.panel.action.readAll")}
          </Button>
        </NPC.Header>
        <NPC.Body>
          {notifications.map(n => (
            <NPC.Item
              target="_blank"
              href={getNotificationLink(n)}
              key={n.created_at}
              onClick={handleClose}
            >
              {getNotificationIcon(n.notification_type)}
              <div aria-label="NotificationItem">
                <Typography variant="body2">{n.data.topic_title}</Typography>
                <Typography variant="caption">
                  {moment(n.created_at).fromNow()}
                </Typography>
              </div>
            </NPC.Item>
          ))}
          {notifications.length === 0 && (
            <NPC.Item>
              {getNotificationIcon("announcement")}
              <div aria-label="EmptyFeedback">
                <Typography variant="body2">
                  <i>{translate("notifications.panel.empty")}</i>
                </Typography>
              </div>
            </NPC.Item>
          )}
        </NPC.Body>
        <NPC.Footer />
      </NPC.Container>
    </ClickAwayListener>
  );
};

NotificationsPanel.Caret = NPC.Caret;

NotificationsPanel.defaultProps = {
  service: NotificationService,
};
