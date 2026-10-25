<script setup lang="ts">
// Markup contract: packages/css/src/components/timeline.css
withDefaults(
  defineProps<{
    /** The list's accessible name (aria-label). */
    label?: string;
  }>(),
  { label: undefined },
);
</script>

<template>
  <ol class="plinth-timeline" role="list" :aria-label="label?.trim() ? label : undefined">
    <slot />
  </ol>
</template>
