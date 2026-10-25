// Markup contract: packages/css/src/components/menu.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

/** An `<hr>` between a menu's items. */
export type PlinthMenuSeparatorProps = ComponentProps<'hr'>;

export function PlinthMenuSeparator({ className, ...rest }: PlinthMenuSeparatorProps) {
  return <hr {...rest} className={classNames('plinth-menu-separator', className)} />;
}
