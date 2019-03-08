// @flow

import AppBar from "./appbar";
import Menu from "./menu";
import React from "react";
import Session from "./session";

const DebtcollectiveHeader = ({ links }: { links: Array<Link> }) => (
  <AppBar>
    <Menu links={links} />
    <Session>
      {({ user }) => JSON.stringify(user)
      /* <Notifications user={user}>
					{({ alerts, messages }) => (
						<ProfileItems>
							<UserAvatarDropdown user={user} />
							<AlertsDropdown alerts={alerts} />
							<InboxDropdown messages={messages} />
						</ProfileItems>
					)}
				</Notifications> */
      }
    </Session>
  </AppBar>
);

export default DebtcollectiveHeader;
