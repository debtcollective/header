// @flow

import { getNotificationIcon } from "./helpers";
import moment from "moment";
import { NotificationsPanelComponents as NPC } from "./styled";
import React from "react";
import { Typography } from "@material-ui/core";

type Props = {
  handleClose: Function,
  notifications: Array<Notification>,
};

export const NotificationsPanel = ({ handleClose, notifications }: Props) => {
  return (
    <NPC.Container>
      <NPC.Header>
        <Typography variant="caption">Notifications</Typography>
      </NPC.Header>
      <NPC.Body>
        {notifications.map(n => (
          <NPC.Item key={n.created_at} onClick={handleClose}>
            {getNotificationIcon("foo")}
            <div>
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
            <div aria-label="empty-feedback">
              <Typography variant="body2">
                <i>There is not notifications yet</i>
              </Typography>
            </div>
          </NPC.Item>
        )}
      </NPC.Body>
      <NPC.Footer />
    </NPC.Container>
  );
};

NotificationsPanel.Caret = NPC.Caret;
