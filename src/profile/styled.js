import styled from "styled-components";
import { Avatar as MUAvatar, MenuItem as MUMenuItem } from "@material-ui/core";

/*
  @TODO: <MenuItem /> on Material UI v3.9.2 doesn't have props to handle links in a better way.
  remove added styles once there are something again to handle link children
*/
export const MenuItem = styled(MUMenuItem)`
  && {
    padding: 0;
    position: relative;
    height: 2.4rem;
    width: 140px;
  }

  > a {
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
`;

export const Avatar = styled(MUAvatar)`
  && {
    width: 2rem;
    height: 2rem;
  }
`;
