<script setup lang="ts">
// Markup contract: packages/css/src/components/toolbar.css
import { ref, useSlots } from 'vue';
import { hasContent } from './slots';
import { useToolbarKeys } from './toolbar';

const props = withDefaults(
  defineProps<{
    /** The actions' name (aria-label on the toolbar). */
    label?: string;
    /** What the actions act on, in the app's words: 2 selected, #1042. */
    target?: string;
  }>(),
  { label: 'Actions', target: undefined },
);

defineSlots<{
  /** The actions: groups, then the ⋯ button and its menu. */
  default?: () => unknown;
  /** The search, on the start side. */
  search?: () => unknown;
}>();

if (!props.label?.trim()) {
  throw new Error('<PlinthToolbar> needs a label: it names the toolbar.');
}

const slots = useSlots();
const actions = ref<HTMLElement>();
// One tab stop, and the arrow keys between the actions (toolbar.ts).
useToolbarKeys(actions);
</script>

<template>
  <div class="plinth-toolbar">
    <slot v-if="hasContent(slots.search?.())" name="search" />
    <p v-if="target?.trim()" class="plinth-toolbar-target">{{ target }}</p>
    <div ref="actions" class="plinth-toolbar-actions" role="toolbar" :aria-label="label">
      <slot />
    </div>
  </div>
</template>
