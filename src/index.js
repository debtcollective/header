// @flow

import AppBar from "./appbar";
import Menu from "./menu";
import Notifications from "./notifications";
import React from "react";
import Session from "./session";
import {
  AlertsDropdown,
  InboxDropdown,
  ProfileItems,
  UserAvatarDropdown,
} from "./profile";

const DebtcollectiveHeader = ({ links }: { links: Array<Link> }) => (
  <AppBar>
    <Menu links={links} />
    <Session>
      {({ user }) => (
        <Notifications user={user}>
          {({ alerts, messages, service }) => (
            <ProfileItems>
              <AlertsDropdown service={service} alerts={alerts} />
              <InboxDropdown service={service} messages={messages} />
              <UserAvatarDropdown user={user} />
            </ProfileItems>
          )}
        </Notifications>
      )}
    </Session>
  </AppBar>
);

export default DebtcollectiveHeader;
