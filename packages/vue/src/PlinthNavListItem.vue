<script setup lang="ts">
// Markup contract: packages/css/src/components/nav-list.css
import { computed, useSlots } from 'vue';
import { hasContent } from './slots';

defineSlots<{
  /** The link's label. */
  default?: () => unknown;
  /** A decorative icon before the label. */
  icon?: () => unknown;
}>();

const props = withDefaults(
  defineProps<{
    /** The view's address. */
    href?: string;
    /** A number after the label, such as how many items the view holds. */
    count?: string | number | null;
    /** The view being shown: aria-current="page". */
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
    class="plinth-nav-list-item"
    :href="href?.trim() ? href : undefined"
    :aria-current="current ? 'page' : undefined"
  >
    <span v-if="hasContent(slots.icon?.())" class="plinth-nav-list-icon" aria-hidden="true"
      ><slot name="icon"
    /></span>
    <span class="plinth-nav-list-label"><slot /></span>
    <span v-if="hasCount" class="plinth-nav-list-count">{{ count }}</span>
  </a>
</template>
