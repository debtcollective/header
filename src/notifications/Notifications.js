// @flow

import * as React from "react";
import NotificationService from "./NotificationService";

type Props = {
  user: User,
  children: ({
    alerts: Array<Alert>,
    messages: Array<Message>,
  }) => React.Node,
};

type State = {
  alerts: Array<Alert>,
  messages: Array<Message>,
};

export class Notifications extends React.Component<Props, State> {
  state = {
    alerts: [],
    messages: [],
  };

  componentDidMount() {
    this.updateUserNotifications();
  }

  getChildrenProps() {
    const { alerts, messages } = this.state;

    return {
      alerts,
      messages,
    };
  }

  async updateUserNotifications() {
    const { unread_notifications: unreadNotifications } = this.props.user;

    if (unreadNotifications > 0) {
      const { notifications } = await NotificationService.getNotifications();

      this.setState({
        alerts: [notifications[0]],
        messages: [notifications[1]],
      });

      return true;
    }

    return false;
  }

  render() {
    return this.props.children(this.getChildrenProps());
  }
}
