<script setup lang="ts">
// Markup contract: packages/css/src/components/menu.css
import { computed, inject, useSlots } from 'vue';
import { menuIdKey, menuItemTone, type MenuItemTone } from './menu';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The item's address; without it the item is a button. */
    href?: string;
    /** `danger` for an item that destroys or removes something. */
    tone?: MenuItemTone;
    /** A keyboard shortcut to show at the item's end, such as ⌘D. */
    shortcut?: string;
    /** Disables the item. */
    disabled?: boolean;
    /** The id of the menu a button item closes; the menu around it when missing. */
    menu?: string;
  }>(),
  { href: undefined, tone: 'neutral', shortcut: undefined, disabled: false, menu: undefined },
);

const slots = useSlots();
const around = inject(menuIdKey, undefined);
// A blank href counts as missing, as Blade's filled() decides.
const tag = computed(() => (props.href?.trim() ? 'a' : 'button'));
const closes = computed(() =>
  tag.value === 'button' ? props.menu?.trim() || around?.value : undefined,
);
const resolvedTone = computed(() => menuItemTone(props.tone));
</script>

<template>
  <component
    :is="tag"
    class="plinth-menu-item"
    :type="tag === 'button' ? 'button' : undefined"
    :href="tag === 'a' && !disabled ? href : undefined"
    :commandfor="closes || undefined"
    :command="closes ? 'hide-popover' : undefined"
    :data-tone="resolvedTone === 'danger' ? 'danger' : undefined"
    :disabled="tag === 'button' && disabled ? true : undefined"
    :role="tag === 'a' && disabled ? 'link' : undefined"
    :aria-disabled="tag === 'a' && disabled ? 'true' : undefined"
  >
    <span v-if="hasContent(slots.icon?.())" class="plinth-menu-icon" aria-hidden="true"
      ><slot name="icon"
    /></span>
    <span class="plinth-menu-label"><slot /></span>
    <kbd v-if="shortcut?.trim()" class="plinth-menu-shortcut" aria-hidden="true">{{
      shortcut
    }}</kbd>
  </component>
</template>
