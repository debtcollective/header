// @flow

import * as React from "react";
import { SessionActions } from "./SessionActions";
import SessionService from "./SessionService";

type Props = {
  children: ({ user: User }) => React.Node,
  service: SessionHandler,
};

type State = {
  user: ?User,
};
export class Session extends React.Component<Props, State> {
  static defaultProps = {
    children: () => null,
    service: SessionService,
  };

  state = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user } = this.state;
    const { children, service } = this.props;

    return user ? (
      children({ user })
    ) : (
      <SessionActions onLogin={service.login} onSignup={service.signup} />
    );
  }

  updateUser(user: ?User) {
    this.setState({ user });
  }

  getUser = async () => {
    // If the user is already logged into the community
    await this.props.service
      .getUser()
      .then(user => this.updateUser(user))
      .catch(() => this.updateUser(null));
  };
}
