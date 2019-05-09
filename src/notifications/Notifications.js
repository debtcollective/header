// @flow

import * as React from "react";
import { normaliseUserNotifications } from "./normaliser";
import NotificationService from "./NotificationService";

type Props = {
  service: NotificationsHandler,
  user: User,
  children: ({
    service: NotificationReactiveService,
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
    const service = this.getReactiveService();

    return {
      alerts,
      messages,
      service,
    };
  }

  getReactiveService = (): NotificationReactiveService => {
    const { service } = this.props;
    const updateUserNotifications = this.updateUserNotifications.bind(this);

    return {
      getNotifications: async () => {
        await updateUserNotifications({ force: true });
      },
      markAllAsRead: async () => {
        await service.markAllAsRead();
        updateUserNotifications({ force: true });
      },
      markAsRead: async (notificationId: number) => {
        await service.markAsRead(notificationId);
        updateUserNotifications({ force: true });
      },
    };
  };

  async updateUserNotifications(
    { force }: { force: boolean } = { force: false }
  ) {
    const {
      unread_notifications: unreadNotifications,
      unread_private_messages: unreadPrivateMessages,
    } = this.props.user;

    if (unreadNotifications > 0 || unreadPrivateMessages > 0 || force) {
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
