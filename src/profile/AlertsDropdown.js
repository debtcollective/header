// @flow

import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import type { Alert } from "./types";

export const AlertsDropdown = ({ alerts }: { alerts: Array<Alert> }) => (
  <IconButton color='inherit'>
    <Badge badgeContent={alerts.length} color='secondary'>
      <NotificationsIcon />
    </Badge>
  </IconButton>
);

AlertsDropdown.defaultProps = {
  alerts: [],
};
