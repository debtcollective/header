import discourseService from "../common/DiscourseService";

export class SessionService {
  static getUser() {
    return discourseService
      .get("session/current.json")
      .then(res => (res.ok && res.json()) || {})
      .then(json => json.current_user || null)
      .catch(e => console.error(e) && null);
  }

  static login() {
    return discourseService.goTo("login");
  }

  static signup() {
    return discourseService.goTo("signup");
  }
}
