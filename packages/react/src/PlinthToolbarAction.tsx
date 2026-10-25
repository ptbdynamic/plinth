// Markup contract: packages/css/src/components/toolbar.css
import type { ComponentProps } from 'react';
import type { InvokerCommandProps } from './button';
import { iconGlyphs, iconName, mirroredIconNames, type IconName } from './icon';
import { classNames } from './markup';

interface ToolbarActionOptions {
  /** The action's name, shown beside its icon in a toolbar 1024px wide or more. */
  label: string;
  /** A built-in glyph; `children` (the project's SVG) show when it is missing or not one. */
  icon?: IconName;
  /** Hidden in a toolbar narrower than 1024px, where the app shows it in the ⋯ menu instead. */
  overflow?: boolean;
  disabled?: boolean;
}

/** One of a toolbar's actions: a ghost `<button>` with its icon and its label. */
export type PlinthToolbarActionProps = ToolbarActionOptions &
  InvokerCommandProps &
  Omit<ComponentProps<'button'>, keyof ToolbarActionOptions | keyof InvokerCommandProps>;

export function PlinthToolbarAction({
  label,
  icon,
  overflow = false,
  disabled = false,
  className,
  children,
  ...rest
}: PlinthToolbarActionProps) {
  if (!label?.trim()) {
    throw new Error("<PlinthToolbarAction> needs a label: it is the action's name.");
  }
  const glyph = iconName(icon);

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <button
      type="button"
      data-variant="ghost"
      data-size="md"
      data-overflow={overflow ? '' : undefined}
      disabled={disabled || undefined}
      {...rest}
      className={classNames('plinth-button plinth-toolbar-action', className)}
    >
      <span
        className="plinth-icon"
        data-size="md"
        data-icon={glyph}
        data-mirror={glyph !== undefined && mirroredIconNames.includes(glyph) ? '' : undefined}
        aria-hidden="true"
      >
        {glyph ? (
          // The glyph is iconGlyph(icon) (icon.ts), written out; parity keeps the copies equal.
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: iconGlyphs[glyph] }}
          />
        ) : (
          children
        )}
      </span>
      <span className="plinth-button-label">{label}</span>
    </button>
  );
}
