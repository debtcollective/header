// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { NotificationsPanel } from "../notifications";
import { Manager, Popper, Reference } from "react-popper";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/alerts/dropdown";

export const AlertsDropdown = ({ alerts }: { alerts: Array<Alert> }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const toggle = e => (anchorEl ? handleClose() : setAnchorEl(e.currentTarget));

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span ref={ref}>
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
          </span>
        )}
      </Reference>
      <Popper placement="bottom-end">
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref}
            style={{
              ...style,
              margin: 2,
              visibility: anchorEl ? "visible" : "hidden",
            }}
            data-placement={placement}
          >
            <NotificationsPanel.Caret
              ref={arrowProps.ref}
              style={arrowProps.style}
            />
            <NotificationsPanel notifications={alerts} />
          </div>
        )}
      </Popper>
    </Manager>
  );
};

AlertsDropdown.defaultProps = {
  alerts: [],
};
