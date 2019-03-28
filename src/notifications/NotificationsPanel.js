// @flow

import { getNotificationIcon } from "./helpers";
import { NotificationsPanelComponents as NPC } from "./styled";
import React from "react";
import { Typography } from "@material-ui/core";

export const NotificationsPanel = ({
  notifications,
}: {
  notifications: Array<Notification>,
}) => {
  return (
    <NPC.Container>
      <NPC.Header>
        <Typography variant="caption">Notifications</Typography>
      </NPC.Header>
      <NPC.Body>
        {notifications.map(n => (
          <NPC.Item key={n.id}>
            {getNotificationIcon("foo")}
            <div>
              <Typography variant="body2">
                Achievement completed! <strong>Know your stuff I</strong>
              </Typography>
              <Typography variant="caption">1 hour ago</Typography>
            </div>
          </NPC.Item>
        ))}
      </NPC.Body>
      <NPC.Footer />
    </NPC.Container>
  );
};
