/** The levels the page header's heading can take. `h1` is the default. */
export const pageHeaderLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type PageHeaderLevel = (typeof pageHeaderLevels)[number];

/** A level from the list, or `h1` when it is not one of them. */
export function pageHeaderLevel(value: string | undefined): PageHeaderLevel {
  return pageHeaderLevels.includes(value as PageHeaderLevel) ? (value as PageHeaderLevel) : 'h1';
}
