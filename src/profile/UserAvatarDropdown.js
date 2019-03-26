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

export const UserAvatarDropdown = (
  { user, service }: Props = { service: SessionService, user: {} }
) => {
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
