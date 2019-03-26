// @flow

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import styled from "styled-components";
import { Link, Menu, MenuItem as MUMenuItem } from "@material-ui/core";
import React, { useState } from "react";

const DROPDOWN_NAME = "@@profile/inbox/dropdown";

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

const Dropdown = ({ anchorEl, handleClose, messages }) => (
  <Menu
    id={DROPDOWN_NAME}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    {messages.map(message => (
      <MenuItem key={message.created_at} onClick={handleClose}>
        <Link href={message.data.original_post_id}>
          {message.data.topic_title}
        </Link>
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
        aria-label="InboxDropdown"
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
