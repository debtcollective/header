// @flow

import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import { DrawerNavigation } from "./DrawerNavigation";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  links: Array<Link>,
};

type State = {
  open: boolean,
};

export class Menu extends React.Component<Props, State> {
  state = {
    open: false,
  };

  render() {
    const { links } = this.props;
    const { open } = this.state;

    return (
      <div>
        <IconButton color="inherit" aria-label="Menu" onClick={this.toggleMenu}>
          <MenuIcon open={open} />
        </IconButton>
        <Drawer aria-label="Navigation" open={open} onClose={this.toggleMenu}>
          <DrawerNavigation links={links} />
        </Drawer>
      </div>
    );
  }

  toggleMenu = () => {
    this.setState(({ open }) => ({ open: !open }));
  };
}
