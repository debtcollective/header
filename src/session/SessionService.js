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
    // prompt the action needed for the user to log into the app
    // (currently it's redirect to the community app with "login" action)
    // @NOTE: ideally this method should receive credentials to login and
    // after login on community the user should be redirected
    // back to our app and then execute a callback with new user data
  }

  static signup() {
    // prompt the action needed for the user to signup into the app
    // (currently it's redirect to the community app with SAME "login" action)
    // @TODO: Check if it is possible to open the signup modal with url params in community
    // @NOTE: ideally after signup the user should be redirected
    // back to our app and then execute a callback with new user data
  }
}
