// @flow

import Group from "@material-ui/icons/Group";
import React from "react";

export const getNotificationIcon = (notificationType: string) => {
  return notificationType && <Group />;
};
