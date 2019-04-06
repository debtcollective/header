// @flow

import moment from "moment";
import NotificationService from "./NotificationService";
import { NotificationsPanelComponents as NPC } from "./styled";
import React from "react";
import { translate } from "../locales";
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import {
  getNotificationIcon,
  getNotificationLink,
  getNotificationPresentationalData,
} from "./helpers";

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
  const markAllRead = () => {
    service.markAllAsRead(notifications);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <NPC.Container>
        <NPC.Header>
          <Typography variant="caption">
            {translate("notifications.panel.title")}
          </Typography>
          <div className="npc-actions">
            <Button
              color="primary"
              aria-label="mark-all-read"
              onClick={markAllRead}
            >
              {translate("notifications.panel.action.readAll")}
            </Button>
          </div>
        </NPC.Header>
        <NPC.Body>
          {notifications.map(n => {
            const { title, date } = getNotificationPresentationalData(n);

            return (
              <NPC.Item
                target="_blank"
                href={getNotificationLink(n)}
                key={n.created_at}
                onClick={handleClose}
              >
                {getNotificationIcon(n.notification_type)}
                <div aria-label="NotificationItem">
                  <Typography variant="body2">{title}</Typography>
                  <Typography variant="caption">
                    {moment(date).fromNow()}
                  </Typography>
                </div>
              </NPC.Item>
            );
          })}
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
