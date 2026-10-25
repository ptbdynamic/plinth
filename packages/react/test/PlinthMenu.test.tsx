import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import {
  PlinthMenu,
  PlinthMenuGroup,
  PlinthMenuItem,
  PlinthMenuSeparator,
  menuItemTone,
  menuItemTones,
} from '../src/index.ts';

const root = (element: ReactElement) => render(element).container.firstElementChild!;

describe('PlinthMenu', () => {
  it('prints a popover with its id, and its items close it', () => {
    expect(
      renderToStaticMarkup(
        <PlinthMenu id=" actions ">
          <PlinthMenuItem>Archive</PlinthMenuItem>
          <PlinthMenuSeparator />
          <PlinthMenuGroup label="Move to">
            <PlinthMenuItem>Inbox</PlinthMenuItem>
          </PlinthMenuGroup>
          <PlinthMenuItem href="/print">Print</PlinthMenuItem>
        </PlinthMenu>,
      ),
    ).toBe(
      '<div id="actions" popover="auto" class="plinth-menu">' +
        '<button type="button" commandfor="actions" command="hide-popover" class="plinth-menu-item"><span class="plinth-menu-label">Archive</span></button>' +
        '<hr class="plinth-menu-separator"/>' +
        '<div role="group" aria-label="Move to" class="plinth-menu-group"><div class="plinth-menu-heading" aria-hidden="true">Move to</div>' +
        '<button type="button" commandfor="actions" command="hide-popover" class="plinth-menu-item"><span class="plinth-menu-label">Inbox</span></button></div>' +
        '<a href="/print" class="plinth-menu-item"><span class="plinth-menu-label">Print</span></a>' +
        '</div>',
    );
  });

  it('needs an id', () => {
    for (const id of [undefined, '', ' ']) {
      expect(() => renderToStaticMarkup(<PlinthMenu id={id as string} />)).toThrow('needs an id');
    }
  });

  it('passes other props and the ref to the root, and lets a project attribute win', () => {
    const ref = createRef<HTMLDivElement>();
    const onToggle = vi.fn();
    const menu = root(
      <PlinthMenu
        id="actions"
        ref={ref}
        className="wide"
        popover="manual"
        data-test="menu"
        onToggle={onToggle}
      />,
    );

    expect(menu.className).toBe('plinth-menu wide');
    expect(menu.getAttribute('popover')).toBe('manual');
    expect(menu.getAttribute('data-test')).toBe('menu');
    expect(ref.current).toBe(menu);
    fireEvent(menu, new Event('toggle'));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});

describe('PlinthMenuItem', () => {
  it('prints a button with its icon, label and shortcut', () => {
    expect(
      renderToStaticMarkup(
        <PlinthMenuItem shortcut="⌘D" icon={<svg />}>
          Duplicate
        </PlinthMenuItem>,
      ),
    ).toBe(
      '<button type="button" class="plinth-menu-item"><span class="plinth-menu-icon" aria-hidden="true"><svg></svg></span>' +
        '<span class="plinth-menu-label">Duplicate</span><kbd class="plinth-menu-shortcut" aria-hidden="true">⌘D</kbd></button>',
    );
  });

  it('leaves out a blank shortcut and an empty icon, and treats a blank href as missing', () => {
    expect(
      renderToStaticMarkup(
        <PlinthMenuItem shortcut=" " icon={false} href=" ">
          Duplicate
        </PlinthMenuItem>,
      ),
    ).toBe(
      '<button type="button" class="plinth-menu-item"><span class="plinth-menu-label">Duplicate</span></button>',
    );
  });

  it('closes the menu it names, never as a link', () => {
    const item = root(<PlinthMenuItem menu=" other " />);
    expect(item.getAttribute('commandfor')).toBe('other');
    expect(item.getAttribute('command')).toBe('hide-popover');
    const link = root(<PlinthMenuItem menu="other" href="/print" />);
    expect(link.hasAttribute('commandfor')).toBe(false);
    expect(link.hasAttribute('command')).toBe(false);
  });

  it('takes the danger tone, and falls back to neutral', () => {
    expect(root(<PlinthMenuItem tone="danger" />).getAttribute('data-tone')).toBe('danger');
    expect(root(<PlinthMenuItem tone={'loud' as 'danger'} />).hasAttribute('data-tone')).toBe(
      false,
    );
    expect(menuItemTones).toEqual(['neutral', 'danger']);
    expect(menuItemTone('danger')).toBe('danger');
    expect(menuItemTone(undefined)).toBe('neutral');
  });

  it('disables a button and a link', () => {
    expect(root(<PlinthMenuItem disabled />).hasAttribute('disabled')).toBe(true);
    expect(
      renderToStaticMarkup(
        <PlinthMenuItem disabled href="/print">
          Print
        </PlinthMenuItem>,
      ),
    ).toBe(
      '<a role="link" aria-disabled="true" class="plinth-menu-item"><span class="plinth-menu-label">Print</span></a>',
    );
  });

  it('escapes the label and the shortcut', () => {
    const html = renderToStaticMarkup(
      <PlinthMenuItem shortcut="<b>x</b>">{'<b>x</b>'}</PlinthMenuItem>,
    );
    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes other props and the ref, and lets a project attribute win', () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    const item = root(
      <PlinthMenuItem
        ref={ref}
        menu="actions"
        className="extra"
        aria-keyshortcuts="E"
        command="--archive"
        type="submit"
        onClick={onClick}
      />,
    );

    expect(item.className).toBe('plinth-menu-item extra');
    expect(item.getAttribute('aria-keyshortcuts')).toBe('E');
    expect(item.getAttribute('commandfor')).toBe('actions');
    expect(item.getAttribute('command')).toBe('--archive');
    expect(item.getAttribute('type')).toBe('submit');
    expect(ref.current).toBe(item);
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('PlinthMenuGroup and PlinthMenuSeparator', () => {
  it('leaves out a blank label', () => {
    for (const label of [undefined, '', ' ']) {
      expect(renderToStaticMarkup(<PlinthMenuGroup label={label}>x</PlinthMenuGroup>)).toBe(
        '<div role="group" class="plinth-menu-group">x</div>',
      );
    }
  });

  it('pass other props and the ref to their roots', () => {
    const group = createRef<HTMLDivElement>();
    const separator = createRef<HTMLHRElement>();
    const element = root(<PlinthMenuGroup ref={group} className="extra" role="none" />);
    expect(element.className).toBe('plinth-menu-group extra');
    expect(element.getAttribute('role')).toBe('none');
    expect(group.current).toBe(element);
    const hr = root(<PlinthMenuSeparator ref={separator} className="extra" data-test="sep" />);
    expect(hr.outerHTML).toBe('<hr data-test="sep" class="plinth-menu-separator extra">');
    expect(separator.current).toBe(hr);
  });
});
