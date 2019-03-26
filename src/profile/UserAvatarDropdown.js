// @flow

import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import SessionService from "../session/SessionService";
import { translate } from "../locales";
import { Avatar, MenuItem } from "./styled";
import { interpolateAvatarUrl, prependDiscourseUrl } from "../common/helpers";

const DROPDOWN_NAME = "@@profile/avatar/dropdown";

const Dropdown = ({ anchorEl, handleClose, onClickLogout, user }) => (
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
    <MenuItem aria-labelledby="btn-logout" onClick={onClickLogout}>
      <Link underline="none">{translate("profile.actions.logout")}</Link>
    </MenuItem>
  </Menu>
);

type Props = {
  user: User,
  service: SessionHandler,
};

type State = {
  anchorEl: ?EventTarget,
};

export class UserAvatarDropdown extends React.Component<Props, State> {
  static defaultProps = {
    service: SessionService,
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
          onClick={this.toggle}
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
          onClickLogout={this.onClickLogout}
          user={user}
        />
      </React.Fragment>
    );
  }

  toggle = (e: Event) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onClickLogout = () => {
    const { user } = this.props;
    this.props.service.logout(user.username);
    this.handleClose();
  };
}
