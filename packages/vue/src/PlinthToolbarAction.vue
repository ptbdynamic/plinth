<script setup lang="ts">
// Markup contract: packages/css/src/components/toolbar.css
import { computed } from 'vue';
import { iconGlyphs, iconName, mirroredIconNames, type IconName } from './icon';

const props = withDefaults(
  defineProps<{
    /** The action's name, shown beside its icon from 1280px. */
    label: string;
    /** A built-in glyph; the slot shows when it is missing or not one. */
    icon?: IconName;
    /** Hidden below 1280px, where the app shows it in the ⋯ menu instead. */
    overflow?: boolean;
    disabled?: boolean;
  }>(),
  { icon: undefined, overflow: false, disabled: false },
);

if (!props.label?.trim()) {
  throw new Error('<PlinthToolbarAction> needs a label: it is the action\'s name.');
}

// The glyph's SVG is iconGlyph(icon) (icon.ts), written out; parity keeps the copies equal.
const glyph = computed(() => iconName(props.icon));
const mirrored = computed(() => glyph.value !== undefined && mirroredIconNames.includes(glyph.value));
</script>

<template>
  <button
    type="button"
    class="plinth-button plinth-toolbar-action"
    data-variant="ghost"
    data-size="md"
    :data-overflow="overflow ? '' : undefined"
    :disabled="disabled || undefined"
  >
    <span
      class="plinth-icon"
      data-size="md"
      :data-icon="glyph"
      :data-mirror="mirrored ? '' : undefined"
      aria-hidden="true"
      ><svg
        v-if="glyph"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="iconGlyphs[glyph]"
      ></svg
      ><slot v-else
    /></span>
    <span class="plinth-button-label">{{ label }}</span>
  </button>
</template>
