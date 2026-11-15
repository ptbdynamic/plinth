// Markup contract: packages/css/src/components/data-table.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames } from './markup';

interface DataTableOptions {
  /** The table's name, shown above it. Without it, name the table with aria-label. */
  caption?: string;
  /** The column headers, PlinthDataTableColumn elements (Vue's `head` slot). */
  head?: ReactNode;
  /** A card of its own from 768px up: a frame that scrolls a wide table, and a header band. */
  framed?: boolean;
  /**
   * In a size container (plinth-data-table-container), so columns with a priority give way to
   * the table's own width. A framed table is in one already.
   */
  contained?: boolean;
}

/** A table that becomes a card per row on a phone: `children` are its rows. */
export type PlinthDataTableProps = DataTableOptions &
  Omit<ComponentProps<'table'>, keyof DataTableOptions>;

export function PlinthDataTable({
  caption,
  head,
  framed = false,
  contained = false,
  className,
  children,
  ...rest
}: PlinthDataTableProps) {
  const table = (
    <table role="table" {...rest} className={classNames('plinth-data-table', className)}>
      {caption?.trim() ? <caption className="plinth-data-table-caption">{caption}</caption> : null}
      <thead className="plinth-data-table-head" role="rowgroup">
        <tr className="plinth-data-table-head-row" role="row">
          {head}
        </tr>
      </thead>
      <tbody className="plinth-data-table-body" role="rowgroup">
        {children}
      </tbody>
    </table>
  );
  // The frame and the container take no props: the table is the root, framed or not.
  if (framed) return <div className="plinth-data-table-frame">{table}</div>;
  return contained ? <div className="plinth-data-table-container">{table}</div> : table;
}
