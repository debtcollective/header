// @flow

import DiscourseService from "../common/DiscourseService";
import get from "lodash/get";

const login = () => {
  DiscourseService.goTo("login");
};

const signup = () => {
  DiscourseService.goTo("signup");
};

const getUser = async (): Promise<User | null> => {
  try {
    const response = await DiscourseService.get("session/current.json");

    return get(response, "current_user", null);
  } catch (e) {
    return null;
  }
};

const logout = async (username: string): Promise<boolean> => {
  try {
    await DiscourseService.reqDelete(`session/${username}`, {
      // avoid fall error when trying to fetch redirected route after logout
      redirect: "manual",
    });
    window.location.reload();

    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getUser,
  login,
  logout,
  signup,
};
