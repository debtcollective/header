// @flow

import * as React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

import { DrawerNavigation } from "./DrawerNavigation";

import type Link from "./types";

export class Menu extends React.Component<
  { links: Array<Link> },
  { open: boolean }
> {
  state = {
    open: false
  };

  render() {
    const { links } = this.props;
    const { open } = this.state;

    return (
      <div>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon open={open} onClick={this.toggleMenu} />
        </IconButton>
        <Drawer open={open} onClose={this.toggleMenu}>
          <DrawerNavigation links={links} />
        </Drawer>
      </div>
    );
  }

  toggleMenu = () => {
    this.setState(({ open }) => ({ open: !open }));
  };
}
