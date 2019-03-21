// @flow

const setDiscourseEndpoint = () => {
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

const parseResponseToJSON = (response: Response): Promise<Object> => {
  if (response.ok) {
    return response.json();
  }

  return Promise.resolve({});
};

const BASE_URL = setDiscourseEndpoint();

let REQUEST_TOKEN = "";

const getBaseUrl = (): string => BASE_URL;

const setToken = (token: string): string => (REQUEST_TOKEN = token);

const resetToken = (): string => setToken("");

const getToken = (): string => REQUEST_TOKEN;

const refreshToken = async () => {
  const url = `${getBaseUrl()}/session/csrf.json`;

  if (getToken()) {
    return Promise.resolve(getToken());
  }

  const response = await fetch(url);
  const { csrf: token } = await parseResponseToJSON(response);

  setToken(token);

  return token;
};

const requestBaseOptions = (extendWith: ?Object = {}): Object =>
  buildOptions(getToken(), extendWith);

const get = async (url: string, options: Object = {}) => {
  await refreshToken();
  const response = await fetch(`${getBaseUrl()}/${url}`, {
    ...requestBaseOptions(),
    ...options,
  });
  const result = await parseResponseToJSON(response);

  return result;
};

const reqDelete = async (url: string, options: Object = {}) => {
  await refreshToken();

  const response = await fetch(`${getBaseUrl()}/${url}`, {
    ...requestBaseOptions({ method: "delete" }),
    ...options,
  });
  const result = await parseResponseToJSON(response);

  return result;
};

const goTo = (path: string): void => {
  window.open(`${getBaseUrl()}/${path}`, "_blank");
};

export default {
  get,
  getBaseUrl,
  getToken,
  goTo,
  refreshToken,
  reqDelete,
  requestBaseOptions,
  resetToken,
  setToken,
};
