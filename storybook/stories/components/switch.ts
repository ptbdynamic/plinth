import { choice } from './checkbox.ts';
import type { Attributes } from './markup.ts';

export interface SwitchArgs {
  /** The input's id: the label, description and error point at it. */
  id: string;
  /** The label beside the switch, and its accessible name. */
  label: string;
  /** On. */
  checked: boolean;
  /** A line under the label that says more about the setting. */
  description?: string;
  /** What is wrong; it marks the switch invalid. */
  error?: string;
  disabled: boolean;
}

/**
 * The switch's markup contract: a checkbox with the switch role. Blade, Vue and React must print
 * exactly this (see parity.test.ts).
 */
export function switchControl(args: SwitchArgs, attributes: Attributes = {}): string {
  return choice('plinth-switch', args, attributes);
}
