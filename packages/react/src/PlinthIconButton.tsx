// Markup contract: packages/css/src/components/button.css (icon button)
import type { ComponentProps } from 'react';
import { buttonVariant, type ButtonVariant, type InvokerCommandProps } from './button';
import { iconGlyphs, iconName, mirroredIconNames, type IconName } from './icon';
import { classNames } from './markup';
import { controlSizes, iconSizeFor, resolveSize, type ControlSize } from './size';

interface IconButtonOptions {
  /** The accessible name: required, since the button has no visible text. */
  label: string;
  /** A built-in glyph; `children` show when it is missing or not one. */
  icon?: IconName;
  variant?: ButtonVariant;
  size?: ControlSize;
  disabled?: boolean;
  busy?: boolean;
  /** Makes it a toggle: true or false prints aria-pressed. */
  pressed?: boolean | null;
  /** Flips the icon in right-to-left text, for icons that point a direction. */
  mirror?: boolean;
}

/**
 * A `<button>` with only an icon, or with an `href` a link that looks like one. The button takes
 * `commandfor` and `command`; a link doesn't.
 */
export type PlinthIconButtonProps =
  | (IconButtonOptions &
      InvokerCommandProps &
      Omit<ComponentProps<'button'>, keyof IconButtonOptions | keyof InvokerCommandProps> & {
        href?: undefined;
      })
  | (IconButtonOptions & Omit<ComponentProps<'a'>, keyof IconButtonOptions> & { href: string });

export function PlinthIconButton({
  label,
  icon,
  href,
  variant = 'ghost',
  size,
  disabled = false,
  busy = false,
  pressed = null,
  mirror = false,
  className,
  children,
  'aria-label': ariaLabel,
  ...rest
}: PlinthIconButtonProps) {
  const dataSize = resolveSize(size, controlSizes, 'md');
  const isBusy = busy && !disabled;
  const glyph = iconName(icon);
  const common = {
    className: classNames('plinth-button plinth-icon-button', className),
    'data-variant': buttonVariant(variant),
    'data-size': dataSize,
    'aria-label': label || ariaLabel,
    'aria-busy': isBusy ? ('true' as const) : undefined,
  };
  const content = isBusy ? (
    <span className="plinth-button-spinner" aria-hidden="true"></span>
  ) : (
    <span
      className="plinth-icon"
      data-size={iconSizeFor(dataSize)}
      data-icon={glyph}
      data-mirror={
        mirror || (glyph !== undefined && mirroredIconNames.includes(glyph)) ? '' : undefined
      }
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
  );

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  if (href) {
    return (
      <a
        {...common}
        href={disabled ? undefined : href}
        role={disabled ? 'link' : undefined}
        aria-disabled={isBusy || disabled ? 'true' : undefined}
        {...(rest as ComponentProps<'a'>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...common}
      aria-pressed={pressed === null ? undefined : pressed ? 'true' : 'false'}
      disabled={disabled || undefined}
      aria-disabled={isBusy ? 'true' : undefined}
      {...(rest as ComponentProps<'button'>)}
    >
      {content}
    </button>
  );
}
