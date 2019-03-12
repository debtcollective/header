// @flow

import en from "./en";
import get from "lodash/get";

export const translate = (key: string): string => {
  const defaultValue = key;
  return get(en, key, defaultValue);
};
