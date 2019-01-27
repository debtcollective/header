// @flow

import React from "react";
import AppBar from "./appbar";
import Menu from "./menu";

import type { Link } from "./menu";

const DebtcollectiveHeader = ({ links }: { links: Array<Link> }) => (
  <AppBar>
    <Menu links={links} />
    {/* <Session>
			{({ user }) => (
				<Notifications user={user}>
					{({ alerts, messages }) => (
						<ProfileItems>
							<UserAvatarDropdown user={user} />
							<AlertsDropdown alerts={alerts} />
							<InboxDropdown messages={messages} />
						</ProfileItems>
					)}
				</Notifications>
			)}
		</Session> */}
  </AppBar>
);

export default DebtcollectiveHeader;
