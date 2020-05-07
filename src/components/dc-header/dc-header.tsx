import { Component, Prop, h, Watch } from "@stencil/core";

@Component({
  tag: "dc-header",
  styleUrl: "dc-header.css",
  shadow: true,
})
export class Header {
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
      <header>
        <nav>
          <ul>
            {this._links.map(({ text, href }) => (
              <li>
                <a href={href}>{text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }
}
