<script setup lang="ts">
// Markup contract: packages/css/src/components/list-header.css
import { computed, useSlots } from 'vue';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The list's name, its heading. */
    heading: string;
    /** The heading's element, h2 to h6. */
    headingLevel?: HeadingLevel;
    /** How many items the list holds, after the title. */
    count?: string | number | null;
    /** While selecting: how many rows are selected, in the app's words (2 selected). */
    selection?: string;
  }>(),
  { headingLevel: 'h2', count: null, selection: undefined },
);

defineSlots<{
  /** The actions: icon buttons or a button. */
  actions?: () => unknown;
}>();

if (!props.heading?.trim()) {
  throw new Error('<PlinthListHeader> needs a heading: it names the list.');
}

const element = computed(() => resolveLevel(props.headingLevel));
const selecting = computed(() => Boolean(props.selection?.trim()));
const hasCount = computed(
  () => props.count !== null && props.count !== undefined && String(props.count).trim() !== '',
);
const slots = useSlots();
</script>

<template>
  <div :class="selecting ? 'plinth-list-header is-selecting' : 'plinth-list-header'">
    <component :is="element" class="plinth-list-header-heading">
      <span class="plinth-list-header-title">{{ heading }}</span>
      <span v-if="hasCount" class="plinth-list-header-count">{{ count }}</span>
    </component>
    <p class="plinth-list-header-selection" role="status">{{ selecting ? selection : '' }}</p>
    <div v-if="hasContent(slots.actions?.())" class="plinth-list-header-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
