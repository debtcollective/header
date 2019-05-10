// @flow

// TODO: We should find a better way to do this, ex: passing this value as a prop.
const setDiscourseEndpoint = () => {
  return process.env.DISCOURSE_ENDPOINT || "http://localhost:3000";
};

const parseResponseToJSON = (response: Response): Promise<Object> => {
  if (response.ok) {
    return response.json();
  }

  return Promise.resolve({});
};

const BASE_URL = setDiscourseEndpoint();
const getBaseUrl = (): string => BASE_URL;

let CSRF_TOKEN = "";
const setCSRFToken = (token: string): string => (CSRF_TOKEN = token);
const resetCSRFToken = (): string => setCSRFToken("");

const getCSRFToken = async () => {
  if (CSRF_TOKEN) {
    return Promise.resolve(CSRF_TOKEN);
  }

  const url = `${getBaseUrl()}/session/csrf.json`;
  const response = await fetch(url, { credentials: "include" });
  const { csrf: token } = await parseResponseToJSON(response);

  setCSRFToken(token);

  return token;
};

const requestOptions = (token: string = "", extendWith: Object = {}) => {
  return {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(token ? { "X-CSRF-Token": token } : {}),
    },
    ...extendWith,
  };
};

const get = async (url: string, options: Object = {}) => {
  const response = await fetch(`${getBaseUrl()}/${url}`, {
    ...requestOptions(),
    ...options,
  });
  const result = await parseResponseToJSON(response);

  return result;
};

const put = async (url: string, options: Object = {}) => {
  const token = await getCSRFToken();

  const response = await fetch(`${getBaseUrl()}/${url}`, {
    ...requestOptions(token, { method: "put" }),
    ...options,
  });
  const result = await parseResponseToJSON(response);

  return result;
};

const reqDelete = async (url: string, options: Object = {}) => {
  const token = await getCSRFToken();

  const response = await fetch(`${getBaseUrl()}/${url}`, {
    ...requestOptions(token, { method: "delete" }),
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
  getCSRFToken,
  goTo,
  put,
  reqDelete,
  requestOptions,
  resetCSRFToken,
  setCSRFToken,
};
