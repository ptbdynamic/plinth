import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  PlinthToolbar,
  PlinthToolbarAction,
  PlinthToolbarGroup,
  PlinthToolbarScope,
  PlinthToolbarSearch,
  iconGlyph,
  toolbarKeys,
} from '../src/index.ts';

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

const quiet = () => vi.spyOn(console, 'error').mockImplementation(() => {});

describe('PlinthToolbar', () => {
  it('prints the actions in a toolbar named Actions by default', () => {
    expect(
      renderToStaticMarkup(
        <PlinthToolbar>
          <button>Assign</button>
        </PlinthToolbar>,
      ),
    ).toBe(
      '<div class="plinth-toolbar"><div class="plinth-toolbar-actions" role="toolbar" aria-label="Actions"><button>Assign</button></div></div>',
    );
  });

  it('prints the search and the target, escaped, and the label', () => {
    expect(
      renderToStaticMarkup(
        <PlinthToolbar label="Ticket actions" target="<b>2</b> selected" search={<i>search</i>} />,
      ),
    ).toBe(
      '<div class="plinth-toolbar"><i>search</i><p class="plinth-toolbar-target">&lt;b&gt;2&lt;/b&gt; selected</p><div class="plinth-toolbar-actions" role="toolbar" aria-label="Ticket actions"></div></div>',
    );
  });

  it('leaves out a blank target and an empty search', () => {
    expect(renderToStaticMarkup(<PlinthToolbar target=" " search={null} />)).toBe(
      '<div class="plinth-toolbar"><div class="plinth-toolbar-actions" role="toolbar" aria-label="Actions"></div></div>',
    );
  });

  it('spreads other props onto its root, with the ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<PlinthToolbar ref={ref} className="x" id="bar" />);
    const root = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-toolbar x');
    expect(root.id).toBe('bar');
  });

  it('needs a label', () => {
    quiet();
    expect(() => renderToStaticMarkup(<PlinthToolbar label=" " />)).toThrow(/needs a label/);
  });

  it('moves between the actions with the arrow keys while mounted', () => {
    const { container, unmount } = render(
      <PlinthToolbar>
        <button>Assign</button>
        <button>Solve</button>
      </PlinthToolbar>,
    );
    const [assign, solve] = [...container.querySelectorAll('button')];
    const toolbar = container.querySelector('[role="toolbar"]')!;

    expect([assign!.tabIndex, solve!.tabIndex]).toEqual([0, -1]);
    assign!.focus();
    assign!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(document.activeElement).toBe(solve);

    const removed = vi.spyOn(toolbar, 'removeEventListener');
    unmount();
    expect(removed).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

describe('PlinthToolbarGroup', () => {
  it('prints a group, named when it has a label', () => {
    expect(renderToStaticMarkup(<PlinthToolbarGroup>x</PlinthToolbarGroup>)).toBe(
      '<div role="group" class="plinth-toolbar-group">x</div>',
    );
    expect(renderToStaticMarkup(<PlinthToolbarGroup label="Remove" />)).toContain(
      'aria-label="Remove"',
    );
    expect(renderToStaticMarkup(<PlinthToolbarGroup label=" " />)).not.toContain('aria-label');
  });

  it('spreads other props, and the project wins a clash', () => {
    expect(renderToStaticMarkup(<PlinthToolbarGroup className="x" role="none" />)).toBe(
      '<div role="none" class="plinth-toolbar-group x"></div>',
    );
  });
});

describe('PlinthToolbarAction', () => {
  it('prints a ghost button with the icon from children and the label', () => {
    expect(
      renderToStaticMarkup(
        <PlinthToolbarAction label="<Assign>">
          <svg />
        </PlinthToolbarAction>,
      ),
    ).toBe(
      '<button type="button" data-variant="ghost" data-size="md" class="plinth-button plinth-toolbar-action"><span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span><span class="plinth-button-label">&lt;Assign&gt;</span></button>',
    );
  });

  it('prints a built-in glyph, mirrored when it points a way', () => {
    const back = renderToStaticMarkup(<PlinthToolbarAction label="Back" icon="back" />);
    expect(back).toContain('data-icon="back" data-mirror=""');
    expect(back).toContain(iconGlyph('back').replace(/<svg[^>]*>|<\/svg>/g, ''));
    expect(renderToStaticMarkup(<PlinthToolbarAction label="More" icon="more" />)).not.toContain(
      'data-mirror',
    );
  });

  it('overflows and disables', () => {
    const html = renderToStaticMarkup(<PlinthToolbarAction label="Delete" overflow disabled />);
    expect(html).toContain('data-overflow=""');
    expect(html).toContain('disabled=""');
  });

  it('spreads other props, with the ref, and the project wins a clash', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <PlinthToolbarAction ref={ref} label="Send" className="x" type="submit" data-size="lg" />,
    );
    const root = container.firstElementChild as HTMLButtonElement;

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-button plinth-toolbar-action x');
    expect(root.type).toBe('submit');
    expect(root.dataset.size).toBe('lg');
  });

  it('needs a label', () => {
    quiet();
    expect(() => renderToStaticMarkup(<PlinthToolbarAction label=" " />)).toThrow(/needs a label/);
  });
});

describe('PlinthToolbarScope', () => {
  it('prints the scope button with its label and chevron', () => {
    expect(
      renderToStaticMarkup(
        <PlinthToolbarScope label="In: <Open>" popoverTarget="scope" className="x" />,
      ),
    ).toBe(
      `<button type="button" popoverTarget="scope" class="plinth-toolbar-scope x"><span class="plinth-toolbar-scope-label">In: &lt;Open&gt;</span><span class="plinth-icon" data-size="sm" data-icon="chevron-down" aria-hidden="true">${iconGlyph('chevron-down')}</span></button>`,
    );
  });

  it('needs a label', () => {
    quiet();
    expect(() => renderToStaticMarkup(<PlinthToolbarScope label="" />)).toThrow(/needs a label/);
  });
});

describe('PlinthToolbarSearch', () => {
  it('prints the search with its icon and field, named Search by default', () => {
    expect(renderToStaticMarkup(<PlinthToolbarSearch />)).toBe(
      `<div class="plinth-toolbar-search" role="search"><span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true">${iconGlyph('search')}</span><input type="search" class="plinth-toolbar-search-input" aria-label="Search"/></div>`,
    );
  });

  it('prints the scope, the class on the root and every other prop on the field', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PlinthToolbarSearch
        ref={ref}
        label="Search tickets"
        className="x"
        name="q"
        aria-label="Find"
        scope={<button className="scope">In: Open</button>}
      />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.className).toBe('plinth-toolbar-search x');
    expect(ref.current).toBe(container.querySelector('input'));
    expect(ref.current!.name).toBe('q');
    expect(ref.current!.getAttribute('aria-label')).toBe('Find');
    expect(ref.current!.className).toBe('plinth-toolbar-search-input');
    expect(container.querySelector('.scope')).not.toBeNull();
  });

  it('needs a label', () => {
    quiet();
    expect(() => renderToStaticMarkup(<PlinthToolbarSearch label=" " />)).toThrow(/needs a label/);
  });
});

/** A toolbar with the buttons and links given, attached to the document. */
function bar(html: string, dir?: string): HTMLElement {
  const toolbar = document.createElement('div');
  toolbar.setAttribute('role', 'toolbar');
  toolbar.innerHTML = html;
  const host = document.createElement('div');
  if (dir) host.setAttribute('dir', dir);
  host.append(toolbar);
  document.body.append(host);
  return toolbar;
}

const press = (element: Element, key: string, init: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  element.dispatchEvent(event);
  return event;
};

describe('toolbarKeys', () => {
  it('makes the first control the one tab stop', () => {
    const toolbar = bar('<button>A</button><a href="#b">B</a><a>no href</a>');
    toolbarKeys(toolbar);

    expect([...toolbar.children].map((c) => c.getAttribute('tabindex'))).toEqual(['0', '-1', null]);
  });

  it('moves with the arrow keys, wrapping, and with Home and End', () => {
    const toolbar = bar('<button>A</button><button>B</button><button>C</button>');
    toolbarKeys(toolbar);
    const [a, b, c] = [...toolbar.children] as HTMLElement[];

    a!.focus();
    expect(press(a!, 'ArrowRight').defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
    press(b!, 'ArrowLeft');
    expect(document.activeElement).toBe(a);
    press(a!, 'ArrowLeft');
    expect(document.activeElement).toBe(c);
    press(c!, 'ArrowRight');
    expect(document.activeElement).toBe(a);
    press(a!, 'End');
    expect(document.activeElement).toBe(c);
    press(c!, 'Home');
    expect(document.activeElement).toBe(a);
    expect([a, b, c].map((x) => x!.tabIndex)).toEqual([0, -1, -1]);
  });

  it('turns the arrows round in right-to-left text', () => {
    const toolbar = bar('<button>A</button><button>B</button>', 'rtl');
    toolbarKeys(toolbar);
    const [a, b] = [...toolbar.children] as HTMLElement[];

    a!.focus();
    press(a!, 'ArrowLeft');
    expect(document.activeElement).toBe(b);
    press(b!, 'ArrowRight');
    expect(document.activeElement).toBe(a);
  });

  it('leaves other keys, modified keys and keys from outside the controls alone', () => {
    const toolbar = bar(
      '<button>A</button><button>B</button><div popover><button>M</button></div>',
    );
    toolbarKeys(toolbar);
    const [a] = [...toolbar.children] as HTMLElement[];
    const item = toolbar.querySelector('[popover] button') as HTMLElement;

    a!.focus();
    expect(press(a!, 'Enter').defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { altKey: true }).defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { ctrlKey: true }).defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { metaKey: true }).defaultPrevented).toBe(false);
    expect(press(item, 'ArrowRight').defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(a);
    expect(item.getAttribute('tabindex')).toBeNull();
    item.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(a!.tabIndex).toBe(0);
  });

  it('skips disabled and hidden controls', () => {
    const toolbar = bar('<button>A</button><button disabled>B</button><button>C</button>');
    const [a, , c] = [...toolbar.children] as HTMLElement[];
    Object.assign(c!, { checkVisibility: () => false });
    const d = document.createElement('button');
    toolbar.append(d);
    toolbarKeys(toolbar);

    a!.focus();
    press(a!, 'ArrowRight');
    expect(document.activeElement).toBe(d);
  });

  it('counts a toolbar inside a popover', () => {
    const popover = document.createElement('div');
    popover.setAttribute('popover', '');
    document.body.append(popover);
    const toolbar = document.createElement('div');
    toolbar.innerHTML = '<button>A</button><button>B</button>';
    popover.append(toolbar);
    toolbarKeys(toolbar);

    expect(toolbar.querySelectorAll('[tabindex="-1"]')).toHaveLength(1);
  });

  it('keeps the focused control as the tab stop, and follows changes', async () => {
    const toolbar = bar('<button>A</button><button>B</button>');
    const stop = toolbarKeys(toolbar);
    const [a, b] = [...toolbar.children] as HTMLElement[];

    b!.focus();
    expect([a!.tabIndex, b!.tabIndex]).toEqual([-1, 0]);

    // B goes: the first control is the tab stop again; a new control joins at -1.
    b!.remove();
    const c = document.createElement('button');
    toolbar.append(c);
    await new Promise((resolve) => setTimeout(resolve));
    expect([a!.tabIndex, c.tabIndex]).toEqual([0, -1]);

    // A width change re-checks which controls show.
    a!.setAttribute('disabled', '');
    window.dispatchEvent(new Event('resize'));
    expect(c.tabIndex).toBe(0);

    stop();
    a!.removeAttribute('disabled');
    window.dispatchEvent(new Event('resize'));
    expect(a!.tabIndex).toBe(0);
    c.focus();
    expect(c.tabIndex).toBe(0);
    expect(a!.tabIndex).toBe(0);
  });
});
