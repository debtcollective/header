// @flow

import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Avatar } from "./styled";
import IconButton from "@material-ui/core/IconButton";
import SessionService from "../session/SessionService";
import { translate } from "../locales";
import { interpolateAvatarUrl, prependDiscourseUrl } from "../common/helpers";
import { Menu, MenuItem, Typography } from "@material-ui/core";

const DROPDOWN_NAME = "@@profile/avatar/dropdown";

const Dropdown = ({ anchorEl, handleClose, onClickLogout, user }) => (
  <Menu
    id={DROPDOWN_NAME}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem
      component="a"
      target="_blank"
      underline="none"
      href={prependDiscourseUrl(`u/${user.username}`)}
      onClick={handleClose}
    >
      <Typography color="primary" variant="subtitle1">
        {translate("profile.actions.profile")}
      </Typography>
    </MenuItem>
    <MenuItem
      component="a"
      target="_blank"
      underline="none"
      href={prependDiscourseUrl(`u/${user.username}/preferences/account`)}
      onClick={handleClose}
    >
      <Typography color="primary" variant="subtitle1">
        {translate("profile.actions.account")}
      </Typography>
    </MenuItem>
    <MenuItem
      component="a"
      underline="none"
      aria-labelledby="btn-logout"
      onClick={onClickLogout}
    >
      <Typography color="primary" variant="subtitle1">
        {translate("profile.actions.logout")}
      </Typography>
    </MenuItem>
  </Menu>
);

type Props = {
  user: User,
  service: SessionHandler,
};

export const UserAvatarDropdown = ({ user, service }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => setAnchorEl(null);
  const toggle = (e: Event) => setAnchorEl(e.currentTarget);
  const avatarSrc = user.avatar_template;

  const onClickLogout = () => {
    service.logout(user.username);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-owns={anchorEl ? DROPDOWN_NAME : undefined}
        aria-haspopup="true"
        onClick={toggle}
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
        handleClose={handleClose}
        onClickLogout={onClickLogout}
        user={user}
      />
    </React.Fragment>
  );
};

UserAvatarDropdown.defaultProps = {
  service: SessionService,
  user: {},
};
