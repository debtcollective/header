export default (() => {
  const discourseEndpoint = "http://localhost:3000";

  const baseOptions = (token, extendWith) => {
    return {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { "X-CSRF-Token": token } : {})
      },
      ...extendWith
    };
  };

  const getOptions = token => baseOptions(token);
  const postOptions = token => baseOptions(token, { method: "post" });
  const putOptions = token => baseOptions(token, { method: "put" });
  const deleteOptions = token => baseOptions(token, { method: "delete" });

  class DiscourseService {
    constructor() {
      this.token = null;
    }

    refreshToken = () => {
      return Boolean(this.token)
        ? Promise.resolve(this.token)
        : fetch(`${discourseEndpoint}/session/csrf.json`)
            .then(res => res.json())
            .then(({ csrf }) => {
              this.token = csrf;
              return this.token;
            });
    };

    get = (url, options = {}) => {
      return this.refreshToken().then(token =>
        fetch(`${discourseEndpoint}/${url}`, {
          ...getOptions(token),
          ...options
        })
      );
    };

    post = (url, options = {}) => {
      return this.refreshToken().then(token =>
        fetch(`${discourseEndpoint}/${url}`, {
          ...postOptions(token),
          ...options
        })
      );
    };

    put = (url, options = {}) => {
      return this.refreshToken().then(token =>
        fetch(`${discourseEndpoint}/${url}`, {
          ...putOptions(token),
          ...options
        })
      );
    };

    delete = (url, options = {}) => {
      return this.refreshToken().then(token =>
        fetch(`${discourseEndpoint}/${url}`, {
          ...deleteOptions(token),
          ...options
        })
      );
    };
  }

  const discourseService = new DiscourseService();

  return discourseService;
})();
