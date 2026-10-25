import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthTextarea, type PlinthTextareaProps } from '../src/index.ts';

const area = (props: Partial<PlinthTextareaProps> = {}) =>
  renderToStaticMarkup(<PlinthTextarea id="reply" label="Reply" {...props} />);

const rendered = (props: Partial<PlinthTextareaProps> = {}) =>
  render(<PlinthTextarea id="reply" label="Reply" {...props} />).container;

describe('PlinthTextarea', () => {
  it('prints the label, the textarea, the description and the error', () => {
    expect(area({ description: 'The customer sees it.', error: 'Write a reply.' })).toBe(
      '<div class="plinth-textarea">' +
        '<label class="plinth-textarea-label" for="reply">Reply</label>' +
        '<textarea id="reply" class="plinth-textarea-input" rows="3" aria-describedby="reply-description reply-error" aria-invalid="true"></textarea>' +
        '<p id="reply-description" class="plinth-textarea-description">The customer sees it.</p>' +
        '<p id="reply-error" class="plinth-textarea-error">Write a reply.</p>' +
        '</div>',
    );
  });

  it('has three rows, no grow and nothing to describe it by default', () => {
    const html = area();

    expect(html).toContain('rows="3"');
    expect(html).not.toContain('data-grow');
    expect(html).not.toContain('style');
    expect(html).not.toContain('aria-describedby');
    expect(html).not.toContain('data-label');
  });

  it('grows from its rows to its maximum, never below its rows', () => {
    expect(area({ grow: true })).toContain(
      'data-grow="" style="--plinth-textarea-rows:3;--plinth-textarea-max-rows:8"',
    );
    expect(area({ grow: true, rows: 5, maxRows: 2 })).toContain(
      'style="--plinth-textarea-rows:5;--plinth-textarea-max-rows:5"',
    );
  });

  it('adds a project style after the grow, and keeps it without grow', () => {
    expect(area({ grow: true, style: { color: 'red' } })).toContain(
      'style="--plinth-textarea-rows:3;--plinth-textarea-max-rows:8;color:red"',
    );
    expect(area({ style: { color: 'red' } })).toContain('style="color:red"');
  });

  it('hides the label visually, and is disabled or read-only', () => {
    expect(area({ hideLabel: true })).toContain('data-label="hidden"');
    expect(rendered({ disabled: true }).querySelector('textarea')!.disabled).toBe(true);
    expect(rendered({ readOnly: true }).querySelector('textarea')!.readOnly).toBe(true);
  });

  it('generates an id when it has none, and points the label at it', () => {
    const container = render(<PlinthTextarea label="Reply" error="Wrong" />).container;
    const textarea = container.querySelector('textarea')!;

    expect(textarea.id).toMatch(/^plinth-textarea-/);
    expect(container.querySelector('label')!.htmlFor).toBe(textarea.id);
    expect(textarea.getAttribute('aria-describedby')).toBe(`${textarea.id}-error`);
  });

  it('needs a label', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => area({ label: '' })).toThrow('needs a label');
    vi.restoreAllMocks();
  });

  it('escapes the text', () => {
    const html = area({ label: '<b>x</b>', description: '<i>', defaultValue: 'A & <B>' });

    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;');
    expect(html).toContain('A &amp; &lt;B&gt;</textarea>');
  });

  it('puts the className on the root and every other prop, the ref too, on the textarea', () => {
    const ref = createRef<HTMLTextAreaElement>();
    const onChange = vi.fn();
    const container = rendered({
      ref,
      className: 'mb-4',
      name: 'reply',
      value: 'Hello',
      onChange,
      error: 'Wrong',
      'aria-invalid': 'false',
    });
    const root = container.firstElementChild!;
    const textarea = container.querySelector('textarea')!;

    expect(root.className).toBe('plinth-textarea mb-4');
    expect(textarea.className).toBe('plinth-textarea-input');
    expect(textarea.name).toBe('reply');
    expect(textarea.value).toBe('Hello');
    expect(textarea.getAttribute('aria-invalid')).toBe('false');
    expect(ref.current).toBe(textarea);
    fireEvent.change(textarea, { target: { value: 'Hello there' } });
    expect(onChange).toHaveBeenCalledOnce();
  });
});
