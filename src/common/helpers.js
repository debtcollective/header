// @flow

import discourseService from "./DiscourseService";

export const interpolateAvatarUrl = (
  avatarTemplateUrl: string,
  size: number
): string => {
  return avatarTemplateUrl.replace("{size}", `${size}`);
};

export const prependDiscourseUrl = (path: string): string => {
  return `${discourseService.baseUrl}/${path}`;
};
