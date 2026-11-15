/** How the breadcrumbs collapse on a phone. `none` (the default) keeps the full trail. */
export const breadcrumbsCollapses = ['none', 'parent'] as const;
export type BreadcrumbsCollapse = (typeof breadcrumbsCollapses)[number];

/** A collapse from the list, or `none` when it is not one of them. */
export function breadcrumbsCollapse(value: string | undefined): BreadcrumbsCollapse {
  return breadcrumbsCollapses.includes(value as BreadcrumbsCollapse)
    ? (value as BreadcrumbsCollapse)
    : 'none';
}
