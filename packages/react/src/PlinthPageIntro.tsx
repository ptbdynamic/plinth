// Markup contract: packages/css/src/components/page-intro.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { pageHeaderLevel, type PageHeaderLevel } from './page-header';

interface PageIntroOptions {
  /** The page's heading. */
  heading: string;
  /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
  level?: PageHeaderLevel;
  /** A line under the heading saying what the page is for. */
  description?: string;
  /** The description's id, for an `aria-describedby` that points at it. */
  descriptionId?: string;
  /** Shown from 768px only, beside a page header shown on a phone only (data-wide-only). */
  wideOnly?: boolean;
  /** The actions: the page's primary button, or a button or two (Vue's `actions` slot). */
  actions?: ReactNode;
}

export type PlinthPageIntroProps = PageIntroOptions &
  Omit<ComponentProps<'div'>, keyof PageIntroOptions | 'children'>;

export function PlinthPageIntro({
  heading,
  level,
  description,
  descriptionId,
  wideOnly = false,
  actions,
  className,
  ...rest
}: PlinthPageIntroProps) {
  if (!heading?.trim()) {
    throw new Error("<PlinthPageIntro> needs a heading: it is the page's heading.");
  }
  const Heading = pageHeaderLevel(level);
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <div
      className={classNames('plinth-page-intro', className)}
      data-wide-only={wideOnly ? '' : undefined}
      {...rest}
    >
      <div className="plinth-page-intro-text">
        <Heading className="plinth-page-intro-heading">{heading}</Heading>
        {description?.trim() ? (
          <p
            className="plinth-page-intro-description"
            id={descriptionId?.trim() ? descriptionId : undefined}
          >
            {description}
          </p>
        ) : null}
      </div>
      {hasContent(actions) ? <div className="plinth-page-intro-actions">{actions}</div> : null}
    </div>
  );
}
