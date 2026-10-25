import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthTextField, fieldDescribedBy, type PlinthTextFieldProps } from '../src/index.ts';

const field = (props: Partial<PlinthTextFieldProps> = {}) =>
  renderToStaticMarkup(<PlinthTextField id="email" label="Email" {...props} />);

const rendered = (props: Partial<PlinthTextFieldProps> & Record<`data-${string}`, string> = {}) =>
  render(<PlinthTextField id="email" label="Email" {...props} />).container;

describe('PlinthTextField', () => {
  it('prints the label, the input, the description and the error', () => {
    expect(
      field({ type: 'email', description: 'For receipts.', error: 'Enter an email address.' }),
    ).toBe(
      '<div class="plinth-text-field" data-size="md">' +
        '<label class="plinth-text-field-label" for="email">Email</label>' +
        '<div class="plinth-text-field-control">' +
        '<input id="email" type="email" class="plinth-text-field-input" aria-describedby="email-description email-error" aria-invalid="true"/>' +
        '</div>' +
        '<p id="email-description" class="plinth-text-field-description">For receipts.</p>' +
        '<p id="email-error" class="plinth-text-field-error">Enter an email address.</p>' +
        '</div>',
    );
  });

  it('is a text input of size md by default, with nothing to describe it', () => {
    const input = rendered().querySelector('input')!;

    expect(input.type).toBe('text');
    expect(input.hasAttribute('aria-describedby')).toBe(false);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(field()).not.toContain('data-label');
  });

  it('takes the sm size and falls back to md for any other', () => {
    expect(field({ size: 'sm' })).toContain('data-size="sm"');
    expect(field({ size: 'lg' as 'sm' })).toContain('data-size="md"');
  });

  it('hides the label visually, and is disabled or read-only', () => {
    expect(field({ hideLabel: true })).toContain('data-label="hidden"');
    expect(rendered({ disabled: true }).querySelector('input')!.disabled).toBe(true);
    expect(rendered({ readOnly: true }).querySelector('input')!.readOnly).toBe(true);
  });

  it('prints the icon and the trailing slot, and leaves out empty ones', () => {
    const html = field({ icon: <svg />, trailing: <kbd aria-hidden="true">/</kbd> });

    expect(html).toContain(
      '<span class="plinth-icon" data-size="sm" aria-hidden="true"><svg></svg></span>',
    );
    expect(html).toContain(
      '<span class="plinth-text-field-trailing"><kbd aria-hidden="true">/</kbd></span>',
    );
    const empty = field({ icon: false, trailing: ' ' });
    expect(empty).not.toContain('plinth-icon');
    expect(empty).not.toContain('plinth-text-field-trailing');
  });

  it('leaves out a blank description and error', () => {
    const html = field({ description: ' ', error: '' });

    expect(html).not.toContain('aria-describedby');
    expect(html).not.toContain('aria-invalid');
    expect(fieldDescribedBy('a', 'x', undefined)).toBe('a-description');
  });

  it('generates an id when it has none, and points the label at it', () => {
    const container = render(<PlinthTextField label="Email" description="Help" />).container;
    const input = container.querySelector('input')!;

    expect(input.id).toMatch(/^plinth-text-field-/);
    expect(container.querySelector('label')!.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toBe(`${input.id}-description`);
  });

  it('needs a label', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => field({ label: ' ' })).toThrow('needs a label');
    vi.restoreAllMocks();
  });

  it('escapes the text', () => {
    const html = field({ label: '<b>x</b>', description: '<i>', error: '<u>' });

    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;');
    expect(html).toContain('&lt;u&gt;');
  });

  it('puts the className on the root and every other prop, the ref too, on the input', () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    const container = rendered({
      ref,
      className: 'mb-4',
      name: 'email',
      value: 'sam',
      onChange,
      'data-testid': 'email',
      'aria-describedby': 'mine',
      description: 'Help',
    });
    const root = container.firstElementChild!;
    const input = container.querySelector('input')!;

    expect(root.className).toBe('plinth-text-field mb-4');
    expect(input.className).toBe('plinth-text-field-input');
    expect(input.name).toBe('email');
    expect(input.value).toBe('sam');
    expect(input.dataset.testid).toBe('email');
    expect(input.getAttribute('aria-describedby')).toBe('mine');
    expect(ref.current).toBe(input);
    fireEvent.change(input, { target: { value: 'sam@example.com' } });
    expect(onChange).toHaveBeenCalledOnce();
  });
});
