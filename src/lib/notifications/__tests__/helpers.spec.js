// @flow

import { notifications } from "../../__fixtures__/notifications";
import {
  getNotificationPresentationalData,
  getNotificationTypeName,
} from "../helpers";

describe("helpers", () => {
  describe("getNotificationTypeName", () => {
    it("returns mapped notification name after number", () => {
      expect(getNotificationTypeName(1)).toEqual("mentioned");
    });
  });

  describe("getNotificationPresentationalData", () => {
    it("returns a consistent object with title and date", () => {
      expect(getNotificationPresentationalData(notifications[0])).toEqual({
        date: notifications[0].created_at,
        title: notifications[0].data.topic_title,
      });
    });

    describe("when notification type is related to granted badge", () => {
      it("returns a consistent object with title and date", () => {
        expect(getNotificationPresentationalData(notifications[3])).toEqual({
          date: notifications[3].created_at,
          title: notifications[3].data.badge_name,
        });
      });
    });
  });
});
