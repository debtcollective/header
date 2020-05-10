import { Component, Prop, State, h, Watch, getAssetPath } from "@stencil/core";
import { syncCurrentUser } from "../../services/session";

@Component({
  assetsDirs: ['assets'],
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
   * An object with the user data when there is a 
   * user logged in
   */
  @State() user: Object = {};

  /**
   * Hos the value of "links" parsed to an actual Array
   */
  private _links: Array<{ text: string; href: string }>;

  @Watch('links')
  linksDidChangeHandler(newValue) {
    this._links = JSON.parse(newValue)
  }

  async syncCurrentUser() {
    const user = await syncCurrentUser('http://lvh.me:3000')
    this.user = user;
  }

  componentWillLoad() {
    this.linksDidChangeHandler(this.links);
    return this.syncCurrentUser();
  }

  render() {
    return (
      <header class="header">
        <img class="logo" src={getAssetPath(`./assets/${this.logo}`)} alt="The Debtcollective"/>
        <nav class="nav">
          {this._links.map(({ text, href }) => (
            <div class="nav-item">
              <a class="nav-link" href={href}>{text}</a>
            </div>
          ))}
        </nav>
      </header>
    );
  }
}
