// @flow

import DiscourseService from "../common/DiscourseService";
import get from "lodash/get";

export default class SessionService {
  static async getUser() {
    try {
      const response = await DiscourseService.get("session/current.json");

      return get(response, "current_user", null);
    } catch (e) {
      console.error(e);

      return null;
    }
  }

  static login() {
    DiscourseService.goTo("login");
  }

  static signup() {
    DiscourseService.goTo("signup");
  }
}
