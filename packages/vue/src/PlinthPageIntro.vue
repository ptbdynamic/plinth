<script setup lang="ts">
// Markup contract: packages/css/src/components/page-intro.css
import { computed, useSlots } from 'vue';
import { pageHeaderLevel, type PageHeaderLevel } from './page-header';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The page's heading. */
    heading: string;
    /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
    level?: PageHeaderLevel;
    /** A line under the heading saying what the page is for. */
    description?: string;
    /** The description's id, for an `aria-describedby` that points at it. */
    descriptionId?: string;
    /** Shown from 768px only, beside a page header shown on a phone only (data-wide-only). */
    wideOnly?: boolean;
  }>(),
  { level: 'h1', description: undefined, descriptionId: undefined, wideOnly: false },
);

defineSlots<{
  /** The actions: the page's primary button, or a button or two. */
  actions?: () => unknown;
}>();

if (!props.heading?.trim()) {
  throw new Error("<PlinthPageIntro> needs a heading: it is the page's heading.");
}

const element = computed(() => pageHeaderLevel(props.level));
const slots = useSlots();
</script>

<template>
  <div class="plinth-page-intro" :data-wide-only="wideOnly ? '' : undefined">
    <div class="plinth-page-intro-text">
      <component :is="element" class="plinth-page-intro-heading">{{ heading }}</component>
      <p
        v-if="description?.trim()"
        class="plinth-page-intro-description"
        :id="descriptionId?.trim() ? descriptionId : undefined"
      >
        {{ description }}
      </p>
    </div>
    <div v-if="hasContent(slots.actions?.())" class="plinth-page-intro-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
