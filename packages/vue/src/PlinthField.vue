<script setup lang="ts">
// Markup contract: packages/css/src/components/field.css
import { computed, useId } from 'vue';
import { fieldControl, type FieldControl } from './field';
import { fieldDescribedBy } from './text-field';

const props = withDefaults(
  defineProps<{
    /** The label, or a group's legend. */
    label: string;
    /** Hides the label visually; screen readers still read it. */
    hideLabel?: boolean;
    /** The control's id (a group's fieldset's), and its parts'; one is generated when it is missing. */
    id?: string;
    /** A fieldset with a legend, for a group of controls (pills, radios, checkboxes). */
    group?: boolean;
    /** A mark after the label; the control says it is required itself. */
    required?: boolean;
    /** A line under the control that helps fill it in. */
    description?: string;
    /** What is wrong with the value. */
    error?: string;
  }>(),
  {
    hideLabel: false,
    id: undefined,
    group: false,
    required: false,
    description: undefined,
    error: undefined,
  },
);

defineSlots<{
  /** The control, with the ids it points at. */
  default?: (control: FieldControl) => unknown;
}>();

if (!props.label?.trim()) {
  throw new Error("<PlinthField> needs a label: it is the control's accessible name.");
}

const generatedId = useId();
const fieldId = computed(() => props.id?.trim() || `plinth-field-${generatedId}`);
const control = computed(() =>
  fieldControl(fieldId.value, props.group, props.description, props.error),
);
const hasDescription = computed(() => Boolean(props.description?.trim()));
// The project's attributes fall through onto the root and win (docs/adr/0002).
// A group's fieldset is described by the parts; one control is described itself.
const groupDescribedBy = computed(() =>
  props.group ? fieldDescribedBy(fieldId.value, props.description, props.error) : undefined,
);
</script>

<template>
  <component
    :is="group ? 'fieldset' : 'div'"
    class="plinth-field"
    :data-label="hideLabel ? 'hidden' : undefined"
    :id="group ? fieldId : undefined"
    :aria-describedby="groupDescribedBy"
  >
    <component
      :is="group ? 'legend' : 'label'"
      class="plinth-field-label"
      :id="control.labelId"
      :for="group ? undefined : fieldId"
      >{{ label
      }}<span v-if="required" class="plinth-field-required" aria-hidden="true">*</span></component
    >
    <slot v-bind="control" />
    <p v-if="hasDescription" class="plinth-field-description" :id="`${fieldId}-description`">
      {{ description }}
    </p>
    <p v-if="control.invalid" class="plinth-field-error" :id="`${fieldId}-error`">{{ error }}</p>
  </component>
</template>
