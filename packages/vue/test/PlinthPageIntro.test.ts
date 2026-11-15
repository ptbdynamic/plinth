import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthPageIntro } from '../src/index.ts';

describe('PlinthPageIntro', () => {
  it('prints the heading, the description and the actions', () => {
    const wrapper = mount(PlinthPageIntro, {
      props: {
        heading: 'Users',
        description: 'Who can sign in.',
        descriptionId: 'users-description',
      },
      slots: { actions: '<button type="button">Invite user</button>' },
    });

    expect(wrapper.html().replace(/>\s+</g, '><')).toBe(
      '<div class="plinth-page-intro">' +
        '<div class="plinth-page-intro-text">' +
        '<h1 class="plinth-page-intro-heading">Users</h1>' +
        '<p class="plinth-page-intro-description" id="users-description">Who can sign in.</p>' +
        '</div>' +
        '<div class="plinth-page-intro-actions"><button type="button">Invite user</button></div>' +
        '</div>',
    );
  });

  it('prints only the heading without a description or actions', () => {
    const wrapper = mount(PlinthPageIntro, { props: { heading: 'Settings' } });

    expect(wrapper.find('.plinth-page-intro-description').exists()).toBe(false);
    expect(wrapper.find('.plinth-page-intro-actions').exists()).toBe(false);
  });

  it('leaves out a blank description, description id and actions', () => {
    const blank = mount(PlinthPageIntro, {
      props: { heading: 'Users', description: ' ', descriptionId: 'd' },
      slots: { actions: ' ' },
    });
    expect(blank.find('.plinth-page-intro-description').exists()).toBe(false);
    expect(blank.find('.plinth-page-intro-actions').exists()).toBe(false);

    const noId = mount(PlinthPageIntro, {
      props: { heading: 'Users', description: 'Who', descriptionId: ' ' },
    });
    expect(noId.find('.plinth-page-intro-description').attributes('id')).toBeUndefined();
  });

  it('prints the heading at the level asked for, and h1 for one it does not know', () => {
    const tag = (level?: string) =>
      mount(PlinthPageIntro, { props: { heading: 'Users', level: level as 'h1' } }).find(
        '.plinth-page-intro-heading',
      ).element.tagName;

    expect(tag('h2')).toBe('H2');
    expect(tag('h6')).toBe('H6');
    expect(tag('h7')).toBe('H1');
    expect(tag()).toBe('H1');
  });

  it('shows from 768px only with wideOnly', () => {
    expect(
      mount(PlinthPageIntro, { props: { heading: 'Users', wideOnly: true } }).attributes(
        'data-wide-only',
      ),
    ).toBe('');
    expect(
      mount(PlinthPageIntro, { props: { heading: 'Users' } }).attributes('data-wide-only'),
    ).toBeUndefined();
  });

  it('needs a heading', () => {
    expect(() => mount(PlinthPageIntro, { props: { heading: ' ' } })).toThrow('needs a heading');
    expect(() => mount(PlinthPageIntro, { props: {} as { heading: string } })).toThrow(
      'needs a heading',
    );
  });

  it('escapes the heading and the description', () => {
    const html = mount(PlinthPageIntro, {
      props: { heading: '<b>Users</b>', description: '<i>Who</i>' },
    }).html();

    expect(html).toContain('&lt;b&gt;Users&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;Who&lt;/i&gt;');
  });

  it('keeps extra classes and attributes, and the project wins a clash', () => {
    const wrapper = mount(PlinthPageIntro, {
      props: { heading: 'Users', wideOnly: true },
      attrs: { class: 'mb-4', id: 'intro', 'data-testid': 'intro', 'data-wide-only': 'desktop' },
    });

    expect(wrapper.classes()).toEqual(['plinth-page-intro', 'mb-4']);
    expect(wrapper.attributes('id')).toBe('intro');
    expect(wrapper.attributes('data-testid')).toBe('intro');
    expect(wrapper.attributes('data-wide-only')).toBe('desktop');
  });
});
