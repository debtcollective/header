// @flow

import discourseService from "../common/DiscourseService";
import get from "lodash/get";

export class SessionService {
  static getUser() {
    return discourseService
      .get("session/current.json")
      .then((json: ?APISessionCurrent) => get(json, "current_user", null))
      .catch(e => console.error(e) && null);
  }

  static login() {
    discourseService.goTo("login");
  }

  static signup() {
    discourseService.goTo("signup");
  }
}
