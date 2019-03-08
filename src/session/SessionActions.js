// @flow

import * as React from "react";
import Button from "@material-ui/core/Button";
import { SessionService } from "./SessionService";

type Props = {
  service: SessionHandler,
};
export class SessionActions extends React.Component<Props> {
  static defaultProps = {
    service: SessionService,
  };

  render() {
    return (
      <div>
        <Button color='inherit' onClick={this.createSession("login")}>
          Login
        </Button>
        <Button color='inherit' onClick={this.createSession("signup")}>
          Signup
        </Button>
      </div>
    );
  }

  createSession = (action: "login" | "signup") => () => {
    this.props.service[action]();
  };
}
