// @flow

import { getNotificationIcon } from "./helpers";
import moment from "moment";
import { NotificationsPanelComponents as NPC } from "./styled";
import React from "react";
import { translate } from "../locales";
import { ClickAwayListener, Typography } from "@material-ui/core";

type Props = {
  handleClose: Function,
  notifications: Array<Notification>,
};

export const NotificationsPanel = ({ handleClose, notifications }: Props) => {
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <NPC.Container>
        <NPC.Header>
          <Typography variant="caption">
            {translate("notifications.panel.title")}
          </Typography>
        </NPC.Header>
        <NPC.Body>
          {notifications.map(n => (
            <NPC.Item key={n.created_at} onClick={handleClose}>
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
