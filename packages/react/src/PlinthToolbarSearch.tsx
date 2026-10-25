// Markup contract: packages/css/src/components/toolbar.css
import type { ComponentProps, ReactNode } from 'react';
import { iconGlyphs } from './icon';
import { classNames, hasContent } from './markup';

interface ToolbarSearchOptions {
  /** The field's name (aria-label). */
  label?: string;
  /** The scope button and its menu (Vue's `scope` slot). */
  scope?: ReactNode;
}

/**
 * The toolbar's search. `className` goes on the root; every other prop (`value`, `onChange`,
 * `name`, `placeholder`, `ref`, …) on the `<input>`, where it wins.
 */
export type PlinthToolbarSearchProps = ToolbarSearchOptions &
  Omit<ComponentProps<'input'>, keyof ToolbarSearchOptions>;

export function PlinthToolbarSearch({
  label = 'Search',
  scope,
  className,
  ...rest
}: PlinthToolbarSearchProps) {
  if (!label?.trim()) {
    throw new Error("<PlinthToolbarSearch> needs a label: it is the field's name.");
  }

  return (
    <search className={classNames('plinth-toolbar-search', className)}>
      <span className="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: iconGlyphs.search }}
        />
      </span>
      <input type="search" className="plinth-toolbar-search-input" aria-label={label} {...rest} />
      {hasContent(scope) ? scope : null}
    </search>
  );
}
