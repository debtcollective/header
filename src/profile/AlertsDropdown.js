// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";

export const AlertsDropdown = ({ alerts }: { alerts: Array<Alert> }) => (
  <IconButton color="inherit">
    <Badge badgeContent={alerts.length} color="secondary">
      <NotificationsIcon />
    </Badge>
  </IconButton>
);

AlertsDropdown.defaultProps = {
  alerts: [],
};
