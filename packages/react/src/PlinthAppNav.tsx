// Markup contract: packages/css/src/components/app-nav.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';

interface AppNavOptions {
  /** The navigation's accessible name (aria-label). */
  label?: string;
  /** The app's name, beside its mark; the rail hides it but keeps it as the brand's name. */
  brandName?: string;
  /** Makes the brand a link, to the app's home. */
  brandHref?: string;
  /** The app's logo mark: the rail shows it alone (Vue's `mark` slot). */
  mark?: ReactNode;
  /** Below the items, on the bottom edge: more items, or the account (Vue's `footer` slot). */
  footer?: ReactNode;
}

/** A `<nav>` holding the brand, the items (`children`) and the footer. */
export type PlinthAppNavProps = AppNavOptions & Omit<ComponentProps<'nav'>, keyof AppNavOptions>;

export function PlinthAppNav({
  label,
  brandName,
  brandHref,
  mark,
  footer,
  className,
  children,
  ...rest
}: PlinthAppNavProps) {
  // Blank text counts as missing, as Blade's filled() decides.
  const name = brandName?.trim() ? brandName : undefined;
  const hasMark = hasContent(mark);
  const BrandTag = brandHref?.trim() ? 'a' : 'div';

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <nav
      aria-label={label?.trim() ? label : undefined}
      {...rest}
      className={classNames('plinth-app-nav', className)}
    >
      {name || hasMark ? (
        <BrandTag className="plinth-app-nav-brand" href={BrandTag === 'a' ? brandHref : undefined}>
          {hasMark ? (
            <span className="plinth-app-nav-mark" aria-hidden={name ? 'true' : undefined}>
              {mark}
            </span>
          ) : null}
          {name ? <span className="plinth-app-nav-name">{name}</span> : null}
        </BrandTag>
      ) : null}
      <div className="plinth-app-nav-items">{children}</div>
      {hasContent(footer) ? <div className="plinth-app-nav-footer">{footer}</div> : null}
    </nav>
  );
}
