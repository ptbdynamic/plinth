<script setup lang="ts">
// Markup contract: packages/css/src/components/list-row.css
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** A second line under the title. */
    description?: string;
    /** The row's own chevron, at the end, for a row that opens something. */
    chevron?: boolean;
    /** Renders the row as a link. */
    href?: string;
    /** Renders the row as a button, when it has no href. */
    button?: boolean;
    /** The row for the page being shown: aria-current="page", on a link or static row. */
    current?: boolean;
    /** Disables a link or button row, or a selectable row's checkbox. */
    disabled?: boolean;
    /** While the app is selecting: a <label> row with a checkbox in the leading slot. */
    selectable?: boolean;
    /** A selectable row that is selected: its checkbox is checked. */
    selected?: boolean;
    /** The checkbox's name, for a form. */
    name?: string;
    /** The checkbox's value, for a form. */
    value?: string;
  }>(),
  {
    description: undefined,
    chevron: false,
    href: undefined,
    button: false,
    current: false,
    disabled: false,
    selectable: false,
    selected: false,
    name: undefined,
    value: undefined,
  },
);

const emit = defineEmits<{
  /** A selectable row's checkbox changed: whether it is now checked (v-model:selected). */
  'update:selected': [selected: boolean];
}>();

const tag = computed(() =>
  props.selectable ? 'label' : props.href ? 'a' : props.button ? 'button' : 'div',
);
// A selectable row opens nothing, so it has no chevron.
const mark = computed(() => props.chevron && !props.selectable);

function change(event: Event) {
  emit('update:selected', (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <component
    :is="tag"
    class="plinth-list-row"
    :type="tag === 'button' ? 'button' : undefined"
    :href="tag === 'a' && !disabled ? href : undefined"
    :aria-current="current && tag !== 'button' ? 'page' : undefined"
    :disabled="tag === 'button' && disabled ? true : undefined"
    :role="tag === 'a' && disabled ? 'link' : undefined"
    :aria-disabled="tag === 'a' && disabled ? 'true' : undefined"
  >
    <span v-if="selectable" class="plinth-list-row-leading"
      ><input
        type="checkbox"
        class="plinth-list-row-checkbox"
        :name="name || undefined"
        :value="value || undefined"
        :checked="selected"
        :disabled="disabled"
        @change="change"
    /></span>
    <span v-else-if="$slots.leading" class="plinth-list-row-leading"><slot name="leading" /></span>
    <span class="plinth-list-row-content">
      <span class="plinth-list-row-title"><slot /></span>
      <span v-if="description" class="plinth-list-row-description">{{ description }}</span>
    </span>
    <!-- The chevron is listRowChevron (list-row.ts), written out; parity keeps the copies equal. -->
    <span v-if="$slots.trailing || mark" class="plinth-list-row-trailing"
      ><slot name="trailing" /><span
        v-if="mark"
        class="plinth-icon plinth-list-row-chevron"
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
          <path d="M9 6l6 6-6 6"></path></svg></span
    ></span>
  </component>
</template>
