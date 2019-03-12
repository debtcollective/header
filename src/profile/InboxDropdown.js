// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";

export const InboxDropdown = ({ messages }: { messages: Array<Message> }) => (
  <IconButton color="inherit">
    <Badge badgeContent={messages.length} color="secondary">
      <MailIcon />
    </Badge>
  </IconButton>
);

InboxDropdown.defaultProps = {
  messages: [],
};
