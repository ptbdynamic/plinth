import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthTextarea } from '../src/index.ts';

const areaWith = (props: Record<string, unknown> = {}, attrs?: Record<string, unknown>) =>
  mount(PlinthTextarea, { props: { id: 'reply', label: 'Reply', ...props }, attrs });

const html = (wrapper: ReturnType<typeof areaWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthTextarea', () => {
  it('prints the label, the textarea, the description and the error', () => {
    const wrapper = areaWith({ description: 'The customer sees it.', error: 'Write a reply.' });

    expect(html(wrapper)).toBe(
      '<div class="plinth-textarea">' +
        '<label class="plinth-textarea-label" for="reply">Reply</label>' +
        '<textarea id="reply" class="plinth-textarea-input" rows="3" aria-describedby="reply-description reply-error" aria-invalid="true"></textarea>' +
        '<p id="reply-description" class="plinth-textarea-description">The customer sees it.</p>' +
        '<p id="reply-error" class="plinth-textarea-error">Write a reply.</p>' +
        '</div>',
    );
  });

  it('has three rows, no grow and nothing to describe it by default', () => {
    const textarea = areaWith().find('textarea');

    expect(textarea.attributes('rows')).toBe('3');
    expect(textarea.attributes('data-grow')).toBeUndefined();
    expect(textarea.attributes('style')).toBeUndefined();
    expect(textarea.attributes('aria-describedby')).toBeUndefined();
    expect(areaWith().attributes('data-label')).toBeUndefined();
  });

  it('grows from its rows to its maximum, never below its rows', () => {
    const style = (props: Record<string, unknown>) =>
      areaWith({ grow: true, ...props })
        .find('textarea')
        .attributes('style');

    expect(areaWith({ grow: true }).find('textarea').attributes('data-grow')).toBe('');
    expect(style({})).toBe('--plinth-textarea-rows: 3; --plinth-textarea-max-rows: 8;');
    expect(style({ rows: 2, maxRows: 4 })).toBe(
      '--plinth-textarea-rows: 2; --plinth-textarea-max-rows: 4;',
    );
    expect(style({ rows: 5, maxRows: 2 })).toBe(
      '--plinth-textarea-rows: 5; --plinth-textarea-max-rows: 5;',
    );
  });

  it('adds a project style after the grow', () => {
    const textarea = areaWith({ grow: true }, { style: 'color: red' }).find('textarea');

    expect(textarea.attributes('style')).toBe(
      '--plinth-textarea-rows: 3; --plinth-textarea-max-rows: 8; color: red;',
    );
  });

  it('hides the label visually, and is disabled or read-only', () => {
    expect(areaWith({ hideLabel: true }).attributes('data-label')).toBe('hidden');
    expect(areaWith({ disabled: true }).find('textarea').attributes('disabled')).toBe('');
    expect(areaWith({ readonly: true }).find('textarea').attributes('readonly')).toBe('');
  });

  it('generates an id when it has none, and points the label at it', () => {
    const wrapper = areaWith({ id: ' ', error: 'Wrong' });
    const id = wrapper.find('textarea').attributes('id')!;

    expect(id).toMatch(/^plinth-textarea-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('textarea').attributes('aria-describedby')).toBe(`${id}-error`);
  });

  it('needs a label', () => {
    expect(() => areaWith({ label: '' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = areaWith({ label: '<b>x</b>', description: '<i>' });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.html()).toContain('&lt;i&gt;');
  });

  it('puts the class on the root and every other attribute on the textarea, where it wins', () => {
    const wrapper = areaWith(
      { error: 'Wrong' },
      { class: 'mb-4', name: 'reply', maxlength: '2000', 'aria-invalid': 'false' },
    );
    const textarea = wrapper.find('textarea');

    expect(wrapper.classes()).toEqual(['plinth-textarea', 'mb-4']);
    expect(textarea.classes()).toEqual(['plinth-textarea-input']);
    expect(textarea.attributes('name')).toBe('reply');
    expect(textarea.attributes('maxlength')).toBe('2000');
    expect(textarea.attributes('aria-invalid')).toBe('false');
  });

  it('binds its value with v-model', async () => {
    const values: unknown[] = [];
    const wrapper = areaWith({
      modelValue: 'Hello',
      'onUpdate:modelValue': (value: unknown) => values.push(value),
    });
    const textarea = wrapper.find('textarea');

    expect((textarea.element as HTMLTextAreaElement).value).toBe('Hello');
    await textarea.setValue('Hello there');

    expect(values).toEqual(['Hello there']);
  });
});
