import { newE2EPage } from '@stencil/core/testing';

describe('dc-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-header></dc-header>');
    const element = await page.find('dc-header');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-header></dc-header>');
    const component = await page.find('dc-header');
    const element = await page.find('dc-header >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
