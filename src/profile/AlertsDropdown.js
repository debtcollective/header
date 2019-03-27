// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { MenuItem } from "./styled";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link, Menu } from "@material-ui/core";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/alerts/dropdown";

const Dropdown = ({ anchorEl, handleClose, alerts }) => (
  <Menu
    id={DROPDOWN_NAME}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    {alerts.map(alert => (
      <MenuItem key={alert.created_at} onClick={handleClose}>
        <Link href={alert.data.original_post_id}>{alert.data.topic_title}</Link>
      </MenuItem>
    ))}
  </Menu>
);

export const AlertsDropdown = ({ alerts }: { alerts: Array<Alert> }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const toggle = e => setAnchorEl(e.currentTarget);

  return (
    <React.Fragment>
      <IconButton
        aria-label="AlertsToggler"
        color="inherit"
        aria-owns={anchorEl ? DROPDOWN_NAME : undefined}
        aria-haspopup="true"
        onClick={toggle}
      >
        <Badge badgeContent={alerts.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Dropdown anchorEl={anchorEl} handleClose={handleClose} alerts={alerts} />
    </React.Fragment>
  );
};

AlertsDropdown.defaultProps = {
  alerts: [],
};
