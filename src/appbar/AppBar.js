// @flow
import * as React from "react";
import { AppBar as MUAppBar, Toolbar } from "@material-ui/core/";

export const AppBar = ({ children }: { children: React.Node }) => (
  /* styles to render items as expected */
  <MUAppBar position='static'>
    <Toolbar>{children}</Toolbar>
  </MUAppBar>
);
