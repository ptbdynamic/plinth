import { flushPromises, mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkedTab, codeBlockText, downloadText } from '../src/code-block.ts';
import { PlinthCodeBlock } from '../src/index.ts';

const tabs = [
  { label: 'Blade', code: '<x-plinth::badge />' },
  { label: 'Vue', code: '<PlinthBadge />' },
];

const copyButton = (hidden: boolean) =>
  `<button type="button" class="plinth-button plinth-code-block-copy" data-variant="ghost" data-size="sm"${hidden ? ' hidden' : ''}><span class="plinth-button-label">Copy</span></button>` +
  '<span class="plinth-code-block-status" role="status"></span>';

const flat = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/\n\s*/g, '');

describe('PlinthCodeBlock', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>();

  beforeEach(() => {
    writeText.mockReset().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('prints the label, the copy button (hidden until mounted) and the code', async () => {
    const html = await renderToString(
      h(PlinthCodeBlock, { label: 'brand.css' }, { default: () => ':root {\n  --a: 1;\n}' }),
    );

    expect(html).toContain(':root {\n  --a: 1;\n}');
    expect(flat(html)).toBe(
      '<div class="plinth-code-block"><div class="plinth-code-block-header">' +
        '<span class="plinth-code-block-label">brand.css</span>' +
        copyButton(true) +
        '</div>' +
        '<pre class="plinth-code-block-code" dir="ltr" tabindex="0"><code>:root {--a: 1;}</code></pre>' +
        '</div>',
    );
  });

  it('shows the copy button once mounted, where the clipboard is there', async () => {
    const wrapper = mount(PlinthCodeBlock, { slots: { default: 'x' } });
    await flushPromises();

    expect(wrapper.get('.plinth-code-block-copy').attributes('hidden')).toBeUndefined();
    expect(flat(wrapper.get('.plinth-code-block-header').html())).toBe(
      `<div class="plinth-code-block-header">${copyButton(false)}</div>`,
    );
  });

  it('keeps the copy button hidden without a clipboard', () => {
    Reflect.deleteProperty(navigator, 'clipboard');
    const wrapper = mount(PlinthCodeBlock, { slots: { default: 'x' } });

    expect(wrapper.get('.plinth-code-block-copy').attributes('hidden')).toBe('');
  });

  it('prints language tabs and a <pre> for each, the first checked', async () => {
    const html = await renderToString(h(PlinthCodeBlock, { id: 'badge', tabs }));

    expect(flat(html)).toBe(
      '<div id="badge" class="plinth-code-block"><div class="plinth-code-block-header">' +
        '<div class="plinth-code-block-tabs" role="radiogroup" aria-label="Language">' +
        '<label class="plinth-code-block-tab"><input type="radio" class="plinth-code-block-tab-input" name="badge-language" checked><span class="plinth-code-block-tab-label">Blade</span></label>' +
        '<label class="plinth-code-block-tab"><input type="radio" class="plinth-code-block-tab-input" name="badge-language"><span class="plinth-code-block-tab-label">Vue</span></label>' +
        '</div>' +
        copyButton(true) +
        '</div>' +
        '<pre class="plinth-code-block-code" dir="ltr" tabindex="0"><code>&lt;x-plinth::badge /&gt;</code></pre>' +
        '<pre class="plinth-code-block-code" dir="ltr" tabindex="0"><code>&lt;PlinthBadge /&gt;</code></pre>' +
        '</div>',
    );
  });

  it('checks the selected tab, and falls back to the first', () => {
    const checked = (selected?: string) =>
      mount(PlinthCodeBlock, { props: { tabs, selected } })
        .findAll('input')
        .map((input) => (input.element as HTMLInputElement).checked);

    expect(checked('Vue')).toEqual([false, true]);
    expect(checked('Svelte')).toEqual([true, false]);
    expect(checked()).toEqual([true, false]);
    expect(checkedTab(tabs, 'Vue')).toBe(1);
  });

  it('shows at most six tabs', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: { tabs: Array.from({ length: 7 }, (_, i) => ({ label: `T${i}`, code: `c${i}` })) },
    });

    expect(wrapper.findAll('input')).toHaveLength(6);
    expect(wrapper.findAll('pre')).toHaveLength(6);
  });

  it('prints a tab’s highlighted markup as it is', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: {
        tabs: [{ label: 'PHP', code: 'echo', html: '<span class="line">echo</span>' }, tabs[1]!],
      },
    });

    expect(wrapper.findAll('code').map((code) => code.html())).toEqual([
      '<code><span class="line">echo</span></code>',
      '<code>&lt;PlinthBadge /&gt;</code>',
    ]);
  });

  it('takes selected as the starting tab only, as the browser keeps the reader’s choice', async () => {
    const wrapper = mount(PlinthCodeBlock, { props: { tabs, selected: 'Vue' } });
    await wrapper.setProps({ selected: 'Blade', copyLabel: 'Copy code' });
    const checked = wrapper
      .findAll('input')
      .map((input) => (input.element as HTMLInputElement).checked);

    expect(checked).toEqual([false, true]);
  });

  it('takes the tabs’ accessible name', () => {
    const wrapper = mount(PlinthCodeBlock, { props: { tabs, tabsLabel: 'Framework' } });

    expect(wrapper.get('[role="radiogroup"]').attributes('aria-label')).toBe('Framework');
  });

  it('generates the tabs’ name when it has no id', () => {
    const wrapper = mount(PlinthCodeBlock, { props: { tabs, id: '  ' } });
    const names = wrapper.findAll('input').map((input) => input.attributes('name'));

    expect(names[0]).toMatch(/^plinth-code-block-.+-language$/);
    expect(names[1]).toBe(names[0]);
    expect(wrapper.attributes('id')).toBeUndefined();
  });

  it('leaves out a blank label and the copy button when copy is off', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: { label: ' ', copy: false },
      slots: { default: 'npm run build' },
    });

    expect(flat(wrapper.html())).toBe(
      '<div class="plinth-code-block"><div class="plinth-code-block-header"></div>' +
        '<pre class="plinth-code-block-code" dir="ltr" tabindex="0"><code>npm run build</code></pre></div>',
    );
  });

  it('takes a label slot with markup, and leaves out an empty one', () => {
    const withBadge = mount(PlinthCodeBlock, {
      slots: { label: 'HTML <b>Parity</b>', default: 'x' },
    });
    const empty = mount(PlinthCodeBlock, { slots: { label: ' ', default: 'x' } });

    expect(withBadge.get('.plinth-code-block-label').html()).toBe(
      '<span class="plinth-code-block-label">HTML <b>Parity</b></span>',
    );
    expect(empty.find('.plinth-code-block-label').exists()).toBe(false);
  });

  it('prints the label prop when the label slot is blank', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: { label: 'brand.css' },
      slots: { label: ' ', default: 'x' },
    });

    expect(wrapper.get('.plinth-code-block-label').html()).toBe(
      '<span class="plinth-code-block-label">brand.css</span>',
    );
  });

  it('shows a label slot the parent adds later', async () => {
    const file = ref('');
    const wrapper = mount({
      components: { PlinthCodeBlock },
      setup: () => ({ file }),
      template: `<PlinthCodeBlock :copy="false">
        <template v-if="file" #label>{{ file }}</template>
        x
      </PlinthCodeBlock>`,
    });

    expect(wrapper.find('.plinth-code-block-label').exists()).toBe(false);
    file.value = 'brand.css';
    await nextTick();
    expect(wrapper.get('.plinth-code-block-label').text()).toBe('brand.css');
  });

  it('prints a highlighter’s markup as it is', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: { html: '<span class="line">const</span>' },
      slots: { default: 'ignored' },
    });

    expect(wrapper.get('code').html()).toBe('<code><span class="line">const</span></code>');
  });

  it('escapes the label, the tabs and the code', () => {
    const wrapper = mount(PlinthCodeBlock, {
      props: { label: '<b>x</b>', tabs: [{ label: '<i>y</i>', code: '<u>z</u>' }] },
    });

    expect(wrapper.html()).not.toMatch(/<(b|i|u)>/);
    expect(wrapper.html()).toContain('&lt;u&gt;z&lt;/u&gt;');
  });

  it('copies the code that shows, says so for two seconds, and emits copied', async () => {
    vi.useFakeTimers();
    const wrapper = mount(PlinthCodeBlock, {
      props: { tabs, copyLabel: 'Copiar', copiedLabel: 'Copiado' },
      attachTo: document.body,
    });
    await wrapper.findAll('input')[1]!.setValue(true);
    await wrapper.get('.plinth-code-block-copy').trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith('<PlinthBadge />');
    expect(wrapper.emitted('copied')).toEqual([['<PlinthBadge />']]);
    expect(wrapper.get('.plinth-button-label').text()).toBe('Copiado');
    expect(wrapper.get('[role="status"]').text()).toBe('Copiado');

    await wrapper.get('.plinth-code-block-copy').trigger('click');
    await flushPromises();
    vi.advanceTimersByTime(2000);
    await flushPromises();

    expect(wrapper.get('.plinth-button-label').text()).toBe('Copiar');
    expect(wrapper.get('[role="status"]').text()).toBe('');
    wrapper.unmount();
  });

  it('does nothing when the clipboard refuses', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const wrapper = mount(PlinthCodeBlock, { slots: { default: 'x' } });
    await flushPromises();
    await wrapper.get('.plinth-code-block-copy').trigger('click');
    await flushPromises();

    expect(wrapper.emitted('copied')).toBeUndefined();
    expect(wrapper.get('.plinth-button-label').text()).toBe('Copy');
  });

  it('prints a download button after the copy button, hidden until mounted', async () => {
    const html = await renderToString(
      h(PlinthCodeBlock, { download: ' codes.txt ' }, { default: () => 'a1b2' }),
    );

    expect(flat(html)).toBe(
      '<div class="plinth-code-block"><div class="plinth-code-block-header">' +
        copyButton(true) +
        '<button type="button" class="plinth-button plinth-code-block-download" data-variant="ghost" data-size="sm" hidden><span class="plinth-button-label">Download</span></button>' +
        '<span class="plinth-code-block-status" role="status"></span>' +
        '</div>' +
        '<pre class="plinth-code-block-code" dir="ltr" tabindex="0"><code>a1b2</code></pre>' +
        '</div>',
    );
  });

  it('shows the download button once mounted, and leaves it out without a file name', async () => {
    const shown = mount(PlinthCodeBlock, {
      props: { download: 'codes.txt' },
      slots: { default: 'x' },
    });
    const blank = mount(PlinthCodeBlock, { props: { download: ' ' }, slots: { default: 'x' } });
    await flushPromises();

    expect(shown.get('.plinth-code-block-download').attributes('hidden')).toBeUndefined();
    expect(blank.find('.plinth-code-block-download').exists()).toBe(false);
  });

  it('saves the code that shows, says so for two seconds, and emits downloaded', async () => {
    vi.useFakeTimers();
    const createObjectURL = vi.fn<(blob: Blob) => string>(() => 'blob:codes');
    const revokeObjectURL = vi.fn<(url: string) => void>();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      expect(this.href).toBe('blob:codes');
      expect(this.download).toBe('codes.txt');
    });
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    const wrapper = mount(PlinthCodeBlock, {
      props: {
        tabs,
        copy: false,
        download: 'codes.txt',
        downloadLabel: 'Descarregar',
        downloadedLabel: 'Descarregado',
      },
      attachTo: document.body,
    });
    await wrapper.findAll('input')[1]!.setValue(true);
    await wrapper.get('.plinth-code-block-download').trigger('click');
    const blob = createObjectURL.mock.calls[0]![0];

    expect(blob.type).toBe('text/plain');
    expect(await blob.text()).toBe('<PlinthBadge />');
    expect(click).toHaveBeenCalledOnce();
    expect(wrapper.emitted('downloaded')).toEqual([['<PlinthBadge />']]);
    expect(wrapper.get('.plinth-button-label').text()).toBe('Descarregado');
    expect(wrapper.get('[role="status"]').text()).toBe('Descarregado');

    await wrapper.get('.plinth-code-block-download').trigger('click');
    vi.advanceTimersByTime(2000);
    await flushPromises();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:codes');
    expect(wrapper.get('.plinth-button-label').text()).toBe('Descarregar');
    expect(wrapper.get('[role="status"]').text()).toBe('');
    wrapper.unmount();
    click.mockRestore();
  });

  it('saves text as a file through a temporary link', () => {
    vi.useFakeTimers();
    const revokeObjectURL = vi.fn<(url: string) => void>();
    Object.assign(URL, { createObjectURL: () => 'blob:x', revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    downloadText('x.txt', 'x');
    vi.runAllTimers();

    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:x');
    click.mockRestore();
  });

  it('finds the code of the only <pre>, or nothing outside a code block', () => {
    document.body.innerHTML =
      '<div class="plinth-code-block"><button></button><pre class="plinth-code-block-code"><code>a</code></pre></div><button id="lone"></button>';

    expect(codeBlockText(document.querySelector('.plinth-code-block button')!)).toBe('a');
    expect(codeBlockText(document.getElementById('lone')!)).toBe('');
    document.body.innerHTML = '';
  });

  it('keeps extra classes and attributes on the root', () => {
    const wrapper = mount(PlinthCodeBlock, {
      attrs: { class: 'ms-2', 'data-testid': 'install', 'aria-describedby': 'help' },
      slots: { default: 'x' },
    });

    expect(wrapper.classes()).toEqual(['plinth-code-block', 'ms-2']);
    expect(wrapper.attributes('data-testid')).toBe('install');
    expect(wrapper.attributes('aria-describedby')).toBe('help');
  });
});
