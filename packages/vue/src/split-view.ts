/**
 * The one pane a split view shows on a phone: `list` (the default) or `detail`. From 768px both
 * show, whichever the app names.
 */
export const splitViewPanes = ['list', 'detail'] as const;
export type SplitViewPane = (typeof splitViewPanes)[number];

/** A pane from the list, or `list` when it is not one of them. */
export function splitViewPane(value: string | undefined): SplitViewPane {
  return splitViewPanes.includes(value as SplitViewPane) ? (value as SplitViewPane) : 'list';
}
