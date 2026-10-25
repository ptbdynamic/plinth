<script setup lang="ts">
// Markup contract: packages/css/src/components/menu.css
import { computed, provide, ref } from 'vue';
import { menuIdKey } from './menu';

const props = defineProps<{
  /** The menu's id, which its button names in popovertarget. */
  id: string;
}>();

if (!props.id?.trim()) {
  throw new Error('<PlinthMenu> needs an id: its button names it in popovertarget.');
}

const menuId = computed(() => props.id.trim());
// A button item closes the menu around it (PlinthMenuItem).
provide(menuIdKey, menuId);

const menu = ref<HTMLElement>();

defineExpose({
  /** Opens the menu next to `source`, the button it belongs to. */
  showPopover: (options: { source: HTMLElement }) => menu.value?.showPopover(options),
  /** Closes the menu. */
  hidePopover: () => menu.value?.hidePopover(),
});
</script>

<template>
  <div :id="menuId" ref="menu" class="plinth-menu" popover="auto"><slot /></div>
</template>
