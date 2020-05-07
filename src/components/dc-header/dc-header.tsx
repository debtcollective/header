import { Component, Prop, h, Watch, getAssetPath } from "@stencil/core";

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
   * Hos the value of "links" parsed to an actual Array
   */
  private _links: Array<{ text: string; href: string }>;

  @Watch('links')
  linksDidChangeHandler(newValue) {
    this._links = JSON.parse(newValue)
  }

  componentWillLoad() {
    this.linksDidChangeHandler(this.links);
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
