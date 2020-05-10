import { Component, Prop, State, h, Watch, getAssetPath } from "@stencil/core";
import { syncCurrentUser } from "../../services/session";

type User = {
  id: number;
  admin: boolean;
  avatar_template: string;
  username: string;
};

const vars = {
  HOST_URL: "http://lvh.me:3333",
  COMMUNITY_URL: "http://lvh.me:3000",
};

const redirectParam = `return_url=${vars.HOST_URL}`;
const loginURL = `${vars.COMMUNITY_URL}/session/sso_cookies?${redirectParam}`;
const signupURL = `${vars.COMMUNITY_URL}/session/sso_cookies/signup?${redirectParam}`;

const preffixCommunityURL = (str) => `${vars.COMMUNITY_URL}/${str}`;

const getAvatarURL = ({ avatar_template }) => {
  return preffixCommunityURL(avatar_template.replace(`{size}`, 64));
};

@Component({
  assetsDirs: ["assets"],
  tag: "dc-header",
  styleUrl: "dc-header.css",
  shadow: true,
})
export class Header {
  /**
   * Logo image
   */
  @Prop() logo = "logo.png";

  /**
   * The links you need to display within the header
   */
  @Prop() links: string;

  /**
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @State() user?: User;

  /**
   * Hos the value of "links" parsed to an actual Array
   */
  private _links: Array<{ text: string; href: string }>;

  @Watch("links")
  linksDidChangeHandler(newValue) {
    this._links = JSON.parse(newValue);
  }

  async syncCurrentUser() {
    const user = await syncCurrentUser(vars.COMMUNITY_URL);
    this.user = user;
  }

  componentWillLoad() {
    this.linksDidChangeHandler(this.links);
    return this.syncCurrentUser();
  }

  render() {
    const user = this.user;

    return (
      <header class="header">
        <img
          class="logo"
          src={getAssetPath(`./assets/${this.logo}`)}
          alt="The Debtcollective"
        />
        <nav class="nav">
          {this._links.map(({ text, href }) => (
            <div class="nav-item">
              <a class="nav-link" href={href}>
                {text}
              </a>
            </div>
          ))}
          {user ? (
            <a
              id="current-user"
              href={preffixCommunityURL(user.username)}
              class="header-dropdown-toggle"
            >
              <img
                alt="Profile picture"
                width="32"
                height="32"
                src={getAvatarURL(user)}
                title={user.username}
                class="avatar"
              />
            </a>
          ) : (
            <div class="session-links">
              <a href={signupURL} class="btn-session">
                Sign up
              </a>
              <a href={loginURL} class="btn-session">
                Login
              </a>
            </div>
          )}
        </nav>
      </header>
    );
  }
}
