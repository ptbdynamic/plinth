import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthSelect, type PlinthSelectProps } from '../src/index.ts';

const options = (
  <>
    <option value="a">A</option>
    <option value="b">B</option>
  </>
);

const select = (props: Partial<PlinthSelectProps> = {}) =>
  renderToStaticMarkup(
    <PlinthSelect id="role" label="Role" {...props}>
      {options}
    </PlinthSelect>,
  );

const rendered = (props: Partial<PlinthSelectProps> & Record<`data-${string}`, string> = {}) =>
  render(
    <PlinthSelect id="role" label="Role" {...props}>
      {options}
    </PlinthSelect>,
  ).container;

describe('PlinthSelect', () => {
  it('prints the label, the select, the options, the description and the error', () => {
    expect(select({ description: 'What it may do.', error: 'Choose a role.' })).toBe(
      '<div class="plinth-select" data-size="md">' +
        '<label class="plinth-select-label" for="role">Role</label>' +
        '<div class="plinth-select-control">' +
        '<select id="role" class="plinth-select-input" aria-describedby="role-description role-error" aria-invalid="true">' +
        '<option value="a">A</option><option value="b">B</option>' +
        '</select>' +
        '</div>' +
        '<p id="role-description" class="plinth-select-description">What it may do.</p>' +
        '<p id="role-error" class="plinth-select-error">Choose a role.</p>' +
        '</div>',
    );
  });

  it('is of size md by default, with nothing to describe it', () => {
    const control = rendered().querySelector('select')!;

    expect(control.hasAttribute('aria-describedby')).toBe(false);
    expect(control.hasAttribute('aria-invalid')).toBe(false);
    expect(select()).not.toContain('data-label');
    expect(select()).not.toContain('value=""');
  });

  it('takes the sm size and falls back to md for any other', () => {
    expect(select({ size: 'sm' })).toContain('data-size="sm"');
    expect(select({ size: 'lg' as 'sm' })).toContain('data-size="md"');
  });

  it('hides the label visually, and is disabled or required', () => {
    expect(select({ hideLabel: true })).toContain('data-label="hidden"');
    expect(rendered({ disabled: true }).querySelector('select')!.disabled).toBe(true);
    expect(rendered({ required: true }).querySelector('select')!.required).toBe(true);
  });

  it('prints a disabled first option for the placeholder, chosen while nothing is', () => {
    const container = rendered({ placeholder: 'Choose one' });
    const control = container.querySelector('select')!;
    const placeholder = container.querySelector('option')!;

    expect(placeholder.textContent).toBe('Choose one');
    expect(placeholder.value).toBe('');
    expect(placeholder.disabled).toBe(true);
    expect(control.value).toBe('');
    expect(select({ placeholder: ' ' })).not.toContain('value=""');
  });

  it('lets a value or default value choose an option instead of the placeholder', () => {
    expect(
      rendered({ placeholder: 'Choose one', defaultValue: 'b' }).querySelector('select')!.value,
    ).toBe('b');
    const container = render(
      <PlinthSelect id="role" label="Role" placeholder="Choose one" value="a" onChange={() => {}}>
        {options}
      </PlinthSelect>,
    ).container;
    expect(container.querySelector('select')!.value).toBe('a');
  });

  it('prints the leading icon, and leaves out an empty one', () => {
    expect(select({ icon: <svg /> })).toContain(
      '<div class="plinth-select-control"><span class="plinth-icon" data-size="sm" aria-hidden="true"><svg></svg></span><select',
    );
    expect(select({ icon: false })).not.toContain('plinth-icon');
  });

  it('leaves out a blank description and error', () => {
    const html = select({ description: ' ', error: '' });

    expect(html).not.toContain('aria-describedby');
    expect(html).not.toContain('aria-invalid');
  });

  it('generates an id when it has none, and points the label at it', () => {
    const container = render(<PlinthSelect label="Role" description="Help" />).container;
    const id = container.querySelector('select')!.id;

    expect(id).toMatch(/^plinth-select-/);
    expect(container.querySelector('label')!.htmlFor).toBe(id);
    expect(container.querySelector('select')!.getAttribute('aria-describedby')).toBe(
      `${id}-description`,
    );
  });

  it('needs a label', () => {
    expect(() => select({ label: ' ' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const html = select({
      label: '<b>x</b>',
      description: '<i>',
      error: '<u>',
      placeholder: '<s>',
    });

    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;');
    expect(html).toContain('&lt;u&gt;');
    expect(html).toContain('&lt;s&gt;');
  });

  it('puts the class on the root and every other prop on the select, where it wins', () => {
    const ref = createRef<HTMLSelectElement>();
    const container = rendered({
      description: 'Help',
      className: 'mb-4',
      name: 'role',
      'data-testid': 'role',
      'aria-describedby': 'mine',
      ref,
    });
    const control = container.querySelector('select')!;

    expect(container.firstElementChild!.className).toBe('plinth-select mb-4');
    expect(control.className).toBe('plinth-select-input');
    expect(control.name).toBe('role');
    expect(control.getAttribute('data-testid')).toBe('role');
    expect(control.getAttribute('aria-describedby')).toBe('mine');
    expect(ref.current).toBe(control);
  });

  it('calls onChange when the person chooses an option', () => {
    const onChange = vi.fn();
    const control = rendered({ onChange }).querySelector('select')!;

    fireEvent.change(control, { target: { value: 'b' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
