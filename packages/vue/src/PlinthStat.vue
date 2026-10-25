<script setup lang="ts">
// Markup contract: packages/css/src/components/stat.css
import { computed } from 'vue';
import { calloutIcons } from './callout';
import { tone as toTone, type Tone } from './tones';

const props = withDefaults(
  defineProps<{
    /** What the number is: "Runs today". */
    label: string;
    /** The number, formatted by the app. Empty (or missing) prints the empty state. */
    value?: string | number | null;
    /** A supporting line under the value: a change, a target or "of €150". */
    description?: string;
    /** The supporting line's tone, with its own icon so it never rests on colour alone. */
    tone?: Tone;
    /** Renders the tile as a link to the detail behind the number. */
    href?: string;
    /** What screen readers say for an empty value. */
    emptyLabel?: string;
  }>(),
  {
    value: null,
    description: undefined,
    tone: 'neutral',
    href: undefined,
    emptyLabel: 'Not available',
  },
);

const dataTone = computed(() => toTone(props.tone));
const empty = computed(() => props.value === null || String(props.value).trim() === '');
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="plinth-stat"
    :href="href || undefined"
    :data-tone="dataTone"
  >
    <span class="plinth-stat-label">{{ label }}</span>
    <span v-if="empty" class="plinth-stat-value is-empty"
      ><span aria-hidden="true">—</span
      ><span class="plinth-stat-empty">{{ emptyLabel }}</span></span
    >
    <span v-else class="plinth-stat-value">{{ value }}</span>
    <span v-if="description?.trim()" class="plinth-stat-description"
      ><span
        v-if="dataTone !== 'neutral'"
        class="plinth-icon plinth-stat-tone"
        data-size="sm"
        aria-hidden="true"
        v-html="calloutIcons[dataTone]"
      ></span
      >{{ description }}</span
    >
    <!-- The chevron is statChevron (stat.ts), written out; parity keeps the copies equal. -->
    <span
      v-if="href"
      class="plinth-icon plinth-stat-chevron"
      data-size="sm"
      data-mirror
      aria-hidden="true"
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 6l6 6-6 6"></path></svg
    ></span>
  </component>
</template>
