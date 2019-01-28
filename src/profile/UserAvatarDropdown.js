// @flow

import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

import type { User } from "../common/types";

export const UserAvatarDropdown = ({ user }: { user: User }) => (
  <IconButton color="inherit">
    <AccountCircle />
  </IconButton>
);
