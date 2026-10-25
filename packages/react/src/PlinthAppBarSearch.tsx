// Markup contract: packages/css/src/components/app-bar.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';
import { PlinthIcon } from './PlinthIcon';

interface AppBarSearchOptions {
  /** The button's text and name. */
  label?: string;
  /** The keyboard hint after the label, such as ⌘K or Ctrl K; the app picks it. */
  shortcut?: string;
}

/** The app bar's search button: it opens the app's search. */
export type PlinthAppBarSearchProps = AppBarSearchOptions &
  Omit<ComponentProps<'button'>, keyof AppBarSearchOptions | 'children'>;

export function PlinthAppBarSearch({
  label = 'Search',
  shortcut,
  className,
  ...rest
}: PlinthAppBarSearchProps) {
  if (!label?.trim()) {
    throw new Error("<PlinthAppBarSearch> needs a label: it is the button's text and name.");
  }
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <button type="button" {...rest} className={classNames('plinth-app-bar-search', className)}>
      <PlinthIcon name="search" size="sm" />
      <span className="plinth-app-bar-search-label">{label}</span>
      {shortcut?.trim() ? (
        <kbd className="plinth-app-bar-search-shortcut" aria-hidden="true">
          {shortcut}
        </kbd>
      ) : null}
    </button>
  );
}
