<script setup lang="ts">
// Markup contract: packages/css/src/components/menu.css
// A blank label counts as missing, as Blade's filled() decides.
defineProps<{
  /** The heading over the group's items, and the group's accessible name. */
  label?: string;
}>();
</script>

<template>
  <div class="plinth-menu-group" role="group" :aria-label="label?.trim() ? label : undefined">
    <div v-if="label?.trim()" class="plinth-menu-heading" aria-hidden="true">{{ label }}</div>
    <slot />
  </div>
</template>
