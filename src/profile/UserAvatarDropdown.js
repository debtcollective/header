// @flow

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
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

export const UserAvatarDropdown = ({ user }: { user: User }) => (
  <IconButton color="inherit">
    {user.avatar_template ? (
      <AvatarStyled src={user.avatar_template} />
    ) : (
      <AccountCircle />
    )}
  </IconButton>
);

UserAvatarDropdown.defaultProps = {
  user: {}
};
