import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthSplitView, type SplitViewPane } from '../src/index.ts';

describe('PlinthSplitView', () => {
  it('prints the secondary, the list and the detail with its footer', () => {
    expect(
      renderToStaticMarkup(
        <PlinthSplitView
          pane="detail"
          secondaryClosed
          secondary={<nav>folders</nav>}
          list={<ul>tickets</ul>}
          footer={<form>reply</form>}
        >
          <article>ticket</article>
        </PlinthSplitView>,
      ),
    ).toBe(
      '<div data-pane="detail" data-secondary="closed" class="plinth-split-view">' +
        '<div class="plinth-split-view-secondary"><nav>folders</nav></div>' +
        '<div class="plinth-split-view-list"><ul>tickets</ul></div>' +
        '<div class="plinth-split-view-detail"><article>ticket</article><div class="plinth-split-view-footer"><form>reply</form></div></div>' +
        '</div>',
    );
  });

  it('shows the list by default, and prints no secondary or footer without content', () => {
    expect(
      renderToStaticMarkup(
        <PlinthSplitView secondary={null} list="list" footer=" ">
          detail
        </PlinthSplitView>,
      ),
    ).toBe(
      '<div data-pane="list" class="plinth-split-view"><div class="plinth-split-view-list">list</div><div class="plinth-split-view-detail">detail</div></div>',
    );
  });

  it('falls back to the list for an unknown pane', () => {
    expect(renderToStaticMarkup(<PlinthSplitView pane={'side' as SplitViewPane} />)).toContain(
      'data-pane="list"',
    );
  });

  it('spreads other props onto its root, with the ref, and the project wins a clash', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthSplitView ref={ref} pane="list" className="is-tall" data-pane="detail" id="inbox" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-split-view is-tall');
    expect(root.dataset.pane).toBe('detail');
    expect(root.id).toBe('inbox');
  });
});
