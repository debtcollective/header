// @flow

import * as React from "react";
import Button from "@material-ui/core/Button";
import { SessionService } from "./SessionService";
import { translate } from "../locales";

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
        <Button color="inherit" onClick={this.createSession("login")}>
          {translate("session.actions.login")}
        </Button>
        <Button color="inherit" onClick={this.createSession("signup")}>
          {translate("session.actions.signup")}
        </Button>
      </div>
    );
  }

  createSession = (action: "login" | "signup") => () => {
    this.props.service[action]();
  };
}
