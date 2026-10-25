import { splitViewPane, splitViewPanes, type SplitViewPane } from '@ptbdynamic/plinth-vue';
import { rootAttributes, type Attributes } from './markup.ts';

export { splitViewPanes, type SplitViewPane };

export interface SplitViewArgs {
  /** The one pane a phone shows: the list (the default) or the detail. */
  pane: SplitViewPane;
  /** Collapses the secondary column: data-secondary="closed". */
  secondaryClosed: boolean;
  /** The secondary column (trusted markup), such as folders; from 1280px. */
  secondary?: string;
  /** The list (trusted markup), such as the tickets. */
  list: string;
  /** The detail (trusted markup): the open item, or an empty state. */
  detail: string;
  /** Held to the detail's bottom edge (trusted markup), such as a reply box. */
  footer?: string;
}

/** The split view's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function splitView(
  { pane, secondaryClosed, secondary, list, detail, footer }: SplitViewArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-split-view', attributes);
  return [
    `<div class="${classes}"${extra} data-pane="${splitViewPane(pane)}"`,
    secondaryClosed ? ' data-secondary="closed"' : '',
    '>',
    secondary?.trim() ? `<div class="plinth-split-view-secondary">${secondary}</div>` : '',
    `<div class="plinth-split-view-list">${list}</div>`,
    `<div class="plinth-split-view-detail">${detail}`,
    footer?.trim() ? `<div class="plinth-split-view-footer">${footer}</div>` : '',
    '</div>',
    '</div>',
  ].join('');
}
