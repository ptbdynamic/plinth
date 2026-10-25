<script setup lang="ts">
// Markup contract: packages/css/src/components/page-header.css
import { computed, useSlots } from 'vue';
import { pageHeaderLevel, type PageHeaderLevel } from './page-header';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The page's heading. */
    heading: string;
    /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
    level?: PageHeaderLevel;
    /** The screen's top bar: it adds the top safe-area inset (data-top). */
    top?: boolean;
  }>(),
  { level: 'h1', top: false },
);

defineSlots<{
  /** The leading action, usually a menu button or a back link. */
  leading?: () => unknown;
  /** The trailing actions: icon buttons or a primary button. */
  actions?: () => unknown;
}>();

if (!props.heading?.trim()) {
  throw new Error("<PlinthPageHeader> needs a heading: it is the page's heading.");
}

const element = computed(() => pageHeaderLevel(props.level));
const slots = useSlots();
</script>

<template>
  <header class="plinth-page-header" :data-top="top ? '' : undefined">
    <div v-if="hasContent(slots.leading?.())" class="plinth-page-header-leading">
      <slot name="leading" />
    </div>
    <component :is="element" class="plinth-page-header-heading">{{ heading }}</component>
    <div v-if="hasContent(slots.actions?.())" class="plinth-page-header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
