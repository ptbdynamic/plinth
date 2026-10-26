import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import {
  PlinthOneTimeCode,
  oneTimeCodeDigits,
  oneTimeCodeLength,
  pasteOneTimeCode,
} from '../src/index.ts';

const codeWith = (props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) =>
  mount(PlinthOneTimeCode, {
    props: { id: 'code', label: 'Code', ...props },
    attrs,
    attachTo: document.body,
  });

const html = (wrapper: ReturnType<typeof codeWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

/** A paste of `text` into the input, as the browser fires it. */
function paste(input: HTMLInputElement, text: string) {
  const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
  Object.defineProperty(event, 'clipboardData', { value: { getData: () => text } });
  input.dispatchEvent(event);
  return event;
}

describe('PlinthOneTimeCode', () => {
  it('prints the field around the input, with its description and error', () => {
    const wrapper = codeWith({ description: 'From the app.', error: 'Wrong code.' });

    expect(html(wrapper)).toBe(
      '<div class="plinth-field plinth-one-time-code">' +
        '<label class="plinth-field-label" id="code-label" for="code">Code</label>' +
        '<input id="code" type="text" class="plinth-one-time-code-input" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" aria-describedby="code-description code-error" aria-invalid="true">' +
        '<p class="plinth-field-description" id="code-description">From the app.</p>' +
        '<p class="plinth-field-error" id="code-error">Wrong code.</p>' +
        '</div>',
    );
  });

  it('has six digits and nothing to describe it by default', () => {
    const input = codeWith().find('input');

    expect(input.attributes('maxlength')).toBe('6');
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(input.attributes('disabled')).toBeUndefined();
    expect(codeWith().attributes('data-label')).toBeUndefined();
  });

  it('takes a length from 4 to 8 and falls back to 6', () => {
    expect(codeWith({ length: 4 }).find('input').attributes('pattern')).toBe('[0-9]{4}');
    expect(codeWith({ length: 8 }).find('input').attributes('maxlength')).toBe('8');
    expect(codeWith({ length: 12 }).find('input').attributes('maxlength')).toBe('6');
    expect(oneTimeCodeLength('7')).toBe(7);
    expect(oneTimeCodeLength(undefined)).toBe(6);
  });

  it('is disabled, and hides the label visually', () => {
    const wrapper = codeWith({ disabled: true, hideLabel: true });

    expect(wrapper.attributes('data-label')).toBe('hidden');
    expect(wrapper.find('input').attributes('disabled')).toBe('');
  });

  it('generates an id when it has none', () => {
    const wrapper = mount(PlinthOneTimeCode, { props: { label: 'Code' } });
    const id = wrapper.find('input').attributes('id');

    expect(id).toMatch(/^plinth-one-time-code-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
  });

  it('needs a label', () => {
    expect(() => mount(PlinthOneTimeCode, { props: { label: ' ' } })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = codeWith({ label: '<b>x</b>', description: '<i>', error: '<u>' });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.find('b').exists()).toBe(false);
  });

  it("puts a project's class on the root and every other attribute on the input, where it wins", () => {
    const wrapper = codeWith(
      { description: 'D.' },
      { class: 'mb-4', name: 'code', 'aria-describedby': 'my-help', autocomplete: 'off' },
    );
    const input = wrapper.find('input');

    expect(wrapper.classes()).toEqual(['plinth-field', 'plinth-one-time-code', 'mb-4']);
    expect(input.attributes('name')).toBe('code');
    expect(input.attributes('aria-describedby')).toBe('my-help');
    expect(input.attributes('autocomplete')).toBe('off');
    expect(input.attributes('class')).toBe('plinth-one-time-code-input');
  });

  it('keeps only digits, updates v-model, and emits complete once every digit is in', async () => {
    const wrapper = codeWith({ modelValue: '' });
    const input = wrapper.find('input');

    await input.setValue('12a');
    expect((input.element as HTMLInputElement).value).toBe('12');
    expect(wrapper.emitted('update:modelValue')).toEqual([['12']]);

    // A letter on its own changes nothing.
    await wrapper.setProps({ modelValue: '12' });
    await input.setValue('12b');
    expect((input.element as HTMLInputElement).value).toBe('12');
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);

    await input.setValue('123 456');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['123456']);
    expect(wrapper.emitted('complete')).toEqual([['123456']]);
    wrapper.unmount();
  });

  it('pastes only the digits, in place of the selection', async () => {
    const wrapper = codeWith();
    const input = wrapper.find('input').element as HTMLInputElement;
    input.value = '19';
    input.setSelectionRange(1, 2);

    const event = paste(input, 'Code: 2-3');
    await nextTick();

    expect(event.defaultPrevented).toBe(true);
    expect(input.value).toBe('123');
    expect(wrapper.emitted('update:modelValue')).toEqual([['123']]);
    wrapper.unmount();
  });

  it('pastes at the end when the input has no selection, and with no text', () => {
    const input = document.createElement('input');
    input.value = '12';
    vi.spyOn(input, 'selectionStart', 'get').mockReturnValue(null);
    vi.spyOn(input, 'selectionEnd', 'get').mockReturnValue(null);
    const event = new Event('paste', { cancelable: true }) as ClipboardEvent;

    pasteOneTimeCode(input, event, 6);

    expect(input.value).toBe('12');
    expect(oneTimeCodeDigits('9876543210', 4)).toBe('9876');
  });

  it('sends the form once every digit is in with autosubmit', async () => {
    const form = document.createElement('form');
    document.body.append(form);
    const submit = vi.fn((event: Event) => event.preventDefault());
    form.addEventListener('submit', submit);
    const wrapper = mount(PlinthOneTimeCode, {
      props: { id: 'code', label: 'Code', length: 4, autosubmit: true },
      attachTo: form,
    });
    const input = wrapper.find('input');

    await input.setValue('123');
    expect(submit).not.toHaveBeenCalled();
    await input.setValue('1234');
    expect(submit).toHaveBeenCalledTimes(1);
    wrapper.unmount();

    // Without a form there is nothing to send.
    const alone = codeWith({ length: 4, autosubmit: true });
    await alone.find('input').setValue('1234');
    expect(alone.emitted('complete')).toEqual([['1234']]);
    alone.unmount();
    form.remove();
  });
});
