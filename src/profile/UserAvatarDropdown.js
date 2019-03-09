// @flow

import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import discourseService from "../common/DiscourseService";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { translate } from "../locales";
import { withStyles } from "@material-ui/core/styles";

const getSrcPath = (src, size) => {
  const path = src.replace("{size}", size);
  return `${discourseService.baseUrl}/${path}`;
};

const AvatarStyled = withStyles({
  smallAvatar: {
    height: 32,
    width: 32,
  },
})(({ src, classes }) => (
  <Avatar src={getSrcPath(src, 65)} className={classes.smallAvatar} />
));

const Dropdown = ({ anchorEl, handleClose }) => (
  <Menu
    id='simple-menu'
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>
      {translate("profile.actions.profile")}
    </MenuItem>
    <MenuItem onClick={handleClose}>
      {translate("profile.actions.account")}
    </MenuItem>
    <MenuItem onClick={handleClose}>
      {translate("profile.actions.logout")}
    </MenuItem>
  </Menu>
);

type Props = {
  user: User,
};

type State = {
  anchorEl: ?EventTarget,
};
export class UserAvatarDropdown extends React.Component<Props, State> {
  static defaultProps = {
    user: {},
  };

  state = {
    anchorEl: null,
  };

  render() {
    const { user } = this.props;
    const { anchorEl } = this.state;

    return (
      <IconButton color='inherit' onClick={this.handleClick}>
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
