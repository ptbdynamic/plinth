<script setup lang="ts">
// Markup contract: packages/css/src/components/toolbar.css
import { iconGlyphs } from './icon';

const props = defineProps<{
  /** Where the search looks, as the button shows it: In: Open, All folders. */
  label: string;
}>();

if (!props.label?.trim()) {
  throw new Error("<PlinthToolbarScope> needs a label: it is the button's text and name.");
}
</script>

<template>
  <button type="button" class="plinth-toolbar-scope">
    <span class="plinth-toolbar-scope-label">{{ label }}</span>
    <span class="plinth-icon" data-size="sm" data-icon="chevron-down" aria-hidden="true"
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="iconGlyphs['chevron-down']"
      ></svg
    ></span>
  </button>
</template>
