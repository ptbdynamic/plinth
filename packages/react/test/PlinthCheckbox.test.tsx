import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthCheckbox } from '../src/index.ts';

describe('PlinthCheckbox', () => {
  it('prints the input, the label, the description and the error', () => {
    expect(
      renderToStaticMarkup(
        <PlinthCheckbox
          id="updates"
          label="Email me updates"
          description="Once a month."
          error="Choose one."
        />,
      ),
    ).toBe(
      '<div class="plinth-checkbox">' +
        '<input id="updates" type="checkbox" class="plinth-checkbox-input" aria-describedby="updates-description updates-error" aria-invalid="true"/>' +
        '<label class="plinth-checkbox-label" for="updates">Email me updates</label>' +
        '<p id="updates-description" class="plinth-checkbox-description">Once a month.</p>' +
        '<p id="updates-error" class="plinth-checkbox-error">Choose one.</p>' +
        '</div>',
    );
  });

  it('is unchecked and enabled by default, and leaves out a blank description and error', () => {
    const { container } = render(<PlinthCheckbox id="a" label="A" description=" " error="" />);
    const input = container.querySelector('input')!;

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(false);
    expect(input.disabled).toBe(false);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(container.querySelector('p')).toBeNull();
  });

  it('is checked and disabled, and calls onChange', () => {
    const onChange = vi.fn();
    const { container } = render(
      <PlinthCheckbox id="a" label="A" defaultChecked disabled onChange={onChange} />,
    );
    const input = container.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input.disabled).toBe(true);

    const { container: enabled } = render(<PlinthCheckbox id="b" label="B" onChange={onChange} />);
    fireEvent.click(enabled.querySelector('input')!);
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sets the input indeterminate, and clears it again', () => {
    const { container, rerender } = render(<PlinthCheckbox id="a" label="A" indeterminate />);
    expect(container.querySelector('input')!.indeterminate).toBe(true);

    rerender(<PlinthCheckbox id="a" label="A" />);
    expect(container.querySelector('input')!.indeterminate).toBe(false);
  });

  it('generates an id when it has none, and points the label at it', () => {
    const { container } = render(<PlinthCheckbox label="A" description="Help" />);
    const id = container.querySelector('input')!.id;

    expect(id).toMatch(/^plinth-checkbox-/);
    expect(container.querySelector('label')!.htmlFor).toBe(id);
    expect(container.querySelector('input')!.getAttribute('aria-describedby')).toBe(
      `${id}-description`,
    );
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthCheckbox label=" " />)).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthCheckbox id="a" label="<b>x</b>" description="<b>x</b>" error="<b>x</b>" />,
    );

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('puts the className on the root and every other prop, the ref too, on the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PlinthCheckbox
        ref={ref}
        id="terms"
        label="Terms"
        description="Help"
        className="mb-4"
        name="terms"
        value="1"
        data-testid="terms"
        aria-describedby="mine"
      />,
    );
    const input = container.querySelector('input')!;

    expect(container.firstElementChild!.className).toBe('plinth-checkbox mb-4');
    expect(input.className).toBe('plinth-checkbox-input');
    expect(input.name).toBe('terms');
    expect(input.value).toBe('1');
    expect(input.dataset.testid).toBe('terms');
    expect(input.getAttribute('aria-describedby')).toBe('mine');
    expect(ref.current).toBe(input);
  });

  it('gives the input to a ref callback, and lets it go', () => {
    const ref = vi.fn();
    const { unmount } = render(<PlinthCheckbox ref={ref} id="a" label="A" />);
    expect(ref).toHaveBeenLastCalledWith(expect.any(HTMLInputElement));

    unmount();
    expect(ref).toHaveBeenLastCalledWith(null);
  });

  it("runs a ref callback's cleanup", () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { unmount } = render(<PlinthCheckbox ref={ref} id="a" label="A" />);

    unmount();
    expect(cleanup).toHaveBeenCalledOnce();
    expect(ref).toHaveBeenCalledTimes(1);
  });
});
