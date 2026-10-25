import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { listRowChevron, PlinthListRow } from '../src/index.ts';

const root = (element: ReactElement) => render(element).container.firstElementChild!;
/** Some markup as the DOM prints it back (`data-mirror` as `data-mirror=""`). */
const parsed = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.innerHTML;
};
const chevron = parsed(listRowChevron);

describe('PlinthListRow', () => {
  it('prints the list row markup contract', () => {
    expect(renderToStaticMarkup(<PlinthListRow>Notifications</PlinthListRow>)).toBe(
      '<div class="plinth-list-row"><span class="plinth-list-row-content">' +
        '<span class="plinth-list-row-title">Notifications</span></span></div>',
    );
  });

  it('prints the leading part, the description, the trailing part and the chevron', () => {
    const row = root(
      <PlinthListRow description="Email and push" leading={<i>•</i>} trailing="On" chevron>
        Notifications
      </PlinthListRow>,
    );

    expect(row.querySelector('.plinth-list-row-leading')?.innerHTML).toBe('<i>•</i>');
    expect(row.querySelector('.plinth-list-row-description')?.textContent).toBe('Email and push');
    expect(row.querySelector('.plinth-list-row-trailing')?.innerHTML).toBe(`On${chevron}`);
  });

  it('leaves out leading and trailing parts that print nothing', () => {
    const row = root(
      <PlinthListRow leading={null} trailing=" ">
        Notifications
      </PlinthListRow>,
    );

    expect(row.querySelector('.plinth-list-row-leading')).toBeNull();
    expect(row.querySelector('.plinth-list-row-trailing')).toBeNull();
    expect(
      root(<PlinthListRow trailing="English">Language</PlinthListRow>).querySelector(
        '.plinth-list-row-trailing',
      )?.innerHTML,
    ).toBe('English');
    expect(
      root(<PlinthListRow chevron>Next</PlinthListRow>).querySelector('.plinth-list-row-trailing')
        ?.innerHTML,
    ).toBe(chevron);
  });

  it('is a link with an href, current or disabled', () => {
    const link = root(
      <PlinthListRow href="/settings" current>
        Settings
      </PlinthListRow>,
    );
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/settings');
    expect(link.getAttribute('aria-current')).toBe('page');
    expect(link.hasAttribute('type')).toBe(false);

    const disabled = root(
      <PlinthListRow href="/settings" disabled>
        Settings
      </PlinthListRow>,
    );
    expect(disabled.hasAttribute('href')).toBe(false);
    expect(disabled.getAttribute('role')).toBe('link');
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
  });

  it('is a button with button, never current, and disabled natively', () => {
    const onClick = vi.fn();
    const button = root(
      <PlinthListRow button current onClick={onClick}>
        Sign out
      </PlinthListRow>,
    );
    fireEvent.click(button);

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.hasAttribute('aria-current')).toBe(false);
    expect(onClick).toHaveBeenCalledOnce();
    expect(
      (
        root(
          <PlinthListRow button disabled>
            Sign out
          </PlinthListRow>,
        ) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it('is a static row otherwise, which can be current but not disabled', () => {
    const row = root(
      <PlinthListRow current disabled>
        Overview
      </PlinthListRow>,
    );

    expect(row.tagName).toBe('DIV');
    expect(row.getAttribute('aria-current')).toBe('page');
    expect(row.hasAttribute('disabled')).toBe(false);
    expect(row.hasAttribute('aria-disabled')).toBe(false);
  });

  it('takes a button flag and an href that may be missing, as Vue does', () => {
    const flag: boolean = false;
    const url: string | undefined = undefined;
    const ref = createRef<HTMLElement>();

    expect(root(<PlinthListRow button={flag}>A</PlinthListRow>).tagName).toBe('DIV');
    expect(
      root(
        <PlinthListRow ref={ref} href={url}>
          A
        </PlinthListRow>,
      ).tagName,
    ).toBe('DIV');
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('escapes the title and the description', () => {
    expect(
      renderToStaticMarkup(<PlinthListRow description="<i>x</i>">{'<b>A</b>'}</PlinthListRow>),
    ).toContain(
      '&lt;b&gt;A&lt;/b&gt;</span><span class="plinth-list-row-description">&lt;i&gt;x&lt;/i&gt;',
    );
  });

  it('passes other props and the ref to the root, and lets a project attribute win', () => {
    const ref = createRef<HTMLButtonElement>();
    const row = root(
      <PlinthListRow ref={ref} button className="ms-2" type="submit" data-testid="sign-out">
        Sign out
      </PlinthListRow>,
    );

    expect(row.className).toBe('plinth-list-row ms-2');
    expect(row.getAttribute('type')).toBe('submit');
    expect(row.getAttribute('data-testid')).toBe('sign-out');
    expect(ref.current).toBe(row);
  });

  it('is a label with a checkbox while selecting, and never navigates', () => {
    expect(
      renderToStaticMarkup(
        <PlinthListRow
          href="/tickets/1"
          chevron
          selectable
          name="tickets[]"
          value="1"
          leading={<i>avatar</i>}
          onSelectedChange={() => {}}
        >
          Cannot export
        </PlinthListRow>,
      ),
    ).toBe(
      '<label class="plinth-list-row"><span class="plinth-list-row-leading"><input type="checkbox" class="plinth-list-row-checkbox" name="tickets[]" value="1"/></span><span class="plinth-list-row-content"><span class="plinth-list-row-title">Cannot export</span></span></label>',
    );
  });

  it('checks a selected row, disables it, and reports the change', () => {
    const changes: boolean[] = [];
    const { container } = render(
      <PlinthListRow selectable selected current onSelectedChange={(on) => changes.push(on)}>
        Ticket
      </PlinthListRow>,
    );
    const checkbox = container.querySelector('input')!;

    expect(container.firstElementChild!.getAttribute('aria-current')).toBe('page');
    expect(checkbox.checked).toBe(true);
    expect(checkbox.hasAttribute('name')).toBe(false);
    fireEvent.click(checkbox);
    expect(changes).toEqual([false]);

    const disabled = render(
      <PlinthListRow selectable disabled>
        Ticket
      </PlinthListRow>,
    );
    expect(disabled.container.querySelector('input')!.disabled).toBe(true);
  });

  it('toggles natively without a callback, as Blade and Vue do', () => {
    const { container } = render(<PlinthListRow selectable>Ticket</PlinthListRow>);
    const checkbox = container.querySelector('input')!;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('keeps name and value on the root of a row that is not selectable', () => {
    const button = root(
      <PlinthListRow button type="submit" name="action" value="archive">
        Archive
      </PlinthListRow>,
    );

    expect(button.getAttribute('type')).toBe('submit');
    expect(button.getAttribute('name')).toBe('action');
    expect(button.getAttribute('value')).toBe('archive');
  });
});
