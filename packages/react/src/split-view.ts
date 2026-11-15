/**
 * The one pane a split view shows on a phone: `list` (the default) or `detail`. From 768px both
 * show, whichever the app names (from 1280px with the `lg` split).
 */
export const splitViewPanes = ['list', 'detail'] as const;
export type SplitViewPane = (typeof splitViewPanes)[number];

/** A pane from the list, or `list` when it is not one of them. */
export function splitViewPane(value: string | undefined): SplitViewPane {
  return splitViewPanes.includes(value as SplitViewPane) ? (value as SplitViewPane) : 'list';
}

/**
 * Where a split view puts the list and the detail side by side: `md` (the default, from 768px) or
 * `lg` (from 1280px, one pane up to there).
 */
export const splitViewSplits = ['md', 'lg'] as const;
export type SplitViewSplit = (typeof splitViewSplits)[number];

/** A split from the list, or `md` when it is not one of them. */
export function splitViewSplit(value: string | undefined): SplitViewSplit {
  return splitViewSplits.includes(value as SplitViewSplit) ? (value as SplitViewSplit) : 'md';
}
