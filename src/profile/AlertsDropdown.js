// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import styled from "styled-components";
import { Link, Menu, MenuItem as MUMenuItem } from "@material-ui/core";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/alerts/dropdown";

/*
  @TODO: <MenuItem /> on Material UI v3.9.2 doesn't have props to handle links in a better way.
  remove added styles once there are something again to handle link children
*/
const MenuItem = styled(MUMenuItem)`
  && {
    padding: 0;
    position: relative;
    height: 2.4rem;
    width: 140px;
  }

  > a {
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
`;

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

export const AlertsDropdown = (
  { alerts }: { alerts: Array<Alert> } = { alerts: [] }
) => {
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
      <Dropdown
        aria-label="AlertsDropdown"
        anchorEl={anchorEl}
        handleClose={handleClose}
        alerts={alerts}
      />
    </React.Fragment>
  );
};
