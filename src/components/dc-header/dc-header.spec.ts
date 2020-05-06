import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './dc-header';

describe('dc-header', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [MyComponent],
      html: '<dc-header></dc-header>'
    });
    expect(root).toEqualHtml(`
      <dc-header>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </dc-header>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [MyComponent],
      html: `<dc-header first="Stencil" last="'Don't call me a framework' JS"></dc-header>`
    });
    expect(root).toEqualHtml(`
      <dc-header first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </dc-header>
    `);
  });
});
