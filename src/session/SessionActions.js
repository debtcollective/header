import * as React from "react";
import Button from "@material-ui/core/Button";

import { SessionService } from "./SessionService";

export class SessionActions extends React.Component {
  render() {
    return (
      <div>
        <Button color="inherit" onClick={this.createSession("login")}>
          Login
        </Button>
        <Button color="inherit" onClick={this.createSession("signup")}>
          Signup
        </Button>
      </div>
    );
  }

  createSession = action => () => {
    SessionService[action]();
  };
}
