// @flow
import * as React from "react";
import styled from "styled-components";
import { AppBar as MUAppBar, Toolbar as MUToolbar } from "@material-ui/core/";

const Toolbar = styled(MUToolbar)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const AppBar = ({ children }: { children: React.Node }) => (
  /* styles to render items as expected */
  <MUAppBar position="static">
    <Toolbar>{children}</Toolbar>
  </MUAppBar>
);
