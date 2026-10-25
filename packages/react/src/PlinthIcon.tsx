// Markup contract: packages/css/src/components/icon.css
import type { ComponentProps } from 'react';
import {
  iconGlyphs,
  iconName,
  iconSize,
  mirroredIconNames,
  type IconName,
  type IconSize,
} from './icon';
import { classNames } from './markup';

export type PlinthIconProps = Omit<ComponentProps<'span'>, 'name'> & {
  /** A built-in glyph; `children` show when it is missing or not one. */
  name?: IconName;
  size?: IconSize;
  /** Makes the icon meaningful; without it the icon is decorative and hidden. */
  label?: string;
  /** Flips the icon in right-to-left text, for icons that point a direction. */
  mirror?: boolean;
};

export function PlinthIcon({
  name,
  size,
  label,
  mirror = false,
  className,
  children,
  'aria-label': ariaLabel,
  ...rest
}: PlinthIconProps) {
  const glyph = iconName(name);
  // The label can also come as an aria-label attribute; a blank one leaves the icon decorative.
  const value = label ?? ariaLabel;
  const accessibleName = value?.trim() ? value : undefined;
  const mirrored = mirror || (glyph !== undefined && mirroredIconNames.includes(glyph));
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <span
      className={classNames('plinth-icon', className)}
      data-size={iconSize(size)}
      data-icon={glyph}
      data-mirror={mirrored ? '' : undefined}
      role={accessibleName ? 'img' : undefined}
      aria-label={accessibleName}
      aria-hidden={accessibleName ? undefined : 'true'}
      {...rest}
    >
      {glyph ? (
        // The glyph is iconGlyph(name) (icon.ts), written out; parity keeps the copies equal.
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
}
