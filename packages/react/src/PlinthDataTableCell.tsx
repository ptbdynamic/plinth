// Markup contract: packages/css/src/components/data-table.css
import type { ComponentProps } from 'react';
import {
  dataTableCellKind,
  type DataTableCellKind,
  dataTablePriority,
  type DataTablePriority,
} from './data-table';
import { classNames } from './markup';

interface DataTableCellOptions {
  /** The column's name, shown before the value on a phone's card. */
  label?: string;
  /** What the cell is on a phone's card: a labelled field, the card's title, or its actions. */
  kind?: DataTableCellKind;
  /** Numbers: aligned to the end, with figures of one width. */
  numeric?: boolean;
  /** Hidden on a phone's card; shown from 768px up. */
  hideOnPhone?: boolean;
  /**
   * Gives way as the table narrows, in a frame or a container: 3 shows from 960px of it, 2 from
   * 640px, 1 always.
   */
  priority?: DataTablePriority | 1 | 2 | 3;
}

export type PlinthDataTableCellProps = DataTableCellOptions &
  Omit<ComponentProps<'td'>, keyof DataTableCellOptions>;

export function PlinthDataTableCell({
  label,
  kind,
  numeric = false,
  hideOnPhone = false,
  priority,
  className,
  children,
  ...rest
}: PlinthDataTableCellProps) {
  return (
    <td
      role="cell"
      data-kind={dataTableCellKind(kind)}
      data-numeric={numeric ? '' : undefined}
      data-phone={hideOnPhone ? 'hidden' : undefined}
      data-priority={dataTablePriority(priority)}
      {...rest}
      className={classNames('plinth-data-table-cell', className)}
    >
      {label?.trim() ? (
        <span className="plinth-data-table-label" aria-hidden="true">
          {label}
        </span>
      ) : null}
      <span className="plinth-data-table-value">{children}</span>
    </td>
  );
}
