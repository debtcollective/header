// @flow

import DiscourseService from "../common/DiscourseService";
import get from "lodash/get";

const login = () => {
  DiscourseService.goTo("login");
};

const signup = () => {
  DiscourseService.goTo("signup");
};

const getUser = async (): Promise<?User> => {
  try {
    const response = await DiscourseService.get("session/current.json");

    return get(response, "current_user", null);
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default {
  getUser,
  login,
  signup,
};
