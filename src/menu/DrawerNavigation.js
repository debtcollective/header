// @flow

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

type Props = {
  links: Array<Link>,
};

export const DrawerNavigation = ({ links }: Props) => (
  <List>
    {links.map((link, index) => (
      <ListItem button component='a' key={index} href={link.href}>
        <ListItemText primary={link.text} />
      </ListItem>
    ))}
  </List>
);
