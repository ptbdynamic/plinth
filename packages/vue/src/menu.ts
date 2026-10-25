import type { InjectionKey, Ref } from 'vue';

/** A menu item's tone: `neutral` (the default) or `danger`, for an item that destroys or removes. */
export const menuItemTones = ['neutral', 'danger'] as const;
export type MenuItemTone = (typeof menuItemTones)[number];

/** A tone from the list, or `neutral` when it is not one of them. */
export function menuItemTone(value: string | undefined): MenuItemTone {
  return menuItemTones.includes(value as MenuItemTone) ? (value as MenuItemTone) : 'neutral';
}

/** The id of the menu around an item, which a button item closes when it is pressed. */
export const menuIdKey: InjectionKey<Ref<string>> = Symbol('plinth-menu-id');
