// @flow

import * as React from "react";
import Button from "@material-ui/core/Button";
import { translate } from "../locales";

type Props = {
  onLogin: Function,
  onSignup: Function,
};

export const SessionActions = ({ onLogin, onSignup }: Props) => {
  return (
    <div>
      <Button color="inherit" onClick={onLogin}>
        {translate("session.actions.login")}
      </Button>
      <Button color="inherit" onClick={onSignup}>
        {translate("session.actions.signup")}
      </Button>
    </div>
  );
};
