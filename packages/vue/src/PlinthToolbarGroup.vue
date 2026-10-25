<script setup lang="ts">
// Markup contract: packages/css/src/components/toolbar.css
defineProps<{
  /** The group's name, when it has one of its own. */
  label?: string;
}>();
</script>

<template>
  <div class="plinth-toolbar-group" role="group" :aria-label="label?.trim() ? label : undefined">
    <slot />
  </div>
</template>
