// Markup contract: packages/css/src/components/toolbar.css
import type { ComponentProps } from 'react';
import type { InvokerCommandProps } from './button';
import { iconGlyphs } from './icon';
import { classNames } from './markup';

interface ToolbarScopeOptions {
  /** Where the search looks, as the button shows it: In: Open, All folders. */
  label: string;
}

/** The search's scope: a `<button>` that opens the app's menu of scopes (`popoverTarget`). */
export type PlinthToolbarScopeProps = ToolbarScopeOptions &
  InvokerCommandProps &
  Omit<
    ComponentProps<'button'>,
    keyof ToolbarScopeOptions | keyof InvokerCommandProps | 'children'
  >;

export function PlinthToolbarScope({ label, className, ...rest }: PlinthToolbarScopeProps) {
  if (!label?.trim()) {
    throw new Error("<PlinthToolbarScope> needs a label: it is the button's text and name.");
  }

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <button type="button" {...rest} className={classNames('plinth-toolbar-scope', className)}>
      <span className="plinth-toolbar-scope-label">{label}</span>
      <span className="plinth-icon" data-size="sm" data-icon="chevron-down" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: iconGlyphs['chevron-down'] }}
        />
      </span>
    </button>
  );
}
