<script setup lang="ts">
// Markup contract: packages/css/src/components/app-bar.css
import PlinthIcon from './PlinthIcon.vue';

const props = withDefaults(
  defineProps<{
    /** The button's text and name. */
    label?: string;
    /** The keyboard hint after the label, such as ⌘K or Ctrl K; the app picks it. */
    shortcut?: string;
  }>(),
  { label: 'Search', shortcut: undefined },
);

if (!props.label?.trim()) {
  throw new Error("<PlinthAppBarSearch> needs a label: it is the button's text and name.");
}
</script>

<template>
  <button class="plinth-app-bar-search" type="button">
    <PlinthIcon name="search" size="sm" /><span class="plinth-app-bar-search-label">{{
      label
    }}</span
    ><kbd v-if="shortcut?.trim()" class="plinth-app-bar-search-shortcut" aria-hidden="true">{{
      shortcut
    }}</kbd>
  </button>
</template>
