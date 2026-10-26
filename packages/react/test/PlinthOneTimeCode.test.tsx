import { act, fireEvent, render } from '@testing-library/react';
import { createRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthOneTimeCode, pasteOneTimeCode, type PlinthOneTimeCodeProps } from '../src/index.ts';

const code = (props: Partial<PlinthOneTimeCodeProps> = {}) =>
  renderToStaticMarkup(<PlinthOneTimeCode id="code" label="Code" {...props} />);

/** A paste of `text` into the input, as the browser fires it. */
function paste(input: HTMLInputElement, text: string) {
  const event = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { getData: () => text } });
  act(() => {
    input.dispatchEvent(event);
  });
  return event;
}

/** A one-time code whose value the test's state holds, as an app does. */
function Controlled(props: Partial<PlinthOneTimeCodeProps>) {
  const [value, setValue] = useState('');
  return (
    <PlinthOneTimeCode
      id="code"
      label="Code"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...props}
    />
  );
}

describe('PlinthOneTimeCode', () => {
  it('prints the field around the input, with its description and error', () => {
    expect(code({ description: 'From the app.', error: 'Wrong code.' })).toBe(
      '<div class="plinth-field plinth-one-time-code">' +
        '<label class="plinth-field-label" id="code-label" for="code">Code</label>' +
        '<input id="code" type="text" class="plinth-one-time-code-input" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength="6" aria-describedby="code-description code-error" aria-invalid="true"/>' +
        '<p class="plinth-field-description" id="code-description">From the app.</p>' +
        '<p class="plinth-field-error" id="code-error">Wrong code.</p>' +
        '</div>',
    );
  });

  it('has six digits and nothing to describe it by default', () => {
    const html = code();

    expect(html).toContain('pattern="[0-9]{6}" maxLength="6"');
    expect(html).not.toContain('aria-describedby');
    expect(html).not.toContain('aria-invalid');
    expect(html).not.toContain('disabled');
    expect(html).not.toContain('data-label');
  });

  it('takes a length from 4 to 8 and falls back to 6', () => {
    expect(code({ length: 4 })).toContain('pattern="[0-9]{4}" maxLength="4"');
    expect(code({ length: 8 })).toContain('maxLength="8"');
    expect(code({ length: 3 })).toContain('maxLength="6"');
  });

  it('is disabled, and hides the label visually', () => {
    const html = code({ disabled: true, hideLabel: true });

    expect(html).toContain('<div class="plinth-field plinth-one-time-code" data-label="hidden">');
    expect(html).toContain('disabled=""');
  });

  it('generates an id when it has none', () => {
    const { container } = render(<PlinthOneTimeCode label="Code" />);
    const id = container.querySelector('input')!.id;

    expect(id).toMatch(/^plinth-one-time-code-/);
    expect(container.querySelector('label')!.htmlFor).toBe(id);
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthOneTimeCode label=" " />)).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const html = code({ label: '<b>x</b>', description: '<i>', error: '<u>' });

    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).not.toContain('<b>');
  });

  it("puts a project's className on the root and every other prop on the input, where it wins", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PlinthOneTimeCode
        id="code"
        label="Code"
        description="D."
        className="mb-4"
        name="code"
        aria-describedby="my-help"
        autoComplete="off"
        ref={ref}
      />,
    );
    const input = container.querySelector('input')!;

    expect(container.firstElementChild!.className).toBe('plinth-field plinth-one-time-code mb-4');
    expect(input.name).toBe('code');
    expect(input.getAttribute('aria-describedby')).toBe('my-help');
    expect(input.getAttribute('autocomplete')).toBe('off');
    expect(input.className).toBe('plinth-one-time-code-input');
    expect(ref.current).toBe(input);
  });

  it('keeps only digits, and calls onComplete once every digit is in', () => {
    const onComplete = vi.fn();
    const { container } = render(<Controlled onComplete={onComplete} />);
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '12a' } });
    expect(input.value).toBe('12');
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '123 456' } });
    expect(input.value).toBe('123456');
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('works without onChange or onComplete', () => {
    const { container } = render(<PlinthOneTimeCode id="code" label="Code" length={4} />);
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('1234');
  });

  it('pastes only the digits, in place of the selection', () => {
    const onPaste = vi.fn();
    const { container } = render(<Controlled onPaste={onPaste} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '19' } });
    input.setSelectionRange(1, 2);

    const event = paste(input, 'Code: 2-3');

    expect(event.defaultPrevented).toBe(true);
    expect(onPaste).toHaveBeenCalled();
    expect(input.value).toBe('123');
  });

  it("leaves the paste to the project's onPaste when it prevents it", () => {
    const { container } = render(<Controlled onPaste={(event) => event.preventDefault()} />);
    const input = container.querySelector('input')!;

    paste(input, '123456');
    expect(input.value).toBe('');
  });

  it('pastes at the end when the input has no selection, and with no text', () => {
    const input = document.createElement('input');
    input.value = '12';
    vi.spyOn(input, 'selectionStart', 'get').mockReturnValue(null);
    vi.spyOn(input, 'selectionEnd', 'get').mockReturnValue(null);

    pasteOneTimeCode(input, new Event('paste', { cancelable: true }) as ClipboardEvent, 6);

    expect(input.value).toBe('12');
  });

  it('sends the form once every digit is in with autosubmit', () => {
    const submit = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    const { container } = render(
      <form onSubmit={submit}>
        <Controlled length={4} autosubmit />
      </form>,
    );
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '123' } });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: '1234' } });
    expect(submit).toHaveBeenCalledTimes(1);

    // Without a form there is nothing to send.
    const alone = render(<Controlled length={4} autosubmit />).container.querySelector('input')!;
    fireEvent.change(alone, { target: { value: '1234' } });
    expect(alone.value).toBe('1234');
  });
});
