// https://stackoverflow.com/a/33829607/1422380
const getCSRFToken = async (discourseEndpoint) => {
  const url = `${discourseEndpoint}/session/csrf.json`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await response.json();

  return json;
};

const getCurrentUser = async (discourseEndpoint, { csrfToken }) => {
  const url = `${discourseEndpoint}/session/current.json`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });

  const json = await response.json();
  const { current_user: currentUser } = json;

  return currentUser;
};

export const syncCurrentUser = async (discourseEndpoint) => {
  const csrfToken = await getCSRFToken(discourseEndpoint);
  const currentUser = await getCurrentUser(discourseEndpoint, { csrfToken });

  return currentUser;
};
