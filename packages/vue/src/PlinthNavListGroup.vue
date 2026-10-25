<script setup lang="ts">
// Markup contract: packages/css/src/components/nav-list.css
import { computed } from 'vue';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';

const props = withDefaults(
  defineProps<{
    /** A heading above the group's items. */
    heading?: string;
    /** The heading's element, h2 to h6. */
    headingLevel?: HeadingLevel;
  }>(),
  { heading: undefined, headingLevel: 'h2' },
);

const level = computed(() => resolveLevel(props.headingLevel));
</script>

<template>
  <div class="plinth-nav-list-group">
    <component :is="level" v-if="heading?.trim()" class="plinth-nav-list-heading">{{
      heading
    }}</component>
    <slot />
  </div>
</template>
