// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import { Typography } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/inbox/dropdown";

const Dropdown = ({ anchorEl, handleClose, messages }) => (
  <Menu
    id={DROPDOWN_NAME}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    {messages.map(message => (
      <MenuItem
        component="a"
        href={message.data.original_post_id}
        key={message.created_at}
        onClick={handleClose}
      >
        <Typography color="primary" variant="subtitle1">
          {message.data.topic_title}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
);

export const InboxDropdown = (
  { messages }: { messages: Array<Message> } = { messages: [] }
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const toggle = e => setAnchorEl(e.currentTarget);

  return (
    <React.Fragment>
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
      <Dropdown
        anchorEl={anchorEl}
        handleClose={handleClose}
        messages={messages}
      />
    </React.Fragment>
  );
};

InboxDropdown.defaultProps = {
  messages: [],
};
