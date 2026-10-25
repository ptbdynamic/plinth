<script setup lang="ts">
// Markup contract: packages/css/src/components/icon.css
import { computed, useAttrs } from 'vue';
import {
  iconGlyphs,
  iconName,
  iconSize,
  mirroredIconNames,
  type IconName,
  type IconSize,
} from './icon';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** A built-in glyph; the slot shows when it is missing or not one. */
    name?: IconName;
    size?: IconSize;
    label?: string;
    mirror?: boolean;
  }>(),
  { name: undefined, size: 'md', label: undefined, mirror: false },
);

const attrs = useAttrs();
// The glyph's SVG is iconGlyph(name) (icon.ts), written out; parity keeps the copies equal.
const glyph = computed(() => iconName(props.name));
const dataSize = computed(() => iconSize(props.size));
const mirrored = computed(
  () => props.mirror || (glyph.value !== undefined && mirroredIconNames.includes(glyph.value)),
);
// The label can also come as an aria-label attribute; a blank one leaves the icon decorative.
const accessibleName = computed(() => {
  const value = props.label ?? (attrs['aria-label'] as string | undefined);
  return value?.trim() ? value : undefined;
});
// The project's own attributes are bound last, so they win over Plinth's (docs/adr/0002).
const rest = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'aria-label')),
);
</script>

<template>
  <span
    class="plinth-icon"
    :data-size="dataSize"
    :data-icon="glyph"
    :data-mirror="mirrored ? '' : undefined"
    :role="accessibleName ? 'img' : undefined"
    :aria-label="accessibleName"
    :aria-hidden="accessibleName ? undefined : 'true'"
    v-bind="rest"
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
</template>
