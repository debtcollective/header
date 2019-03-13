// @flow

const getDiscourseEndpoint = () => {
  const discourseEndpoint = process.env.REACT_APP_DISCOURSE_ENDPOINT;

  if (!discourseEndpoint) {
    throw new Error("You must provide a valid Discourse enpoint");
  }

  return discourseEndpoint;
};

const buildOptions = (token, extendWith) => {
  return {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(token ? { "X-CSRF-Token": token } : {}),
    },
    ...extendWith,
  };
};

export default class DiscourseService {
  static BASE_URL = getDiscourseEndpoint();

  static REQUEST_TOKEN = null;

  static requestBaseOptions = (extendWith: ?Object = {}): Object =>
    buildOptions(DiscourseService.getToken(), extendWith);

  static getToken = () => DiscourseService.REQUEST_TOKEN;

  static setToken = (token: ?string) =>
    (DiscourseService.REQUEST_TOKEN = token);

  static resetToken = () => DiscourseService.setToken(null);

  static goTo(path: string): void {
    window.open(`${DiscourseService.BASE_URL}/${path}`, "_blank");
  }

  static refreshToken = async () => {
    const url = `${DiscourseService.BASE_URL}/session/csrf.json`;

    if (DiscourseService.getToken()) {
      return Promise.resolve(DiscourseService.getToken());
    }

    const response = await fetch(url);
    const {
      csrf: token,
    } = await DiscourseService.prototype.parseResponseToJSON(response);

    DiscourseService.setToken(token);

    return token;
  };

  static get = async (url: string, options: Object = {}) => {
    await DiscourseService.refreshToken();
    const response = await fetch(`${DiscourseService.BASE_URL}/${url}`, {
      ...DiscourseService.requestBaseOptions(),
      ...options,
    });
    const result = await DiscourseService.prototype.parseResponseToJSON(
      response
    );

    return result;
  };

  parseResponseToJSON(response: Response): Promise<Object> {
    if (response.ok) {
      return response.json();
    }

    return Promise.resolve({});
  }
}
