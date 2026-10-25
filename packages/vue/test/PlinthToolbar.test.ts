import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  PlinthToolbar,
  PlinthToolbarAction,
  PlinthToolbarGroup,
  PlinthToolbarScope,
  PlinthToolbarSearch,
  iconGlyph,
  toolbarKeys,
  useToolbarKeys,
} from '../src/index.ts';

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('PlinthToolbar', () => {
  it('prints the actions in a toolbar named Actions by default', () => {
    const wrapper = mount(PlinthToolbar, { slots: { default: '<button>Assign</button>' } });

    expect(wrapper.html()).toBe(
      '<div class="plinth-toolbar">\n' +
        '  <!--v-if-->\n' +
        '  <!--v-if-->\n' +
        '  <div class="plinth-toolbar-actions" role="toolbar" aria-label="Actions"><button tabindex="0">Assign</button></div>\n' +
        '</div>',
    );
  });

  it('prints the search and the target, escaped, and the label', () => {
    const wrapper = mount(PlinthToolbar, {
      props: { label: 'Ticket actions', target: '<b>2</b> selected' },
      slots: { search: '<div class="search"></div>' },
    });

    expect(wrapper.find('.search').exists()).toBe(true);
    expect(wrapper.find('.plinth-toolbar-target').html()).toBe(
      '<p class="plinth-toolbar-target">&lt;b&gt;2&lt;/b&gt; selected</p>',
    );
    expect(wrapper.find('[role="toolbar"]').attributes('aria-label')).toBe('Ticket actions');
  });

  it('leaves out a blank target and an empty search', () => {
    const wrapper = mount(PlinthToolbar, {
      props: { target: ' ' },
      slots: { search: () => [] },
    });

    expect(wrapper.find('.plinth-toolbar-target').exists()).toBe(false);
    expect(wrapper.findAll('.plinth-toolbar > *')).toHaveLength(1);
  });

  it('keeps extra classes and attributes on the root', () => {
    const wrapper = mount(PlinthToolbar, { attrs: { class: 'ms-2', id: 'extra' } });

    expect(wrapper.classes()).toEqual(['plinth-toolbar', 'ms-2']);
    expect(wrapper.attributes('id')).toBe('extra');
  });

  it('needs a label', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(PlinthToolbar, { props: { label: ' ' } })).toThrow(/needs a label/);
  });

  it('moves between the actions with the arrow keys, and stops on unmount', async () => {
    const wrapper = mount(PlinthToolbar, {
      attachTo: document.body,
      slots: { default: '<button>Assign</button><button>Solve</button>' },
    });
    const [assign, solve] = wrapper.findAll('button').map((b) => b.element);

    assign!.focus();
    assign!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(document.activeElement).toBe(solve);
    expect(solve!.tabIndex).toBe(0);
    expect(assign!.tabIndex).toBe(-1);

    const toolbar = wrapper.find('[role="toolbar"]').element;
    const removed = vi.spyOn(toolbar, 'removeEventListener');
    wrapper.unmount();
    expect(removed).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

describe('PlinthToolbarGroup', () => {
  it('prints a group, named when it has a label', () => {
    expect(mount(PlinthToolbarGroup, { slots: { default: 'x' } }).html()).toBe(
      '<div class="plinth-toolbar-group" role="group">x</div>',
    );
    expect(mount(PlinthToolbarGroup, { props: { label: 'Remove' } }).attributes('aria-label')).toBe(
      'Remove',
    );
    expect(mount(PlinthToolbarGroup, { props: { label: ' ' } }).attributes('aria-label')).toBe(
      undefined,
    );
  });

  it('keeps extra attributes, and the project wins a clash', () => {
    const wrapper = mount(PlinthToolbarGroup, { attrs: { class: 'x', role: 'none' } });

    expect(wrapper.classes()).toEqual(['plinth-toolbar-group', 'x']);
    expect(wrapper.attributes('role')).toBe('none');
  });
});

describe('PlinthToolbarAction', () => {
  it('prints a ghost button with the icon from the slot and the label', () => {
    const wrapper = mount(PlinthToolbarAction, {
      props: { label: '<Assign>' },
      slots: { default: '<svg></svg>' },
    });

    expect(wrapper.html()).toBe(
      '<button type="button" class="plinth-button plinth-toolbar-action" data-variant="ghost" data-size="md"><span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span><span class="plinth-button-label">&lt;Assign&gt;</span></button>',
    );
  });

  it('prints a built-in glyph, mirrored when it points a way', () => {
    const wrapper = mount(PlinthToolbarAction, { props: { label: 'Back', icon: 'back' } });
    const icon = wrapper.find('.plinth-icon');

    expect(icon.attributes('data-icon')).toBe('back');
    expect(icon.attributes('data-mirror')).toBe('');
    expect(icon.html()).toContain(iconGlyph('back').replace(/<\/?svg[^>]*>/g, ''));
    expect(
      mount(PlinthToolbarAction, { props: { label: 'More', icon: 'more' } })
        .find('.plinth-icon')
        .attributes('data-mirror'),
    ).toBeUndefined();
  });

  it('overflows and disables', () => {
    const wrapper = mount(PlinthToolbarAction, {
      props: { label: 'Delete', overflow: true, disabled: true },
    });

    expect(wrapper.attributes('data-overflow')).toBe('');
    expect(wrapper.attributes('disabled')).toBe('');
  });

  it('keeps extra attributes, and the project wins a clash', () => {
    const wrapper = mount(PlinthToolbarAction, {
      props: { label: 'Send' },
      attrs: { class: 'x', type: 'submit', 'data-size': 'lg' },
    });

    expect(wrapper.classes()).toEqual(['plinth-button', 'plinth-toolbar-action', 'x']);
    expect(wrapper.attributes('type')).toBe('submit');
    expect(wrapper.attributes('data-size')).toBe('lg');
  });

  it('needs a label', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(PlinthToolbarAction, { props: { label: ' ' } })).toThrow(/needs a label/);
  });
});

describe('PlinthToolbarScope', () => {
  it('prints the scope button with its label and chevron', () => {
    const wrapper = mount(PlinthToolbarScope, {
      props: { label: 'In: <Open>' },
      attrs: { popovertarget: 'scope', class: 'x' },
    });

    expect(wrapper.html()).toBe(
      `<button type="button" class="plinth-toolbar-scope x" popovertarget="scope"><span class="plinth-toolbar-scope-label">In: &lt;Open&gt;</span><span class="plinth-icon" data-size="sm" data-icon="chevron-down" aria-hidden="true">${iconGlyph('chevron-down')}</span></button>`,
    );
  });

  it('needs a label', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(PlinthToolbarScope, { props: { label: '' } })).toThrow(/needs a label/);
  });
});

describe('PlinthToolbarSearch', () => {
  it('prints the search with its icon and field, named Search by default', () => {
    const wrapper = mount(PlinthToolbarSearch);

    expect(wrapper.html()).toBe(
      `<search class="plinth-toolbar-search"><span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true">${iconGlyph('search')}</span><input type="search" class="plinth-toolbar-search-input" aria-label="Search">\n  <!--v-if-->\n</search>`,
    );
  });

  it('prints the scope, the class on the root and every other attribute on the field', () => {
    const wrapper = mount(PlinthToolbarSearch, {
      props: { label: 'Search tickets' },
      attrs: { class: 'x', name: 'q', 'aria-label': 'Find' },
      slots: { scope: '<button class="scope">In: Open</button>' },
    });

    expect(wrapper.classes()).toEqual(['plinth-toolbar-search', 'x']);
    expect(wrapper.find('input').attributes()).toMatchObject({ name: 'q', 'aria-label': 'Find' });
    expect(wrapper.find('input').classes()).toEqual(['plinth-toolbar-search-input']);
    expect(wrapper.find('.scope').exists()).toBe(true);
  });

  it('needs a label', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(PlinthToolbarSearch, { props: { label: ' ' } })).toThrow(/needs a label/);
  });
});

/** A toolbar with the buttons and links given, attached to the document. */
function bar(html: string, dir?: string): HTMLElement {
  const toolbar = document.createElement('div');
  toolbar.setAttribute('role', 'toolbar');
  toolbar.innerHTML = html;
  const host = document.createElement('div');
  if (dir) host.setAttribute('dir', dir);
  host.append(toolbar);
  document.body.append(host);
  return toolbar;
}

const press = (element: Element, key: string, init: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  element.dispatchEvent(event);
  return event;
};

describe('toolbarKeys', () => {
  it('makes the first control the one tab stop', () => {
    const toolbar = bar('<button>A</button><a href="#b">B</a><a>no href</a>');
    toolbarKeys(toolbar);

    expect([...toolbar.children].map((c) => c.getAttribute('tabindex'))).toEqual(['0', '-1', null]);
  });

  it('moves with the arrow keys, wrapping, and with Home and End', () => {
    const toolbar = bar('<button>A</button><button>B</button><button>C</button>');
    toolbarKeys(toolbar);
    const [a, b, c] = [...toolbar.children] as HTMLElement[];

    a!.focus();
    expect(press(a!, 'ArrowRight').defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
    press(b!, 'ArrowLeft');
    expect(document.activeElement).toBe(a);
    press(a!, 'ArrowLeft');
    expect(document.activeElement).toBe(c);
    press(c!, 'ArrowRight');
    expect(document.activeElement).toBe(a);
    press(a!, 'End');
    expect(document.activeElement).toBe(c);
    press(c!, 'Home');
    expect(document.activeElement).toBe(a);
    expect([a, b, c].map((x) => x!.tabIndex)).toEqual([0, -1, -1]);
  });

  it('turns the arrows round in right-to-left text', () => {
    const toolbar = bar('<button>A</button><button>B</button>', 'rtl');
    const real = window.getComputedStyle;
    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      (element: Element) =>
        ({
          ...real(element),
          direction: element === toolbar ? 'rtl' : 'ltr',
        }) as CSSStyleDeclaration,
    );
    toolbarKeys(toolbar);
    const [a, b] = [...toolbar.children] as HTMLElement[];

    a!.focus();
    press(a!, 'ArrowLeft');
    expect(document.activeElement).toBe(b);
    press(b!, 'ArrowRight');
    expect(document.activeElement).toBe(a);
  });

  it('leaves other keys, modified keys and keys from outside the controls alone', () => {
    const toolbar = bar(
      '<button>A</button><button>B</button><div popover><button>M</button></div>',
    );
    toolbarKeys(toolbar);
    const [a] = [...toolbar.children] as HTMLElement[];
    const item = toolbar.querySelector('[popover] button') as HTMLElement;

    a!.focus();
    expect(press(a!, 'Enter').defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { altKey: true }).defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { ctrlKey: true }).defaultPrevented).toBe(false);
    expect(press(a!, 'ArrowRight', { metaKey: true }).defaultPrevented).toBe(false);
    expect(press(item, 'ArrowRight').defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(a);
    expect(item.getAttribute('tabindex')).toBeNull();
    item.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(a!.tabIndex).toBe(0);
  });

  it('skips disabled and hidden controls', () => {
    const toolbar = bar('<button>A</button><button disabled>B</button><button>C</button>');
    const [a, , c] = [...toolbar.children] as HTMLElement[];
    Object.assign(c!, { checkVisibility: () => false });
    const d = document.createElement('button');
    toolbar.append(d);
    toolbarKeys(toolbar);

    a!.focus();
    press(a!, 'ArrowRight');
    expect(document.activeElement).toBe(d);
  });

  it('counts a toolbar inside a popover', () => {
    const popover = document.createElement('div');
    popover.setAttribute('popover', '');
    document.body.append(popover);
    const toolbar = document.createElement('div');
    toolbar.innerHTML = '<button>A</button><button>B</button>';
    popover.append(toolbar);
    toolbarKeys(toolbar);

    expect(toolbar.querySelectorAll('[tabindex="-1"]')).toHaveLength(1);
  });

  it('keeps the focused control as the tab stop, and follows changes', async () => {
    const toolbar = bar('<button>A</button><button>B</button>');
    const stop = toolbarKeys(toolbar);
    const [a, b] = [...toolbar.children] as HTMLElement[];

    b!.focus();
    expect([a!.tabIndex, b!.tabIndex]).toEqual([-1, 0]);

    // B goes: the first control is the tab stop again; a new control joins at -1.
    b!.remove();
    const c = document.createElement('button');
    toolbar.append(c);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect([a!.tabIndex, c.tabIndex]).toEqual([0, -1]);

    // A width change re-checks which controls show.
    a!.setAttribute('disabled', '');
    window.dispatchEvent(new Event('resize'));
    expect(c.tabIndex).toBe(0);

    stop();
    a!.removeAttribute('disabled');
    window.dispatchEvent(new Event('resize'));
    expect(a!.tabIndex).toBe(0);
    c.focus();
    expect(c.tabIndex).toBe(0);
    expect(a!.tabIndex).toBe(0);
  });

  it('runs on a component ref from mounting to unmounting, and without one does nothing', () => {
    const Empty = defineComponent({
      setup() {
        useToolbarKeys(ref<HTMLElement>());
        return () => h('div');
      },
    });
    expect(() => mount(Empty).unmount()).not.toThrow();
  });
});
