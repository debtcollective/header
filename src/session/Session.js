// @flow

import * as React from "react";
import { SessionActions } from "./SessionActions";
import { SessionService } from "./SessionService";

import type { User } from "./types";
import typeof { SessionService as Service } from "./SessionService";

export class Session extends React.Component<
  { children?: React.Node, service: Service },
  { user: ?User }
> {
  static defaultProps = {
    service: SessionService
  };

  state = {
    user: null
  };

  componentDidMount() {
    window.addEventListener("focus", this.getUser);
    this.getUser();
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.getUser);
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return Boolean(user) ? (
      // $FlowFixMe
      children({ user })
    ) : (
      <SessionActions onUserLoggedIn={this.updateUser} />
    );
  }

  updateUser(user: User) {
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
