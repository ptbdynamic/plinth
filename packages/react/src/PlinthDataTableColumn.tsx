// Markup contract: packages/css/src/components/data-table.css
import type { ComponentProps } from 'react';
import {
  dataTableSort,
  type DataTableSort,
  dataTablePriority,
  type DataTablePriority,
} from './data-table';
import { classNames } from './markup';

interface DataTableColumnOptions {
  /** A sortable column's state, printed as aria-sort; put a PlinthDataTableSort in it. */
  sort?: DataTableSort;
  /** Numbers: aligned to the end, with figures of one width. */
  numeric?: boolean;
  /** Hidden on a phone's card; shown from 768px up. Give the column's cells the same. */
  hideOnPhone?: boolean;
  /**
   * Gives way as the table narrows, in a frame or a container: 3 shows from 960px of it, 2 from
   * 640px, 1 always. Give the column's cells the same.
   */
  priority?: DataTablePriority | 1 | 2 | 3;
}

export type PlinthDataTableColumnProps = DataTableColumnOptions &
  Omit<ComponentProps<'th'>, keyof DataTableColumnOptions>;

export function PlinthDataTableColumn({
  sort,
  numeric = false,
  hideOnPhone = false,
  priority,
  className,
  children,
  ...rest
}: PlinthDataTableColumnProps) {
  return (
    <th
      role="columnheader"
      scope="col"
      // A blank sort counts as missing, as Blade's filled() decides.
      aria-sort={sort?.trim() ? dataTableSort(sort) : undefined}
      data-numeric={numeric ? '' : undefined}
      data-phone={hideOnPhone ? 'hidden' : undefined}
      data-priority={dataTablePriority(priority)}
      {...rest}
      className={classNames('plinth-data-table-column', className)}
    >
      {children}
    </th>
  );
}
