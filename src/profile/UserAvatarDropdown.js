// @flow

import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar as MUAvatar } from "@material-ui/core";
import styled from "styled-components";
import { translate } from "../locales";
import { interpolateAvatarUrl, prependDiscourseUrl } from "../common/helpers";

const DROPDOWN_NAME = "@@profile/avatar/dropdown";

const Avatar = styled(MUAvatar)`
  && {
    width: 2rem;
    height: 2rem;
  }
`;

const Dropdown = ({ anchorEl, handleClose }) => (
  <Menu
    id={DROPDOWN_NAME}
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
    const avatarSrc = user.avatar_template;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          aria-owns={anchorEl ? DROPDOWN_NAME : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {avatarSrc ? (
            <Avatar
              src={prependDiscourseUrl(
                interpolateAvatarUrl(user.avatar_template, 65)
              )}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <Dropdown anchorEl={anchorEl} handleClose={this.handleClose} />
      </React.Fragment>
    );
  }

  handleClick = (e: Event) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}