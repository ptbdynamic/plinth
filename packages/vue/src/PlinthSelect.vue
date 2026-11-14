<script setup lang="ts">
// Markup contract: packages/css/src/components/select.css
import { computed, useAttrs, useId } from 'vue';
import { selectSize, type SelectSize } from './select';
import { fieldDescribedBy } from './text-field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label, and the field's accessible name. */
    label: string;
    /** Hides the label visually; screen readers still read it. */
    hideLabel?: boolean;
    /** The select's id; one is generated when it is missing. */
    id?: string;
    size?: SelectSize;
    /** A first, disabled option that shows while nothing is chosen. */
    placeholder?: string;
    /** A line under the field that helps fill it in. */
    description?: string;
    /** What is wrong with the value; it marks the field invalid. */
    error?: string;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    hideLabel: false,
    id: undefined,
    size: 'md',
    placeholder: undefined,
    description: undefined,
    error: undefined,
    disabled: false,
    required: false,
  },
);

/** The chosen option's value, with `v-model`. */
const model = defineModel<string>();

if (!props.label?.trim()) {
  throw new Error("<PlinthSelect> needs a label: it is the field's accessible name.");
}

const attrs = useAttrs();
const generatedId = useId();
const selectId = computed(() => props.id?.trim() || `plinth-select-${generatedId}`);
const dataSize = computed(() => selectSize(props.size));
const hasDescription = computed(() => Boolean(props.description?.trim()));
const hasError = computed(() => Boolean(props.error?.trim()));
const hasPlaceholder = computed(() => Boolean(props.placeholder?.trim()));
const describedBy = computed(() =>
  fieldDescribedBy(selectId.value, props.description, props.error),
);
// The placeholder shows while nothing is chosen.
const placeholderChosen = computed(() => model.value === undefined || model.value === '');
// Without a model the browser keeps its own choice; with one, the select shows it.
const valueAttrs = computed(() => (model.value === undefined ? {} : { value: model.value }));
// The project's class goes on the root; every other attribute on the select, bound last so it
// wins over Plinth's (docs/adr/0002).
const selectAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);

function onChange(event: Event) {
  model.value = (event.target as HTMLSelectElement).value;
}
</script>

<template>
  <div
    :class="['plinth-select', attrs.class]"
    :data-size="dataSize"
    :data-label="hideLabel ? 'hidden' : undefined"
  >
    <label class="plinth-select-label" :for="selectId">{{ label }}</label>
    <div class="plinth-select-control">
      <select
        :id="selectId"
        class="plinth-select-input"
        :disabled="disabled || undefined"
        :required="required || undefined"
        :aria-describedby="describedBy"
        :aria-invalid="hasError ? 'true' : undefined"
        v-bind="{ ...valueAttrs, ...selectAttrs }"
        @change="onChange"
      >
        <option v-if="hasPlaceholder" value="" disabled :selected="placeholderChosen">
          {{ placeholder }}
        </option>
        <slot />
      </select>
    </div>
    <p v-if="hasDescription" :id="`${selectId}-description`" class="plinth-select-description">
      {{ description }}
    </p>
    <p v-if="hasError" :id="`${selectId}-error`" class="plinth-select-error">{{ error }}</p>
  </div>
</template>
