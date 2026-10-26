import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthSwitch } from '../src/index.ts';

describe('PlinthSwitch', () => {
  it('prints the input with the switch role, the label, the description and the error', () => {
    expect(
      renderToStaticMarkup(
        <PlinthSwitch
          id="enabled"
          label="Enabled"
          description="People can sign in."
          error="Add a client ID."
        />,
      ),
    ).toBe(
      '<div class="plinth-switch">' +
        '<input id="enabled" type="checkbox" role="switch" class="plinth-switch-input" aria-describedby="enabled-description enabled-error" aria-invalid="true"/>' +
        '<label class="plinth-switch-label" for="enabled">Enabled</label>' +
        '<p id="enabled-description" class="plinth-switch-description">People can sign in.</p>' +
        '<p id="enabled-error" class="plinth-switch-error">Add a client ID.</p>' +
        '</div>',
    );
  });

  it('is off and enabled by default, and leaves out a blank description and error', () => {
    const { container } = render(<PlinthSwitch id="a" label="A" description=" " error="" />);
    const input = container.querySelector('input')!;

    expect(input.checked).toBe(false);
    expect(input.disabled).toBe(false);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(container.querySelector('p')).toBeNull();
  });

  it('is on and disabled, and calls onChange when it is flipped', () => {
    const { container } = render(<PlinthSwitch id="a" label="A" defaultChecked disabled />);
    const input = container.querySelector('input')!;
    expect(input.checked).toBe(true);
    expect(input.disabled).toBe(true);

    const onChange = vi.fn();
    const { container: enabled } = render(<PlinthSwitch id="b" label="B" onChange={onChange} />);
    fireEvent.click(enabled.querySelector('input')!);
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('generates an id when it has none, and points the label at it', () => {
    const { container } = render(<PlinthSwitch label="A" error="Wrong" />);
    const id = container.querySelector('input')!.id;

    expect(id).toMatch(/^plinth-switch-/);
    expect(container.querySelector('label')!.htmlFor).toBe(id);
    expect(container.querySelector('input')!.getAttribute('aria-describedby')).toBe(`${id}-error`);
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthSwitch label="" />)).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthSwitch id="a" label="<b>x</b>" description="<b>x</b>" error="<b>x</b>" />,
    );

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('puts the className on the root and every other prop, the ref too, on the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PlinthSwitch
        ref={ref}
        id="enabled"
        label="Enabled"
        className="mb-4"
        name="enabled"
        value="1"
        data-testid="enabled"
        role="checkbox"
      />,
    );
    const input = container.querySelector('input')!;

    expect(container.firstElementChild!.className).toBe('plinth-switch mb-4');
    expect(input.name).toBe('enabled');
    expect(input.value).toBe('1');
    expect(input.dataset.testid).toBe('enabled');
    expect(input.getAttribute('role')).toBe('checkbox');
    expect(ref.current).toBe(input);
  });
});
