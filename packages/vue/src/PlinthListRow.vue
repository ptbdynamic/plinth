<script setup lang="ts">
// Markup contract: packages/css/src/components/list-row.css
import { computed, useId } from 'vue';
import PlinthIcon from './PlinthIcon.vue';

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
    /** Disables a link or button row, or a selectable or setting row's control. */
    disabled?: boolean;
    /** While the app is selecting: a <label> row with a checkbox in the leading slot. */
    selectable?: boolean;
    /** A selectable row that is selected: its checkbox is checked. */
    selected?: boolean;
    /** A setting row: a <label> with a switch in the trailing slot, named by the row's title. */
    toggle?: boolean;
    /** A setting row whose switch is on. */
    checked?: boolean;
    /** The switch's id, which its title's and description's ids start with; one is generated. */
    switchId?: string;
    /** The checkbox's or switch's name, for a form; on another row, the root's. */
    name?: string;
    /** The checkbox's or switch's value, for a form; on another row, the root's. */
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
    toggle: false,
    checked: false,
    switchId: undefined,
    name: undefined,
    value: undefined,
  },
);

const emit = defineEmits<{
  /** A selectable row's checkbox changed: whether it is now checked (v-model:selected). */
  'update:selected': [selected: boolean];
  /** A setting row's switch changed: whether it is now on (v-model:checked). */
  'update:checked': [checked: boolean];
}>();

// A selectable row wins over a setting row, and both over a link or a button.
const setting = computed(() => !props.selectable && props.toggle);
const control = computed(() => props.selectable || setting.value);
const tag = computed(() =>
  control.value ? 'label' : props.href ? 'a' : props.button ? 'button' : 'div',
);
// A selectable or setting row opens nothing, so it has no chevron.
const mark = computed(() => props.chevron && !control.value);
const generatedId = useId();
const inputId = computed(() => props.switchId?.trim() || `plinth-list-row-switch-${generatedId}`);

function change(event: Event) {
  emit('update:selected', (event.target as HTMLInputElement).checked);
}

function toggled(event: Event) {
  emit('update:checked', (event.target as HTMLInputElement).checked);
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
    :name="!control && name?.trim() ? name : undefined"
    :value="!control && value?.trim() ? value : undefined"
  >
    <span v-if="selectable" class="plinth-list-row-leading"
      ><input
        type="checkbox"
        class="plinth-list-row-checkbox"
        :name="name?.trim() ? name : undefined"
        :value="value?.trim() ? value : undefined"
        :checked="selected"
        :disabled="disabled"
        @change="change"
    /></span>
    <span v-else-if="$slots.leading" class="plinth-list-row-leading"><slot name="leading" /></span>
    <span class="plinth-list-row-content">
      <span class="plinth-list-row-title" :id="setting ? `${inputId}-title` : undefined"
        ><slot
      /></span>
      <span
        v-if="description"
        class="plinth-list-row-description"
        :id="setting ? `${inputId}-description` : undefined"
        >{{ description }}</span
      >
    </span>
    <span v-if="$slots.trailing || mark || setting" class="plinth-list-row-trailing"
      ><slot name="trailing" /><input
        v-if="setting"
        :id="inputId"
        type="checkbox"
        role="switch"
        class="plinth-switch-input"
        :aria-labelledby="`${inputId}-title`"
        :aria-describedby="description ? `${inputId}-description` : undefined"
        :name="name?.trim() ? name : undefined"
        :value="value?.trim() ? value : undefined"
        :checked="checked"
        :disabled="disabled"
        @change="toggled" /><PlinthIcon
        v-else-if="mark"
        class="plinth-list-row-chevron"
        name="chevron-right"
        size="sm"
    /></span>
  </component>
</template>
