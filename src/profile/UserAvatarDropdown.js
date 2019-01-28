// @flow

import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

import discourseService from "../common/DiscourseService";

import type { User } from "../common/types";

const getSrcPath = (src, size) => {
  const path = src.replace("{size}", size);
  return `${discourseService.baseUrl}/${path}`;
};

const AvatarStyled = withStyles({
  smallAvatar: {
    width: 32,
    height: 32
  }
})(({ src, classes }) => (
  <Avatar src={getSrcPath(src, 65)} className={classes.smallAvatar} />
));

const Dropdown = ({ anchorEl, handleClose }) => (
  <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>
);

export class UserAvatarDropdown extends React.Component<
  { user: User },
  { anchorEl: ?EventTarget }
> {
  static defaultProps = {
    user: {}
  };

  state = {
    anchorEl: null
  };

  render() {
    const { user } = this.props;
    const { anchorEl } = this.state;

    return (
      <IconButton color="inherit" onClick={this.handleClick}>
        {user.avatar_template ? (
          <AvatarStyled src={user.avatar_template} />
        ) : (
          <AccountCircle />
        )}
        <Dropdown anchorEl={anchorEl} handleClose={this.handleClose} />
      </IconButton>
    );
  }

  handleClick = (e: Event) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}
