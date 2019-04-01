// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import { NotificationsPanel } from "../notifications";
import { Manager, Popper, Reference } from "react-popper";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/inbox/dropdown";

export const InboxDropdown = (
  { messages }: { messages: Array<Message> } = { messages: [] }
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const toggle = e => (anchorEl ? handleClose() : setAnchorEl(e.currentTarget));

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span ref={ref}>
            <IconButton
              aria-label="InboxToggler"
              color="inherit"
              aria-owns={anchorEl ? DROPDOWN_NAME : undefined}
              aria-haspopup="true"
              onClick={toggle}
            >
              <Badge badgeContent={messages.length} color="secondary">
                <MailIcon />
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
            <NotificationsPanel
              notifications={messages}
              handleClose={handleClose}
            />
          </div>
        )}
      </Popper>
    </Manager>
  );
};

InboxDropdown.defaultProps = {
  messages: [],
};
