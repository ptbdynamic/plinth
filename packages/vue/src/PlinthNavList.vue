<script setup lang="ts">
// Markup contract: packages/css/src/components/nav-list.css
withDefaults(
  defineProps<{
    /** The navigation's accessible name (aria-label). */
    label?: string;
  }>(),
  { label: undefined },
);
</script>

<template>
  <nav class="plinth-nav-list" :aria-label="label?.trim() ? label : undefined"><slot /></nav>
</template>
