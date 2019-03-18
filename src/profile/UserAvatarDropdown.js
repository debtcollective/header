// @flow

import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import styled from "styled-components";
import { translate } from "../locales";
import { interpolateAvatarUrl, prependDiscourseUrl } from "../common/helpers";
import {
  Link,
  Avatar as MUAvatar,
  MenuItem as MUMenuItem,
} from "@material-ui/core";

const DROPDOWN_NAME = "@@profile/avatar/dropdown";

const Avatar = styled(MUAvatar)`
  && {
    width: 2rem;
    height: 2rem;
  }
`;

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

const Dropdown = ({ anchorEl, handleClose, user }) => (
  <Menu
    id={DROPDOWN_NAME}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>
      <Link
        target="_blank"
        underline="none"
        href={prependDiscourseUrl(`u/${user.username}`)}
      >
        {translate("profile.actions.profile")}
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Link
        target="_blank"
        underline="none"
        href={prependDiscourseUrl(`u/${user.username}/preferences/account`)}
      >
        {translate("profile.actions.account")}
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Link
        target="_blank"
        underline="none"
        href={prependDiscourseUrl("logout")}
      >
        {translate("profile.actions.logout")}
      </Link>
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
              alt={user.username}
              aria-label={user.username}
              src={prependDiscourseUrl(
                interpolateAvatarUrl(user.avatar_template, 65)
              )}
            />
          ) : (
            <AccountCircle aria-label={user.username} />
          )}
        </IconButton>
        <Dropdown
          anchorEl={anchorEl}
          handleClose={this.handleClose}
          user={user}
        />
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
