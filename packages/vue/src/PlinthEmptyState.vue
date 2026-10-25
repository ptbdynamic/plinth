<script setup lang="ts">
// Markup contract: packages/css/src/components/empty-state.css
import { computed, useSlots } from 'vue';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** What is empty, in plain words: "No runs yet". */
    heading: string;
    /** The heading's element, h2 to h6. */
    headingLevel?: HeadingLevel;
    /** Why it is empty, or what fills it. */
    description?: string;
    /** Its own raised surface, for a page section with nothing around it (data-framed). */
    framed?: boolean;
  }>(),
  { headingLevel: 'h2', description: undefined, framed: false },
);

defineSlots<{
  /** The project's own icon, decorative. */
  icon?: () => unknown;
  /** The action: usually one button or link. */
  actions?: () => unknown;
}>();

if (!props.heading?.trim()) {
  throw new Error('<PlinthEmptyState> needs a heading: it says what is empty.');
}

const level = computed(() => resolveLevel(props.headingLevel));
const slots = useSlots();
</script>

<template>
  <div class="plinth-empty-state" :data-framed="framed ? '' : undefined">
    <div v-if="hasContent(slots.icon?.())" class="plinth-empty-state-icon">
      <slot name="icon" />
    </div>
    <component :is="level" class="plinth-empty-state-heading">{{ heading }}</component>
    <p v-if="description?.trim()" class="plinth-empty-state-description">{{ description }}</p>
    <div v-if="hasContent(slots.actions?.())" class="plinth-empty-state-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
