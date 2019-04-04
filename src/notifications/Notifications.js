// @flow

import * as React from "react";
import { normaliseUserNotifications } from "./normaliser";
import NotificationService from "./NotificationService";

type Props = {
  service: NotificationsHandler,
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
  static defaultProps = {
    service: NotificationService,
  };

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
    const {
      unread_notifications: unreadNotifications,
      unread_private_messages: unreadPrivateMessages,
    } = this.props.user;

    if (unreadNotifications > 0 || unreadPrivateMessages > 0) {
      const notifications = await this.props.service.getNotifications();
      const normalisedNotifications = normaliseUserNotifications(notifications);

      this.setState(normalisedNotifications);

      return true;
    }

    return false;
  }

  render() {
    return this.props.children(this.getChildrenProps());
  }
}
