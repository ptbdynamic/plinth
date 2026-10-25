// Markup contract: packages/css/src/components/stat.css
import type { ComponentProps, ElementType, Ref } from 'react';
import { calloutIcons } from './callout';
import { classNames } from './markup';
import { tone as toTone, type Tone } from './tones';

interface StatOptions {
  /** What the number is: "Runs today". */
  label: string;
  /** The number, formatted by the app. Empty (or missing) prints the empty state. */
  value?: string | number | null;
  /** A supporting line under the value: a change, a target or "of €150". */
  description?: string;
  /** The supporting line's tone, with its own icon so it never rests on colour alone. */
  tone?: Tone;
  /** What screen readers say for an empty value. */
  emptyLabel?: string;
}

/**
 * A link to the detail behind the number with an `href`, otherwise a static `<div>`. Without an
 * `href` the root is a `<div>`; its `ref` is an HTMLElement either way.
 */
export type PlinthStatProps =
  | (StatOptions & Omit<ComponentProps<'a'>, keyof StatOptions> & { href: string })
  | (StatOptions &
      Omit<ComponentProps<'div'>, keyof StatOptions | 'ref'> & {
        href?: undefined;
        ref?: Ref<HTMLElement>;
      });

export function PlinthStat({
  label,
  value = null,
  description,
  tone,
  href,
  emptyLabel = 'Not available',
  className,
  ...rest
}: PlinthStatProps) {
  const Tag = (href ? 'a' : 'div') as ElementType;
  const dataTone = toTone(tone);
  const empty = value === null || String(value).trim() === '';

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <Tag
      href={href || undefined}
      data-tone={dataTone}
      {...rest}
      className={classNames('plinth-stat', className)}
    >
      <span className="plinth-stat-label">{label}</span>
      {empty ? (
        <span className="plinth-stat-value is-empty">
          <span aria-hidden="true">—</span>
          <span className="plinth-stat-empty">{emptyLabel}</span>
        </span>
      ) : (
        <span className="plinth-stat-value">{value}</span>
      )}
      {description?.trim() ? (
        <span className="plinth-stat-description">
          {dataTone === 'neutral' ? null : (
            <span
              className="plinth-icon plinth-stat-tone"
              data-size="sm"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: calloutIcons[dataTone] }}
            />
          )}
          {description}
        </span>
      ) : null}
      {/* The chevron is statChevron (stat.ts), written out; parity keeps the copies equal. */}
      {href ? (
        <span
          className="plinth-icon plinth-stat-chevron"
          data-size="sm"
          data-mirror=""
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6"></path>
          </svg>
        </span>
      ) : null}
    </Tag>
  );
}
