import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthSplitView, type SplitViewPane } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthSplitView', () => {
  it('prints the secondary, the list and the detail with its footer', () => {
    const wrapper = mount(PlinthSplitView, {
      props: { pane: 'detail', secondaryClosed: true },
      slots: {
        secondary: '<nav>folders</nav>',
        list: '<ul>tickets</ul>',
        default: '<article>ticket</article>',
        footer: '<form>reply</form>',
      },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-split-view" data-pane="detail" data-secondary="closed">' +
        '<div class="plinth-split-view-secondary"><nav>folders</nav></div>' +
        '<div class="plinth-split-view-list"><ul>tickets</ul></div>' +
        '<div class="plinth-split-view-detail"><article>ticket</article><div class="plinth-split-view-footer"><form>reply</form></div></div>' +
        '</div>',
    );
  });

  it('shows the list by default, and prints no secondary or footer without content', () => {
    const wrapper = mount(PlinthSplitView, {
      slots: { secondary: () => [], list: 'list', default: '<p>detail</p>', footer: () => ' ' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-split-view" data-pane="list"><!--v-if--><div class="plinth-split-view-list">list</div><div class="plinth-split-view-detail"><p>detail</p><!--v-if--></div></div>',
    );
  });

  it('falls back to the list for an unknown pane', () => {
    const wrapper = mount(PlinthSplitView, { props: { pane: 'side' as SplitViewPane } });

    expect(wrapper.attributes('data-pane')).toBe('list');
  });

  it('lets attributes fall through to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthSplitView, {
      props: { pane: 'list' },
      attrs: { class: 'is-tall', 'data-pane': 'detail', id: 'inbox' },
    });

    expect(wrapper.classes()).toEqual(['plinth-split-view', 'is-tall']);
    expect(wrapper.attributes('data-pane')).toBe('detail');
    expect(wrapper.attributes('id')).toBe('inbox');
  });
});
