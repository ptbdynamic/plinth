<script setup lang="ts">
// Markup contract: packages/css/src/components/section-heading.css
import { computed, useSlots } from 'vue';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The section's name, its heading. */
    heading: string;
    /** The heading's element, h2 to h6. */
    headingLevel?: HeadingLevel;
    /** The heading's id, for a <section aria-labelledby> around it. */
    headingId?: string;
    /** A line under the heading saying what the section holds. */
    description?: string;
    /** A hairline under the heading. */
    divider?: boolean;
  }>(),
  { headingLevel: 'h2', headingId: undefined, description: undefined, divider: false },
);

defineSlots<{
  /** The actions: a button or two. */
  actions?: () => unknown;
}>();

if (!props.heading?.trim()) {
  throw new Error('<PlinthSectionHeading> needs a heading: it names the section.');
}

const element = computed(() => resolveLevel(props.headingLevel));
const id = computed(() => (props.headingId?.trim() ? props.headingId : undefined));
const slots = useSlots();
</script>

<template>
  <div class="plinth-section-heading" :data-divider="divider ? '' : undefined">
    <div class="plinth-section-heading-text">
      <component :is="element" :id="id" class="plinth-section-heading-title">{{
        heading
      }}</component>
      <p v-if="description?.trim()" class="plinth-section-heading-description">
        {{ description }}
      </p>
    </div>
    <div v-if="hasContent(slots.actions?.())" class="plinth-section-heading-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
