// @flow

import React from "react";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import type { Message } from "./types";

export const InboxDropdown = ({ messages }: { messages: Array<Message> }) => (
  <IconButton color="inherit">
    <Badge badgeContent={messages.length} color="secondary">
      <MailIcon />
    </Badge>
  </IconButton>
);

InboxDropdown.defaultProps = {
  messages: []
};
