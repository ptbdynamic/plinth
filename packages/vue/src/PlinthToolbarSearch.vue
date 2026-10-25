<script setup lang="ts">
// Markup contract: packages/css/src/components/toolbar.css
import { computed, useAttrs, useSlots } from 'vue';
import { iconGlyphs } from './icon';
import { hasContent } from './slots';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The field's name (aria-label). */
    label?: string;
  }>(),
  { label: 'Search' },
);

defineSlots<{
  /** The scope: the scope button and its menu. */
  scope?: () => unknown;
}>();

if (!props.label?.trim()) {
  throw new Error("<PlinthToolbarSearch> needs a label: it is the field's name.");
}

const attrs = useAttrs();
const slots = useSlots();
// The project's class goes on the root; every other attribute on the input, bound last so it
// wins (docs/adr/0002).
const input = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);
</script>

<template>
  <search :class="['plinth-toolbar-search', attrs.class]">
    <span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true"
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="iconGlyphs.search"
      ></svg
    ></span>
    <input type="search" class="plinth-toolbar-search-input" :aria-label="label" v-bind="input" />
    <slot v-if="hasContent(slots.scope?.())" name="scope" />
  </search>
</template>
