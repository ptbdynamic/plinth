<script setup lang="ts">
// Markup contract: packages/css/src/components/app-nav.css
import { computed, useSlots } from 'vue';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The page's address. */
    href?: string;
    /** A number after the label, such as how many items wait there. */
    count?: string | number | null;
    /** The page being shown, or a page under it: aria-current="page". */
    current?: boolean;
  }>(),
  { href: undefined, count: undefined, current: false },
);

const slots = useSlots();
// Missing or blank prints no count, as Blade's filled() decides.
const hasCount = computed(() => props.count != null && String(props.count).trim() !== '');
</script>

<template>
  <a
    class="plinth-app-nav-item"
    :href="href?.trim() ? href : undefined"
    :aria-current="current ? 'page' : undefined"
  >
    <span v-if="hasContent(slots.icon?.())" class="plinth-app-nav-icon" aria-hidden="true"
      ><slot name="icon"
    /></span>
    <span class="plinth-app-nav-label"><slot /></span>
    <span v-if="hasCount" class="plinth-app-nav-count">{{ count }}</span>
  </a>
</template>
